import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Ruta por defecto a la pagina main
  { path: 'login', component: LoginComponent }, //Ruta para login
  { path: 'dashboard', component: DashboardComponent }, //Ruta para dashboard
  { path: 'register', component: RegisterComponent }, //Ruta para register

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}