package com.photohub.controller;

import com.photohub.model.*;
import com.photohub.repository.*;
import com.photohub.service.WinnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/photoquests")
@CrossOrigin(origins = "*")
public class PhotoQuestController {
    @Autowired private PhotoQuestRepository photoQuestRepo;
    @Autowired private SubmissionRepository submissionRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private WinnerService winnerService;

    @PostMapping
    public PhotoQuest createPhotoQuest(@RequestBody PhotoQuest photoQuest) {
        photoQuest.setStatus("ONGOING");
        return photoQuestRepo.save(photoQuest);
    }

    @PutMapping("/{questId}/declare-winner")
    public ResponseEntity<PhotoQuest> declareWinner(
        @PathVariable String questId,
        @RequestParam String submissionId) {
        return ResponseEntity.ok(winnerService.declareWinner(questId, submissionId));
    }

    @GetMapping
    public List<PhotoQuest> getAllPhotoQuests() {
        return photoQuestRepo.findAll();
    }

    @GetMapping("/ongoing")
    public List<PhotoQuest> getOngoingPhotoQuests() {
        return photoQuestRepo.findByStatus("ONGOING");
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoQuest> getPhotoQuestById(@PathVariable String id) {
        return ResponseEntity.ok(photoQuestRepo.findById(id).orElseThrow());
    }

    @GetMapping("/{questId}/analytics")
    public Map<String, Object> getQuestAnalytics(@PathVariable String questId) {
        PhotoQuest quest = photoQuestRepo.findById(questId).orElseThrow();
        List<Submission> submissions = submissionRepo.findByPhotoQuestIdOrderByLikesDesc(questId);
        
        List<Map<String, Object>> enrichedSubmissions = new ArrayList<>();
        for (Submission sub : submissions) {
            User user = userRepo.findById(sub.getUserId()).orElseThrow();
            enrichedSubmissions.add(Map.of(
                "submission", sub,
                "user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "profilePic", user.getProfilePic()
                )
            ));
        }
        
        return Map.of(
            "quest", quest,
            "totalSubmissions", submissions.size(),
            "submissions", enrichedSubmissions,
            "winner", quest.getWinnerSubmissionId() != null ? 
                enrichedSubmissions.stream()
                    .filter(e -> e.get("submission").equals(quest.getWinnerSubmissionId()))
                    .findFirst()
                    .orElse(null) : null
        );
    }

    @GetMapping("/ended")
    public List<PhotoQuest> getEndedPhotoQuests() {
        return photoQuestRepo.findByStatus("COMPLETED");
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<PhotoQuest> completePhotoQuest(@PathVariable String id) {
        return ResponseEntity.ok(winnerService.autoSelectWinner(id));
    }
}