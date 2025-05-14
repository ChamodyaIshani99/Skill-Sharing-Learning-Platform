package com.photohub.controller;

import com.photohub.model.User;
import com.photohub.repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/oauth-success")
public void loginSuccess(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) throws IOException {
    if (principal == null) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        return;
    }

    String email = principal.getAttribute("email");
    String name = principal.getAttribute("name");
    String profilePic = principal.getAttribute("picture");

    User user = userRepo.findByEmail(email).orElseGet(() -> {
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setName(name);
        newUser.setProfilePic(profilePic);
        newUser.setRole("USER");
        return userRepo.save(newUser);
    });

    // ✅ Redirect to frontend with user ID
    response.sendRedirect("http://localhost:5173/oauth-callback?uid=" + user.getId());
}
}
