import { Component, computed, input } from "@angular/core";

@Component({
    selector: 'error-message',
    template: '<div>{{ displayMessage() }}<div>',
    standalone: true,
})

export class ErrorMessageComponent {
    message = input<string | null>(null);
    displayMessage = computed(() => this.message() ?? 'Something went wrong');
}