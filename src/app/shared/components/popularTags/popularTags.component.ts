import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { popularTagsActions } from "./store/actions";
import { selectError, selectIsLoading, selectPopularTagsData } from "./store/reducers";
import { LoadingComponent } from "../loading/loading.component";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'popular-tags',
    templateUrl: './popularTags.component.html',
    standalone: true,
    imports: [
        ErrorMessageComponent,
        LoadingComponent,
        RouterLink,
    ]
})

export class PopularTagsComponent {
    private store = inject(Store);

    isLoading = this.store.selectSignal(selectIsLoading);
    error = this.store.selectSignal(selectError);
    popularTags = this.store.selectSignal(selectPopularTagsData);

    constructor() {
        this.store.dispatch(popularTagsActions.getPopularTags());
    }

}