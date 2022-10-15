package plan.day.backend.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class TransactionCreateRequest {

  @NotBlank
  @Size(max = 100)
  private String description;

  @NotBlank
  @Size(max = 50)
  private String source;

  private Double totalAmount;

  private String category_name;

}
