import { Component, inject } from "@angular/core";
import { ArticleFormValuesInterface } from "../../../shared/components/articleForm/types/articleFormValues.interface";
import { ArticleFormComponent } from "../../../shared/components/articleForm/components/articleForm/articleForm.component";
import { Store } from "@ngrx/store";
import { selectIsSubmitting, selectValidationErrors, selectIsLoading, selectArticle } from "../../store/reducers";
import { ArticleRequestInterface } from "../../../shared/types/articleRequest.interface";
import { editArticleActions } from "../../store/actions";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'edit-article',
    templateUrl: './editArticle.component.html',
    standalone: true,
    imports: [
        ArticleFormComponent,
        LoadingComponent,
    ]
})

export class EditArticleComponent {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    slug = this.route.snapshot.paramMap.get('slug') ?? '';

    isSubmitting = this.store.selectSignal(selectIsSubmitting);
    isLoading = this.store.selectSignal(selectIsLoading);
    validationErrors = this.store.selectSignal(selectValidationErrors);
    
    initialValues = toSignal(
        this.store.select(selectArticle).pipe(
            filter((article): article is ArticleInterface => article !== null),
            map((article: ArticleInterface) => ({
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
            }))
        )
    );

    constructor() {
        this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }))
    }

    onSubmit(articleFormValues: ArticleFormValuesInterface): void {
        const request: ArticleRequestInterface = {
            article: articleFormValues
        }
        this.store.dispatch(editArticleActions.updateArticle({request, slug: this.slug}))
    }
}