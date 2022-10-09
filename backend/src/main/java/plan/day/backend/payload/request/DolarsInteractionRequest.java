package plan.day.backend.payload.request;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DolarsInteractionRequest {
    @NotBlank
    String words;
}
