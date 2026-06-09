import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { popularTagsActions } from "./actions";
import { PopularTagService } from "../services/popularTag.service";
import { PopularTagType } from "../../../types/popularTag.type";

export const getPopularTagsEffect = createEffect((
    actions$ = inject(Actions),
    popularTagService = inject(PopularTagService),
) => {
    return actions$.pipe(
        ofType(popularTagsActions.getPopularTags),
        switchMap(() => {
            return popularTagService.getPopularTags().pipe(
                map((popularTags: PopularTagType[]) => {
                    return popularTagsActions.getPopularTagsSuccess({ popularTags });
                }),
                catchError(() => of(popularTagsActions.getPopularTagsFailure()))
            )
        })
    )
}, { functional: true });