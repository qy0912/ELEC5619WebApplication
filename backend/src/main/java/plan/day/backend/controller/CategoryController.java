package plan.day.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import plan.day.backend.annotation.CurrentUser;
import plan.day.backend.model.Category;
import plan.day.backend.model.CustomUserDetails;
import plan.day.backend.model.Income;
import plan.day.backend.payload.request.AddIncomeRequest;
import plan.day.backend.payload.request.CreateCategoryRequest;
import plan.day.backend.payload.response.GeneralApiResponse;
import plan.day.backend.service.CategoryService;
import plan.day.backend.service.IncomeService;

import javax.validation.Valid;
import java.util.List;

public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping("/add")
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody CreateCategoryRequest createCategoryRequest) {

        Category category = categoryService.addCategory(createCategoryRequest);
        if (category == null) {
            return ResponseEntity.ok(new GeneralApiResponse(false, "Failed to create category."));
        }
        return ResponseEntity.ok(new GeneralApiResponse(true, "Create category successfully!"));
    }

}
