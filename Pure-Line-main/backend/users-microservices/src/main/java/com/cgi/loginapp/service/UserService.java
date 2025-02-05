package com.cgi.loginapp.service;

import com.cgi.loginapp.exception.EmailAlreadyExistsException;
import com.cgi.loginapp.exception.UsernameAlreadyExistsException;
import com.cgi.loginapp.model.User;
import com.cgi.loginapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) throws Exception {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("El correo electrónico ya está registrado");
        }
    
        // Verificar si ya existe un usuario con el mismo nombre de usuario
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyExistsException("El nombre de usuario ya está registrado");
        }
    
        // Si no existe ninguno, guarda el usuario en la base de datos
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}