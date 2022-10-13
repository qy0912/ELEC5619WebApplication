package plan.day.backend.repository;

import org.hibernate.annotations.OrderBy;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import plan.day.backend.model.Income;
import plan.day.backend.model.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long>, JpaSpecificationExecutor <Income> {
    List<Income> findAllByuser_id(long id);

    @Query(value = "select * from income where user_id = ?1 and create_date between ?2 and ?3",nativeQuery = true)
    List<Income> findByTime(long id, Date start, Date finish);
}
