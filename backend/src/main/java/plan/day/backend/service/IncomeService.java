package plan.day.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;

import plan.day.backend.model.User;
import plan.day.backend.payload.request.AddIncomeRequest;

import plan.day.backend.repository.IncomeRepository;
import plan.day.backend.repository.UserRepository;

import java.time.Instant;
import java.util.List;

public class IncomeService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    IncomeRepository incomeRepository;

    public Income addIncome(AddIncomeRequest addIncomeRequest, CustomUserDetails userDetails) {
        Income income = new Income();
        BeanUtils.copyProperties(addIncomeRequest, income);
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
                new UsernameNotFoundException("User not found!"));
        income.setUser(user);
        income.setCreateDate(Instant.now());
        return incomeRepository.save(income);
    }

    public List<Income> listIncome(CustomUserDetails userDetails) {
//        User user = userRepository.findById(userDetails.getId()).orElseThrow(() ->
//                new UsernameNotFoundException("User not found!"));
////        income.setUser(user);
////        income.setCreateDate(Instant.now());
        return incomeRepository.findAllByIdOrderByDateAsc(userDetails.getId());
    }
}
