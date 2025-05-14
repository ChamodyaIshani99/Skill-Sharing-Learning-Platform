package com.photohub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "photoquests")
public class PhotoQuest {
    @Id
    private String id;
    private String title;
    private String description;
    private String status; // "ONGOING" or "COMPLETED"
    private String winnerUserId;
    private String winnerSubmissionId;
    private Date deadline;
}