import { createFeature, createReducer, on } from "@ngrx/store";
import { routerNavigationAction } from "@ngrx/router-store";
import { UserProfileStateInterface } from "../types/userProfileState.interface";
import { userProfileActions } from "./actions";

const initialState: UserProfileStateInterface = {
    isLoading: false,
    error: null,
    data: null,
}

const userProfileFeature = createFeature({
    name: 'userProfile',
    reducer: createReducer(
        initialState,
        on(userProfileActions.getUserProfile, (state) => ({...state, isLoading: true})),
        on(userProfileActions.getUserProfileSuccess, (state, action) => ({...state, isLoading: false, error:null, data: action.userProfile})),
        on(userProfileActions.getUserProfileFailure, (state) => ({...state, isLoading: false})),

        // Navigation change
        on(routerNavigationAction, () => initialState)),
})

export const {
    name: userProfileFeatureKey,
    reducer: userProfileReducer,
    selectIsLoading,
    selectError,
    selectData: selectUserProfileData,
} = userProfileFeature;