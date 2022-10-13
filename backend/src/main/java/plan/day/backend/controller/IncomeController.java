package plan.day.backend.controller;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;
import plan.day.backend.payload.request.AddIncomeRequest;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.service.IncomeService;
import plan.day.backend.util.IncomeUtil;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Api("Income")
@RestController
@RequestMapping("/api/income")
public class IncomeController {

    @Autowired
    IncomeService incomeService;

    @PostMapping("/add")
    public ResponseEntity<?> createIncome(
            @Valid @RequestBody AddIncomeRequest addIncomeRequest,
            @CurrentUser CustomUserDetails userDetails) {

        Income income = incomeService.addIncome(addIncomeRequest,userDetails);
        if (income == null) {
            return ResponseEntity.ok(new GeneralApiResponse(false, "Failed to create income."));
        }
        return ResponseEntity.ok(new GeneralApiResponse(true, "Create income successfully!"));
    }

    @PostMapping("/filter")
    public ResponseEntity<?> getIncomeWithDate(
            @Valid @RequestBody TimeFilterRequest timefilterrequest,
            @CurrentUser CustomUserDetails userDetails) throws ParseException {

        List<Income> income = incomeService.listIncomeWithDate(timefilterrequest,userDetails);

        return ResponseEntity.ok(new IncomeUtil().IncomeParser(income));
    }

    @GetMapping("/")
    public ResponseEntity<?> getIncome(
            @CurrentUser CustomUserDetails userDetails) {

        List<Income> income = incomeService.listIncome(userDetails.getId());

        return ResponseEntity.ok(new IncomeUtil().IncomeParser(income));
    }


}
