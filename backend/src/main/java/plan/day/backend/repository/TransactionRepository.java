package plan.day.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import plan.day.backend.model.Transaction;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByuser_id(long id);

    @Query(value = "select * from transaction where user_id = ?1 and create_date between ?2 and ?3",nativeQuery = true)
    List<Transaction> findByTime(long id, Date start, Date finish);

    @Query(value = "select * from transaction where category_name = ?1 and user_id= ?2",nativeQuery = true)
    List<Transaction> findByCategory(String category_name, long id);


}
