import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importamos FormsModule
import { provideRouter } from '@angular/router'; // Importamos provideRouter
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([]) // Para agregar interceptores si es necesario
    ),
    FormsModule, // Añadimos FormsModule aquí para que esté disponible en toda la aplicación
    provideRouter([
      { path: '', component: DashboardComponent }, // Ruta por defecto: Dashboard
      { path: 'register', component: RegisterComponent }, // Ruta para registro
      { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard
      { path: 'login', component: LoginComponent }, // Ruta para login
    ]),
  ],
};