package plan.day.backend.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import plan.day.backend.model.Category;
import plan.day.backend.model.Income;

import java.util.Date;
import java.util.List;


public interface CategoryRepository extends JpaRepository<Category,String>, JpaSpecificationExecutor<Category> {
    @Query(value = "select * from category where category_name = ?1",nativeQuery = true)
    List<Category> findByName(String name);


//    List<Category> findAllBycategory_name(String name);


}
