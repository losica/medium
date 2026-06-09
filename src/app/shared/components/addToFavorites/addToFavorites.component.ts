import { Component, effect, inject, input, signal } from "@angular/core";
import { AddToFavoritesService } from "./services/addToFavorites.service";
import { Store } from "@ngrx/store";
import { addToFavoritesActions } from "./store/actions";

@Component({
    selector: 'add-to-favorites',
    templateUrl: './addToFavorites.component.html',
    standalone: true,
})
export class AddToFavoritesComponent {
    private store = inject(Store);

    isFavorited = input<boolean>(false);
    articleSlug = input<string>('');
    favoritesCount = input<number>(0);

    localIsFavorited = signal(false);
    localFavoritesCount = signal(0);

    constructor() {
        effect(() => {
            this.localIsFavorited.set(this.isFavorited());
            this.localFavoritesCount.set(this.favoritesCount());
        });
    }

    handleLike(): void {
        this.store.dispatch(addToFavoritesActions.addToFavorites({
            isFavorited: this.isFavorited(), 
            slug:this.articleSlug()
        }));
        if (this.localIsFavorited()) {
            this.localFavoritesCount.update(val => val - 1 );
        } else {
            this.localFavoritesCount.update(val => val + 1 );
        }
        this.localIsFavorited.update(val => !val);
    }
}