import { Component, inject } from "@angular/core";
import { ArticleFormValuesInterface } from "../../../shared/components/articleForm/types/articleFormValues.interface";
import { ArticleFormComponent } from "../../../shared/components/articleForm/components/articleForm/articleForm.component";
import { Store } from "@ngrx/store";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { ArticleRequestInterface } from "../../../shared/types/articleRequest.interface";
import { createArticleActions } from "../../store/actions";

@Component({
    selector: 'create-article',
    templateUrl: './createArticle.component.html',
    standalone: true,
    imports: [
        ArticleFormComponent,
    ]
})

export class CreateArticleComponent {
    private store = inject(Store);

    isSubmitting = this.store.selectSignal(selectIsSubmitting);
    validationErrors = this.store.selectSignal(selectValidationErrors);
    
    initialValues = {
        title: "",
        description: "",
        body: "",
        tagList: [],
    }

    onSubmit(articleFormValues: ArticleFormValuesInterface): void {
        const request: ArticleRequestInterface = {
            article: articleFormValues
        }
        this.store.dispatch(createArticleActions.createArticle({request}))
    }
}