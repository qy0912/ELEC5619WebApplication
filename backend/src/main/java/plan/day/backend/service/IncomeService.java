package plan.day.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;

import plan.day.backend.model.User;
import plan.day.backend.payload.request.AddIncomeRequest;

import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.repository.IncomeRepository;
import plan.day.backend.repository.UserRepository;
import plan.day.backend.specification.IncomeSpeccification;
import plan.day.backend.specification.SearchCriteria;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
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

    @ResponseBody
    public List<Income> listIncome(Long id) {
        return incomeRepository.findAllByuser_id(id);
    }

    @ResponseBody
    public List<Income> listIncomeWithDate(TimeFilterRequest timefilterrequest,CustomUserDetails userDetails) {
//        return incomeRepository.findAllByuser_id();
        Instant start = timefilterrequest.start;
        Instant finish = timefilterrequest.finish;
        IncomeSpeccification spec1 =
                new IncomeSpeccification(new SearchCriteria("create_date", ">", start));
        IncomeSpeccification spec2 =
                new IncomeSpeccification(new SearchCriteria("create_date", "<", finish));

        List<User> results = incomeRepository.findAll(Specification.where(spec1).and(spec2));

    }


}
