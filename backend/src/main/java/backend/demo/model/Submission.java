package com.photohub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "submissions")
public class Submission {
    @Id
    private String id;
    private String userId;
    private String photoQuestId;
    private List<String> imageUrls = new ArrayList<>();
    private String description;
    private String technicalInfo;
    private int likes = 0;
    private List<String> likedUserIds = new ArrayList<>();
    private Date submittedAt = new Date();
    private boolean winner = false;
}