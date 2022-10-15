package plan.day.backend.controller;

import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Transaction;
import plan.day.backend.payload.request.TimeFilterRequest;
import plan.day.backend.payload.request.TransactionCreateRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.service.TransactionService;
import plan.day.backend.util.TransactionUtil;
import java.text.ParseException;
import java.util.List;

@Api("Transaction CRUD")
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

  @Autowired
  TransactionService transactionService;

  @PostMapping("/create")
  public ResponseEntity<?> createTransaction(
      @Valid @RequestBody TransactionCreateRequest transactionCreateRequest,
      @CurrentUser CustomUserDetails userDetails) {

    Transaction transaction = transactionService.createTransaction(transactionCreateRequest, userDetails);
    if (transaction == null) {
      return ResponseEntity.ok(new GeneralApiResponse(false, "Failed to create transaction."));
    }
    return ResponseEntity.ok(new GeneralApiResponse(true, "Create transaction successfully!"));
  }

  @GetMapping("/")
  public ResponseEntity<?> getTransaction(
          @CurrentUser CustomUserDetails userDetails) {

    List<Transaction> transaction  = transactionService.listTransaction(userDetails.getId());
    return ResponseEntity.ok(transaction);
  }

  @GetMapping(value = "/{category_name}")
  public ResponseEntity<?> getTotalTransactionWithCategory(
          @PathVariable String category_name,
          @CurrentUser CustomUserDetails userDetails) throws ParseException {
    double totalAmount = transactionService.getTotalTransactionWithCategory(category_name, userDetails);
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("category_name", category_name);
    jsonObject.put("total_amount", totalAmount);
    return ResponseEntity.ok(jsonObject);
  }

  @PostMapping("/tfilter")
  public ResponseEntity<?> getTransactionWithDate(
          @Valid @RequestBody TimeFilterRequest timefilterrequest,
          @CurrentUser CustomUserDetails userDetails) throws ParseException {
    List<Transaction> transaction = transactionService.listTransactionWithDate(timefilterrequest,userDetails);
    if(timefilterrequest.start==null || timefilterrequest.finish==null ){
      return ResponseEntity.ok(new GeneralApiResponse(false, "please define start and finish date"));
    }
    return ResponseEntity.ok(new TransactionUtil().TransactionParser(transaction));
  }

  @PostMapping("/summary")
  public ResponseEntity<?> getTransactionSummary(
          @Valid @RequestBody TimeFilterRequest timefilterrequest,
          @CurrentUser CustomUserDetails userDetails) throws ParseException  {

    List<Transaction> transaction  = transactionService.listTransactionWithDate(timefilterrequest,userDetails);
    return ResponseEntity.ok(new TransactionUtil().TransactionSummaryParser(transaction));
  }
}
