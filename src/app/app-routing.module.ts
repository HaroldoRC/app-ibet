import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    // hasCustomClaim,
    redirectUnauthorizedTo,
    redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
// import { AuthGuard } from './auth/auth.guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToCultos = redirectLoggedInTo(['cultos']);
// const adminOnly = hasCustomClaim('admin');
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
        ...canActivate(redirectLoggedInToCultos)
    },
    {
        path: 'cultos',
        loadChildren: () => import('./pages/culto/culto.module').then(m => m.CultoPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
