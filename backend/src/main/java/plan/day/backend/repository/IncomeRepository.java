package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import plan.day.backend.model.Income;

import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    //@Query("SELECT * FROM income WHERE user_id=?1")
    List<Income> findAll();

}
