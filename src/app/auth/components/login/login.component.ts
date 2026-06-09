import { Component, inject } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { RouterLink } from "@angular/router";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { ErrorMessagesComponent } from "../../../shared/components/errorMessages/errorMessages.component";
import { LoginRequestInterface } from "../../types/loginRequest.interface";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, ErrorMessagesComponent]
})

export class LoginComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    
    isSubmitting = this.store.selectSignal(selectIsSubmitting);
    validationErrors = this.store.selectSignal(selectValidationErrors);

    form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ["", Validators.required],
    });

    get emailInvalid(): boolean {
        const control = this.form.get('email');
        return !!(control?.invalid && control?.touched);
    }

    get passwordInvalid(): boolean {
        const control = this.form.get('password');
        return !!(control?.invalid && control?.touched);
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const request: LoginRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.login({ request }));
    }
}
