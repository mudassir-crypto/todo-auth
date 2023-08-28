package net.todo.todobackend.service;

import net.todo.todobackend.dto.LoginDto;
import net.todo.todobackend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
}
