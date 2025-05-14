package com.photohub.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    private String name;
    private String email;
    private String profilePic;

    private String role = "USER"; // Default: USER

    private List<String> followers = new ArrayList<>();
    private List<String> following = new ArrayList<>();
}
