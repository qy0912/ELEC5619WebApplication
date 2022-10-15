package plan.day.backend.payload.response;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;
import plan.day.backend.enums.Theme;
import plan.day.backend.model.User;

@Data
public class JwtAuthenticationResponse {

  private String accessToken;

  private String tokenType = "Bearer";

  private String username;

  private Integer gender;

  private String avatar;

  private Theme theme;

  public JwtAuthenticationResponse(String accessToken, String username, Integer gender, String avatar, Theme theme) {
    this.accessToken = accessToken;
    this.username = username;
    this.gender = gender;
    this.avatar = avatar;
    this.theme = theme;
  }
}
