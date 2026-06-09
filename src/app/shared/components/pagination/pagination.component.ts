import { Component, computed, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { UtilsService } from "../../services/utils.service";

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    standalone: true,
    imports: [RouterLink]
})

export class Pagination {

    utilsService = inject(UtilsService)

    total = input<number>(0);
    limit = input<number>(20);
    url = input<string>('');
    currentPage = input<number>(1);

    pagesCount = computed(() => Math.ceil(this.total() / this.limit()));

    test = this.utilsService.range(1, this.pagesCount());
    pages = computed(() =>
        this.pagesCount() > 0 ? this.utilsService.range(1, this.pagesCount()) : []
    );
}