package plan.day.backend.service;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import plan.day.backend.model.User;
import plan.day.backend.repository.UserRepository;
import plan.day.backend.model.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username).orElseThrow(() ->
        new UsernameNotFoundException("User not found with user name" + username));
    return CustomUserDetails.createUserDetails(user);
  }

  @Transactional
  public CustomUserDetails loadUserById(Long id) {
    User user = userRepository.findById(id).orElseThrow(() ->
        new UsernameNotFoundException("User not found with user id" + id));
    return CustomUserDetails.createUserDetails(user);
  }

}
