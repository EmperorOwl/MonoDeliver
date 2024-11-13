import { Routes } from '@angular/router';

import { AuthGuard } from './auth/guard.guard';
import { IndexComponent } from './misc/index/index.component';
import { AuthComponent } from './auth/auth.component';
import { ListDriversComponent } from './driver/list-drivers/list-drivers.component';
import { ListPackagesComponent } from './package/list-packages/list-packages.component';
import { StatsComponent } from './stats/stats.component';
import { BadRequestComponent } from './misc/bad-request/bad-request.component';
import { NotFoundComponent } from './misc/not-found/not-found.component';


export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'drivers', component: ListDriversComponent, canActivate: [AuthGuard] },
  { path: 'packages', component: ListPackagesComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
  { path: '400', component: BadRequestComponent },
  { path: '**', component: NotFoundComponent },
];
