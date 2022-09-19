package plan.day.backend.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Transaction;
import plan.day.backend.payload.request.TransactionCreateRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.service.TransactionService;

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

}
