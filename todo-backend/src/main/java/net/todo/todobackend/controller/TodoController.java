package net.todo.todobackend.controller;

import lombok.AllArgsConstructor;
import net.todo.todobackend.dto.TodoDto;
import net.todo.todobackend.entity.Todo;
import net.todo.todobackend.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private TodoService todoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
        TodoDto savedTodo = todoService.addTodo(todoDto);

        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable(name = "id") Long todoId){
        TodoDto todoDto = todoService.getTodoById(todoId);
        return ResponseEntity.ok(todoDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/all")
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        List<TodoDto> todosDto = todoService.getAllTodos();
        return ResponseEntity.ok(todosDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodoById(@PathVariable(name = "id") Long todoId, @RequestBody TodoDto todoDto){
        TodoDto savedTodo = todoService.updateTodo(todoId, todoDto);
        return ResponseEntity.ok(savedTodo);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoById(@PathVariable(name = "id") Long todoId){
        todoService.deleteTodo(todoId);
        return ResponseEntity.ok("Todo is deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TodoDto> completeTodoById(@PathVariable(name = "id") Long todoId){
        TodoDto updatedTodo = todoService.completeTodo(todoId);
        return new ResponseEntity<>(updatedTodo, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/incomplete")
    public ResponseEntity<TodoDto> inCompleteTodoById(@PathVariable(name = "id") Long todoId){
        TodoDto updatedTodo = todoService.inCompleteTodo(todoId);
        return new ResponseEntity<>(updatedTodo, HttpStatus.ACCEPTED);
    }

}
