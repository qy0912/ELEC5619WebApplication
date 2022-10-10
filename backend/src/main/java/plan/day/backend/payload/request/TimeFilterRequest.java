package plan.day.backend.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;

public class TimeFilterRequest {

    public Instant start;

    public Instant finish;

}
