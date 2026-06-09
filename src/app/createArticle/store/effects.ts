import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CreateArticleService } from "../services/createArticle.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { createArticleActions } from "./actions";
import { ArticleResponseInterface } from "../../shared/types/articleReponse.interface";
import { Router } from "@angular/router";
import { ArticleInterface } from "../../shared/types/article.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const createArticleEffect = createEffect((
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService),
) => {
    return actions$.pipe(
        ofType(createArticleActions.createArticle),
        switchMap(({ request }) => {
            return createArticleService.createArticle(request).pipe(
                map((article: ArticleInterface) => {
                    return createArticleActions.createArticleSuccess({ article });
                }),
                catchError((errorResponse: HttpErrorResponse) => of(createArticleActions.createArticleFailure({ errors: errorResponse.error.errors })))
            )
        })
    )
}, { functional: true });

export const redirectAfterCreateArticleEffect = createEffect((
    actions$ = inject(Actions), 
    router = inject(Router)
) => {
    return actions$.pipe(
        ofType(createArticleActions.createArticleSuccess),
        tap(({article}) => {
            router.navigate(['/articles', article.slug]);
        })
    )
}, { functional: true, dispatch: false });