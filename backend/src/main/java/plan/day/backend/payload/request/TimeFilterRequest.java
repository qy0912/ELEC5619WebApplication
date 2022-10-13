package plan.day.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Date;


@Data
public class TimeFilterRequest {

    public Date start;


    public Date finish;

}
