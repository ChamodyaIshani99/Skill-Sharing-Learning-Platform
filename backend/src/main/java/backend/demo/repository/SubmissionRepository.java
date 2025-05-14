package com.photohub.repository;

import com.photohub.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    List<Submission> findByUserId(String userId);
    List<Submission> findByPhotoQuestId(String photoQuestId);
    List<Submission> findByPhotoQuestIdOrderByLikesDesc(String photoQuestId);
}