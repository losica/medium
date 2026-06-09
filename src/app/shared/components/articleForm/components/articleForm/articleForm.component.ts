import { Component, effect, inject, input, output } from "@angular/core";
import { ArticleFormValuesInterface } from "../../types/articleFormValues.interface";
import { BackendErrorsInterface } from "../../../../types/backendErrors.interface";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorMessagesComponent } from "../../../errorMessages/errorMessages.component";

@Component({
    selector: 'article-form',
    templateUrl: './articleForm.component.html',
    standalone: true,
    imports: [
        ErrorMessagesComponent,
        ReactiveFormsModule,
    ]
})

export class ArticleFormComponent {
    private fb = inject(FormBuilder);

    initialValues = input<ArticleFormValuesInterface>();
    isSubmitting = input<boolean>(false);
    errors = input<BackendErrorsInterface | null>(null);

    articleSubmit = output<ArticleFormValuesInterface>();

    form = this.fb.nonNullable.group({
        title: ["", [Validators.required]],
        description: ["", [Validators.required]],
        body: ["", [Validators.required]],
        tagList: [""],
    });

    get titleInvalid(): boolean {
        const control = this.form.get('title');
        return !!(control?.invalid && control?.touched);
    }

    get descriptionInvalid(): boolean {
        const control = this.form.get('description');
        return !!(control?.invalid && control?.touched);
    }

    get bodyInvalid(): boolean {
        const control = this.form.get('body');
        return !!(control?.invalid && control?.touched);
    }

    constructor() {
        effect(() => {
            const initialValues = this.initialValues();
            if (!initialValues) return;
            this.initializeForm(initialValues);
        });
    }

    private initializeForm(initialFormValues: ArticleFormValuesInterface): void {
        this.form.patchValue({
            title: initialFormValues.title,
            description: initialFormValues.description,
            body: initialFormValues.body,
            tagList: initialFormValues.tagList.join(' '),
        })
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const formValue = this.form.getRawValue();
        const articleFormValues: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' ')
        };
        this.articleSubmit.emit(articleFormValues);
    }
}