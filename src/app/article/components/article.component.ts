import { Component, computed, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { articleActions } from "../store/actions";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { selectArticleData, selectError, selectIsLoading } from "../store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorMessageComponent } from "../../shared/components/errorMessage/errorMessage.component";
import { TagListComponent } from "../../shared/components/tagList/tagList.component";
import { ProfileImageComponent } from "../../shared/components/profileImage/profileImage.component";
import { formatDate } from "../../shared/utils/date.utils";

@Component({
    selector: "article",
    templateUrl: "./article.component.html",
    standalone: true,
    imports: [
        ErrorMessageComponent,
        LoadingComponent,
        ProfileImageComponent,
        RouterLink,
        TagListComponent,
    ]
})

export class ArticleComponent {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    isLoading = this.store.selectSignal(selectIsLoading);
    error = this.store.selectSignal(selectError);
    article = this.store.selectSignal(selectArticleData);
    currentUser = this.store.selectSignal(selectCurrentUser);

    formatDate = formatDate;

    isAuthor = computed(() => (this.currentUser() && this.article()) ? this.currentUser()?.username === this.article()?.author.username : false);

    slug = this.route.snapshot.paramMap.get('slug') ?? '';

    constructor() {
        this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
    }

    deleteArticle(): void {
        this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
    }

}
