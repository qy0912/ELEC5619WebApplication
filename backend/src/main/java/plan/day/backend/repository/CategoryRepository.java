package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plan.day.backend.model.Category;
import plan.day.backend.model.Income;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,String> {

//    List<Category> findAll();
}
