import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { RouterLink } from "@angular/router";
import { ProfileImageComponent } from "../profileImage/profileImage.component";

@Component({
    selector: "top-bar",
    templateUrl: "./topBar.component.html",
    standalone: true,
    imports: [
        ProfileImageComponent,
        RouterLink,
    ]
})

export class TopBarComponent {
    private store = inject(Store);
    currentUser = this.store.selectSignal(selectCurrentUser);
}