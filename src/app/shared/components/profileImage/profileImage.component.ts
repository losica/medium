import { Component, effect, input, signal } from "@angular/core";

@Component({
    selector: 'profile-image',
    templateUrl: './profileImage.component.html',
    standalone: true,
})
export class ProfileImageComponent {
    profileImage = input<string | null>(null);
    customClasses = input<string>('');
    size = input<number>(32);

    imageError = signal(false);

    constructor() {
        effect(() => {
            const url = this.profileImage();
            this.imageError.set(false);

            if (!url) return;

            const img = new Image();
            img.onload = () => this.imageError.set(false);
            img.onerror = () => this.imageError.set(true);
            img.src = url;
        });
    }
}