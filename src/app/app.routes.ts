import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    // Home
    {
        path: '',
        loadChildren: () => import('./globalFeed/globalFeed.routes').then(m => m.routes)
    },

    // Your feed
    {
        path: 'feed',
        loadChildren: () => import('./yourFeed/yourFeed.routes').then(m => m.routes)
    },

    // Tag feed
    {
        path: 'tags/:slug',
        loadChildren: () => import('./tagFeed/tagFeed.routes').then(m => m.routes)
    },

    // Auth
    {
        path: 'register',
        loadChildren: () => import('./auth/auth.routes').then(m => m.registerRoutes)
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes').then(m => m.loginRoutes)
    },

    // Article
    {
        path: 'articles/new',
        loadChildren: () => import('./createArticle/createArticle.routes').then(m => m.routes)
    },

    {
        path: 'articles/:slug',
        loadChildren: () => import('./article/article.routes').then(m => m.routes)
    },

    {
        path: 'articles/:slug/edit',
        loadChildren: () => import('./editArticle/editArticle.routes').then(m => m.routes)
    },

    // Settings
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.routes').then(m => m.routes)
    },

    // User Profile
    {
        path: 'profiles/:slug',
        loadChildren: () => import('./userProfile/userProfile.routes').then(m => m.routes)
    },
    {
        path: 'profiles/:slug/favorites',
        loadChildren: () => import('./userProfile/userProfile.routes').then(m => m.routes)
    },
];
