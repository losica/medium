import { Component, computed, effect, inject, input, OnChanges, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { LoadingComponent } from "../loading/loading.component";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { Pagination } from "../pagination/pagination.component";
import queryString from "query-string";
import { TagListComponent } from "../tagList/tagList.component";
import { AddToFavoritesComponent } from "../addToFavorites/addToFavorites.component";
import { ProfileImageComponent } from "../profileImage/profileImage.component";
import { formatDate } from "../../utils/date.utils";

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    standalone: true,
    imports: [
        AddToFavoritesComponent,
        ErrorMessageComponent,
        LoadingComponent,
        Pagination,
        ProfileImageComponent,
        RouterLink,
        TagListComponent,
    ]
})

export class FeedComponent {
    apiUrl = input.required<string>();

    private store = inject(Store);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isLoading = this.store.selectSignal(selectIsLoading);
    error = this.store.selectSignal(selectError);
    feed = this.store.selectSignal(selectFeedData);
    formatDate = formatDate;

    baseUrl = this.router.url.split('?')[0];
    limit = environment.limit;

    currentPage = toSignal(
        this.route.queryParams.pipe(
            map(params => Number(params['page'] || '1'))
        ),
        { initialValue: 1 }
    );

    apiUrlWithParams = computed(() => {
        const offset = (this.currentPage() - 1) * this.limit;
        const parsedUrl = queryString.parseUrl(this.apiUrl());
        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query
        });
        return `${parsedUrl.url}?${stringifiedParams}`;
    });

    constructor() {
        effect(() => {
            this.store.dispatch(feedActions.getFeed({
                url: this.apiUrlWithParams()
            }));
        });
    }
}
