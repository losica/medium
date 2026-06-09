import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../shared/types/article.interface";
import { UserProfileInterface } from "../types/userProfile.interface";

export const userProfileActions = createActionGroup({
    source: 'user profile',
    events: {
        'Get user profile': props<{slug: string}>(),
        'Get user profile success': props<{userProfile: UserProfileInterface}>(),
        'Get user profile failure': emptyProps(),
    }
})