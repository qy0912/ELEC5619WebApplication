package plan.day.backend.service;

import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import plan.day.backend.enums.RoleName;
import plan.day.backend.exception.CommonException;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Role;
import plan.day.backend.model.User;
import plan.day.backend.payload.request.SignupRequest;
import plan.day.backend.payload.request.UserModifyRequest;
import plan.day.backend.repository.RoleRepository;
import plan.day.backend.repository.UserRepository;
import plan.day.backend.util.FileUploadUtil;

@Service
public class UserService {

  @Value("${app.profilePhoto}")
  private String profilePhotoSavePath;

  @Value("${app.profilePhotoMapper}")
  private String profilePhotoMapperPath;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  UserRepository userRepository;

  public Boolean checkUserNameAvailable(String username) {
    return userRepository.existsByUsername(username);
  }

  public User createUser(SignupRequest signupRequest) {
    User user = new User(signupRequest.getUsername(), signupRequest.getPassword());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setCreateDate(Instant.now());
    Role userRole = roleRepository.findByName(RoleName.USER)
        .orElseThrow(() -> new CommonException("User Role not set."));
    user.setRoles(Collections.singleton(userRole));
    return userRepository.save(user);
  }

  public User modifyUser(UserModifyRequest userModifyRequest, CustomUserDetails userDetails) {
    User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
        new UsernameNotFoundException("User not found!"));
    user.setUsername(userModifyRequest.getUsername());
    user.setGender(userModifyRequest.getGender());
    return userRepository.save(user);
  }

  public Boolean uploadAvatar(MultipartFile file, CustomUserDetails userDetails) {
    User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
        new UsernameNotFoundException("User not found!"));
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    String suffixName = fileName.substring(fileName.lastIndexOf("."));
    fileName = UUID.randomUUID()+suffixName;

    try{
      FileUploadUtil.saveFile(profilePhotoSavePath, fileName, file);
    } catch (IOException e){
      return false;
    }
    user.setAvatar(profilePhotoMapperPath+fileName);
    userRepository.save(user);
    return true;
  }

}
