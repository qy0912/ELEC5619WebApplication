package plan.day.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CreateCategoryRequest {

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotBlank
    @Size(max = 50)
    private String category_name;
}
