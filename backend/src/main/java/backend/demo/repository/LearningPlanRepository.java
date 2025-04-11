package backend.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import backend.demo.model.LearningPlan;

public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {
    List<LearningPlan> findByUserId(String userId);
}
