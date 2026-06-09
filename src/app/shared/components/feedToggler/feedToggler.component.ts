import { Component, inject, input } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'feed-toggler',
    templateUrl: './feedToggler.component.html',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
    ]
})
export class FeedTogglerComponent {
    private store = inject(Store);

    tagName = input<string>();
    currentUser = this.store.selectSignal(selectCurrentUser);
}