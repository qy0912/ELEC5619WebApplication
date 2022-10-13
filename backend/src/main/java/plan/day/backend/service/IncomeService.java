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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;

import java.util.Date;
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
        income.setCreateDate(new Date());
        return incomeRepository.save(income);
    }

    @ResponseBody
    public List<Income> listIncome(Long id) {
        return incomeRepository.findAllByuser_id(id);
    }

    @ResponseBody
    public List<Income> listIncomeWithDate(TimeFilterRequest timefilterrequest,CustomUserDetails userDetails) throws ParseException {
//        return incomeRepository.findAllByuser_id();
        Date start = timefilterrequest.start;
        Date finish = timefilterrequest.finish;
//        Date test = new Date();

//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

//        Date test = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse("2017-12-15 10:00");
//
//
//        IncomeSpeccification spec1 =
//                new IncomeSpeccification(new SearchCriteria("createDate", ">", test));
//        IncomeSpeccification spec2 =
//                new IncomeSpeccification(new SearchCriteria("createDate", "<", test));

        List<Income> results = incomeRepository.findByTime(userDetails.getId(),start,finish);

        return results;
    }


}
