package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plan.day.backend.model.Income;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findAllByIdOrderByDateAsc(long userId);

}
