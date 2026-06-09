import { Component, computed, effect, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { userProfileActions } from "../store/actions";
import { selectError, selectIsLoading, selectUserProfileData } from "../store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { FeedComponent } from "../../shared/components/feed/feed.component";
import { ProfileImageComponent } from "../../shared/components/profileImage/profileImage.component";

@Component({
    selector: 'user-profile',
    templateUrl: './userProfile.component.html',
    standalone: true,
    imports: [
        FeedComponent,
        ProfileImageComponent,
        RouterLink,
        RouterLinkActive,
    ]
})

export class UserProfileComponent {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    slug = this.route.snapshot.paramMap.get('slug') ?? '';
    isLoading = this.store.selectSignal(selectIsLoading);
    error = this.store.selectSignal(selectError);
    userProfile = this.store.selectSignal(selectUserProfileData);
    currentUser = this.store.selectSignal(selectCurrentUser);
    
    isCurrentUser = computed(() => (this.currentUser() && this.userProfile()) ? this.currentUser()?.username === this.userProfile()?.username : false);

    constructor() {
        effect(() => {
            this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
        });
    }

    getApiUrl(): string {
        const isFavorites = this.router.url.includes('favorites');
        return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`
    }
}