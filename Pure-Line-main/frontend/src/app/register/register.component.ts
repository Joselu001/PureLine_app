import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  passwordStrength: number = 0; // Nueva variable para nivel de seguridad de la contraseña
  strengthMessage: string = ''; // Nueva variable para mensaje de nivel de seguridad de la contraseña
  strengthBarWidth: number = 0; // Para la visualización de la barra de fuerza

  constructor(private authService: AuthService, private router: Router) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Alternar visibilidad de la confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Función que se ejecuta cuando cambia la contraseña 
  onPasswordInput() {
    // Actualizamos la seguridad de la contraseña
    this.passwordStrength = this.calculatePasswordStrength(this.password);
    this.strengthMessage = this.getStrengthMessage(this.passwordStrength);
    this.strengthBarWidth = this.passwordStrength;
  }

  // Funcion para calcular la seguridad de la contraseña
  calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[@$!%*?&]/.test(password)) strength += 20;

    return strength; // Retorna un valor entre 0 y 100
  }

  // Función para devolver el mensaje dependiendo del valor de 'passwordStrength'
  getStrengthMessage(strength: number): string {
    if (strength < 40) return 'Débil';
    if (strength < 70) return 'Aceptable';
    return 'Fuerte';
  }

  // Enviar el formulario al backend
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.passwordStrength < 60) {
      this.errorMessage = 'La contraseña es demasiado débil. Usa mayúsculas, minúsculas, números y caracteres especiales.';
      return;
    }
  
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  
    this.authService.register(userData).subscribe(
      (response) => {
        // Si la respuesta del backend es "success"
        if (response.status === 'success') {
          this.successMessage = 'Usuario registrado con éxito.';
          this.errorMessage = '';
          // Redirige al usuario al login
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        // Manejo de errores basados en el "status" devuelto por el backend
        const status = error.error?.status; // Extraer el "status" del JSON de error
        switch (status) {
          case 'error_mail':
            this.errorMessage = 'El correo electrónico ya está en uso.';
            break;
          case 'error_user':
            this.errorMessage = 'El nombre de usuario ya está en uso.';
            break;
          default:
            this.errorMessage = 'Ocurrió un error al registrar el usuario.';
        }
        this.successMessage = '';
      }
    );
  }
}
