import { Component, effect, inject } from "@angular/core";
import { ErrorMessagesComponent } from "../../../shared/components/errorMessages/errorMessages.component";
import { Store } from "@ngrx/store";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { authActions } from "../../../auth/store/actions";
import { CurrentUserRequestInterface } from "../../../shared/types/currentUserRequest.interface";

@Component({
    selector: "settings",
    templateUrl: "./settings.component.html",
    standalone: true,
    imports: [
        ErrorMessagesComponent,
        ReactiveFormsModule,
    ]
})
export class SettingsComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    isSubmitting = this.store.selectSignal(selectIsSubmitting);
    validationErrors = this.store.selectSignal(selectValidationErrors);
    currentUser = this.store.selectSignal(selectCurrentUser);

    form = this.fb.nonNullable.group({
        image: [""],
        username: ["", [Validators.required]],
        bio: [""],
        email: [{ value: "", disabled: true }, [Validators.required, Validators.email]],
        password: [""],
    });

    get usernameInvalid(): boolean {
        const control = this.form.get('username');
        return !!(control?.invalid && control?.touched);
    }


    constructor() {
        effect(() => {
            const userData = this.currentUser();
            if (!userData) return;
            this.initializeForm(userData);
        });
    }

    private initializeForm(userData: CurrentUserInterface): void {
        this.form.patchValue({
            image: userData.image ?? '',
            username: userData.username,
            bio: userData.bio ?? '',
            email: userData.email,
            password: ''
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const userData = this.currentUser();
        if (!userData) {
            throw new Error('Current user is not set');
        }
        const currentUserRequest: CurrentUserRequestInterface = {
            user: {
                ...userData,
                ...this.form.getRawValue(),
            }
        };
        this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
    }

    logout(): void {
        this.store.dispatch(authActions.logout());
    }
}