package plan.day.backend.service;

import java.text.ParseException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;
import plan.day.backend.model.Transaction;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.payload.request.TransactionCreateRequest;
import plan.day.backend.repository.TransactionRepository;
import plan.day.backend.repository.UserRepository;

@Service
public class TransactionService {

  @Autowired
  UserRepository userRepository;

  @Autowired
  TransactionRepository transactionRepository;

  public Transaction createTransaction(TransactionCreateRequest transactionCreateRequest, CustomUserDetails userDetails) {
    Transaction transaction = new Transaction();
    BeanUtils.copyProperties(transactionCreateRequest, transaction);
    User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
        new UsernameNotFoundException("User not found!"));
    transaction.setUser(user);
    transaction.setCreateDate( new Date());
    return transactionRepository.save(transaction);
  }

  @ResponseBody
  public List<Transaction> listTransaction(Long id) {
    return transactionRepository.findAllByuser_id(id);
  }

  @ResponseBody
  public List<Transaction> listTransactionWithDate(TimeFilterRequest timefilterrequest, CustomUserDetails userDetails) throws ParseException {

    Date start = timefilterrequest.start;
    Date finish = timefilterrequest.finish;

    List<Transaction> results = transactionRepository.findByTime(userDetails.getId(),start,finish);

    return results;
  }
}
