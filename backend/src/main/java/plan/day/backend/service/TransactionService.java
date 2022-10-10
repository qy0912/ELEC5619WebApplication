package plan.day.backend.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import plan.day.backend.model.*;
import plan.day.backend.payload.request.TransactionCreateRequest;
import plan.day.backend.repository.CategoryRepository;
import plan.day.backend.repository.TransactionRepository;
import plan.day.backend.repository.UserRepository;

@Service
public class TransactionService {

  @Autowired
  UserRepository userRepository;

  @Autowired
  TransactionRepository transactionRepository;

  @Autowired
  CategoryRepository categoryRepository;

  public Transaction createTransaction(TransactionCreateRequest transactionCreateRequest, CustomUserDetails userDetails) {
    Transaction transaction = new Transaction();
    BeanUtils.copyProperties(transactionCreateRequest, transaction);
    User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
        new UsernameNotFoundException("User not found!"));
    String category_name = "Food";
    String description = "Use in daily life, eat";

      if(category_name == "MOOD"){
        Category category = categoryRepository.findAll().get(0);
        transaction.setCategory(category);

      }
      else{
        Category newCategory = new Category();
        newCategory.setCategory_name(category_name);
        newCategory.setDescription(description);
        categoryRepository.save(newCategory);
        transaction.setCategory(newCategory);
      }

    transaction.setUser(user);
    transaction.setCreateDate(Instant.now());
    return transactionRepository.save(transaction);
  }

  @ResponseBody
  public List<Transaction> listTransaction(Long id) {
    return transactionRepository.findAllByuser_id(id);
  }

}
