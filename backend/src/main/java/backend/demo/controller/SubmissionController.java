package com.photohub.controller;

import com.photohub.model.*;
import com.photohub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {
    @Autowired private SubmissionRepository submissionRepo;
    @Autowired private UserRepository userRepo;

    @GetMapping
    public List<Submission> getAllSubmissions() {
        return submissionRepo.findAll();
    }

    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        Submission saved = submissionRepo.save(submission);
        userRepo.findById(submission.getUserId()).ifPresent(user -> {
            user.setTotalSubmissions(user.getTotalSubmissions() + 1);
            userRepo.save(user);
        });
        return saved;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Submission>> getSubmissionsByUser(@PathVariable String userId) {
        return ResponseEntity.ok(submissionRepo.findByUserId(userId));
    }

    @GetMapping("/quest/{photoQuestId}")
    public List<Submission> getSubmissionsByQuest(@PathVariable String photoQuestId) {
        return submissionRepo.findByPhotoQuestId(photoQuestId);
    }

    @GetMapping("/quest/{photoQuestId}/leaderboard")
    public List<Submission> getSubmissionsLeaderboard(@PathVariable String photoQuestId) {
        return submissionRepo.findByPhotoQuestIdOrderByLikesDesc(photoQuestId);
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<Submission> likeSubmission(
            @PathVariable String id,
            @RequestParam String userId) {
        
        Submission submission = submissionRepo.findById(id).orElseThrow();
        
        if (submission.getUserId().equals(userId)) {
            return ResponseEntity.badRequest().body(submission);
        }
        if (submission.getLikedUserIds().contains(userId)) {
            return ResponseEntity.badRequest().body(submission);
        }

        submission.setLikes(submission.getLikes() + 1);
        submission.getLikedUserIds().add(userId);
        submissionRepo.save(submission);
        
        userRepo.findById(submission.getUserId()).ifPresent(user -> {
            user.setTotalLikesReceived(user.getTotalLikesReceived() + 1);
            userRepo.save(user);
        });

        return ResponseEntity.ok(submission);
    }

    @PutMapping("/{id}")
    public Submission updateSubmission(@PathVariable String id, @RequestBody Submission updated) {
        Submission existing = submissionRepo.findById(id).orElseThrow();
        existing.setDescription(updated.getDescription());
        existing.setTechnicalInfo(updated.getTechnicalInfo());
        existing.setImageUrls(updated.getImageUrls());
        return submissionRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubmission(@PathVariable String id) {
        submissionRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}