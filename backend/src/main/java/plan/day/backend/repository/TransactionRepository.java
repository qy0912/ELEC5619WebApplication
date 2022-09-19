package plan.day.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plan.day.backend.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
