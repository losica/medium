import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { authActions } from "./actions";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "../../shared/services/persistence.service";
import { Router } from "@angular/router";
import { STORAGE_KEYS } from "../../shared/constants/storage.constants";

export const getCurrentUserEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistenceService)
) => {
    return actions$.pipe(
        ofType(authActions.getCurrentUser),
        switchMap(() => {
            const token = persistanceService.get(STORAGE_KEYS.ACCESS_TOKEN);
            if (!token) {
                return of(authActions.getCurrentUserFailure())
            }
            return authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.getCurrentUserSuccess({ currentUser });
                }),
                catchError(() => of(authActions.getCurrentUserFailure()))
            )
        })
    )
}, { functional: true });

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistenceService)
) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService.set(STORAGE_KEYS.ACCESS_TOKEN, currentUser.token);
                    return authActions.registerSuccess({ currentUser });
                }),
                catchError((errorResponse: HttpErrorResponse) => of(authActions.registerFailure({ errors: errorResponse.error.errors })))
            )
        })
    )
}, { functional: true });

export const redirectAfterRegisterEffect = createEffect((
    actions$ = inject(Actions), 
    router = inject(Router)
) => {
    return actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
            router.navigateByUrl('/');
        })
    )
}, { functional: true, dispatch: false });

export const loginEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistenceService)
) => {
    return actions$.pipe(
        ofType(authActions.login),
        switchMap(({ request }) => {
            return authService.login(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService.set(STORAGE_KEYS.ACCESS_TOKEN, currentUser.token);
                    return authActions.loginSuccess({ currentUser });
                }),
                catchError((errorResponse: HttpErrorResponse) => of(authActions.loginFailure({ errors: errorResponse.error.errors })))
            )
        })
    )
}, { functional: true });

export const redirectAfterLoginEffect = createEffect((
    actions$ = inject(Actions), 
    router = inject(Router)
) => {
    return actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
            router.navigateByUrl('/');
        })
    )
}, { functional: true, dispatch: false });

export const updateCurrentUserEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
) => {
    return actions$.pipe(
        ofType(authActions.updateCurrentUser),
        switchMap(({currentUserRequest}) => {
            return authService.updateCurrentUser(currentUserRequest).pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.updateCurrentUserSuccess({ currentUser });
                }),
                catchError((errorResponse: HttpErrorResponse) => of(authActions.updateCurrentUserFailure({ errors: errorResponse.error.errors })))
            )
        })
    )
}, { functional: true });

export const logoutEffect = createEffect((
        actions$ = inject(Actions),
        router = inject(Router),
        persistanceService = inject(PersistenceService)
    )  => {
        return actions$.pipe(
            ofType(authActions.logout),
            tap(() => {
                persistanceService.set(STORAGE_KEYS.ACCESS_TOKEN, '');
                router.navigateByUrl('/');
            })
        )
    }, { functional: true, dispatch: false });