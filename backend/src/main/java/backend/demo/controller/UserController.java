package com.photohub.controller;

import com.photohub.model.User;
import com.photohub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(service.create(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id).orElseThrow());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(service.update(id, user));
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<?> follow(@PathVariable String id, @RequestParam String targetId) {
        service.follow(id, targetId);
        return ResponseEntity.ok("Followed successfully");
    }
}
