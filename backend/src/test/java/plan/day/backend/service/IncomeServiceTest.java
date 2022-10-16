package plan.day.backend.service;

import static org.junit.Assert.*;

import java.text.ParseException;
import java.time.Instant;
import java.util.Calendar;
import java.util.List;
import javafx.beans.binding.DoubleExpression;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import plan.day.backend.BackendApplication;
import plan.day.backend.enums.BudgetPlanningRange;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.AddIncomeRequest;
import plan.day.backend.payload.request.BudgetPlanningRequest;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.repository.IncomeRepository;
import plan.day.backend.repository.TransactionRepository;
import plan.day.backend.repository.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BackendApplication.class)
@WebAppConfiguration
public class IncomeServiceTest {
  @Autowired
  IncomeService incomeService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  IncomeRepository incomeRepository;

  private User savedUser;

  @Before
  public void before() {
    if (userService.checkUserNameExists("incometest")) {
      savedUser = userService.getUser("incometest");
    } else {
      User user = new User("incometest", "incometest");
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setCreateDate(Instant.now());
      savedUser = userRepository.save(user);
    }
  }

  @Test
  public void addIncome() {
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    AddIncomeRequest addIncomeRequest = new AddIncomeRequest();
    addIncomeRequest.setSource("source");
    addIncomeRequest.setTotalAmount(Double.valueOf("1"));
    Income income = incomeService.addIncome(addIncomeRequest, userDetails);
    assertEquals("source", income.getSource());
    assertEquals(Double.valueOf("1"), income.getTotalAmount());
    assertEquals(savedUser.getId(), income.getUser().getId());
  }

  @Test
  public void listIncome() {
    List<Income> incomes = incomeService.listIncome(savedUser.getId());
    assertNotEquals(0, incomes.size());
  }

  @Test
  public void listIncomeWithDate() throws ParseException {
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    AddIncomeRequest addIncomeRequest = new AddIncomeRequest();
    addIncomeRequest.setSource("source");
    addIncomeRequest.setTotalAmount(Double.valueOf("1"));
    incomeService.addIncome(addIncomeRequest, userDetails);
    TimeFilterRequest timeFilterRequest = new TimeFilterRequest();
    Calendar instance = Calendar.getInstance();
    instance.add(Calendar.DATE, -1);
    timeFilterRequest.start = instance.getTime();
    instance.add(Calendar.DATE, 2);
    timeFilterRequest.finish = instance.getTime();
    List<Income> incomes = incomeService.listIncomeWithDate(timeFilterRequest, userDetails);
    assertNotEquals(0, incomes.size());
  }

  @Test
  public void listIncomeWithRange() throws ParseException {
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    AddIncomeRequest addIncomeRequest = new AddIncomeRequest();
    addIncomeRequest.setSource("source");
    addIncomeRequest.setTotalAmount(Double.valueOf("1"));
    incomeService.addIncome(addIncomeRequest, userDetails);
    BudgetPlanningRequest budgetPlanningRequest = new BudgetPlanningRequest();
    budgetPlanningRequest.range = BudgetPlanningRange.MONTHLY;
    assertNotEquals(0, incomeService.listIncomeWithRange(budgetPlanningRequest, userDetails).size());
  }
}