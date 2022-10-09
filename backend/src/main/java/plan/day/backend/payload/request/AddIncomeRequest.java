package plan.day.backend.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddIncomeRequest {

    @NotBlank
    @Size(max = 50)
    private String source;

    @NotBlank
    private Double totalAmount;
}
