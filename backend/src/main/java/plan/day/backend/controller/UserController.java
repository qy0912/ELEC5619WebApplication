package plan.day.backend.controller;

import io.swagger.annotations.Api;
import java.io.IOException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.LoginRequest;
import plan.day.backend.payload.request.SignupRequest;
import plan.day.backend.payload.request.UserModifyRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.payload.response.JwtAuthenticationResponse;
import plan.day.backend.service.UserService;
import plan.day.backend.util.JwtTokenUtil;

@Api("Login/Register")
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserService userService;

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
    User user = userService.getUser(loginRequest.getUsername());
    return ResponseEntity.ok(new JwtAuthenticationResponse(generateToken, user.getUsername(),
        user.getGender(), user.getAvatar(), user.getTheme()));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest){
    if (userService.checkUserNameAvailable(signupRequest.getUsername())) {
      return new ResponseEntity<>(new GeneralApiResponse(false, "Username already registered!"),
          HttpStatus.BAD_REQUEST);
    }
    User user = userService.createUser(signupRequest);
    if (user != null) {
      return ResponseEntity.ok(new GeneralApiResponse(true, "User registered!"));
    }
    return ResponseEntity.ok(new GeneralApiResponse(false, "User register failed."));
  }

  @PutMapping("/modify")
  public ResponseEntity<?> modify(@Valid @RequestBody UserModifyRequest userModifyRequest, @CurrentUser CustomUserDetails userDetails) {
    if (userService.checkUserNameAvailable(userModifyRequest.getUsername())) {
      return new ResponseEntity<>(new GeneralApiResponse(false, "Username already registered!"),
          HttpStatus.BAD_REQUEST);
    }
    User modifyUser = userService.modifyUser(userModifyRequest, userDetails);
    if (modifyUser!= null) {
      return ResponseEntity.ok(new GeneralApiResponse(true, "User Detail modified!"));
    }
    return ResponseEntity.ok(new GeneralApiResponse(false, "User Detail modify failed"));
  }

  @PostMapping("/avatar")
  public ResponseEntity<?> uploadAvatar(@RequestParam MultipartFile avatar, @CurrentUser CustomUserDetails userDetails) throws IOException {
    Boolean result = userService.uploadAvatar(avatar, userDetails);
    if (result) {
      return ResponseEntity.ok(new GeneralApiResponse(true, "Upload Successfully!"));
    }
    return ResponseEntity.ok(new GeneralApiResponse(false, "Upload Failed."));
  }

}
