package plan.day.backend.payload.request;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import plan.day.backend.enums.BudgetPlanningRange;

public class BudgetPlanningRequest {
    @Enumerated(EnumType.STRING)
    public BudgetPlanningRange range;
}
