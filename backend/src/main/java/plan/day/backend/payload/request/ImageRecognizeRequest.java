package plan.day.backend.payload.request;
import lombok.Data;
import javax.validation.constraints.NotBlank;

@Data
public class ImageRecognizeRequest {
    @NotBlank
    private String url;
}
