import { Routes } from '@angular/router';
import { GetProject } from './shared/resolvers/get-project';
import { GetProjects } from './shared/resolvers/get-projects';
import { ListActive } from './features/list-active/list-active';
import { ListExpired } from './features/list-expired/list-expired';

export const routes: Routes = [
    {
        path: '',
        data: { mode: 'active' },
        resolve: { projects: GetProjects },
        component: ListActive
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
