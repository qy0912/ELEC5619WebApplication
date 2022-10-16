package plan.day.backend.service;

import static org.junit.Assert.*;

import java.text.ParseException;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import plan.day.backend.BackendApplication;
import plan.day.backend.enums.BudgetPlanningRange;
import plan.day.backend.model.Category;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Transaction;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.BudgetPlanningRequest;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.payload.request.TransactionCreateRequest;
import plan.day.backend.repository.TransactionRepository;
import plan.day.backend.repository.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BackendApplication.class)
@WebAppConfiguration
public class TransactionServiceTest {

  @Autowired
  TransactionService transactionService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  TransactionRepository transactionRepository;

  private User savedUser;

  @Before
  public void before() {
    if (userService.checkUserNameExists("trtest")) {
      savedUser = userService.getUser("trtest");
    } else {
      User user = new User("trtest", "trtest");
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setCreateDate(Instant.now());
      savedUser = userRepository.save(user);
    }
  }

  @Test
  public void createTransaction() {
    TransactionCreateRequest transactionCreateRequest = new TransactionCreateRequest();
    transactionCreateRequest.setDescription("des");
    transactionCreateRequest.setCategory_name("cat");
    transactionCreateRequest.setSource("source");
    transactionCreateRequest.setTotalAmount(Double.valueOf("1"));
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    Transaction transaction = transactionService.createTransaction(transactionCreateRequest, userDetails);
    assertEquals("des", transaction.getDescription());
    assertEquals("cat", transaction.getCategory_name());
    assertEquals("source", transaction.getSource());
    assertEquals(Double.valueOf("1"), transaction.getTotalAmount());
    assertEquals("trtest", transaction.getUser().getUsername());
  }

  @Test
  public void listTransaction() {
    assertNotEquals(0, transactionService.listTransaction(savedUser.getId()).size());
  }

  @Test
  public void listTransactionWithDate() throws ParseException {
    TimeFilterRequest timeFilterRequest = new TimeFilterRequest();
    Calendar instance = Calendar.getInstance();
    instance.add(Calendar.DATE, -1);
    timeFilterRequest.start = instance.getTime();
    instance.add(Calendar.DATE, 2);
    timeFilterRequest.finish = instance.getTime();
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    assertNotEquals(0, transactionService.listTransactionWithDate(timeFilterRequest, userDetails).size());
  }

  @Test
  public void getTotalTransactionWithCategory() throws ParseException {
    TransactionCreateRequest transactionCreateRequest = new TransactionCreateRequest();
    transactionCreateRequest.setDescription("des");
    transactionCreateRequest.setCategory_name("cat");
    transactionCreateRequest.setSource("source");
    transactionCreateRequest.setTotalAmount(Double.valueOf("1"));
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    transactionService.createTransaction(transactionCreateRequest, userDetails);
    assertNotEquals(Double.valueOf("0"),transactionService.getTotalTransactionWithCategory("cat",userDetails));
  }

  @Test
  public void listTransactionWithRange() throws ParseException {
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    BudgetPlanningRequest budgetPlanningRequest = new BudgetPlanningRequest();
    budgetPlanningRequest.range = BudgetPlanningRange.MONTHLY;
    List<Transaction> all = transactionRepository.findAll();
    assertNotEquals(0, transactionService.listTransactionWithRange(budgetPlanningRequest, userDetails).size());
  }
}