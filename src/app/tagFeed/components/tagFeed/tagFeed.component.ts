import { Component, inject } from "@angular/core";
import { FeedComponent } from "../../../shared/components/feed/feed.component";
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { PopularTagsComponent } from "../../../shared/components/popularTags/popularTags.component";
import { FeedTogglerComponent } from "../../../shared/components/feedToggler/feedToggler.component";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'tag-feed',
    templateUrl: './tagFeed.component.html',
    standalone: true,
    imports: [
        BannerComponent,
        FeedComponent,
        FeedTogglerComponent,
        PopularTagsComponent,
    ]
})

export class TagFeedComponent {
    apiUrl: string = '';
    tagName: string = '';

    private route = inject(ActivatedRoute)

    constructor() {
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug'];
            this.apiUrl = `/articles?tag=${this.tagName}`
        })
    }
}