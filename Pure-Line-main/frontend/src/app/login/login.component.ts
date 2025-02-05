import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa el servicio Router
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from '../auth.service'; // Asegúrate de que el servicio esté configurado
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas como *ngIf o *ngFor
import { HttpResponse } from '@angular/common/http'; // Importa HttpResponse
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el binding de datos

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Añade CommonModule a los imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = ''; // Para manejar errores
  successMessage: string = ''; // Para manejar mensajes de éxito

  constructor(private authService: AuthService, private router: Router) {} //Inyectamos Router

  // Método login usando las referencias locales en el HTML
  login(username: string, password: string) {
    const user = { username, password };

    this.authService.login(user).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Respuesta completa:', response); // Ver la respuesta completa
        console.log('Headers:', response.headers); // Aquí puedes acceder a los headers

        if (response.body && response.body.status === 'success') {
          this.successMessage = 'Bienvenido!'; // Mensaje de éxito
          this.errorMessage = ''; // Limpia el mensaje de error (si hubiera)
  
          // Redirige al URL proporcionado por el backend
          const redirectUrl = response.body.redirectUrl || '/dashboard'; // Usar '/dashboard' como predeterminado
          
          // Usa navigateByUrl para asegurar una correcta navegación
          setTimeout(() => {
            this.router.navigateByUrl(redirectUrl); // Redirige al dashboard u otro destino
          }, 2000); // Después de dos segundos
        }
      },
      
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos'; // Mensaje de error
        console.error('Falló el login', error);
      }
    });
  }
}