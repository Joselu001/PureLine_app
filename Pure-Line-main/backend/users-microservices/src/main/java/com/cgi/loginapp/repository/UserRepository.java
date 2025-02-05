package com.cgi.loginapp.repository;

import com.cgi.loginapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Método para comprobar si ya existe un usuario con el email proporcionado
    boolean existsByEmail(String email);

    // Método para comprobar si ya existe un usuario con el username proporcionado
    boolean existsByUsername(String username);

        // Método para encontrar un usuario por su username
        User findByUsername(String username);
}