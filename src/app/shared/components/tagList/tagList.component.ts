import { Component, input } from "@angular/core";
import type { PopularTagType } from "../../types/popularTag.type";

@Component({
    selector: 'tag-list',
    templateUrl: './tagList.component.html',
    standalone: true,
})

export class TagListComponent {
    tags = input<PopularTagType[]>([])
}