package plan.day.backend.service;
import java.text.ParseException;
import java.time.Duration;
import java.util.Date;
import java.util.List;

import io.swagger.models.Model;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import plan.day.backend.model.*;
import plan.day.backend.payload.request.BudgetPlanningRequest;
import plan.day.backend.payload.request.TimeFilterRequest;
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
    String category_name = transaction.getCategory_name();
    String description = transaction.getDescription();
      List<Category> categoryList = categoryRepository.findByName(category_name);
      if(categoryList.size()!=0){
        Category category = categoryList.get(0);
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


  @ResponseBody
  public double getTotalTransactionWithCategory(String category_name, CustomUserDetails userDetails) throws ParseException {
    double totalAmount = 0;
    List<Transaction> results = transactionRepository.findByCategory(category_name, userDetails.getId());
    for(int i = 0; i< results.size();i++){
      totalAmount += results.get(i).getTotalAmount();
    }
    return totalAmount;
  }

  @ResponseBody
  public List<Transaction> listTransactionWithRange(BudgetPlanningRequest request, CustomUserDetails userDetails) throws ParseException {
    Date start;
    Date finish = new Date();
    if(request.range.toString() == "WEEKLY"){
      start = new Date(finish.getTime() - Duration.ofDays(7).toMillis());
    }else if(request.range.toString() == "MONTHLY"){
      start = new Date(finish.getTime() - Duration.ofDays(31).toMillis());
    }else{
      start = new Date(finish.getTime() - Duration.ofDays(365).toMillis());
    }

    List<Transaction> results = transactionRepository.findByTime(userDetails.getId(),start,finish);

    return results;
  }
}
