import { Component, computed, input, Input } from "@angular/core";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";

@Component({
    selector: 'error-messages',
    templateUrl: './errorMessages.component.html',
    standalone: true
})

export class ErrorMessagesComponent {
    errors = input<BackendErrorsInterface>({});

    errorMessages = computed(() =>
        Object.keys(this.errors()).map((name: string) => {
            const messages = this.errors()[name].join(' ');
            return `${name} ${messages}`;
        })
    );
}