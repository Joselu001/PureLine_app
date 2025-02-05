package com.cgi.loginapp.controller;

import com.cgi.loginapp.model.User;
import com.cgi.loginapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cgi.loginapp.exception.EmailAlreadyExistsException;
import com.cgi.loginapp.exception.UsernameAlreadyExistsException;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:4200") // Permitir solicitudes del frontend Angular
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    // Endpoint para registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        
        logger.info("Intentando registrar usuario: {}", user.getUsername());
        // Declara el Map dentro del método
        Map<String, String> response = new HashMap<>();
    
        try {
            // Llamar al servicio para registrar al usuario
            userService.registerUser(user);
            logger.info("Usuario registrado exitosamente - Username: {}, Email: {}", user.getUsername(), user.getEmail());
            response.put("message", "Success");
            response.put("status", "success");
            // Devuelve el Map como cuerpo de la respuesta (se serializará a JSON automáticamente)
            return ResponseEntity.ok(response);
        } catch (EmailAlreadyExistsException e) {
            // Captura la excepción si el email ya está registrado
            logger.error("Error al registrar usuario - Email: {} ya existe: {}", user.getUsername(), user.getEmail());
            response.put("message", "Mail already exists");
            response.put("status", "error_mail");
            // Devuelve el Map como cuerpo de la respuesta de error
            return ResponseEntity.badRequest().body(response);
        } catch (UsernameAlreadyExistsException e) {
            logger.error("Error al registrar usuario - Username: {} ya existe: {}", user.getUsername(), user.getEmail());
            // Captura la excepción si el nombre de usuario ya está registrado
            response.put("message", "User already exists");
            response.put("status", "error_user");
            // Devuelve el Map como cuerpo de la respuesta de error
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Captura cualquier otra excepción genérica
            logger.error("Error al registrar usuario - Username: {}, Email: {}", user.getUsername(), user.getEmail(), e);
            response.put("message", "Error al registrar el usuario");
            response.put("status", "error");
            // Devuelve el Map como cuerpo de la respuesta de error
            return ResponseEntity.badRequest().body(response);
        }
    }
    

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        logger.info("Intentando iniciar sesión: {}", user.getUsername());

        User existingUser = userService.findByUsername(user.getUsername());
        
        Map<String, String> response = new HashMap<>();
        
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            logger.info("Inicio de sesión exitoso para usuario: {}", user.getUsername());
            // Crear una respuesta JSON con status 'success'
            response.put("message", "Success");
            response.put("status", "success");
            return ResponseEntity.ok(response); // Responde con JSON
        } else {
            logger.warn("Fallo en el inicio de sesión para usuario: {}", user.getUsername());
            // Crear una respuesta JSON con status 'error'
            response.put("message", "Not Success");
            response.put("status", "error");
            return ResponseEntity.status(401).body(response); // Responde con JSON y código 401
        }
    }
}