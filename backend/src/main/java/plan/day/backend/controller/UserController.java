package plan.day.backend.controller;

import io.swagger.annotations.Api;
import java.util.Collections;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import plan.day.backend.enums.RoleName;
import plan.day.backend.exception.CommonException;
import plan.day.backend.model.Role;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.LoginRequest;
import plan.day.backend.payload.request.SignupRequest;
import plan.day.backend.payload.response.ApiResponse;
import plan.day.backend.payload.response.JwtAuthenticationResponse;
import plan.day.backend.repository.RoleRepository;
import plan.day.backend.repository.UserRepository;
import plan.day.backend.util.JwtTokenUtil;

@Api("Login/Register")
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtTokenUtil jwtTokenUtil;


  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(),
            loginRequest.getPassword()
        ));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String generateToken = jwtTokenUtil.generateToken(authentication);

    return ResponseEntity.ok(new JwtAuthenticationResponse(generateToken));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest){
    if (userRepository.existsByUsername(signupRequest.getUsername())) {
      return new ResponseEntity<>(new ApiResponse(false, "Username already registered!"),
          HttpStatus.BAD_REQUEST);
    }
    System.out.println("Aaa");
    User user = new User(signupRequest.getUsername(), signupRequest.getPassword());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    Role userRole = roleRepository.findByName(RoleName.USER)
        .orElseThrow(() -> new CommonException("User Role not set."));
    user.setRoles(Collections.singleton(userRole));
    User savedUser = userRepository.save(user);
    return ResponseEntity.ok(new ApiResponse(true, "User registered!"));
  }



}
