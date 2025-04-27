package backend.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "LearningPlans")
public class LearningPlan {
    @Id
    private String id;

    private String userId;
    private String title;
    private String description;

    private List<Topic> topics;
    

    private Date startDate;
    private Date endDate;

    private Date createdAt = new Date();
}
