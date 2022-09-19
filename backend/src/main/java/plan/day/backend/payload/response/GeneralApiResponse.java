package plan.day.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GeneralApiResponse {

  private Boolean success;

  private String message;

}
