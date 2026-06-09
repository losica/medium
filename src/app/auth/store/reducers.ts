import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        // Register
        on(authActions.register, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })),

        on(authActions.registerSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
        })),

        on(authActions.registerFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })),

        // Login
        on(authActions.login, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })),

        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
        })),

        on(authActions.loginFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })),

        // Get current user
        on(authActions.getCurrentUser, (state) => ({
            ...state,
            isLoading: true,
        })),

        on(authActions.getCurrentUserSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.currentUser,
        })),

        on(authActions.getCurrentUserFailure, (state) => ({
            ...state,
            isLoading: false,
            currentUser: null,
        })),

        // Update User
        on(authActions.updateCurrentUserSuccess, (state, action) => ({
            ...state,
            currentUser: action.currentUser,
            validationErrors: null,
        })),


        //  Logout
        on(authActions.logout, (state) => ({
            ...state,
            ...initialState,
            currentUser: null,
        })),

        // Navigation change
        on(routerNavigationAction, (state) => ({
            ...state,
            validationErrors: null
        })),
    )
});

export const { 
    name: authFeatureKey, 
    reducer: authReducer, 
    selectIsSubmitting,
    selectCurrentUser,
    selectIsLoading,
    selectValidationErrors,
} = authFeature;