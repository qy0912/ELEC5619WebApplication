package plan.day.backend.service;

import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.multipart.MultipartFile;
import plan.day.backend.BackendApplication;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.SignupRequest;
import plan.day.backend.payload.request.UserModifyRequest;
import plan.day.backend.repository.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BackendApplication.class)
@WebAppConfiguration
public class UserServiceTest {

  @Autowired
  private UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  private User savedUser;

  @Before
  public void before() {
    if (userRepository.existsByUsername("test")) {
      userRepository.deleteById(userRepository.findByUsername("test").get().getId());
    }
    User user = new User("test", "test");
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setCreateDate(Instant.now());
    savedUser = userRepository.save(user);
  }

  @Test
  public void checkUserNameExists() {
    assertFalse(userService.checkUserNameExists("trueTest"));
    assertTrue(userService.checkUserNameExists("test"));
  }

  @Test
  public void getUser() {
    assertEquals("test", userService.getUser("test").getUsername());
  }

  @Test
  public void testGetUser() {
    assertEquals("test", userService.getUser(savedUser.getId()).getUsername());
  }

  @Test
  public void createUser() {
    if (userRepository.existsByUsername("creatTest")) {
      userRepository.deleteById(userRepository.findByUsername("creatTest").get().getId());
    }
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setUsername("creatTest");
    signupRequest.setPassword("creatTest");
    assertEquals("creatTest", userService.createUser(signupRequest).getUsername());
  }

  @Test
  public void modifyUser() {
    if (userRepository.existsByUsername("modifyTest")) {
      userRepository.deleteById(userRepository.findByUsername("modifyTest").get().getId());
    }
    UserModifyRequest userModifyRequest = new UserModifyRequest();
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    userModifyRequest.setUsername("modifyTest");
    assertEquals("modifyTest", userService.modifyUser(userModifyRequest, userDetails).getUsername());
  }

  @Test
  public void uploadAvatar() {
    Path path = Paths.get("backend/src/test/resources/mianMa.jpg");
    String name = "mianMa.jpg";
    String originalFileName = "mianMa.jpg";
    String contentType = "image/*";
    byte[] content = null;
    try {
      content = Files.readAllBytes(path);
    } catch (final IOException e) {
    }
    MultipartFile result = new MockMultipartFile(name,
        originalFileName, contentType, content);
    CustomUserDetails userDetails = new CustomUserDetails(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword());
    User user = userService.uploadAvatar(result, userDetails);
    assertNotNull(user.getAvatar());
  }
}