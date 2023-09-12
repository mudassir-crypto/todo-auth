package net.todo.todobackend.service.impl;

import lombok.AllArgsConstructor;
import net.todo.todobackend.dto.LoginDto;
import net.todo.todobackend.dto.RegisterDto;
import net.todo.todobackend.entity.Role;
import net.todo.todobackend.entity.User;
import net.todo.todobackend.exception.TodoAPIException;
import net.todo.todobackend.repository.RoleRepository;
import net.todo.todobackend.repository.UserRespository;
import net.todo.todobackend.security.JwtTokenProvider;
import net.todo.todobackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRespository userRespository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {
        if(userRespository.existsByUsername(registerDto.getUsername())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        if(userRespository.existsByEmail(registerDto.getEmail())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);

        user.setRoles(roles);
        userRespository.save(user);

        return "User registered successfully";
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));
        System.out.println(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        //applying jwt
        String token = jwtTokenProvider.generateToken(authentication);
        
        return token;
    }
}
