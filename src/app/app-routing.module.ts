import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { SuperAdminGuard } from './guard/superadmin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './guard/admin.guard';
import { ViewersDevicesComponent } from './viewers-devices/viewers-devices.component';
import { ViewersGuard } from './guard/viewers.guard';
import { ViewerAdminGuard } from './guard/viewer-admin.guard';
import { superAdminAdminGuard } from './guard/super-admin-admin.guard';
import { NotifComponent } from './notif/notif.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashAdminComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard,superAdminAdminGuard] },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'devicesview', component: ViewersDevicesComponent, canActivate: [AuthGuard,ViewersGuard] },
  { path: 'device/detail/:devEUI', component: DetailComponent, canActivate: [AuthGuard,ViewerAdminGuard] },
  { path: 'notif', component: NotifComponent, canActivate: [AuthGuard,ViewerAdminGuard] },
  { path: 'forbidden', component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
