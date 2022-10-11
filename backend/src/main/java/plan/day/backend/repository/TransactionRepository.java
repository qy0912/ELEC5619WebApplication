package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plan.day.backend.model.Income;
import plan.day.backend.model.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByuser_id(long id);
}
