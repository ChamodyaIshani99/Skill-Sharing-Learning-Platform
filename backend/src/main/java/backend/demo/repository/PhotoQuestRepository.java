package com.photohub.repository;

import com.photohub.model.PhotoQuest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PhotoQuestRepository extends MongoRepository<PhotoQuest, String> {
    List<PhotoQuest> findByStatus(String status);
}