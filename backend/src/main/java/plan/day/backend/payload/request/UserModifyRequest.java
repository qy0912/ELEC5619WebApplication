package plan.day.backend.payload.request;

import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UserModifyRequest {

  @Size(max = 50)
  private String username;

  private Integer gender;

}
