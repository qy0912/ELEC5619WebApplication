package plan.day.backend.service;

import java.time.Instant;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Transaction;
import plan.day.backend.model.User;
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
    transaction.setCreateDate(Instant.now());
    return transactionRepository.save(transaction);
  }

}
