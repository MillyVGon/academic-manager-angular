import { Routes } from '@angular/router';
import { GetProject } from './shared/resolvers/get-project';
import { GetProjects } from './shared/resolvers/get-projects';
import { ListActived } from './features/list-actived/list-actived';
import { ListExpired } from './features/list-expired/list-expired';

export const routes: Routes = [
    {
        path: '',
        data: { mode: 'actived' },
        resolve: { projects: GetProjects },
        component: ListActived
    },
    {
        path: 'expirados',
        data: { mode: 'expired' },
        resolve: { projects: GetProjects },
        component: ListExpired
    },
    {
        path: 'criar-projeto',
        loadComponent: () => import('./features/create/create')
            .then((m) => m.Create)
    },
    {
        path: 'editar-projeto/:id',
        resolve: { project: GetProject },
        loadComponent: () => import('./features/edit/edit')
            .then((m) => m.Edit)
    }
];
