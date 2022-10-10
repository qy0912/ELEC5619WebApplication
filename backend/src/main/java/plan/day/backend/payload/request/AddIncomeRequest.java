package plan.day.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AddIncomeRequest {

    @NotBlank
    @Size(max = 50)
    private String source;

    private Double totalAmount;
}
