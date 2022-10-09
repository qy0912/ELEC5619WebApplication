package plan.day.backend.payload.request;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Size;
import lombok.Data;
import plan.day.backend.enums.Theme;

@Data
public class UserModifyRequest {

  @Size(max = 50)
  private String username;

  private Integer gender;

  @Enumerated(EnumType.STRING)
  private Theme theme;
}
