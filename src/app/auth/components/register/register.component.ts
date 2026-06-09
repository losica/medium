import { Component, inject } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { ErrorMessagesComponent } from "../../../shared/components/errorMessages/errorMessages.component";

@Component({
    selector: "register",
    templateUrl: "./register.component.html",
    standalone: true,
    imports: [
        ErrorMessagesComponent,
        ReactiveFormsModule, 
        RouterLink, 
    ]
})

export class RegisterComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    
    isSubmitting = this.store.selectSignal(selectIsSubmitting);
    validationErrors = this.store.selectSignal(selectValidationErrors);

    form = this.fb.nonNullable.group({
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
    });

    get usernameInvalid(): boolean {
        const control = this.form.get('username');
        return !!(control?.invalid && control?.touched);
    }

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
        const request: RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.register({ request }));
    }
}
