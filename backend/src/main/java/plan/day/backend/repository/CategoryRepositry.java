package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plan.day.backend.model.Category;
import plan.day.backend.model.Income;

public interface CategoryRepositry extends JpaRepository<Category,Long> {

    Category findBycategory_name(String category_name);
}
