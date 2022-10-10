package plan.day.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;


@Data
public class TimeFilterRequest {
    @NotBlank
    public Instant start;

    @NotBlank
    public Instant finish;

}
