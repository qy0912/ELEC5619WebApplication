package plan.day.backend.service;

import static org.junit.Assert.*;

import java.time.Instant;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import plan.day.backend.BackendApplication;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.User;
import plan.day.backend.repository.IncomeRepository;
import plan.day.backend.repository.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BackendApplication.class)
@WebAppConfiguration
public class CustomUserDetailsServiceTest {

  @Autowired
  CustomUserDetailsService customUserDetailsService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  private User savedUser;

  @Before
  public void before() {
    if (userService.checkUserNameExists("custometest")) {
      savedUser = userService.getUser("custometest");
    } else {
      User user = new User("custometest", "custometest");
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setCreateDate(Instant.now());
      savedUser = userRepository.save(user);
    }
  }

  @Test
  public void loadUserByUsername() {
    UserDetails test = customUserDetailsService.loadUserByUsername(savedUser.getUsername());
    assertEquals("custometest", test.getUsername());
  }

  @Test
  public void loadUserById() {
    CustomUserDetails userDetails = customUserDetailsService.loadUserById(savedUser.getId());
    assertEquals(savedUser.getId(), userDetails.getId());
  }
}