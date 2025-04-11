package backend.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.demo.model.LearningPlan;
import backend.demo.repository.LearningPlanRepository;

@Service
public class LerningPlanService {
    @Autowired
    private LearningPlanRepository repository;

    public LearningPlan createPlan(LearningPlan plan) {
        return repository.save(plan);
    }

    public List<LearningPlan> getPlansByUser(String userId) {
        return repository.findByUserId(userId);
    }

    public LearningPlan updatePlan(String id, LearningPlan updatedPlan) {
        updatedPlan.setId(id);
        return repository.save(updatedPlan);
    }

    public void deletePlan(String id) {
        repository.deleteById(id);
    }
}
