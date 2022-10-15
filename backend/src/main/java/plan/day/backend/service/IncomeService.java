package plan.day.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import plan.day.backend.enums.BudgetPlanningRange;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;

import plan.day.backend.model.User;
import plan.day.backend.payload.request.AddIncomeRequest;

import plan.day.backend.payload.request.BudgetPlanningRequest;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.repository.IncomeRepository;
import plan.day.backend.repository.UserRepository;

import java.text.ParseException;

import java.time.Duration;
import java.util.Date;
import java.util.List;

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
        income.setCreateDate(new Date());
        return incomeRepository.save(income);
    }

    @ResponseBody
    public List<Income> listIncome(Long id) {
        return incomeRepository.findAllByuser_id(id);
    }

    @ResponseBody
    public List<Income> listIncomeWithDate(TimeFilterRequest timefilterrequest,CustomUserDetails userDetails) throws ParseException {
        Date start = timefilterrequest.start;
        Date finish = timefilterrequest.finish;

        List<Income> results = incomeRepository.findByTime(userDetails.getId(),start,finish);

        return results;
    }

    @ResponseBody
    public List<Income> listIncomeWithRange(BudgetPlanningRequest request, CustomUserDetails userDetails) throws ParseException {
        Date start;
        Date finish = new Date();
        if(request.range.toString() == "WEEKLY"){
            start = new Date(finish.getTime() - Duration.ofDays(7).toMillis());
        }else if(request.range.toString() == "MONTHLY"){
            start = new Date(finish.getTime() - Duration.ofDays(31).toMillis());
        }else{
            start = new Date(finish.getTime() - Duration.ofDays(365).toMillis());
        }

        List<Income> results = incomeRepository.findByTime(userDetails.getId(),start,finish);

        return results;
    }



}
