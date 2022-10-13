package plan.day.backend.service;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import plan.day.backend.model.Category;
import plan.day.backend.payload.request.CreateCategoryRequest;
import plan.day.backend.repository.CategoryRepository;

public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Category addCategory(CreateCategoryRequest createCategoryRequest) {
        Category category = new Category();
        BeanUtils.copyProperties(createCategoryRequest, category);
        return categoryRepository.save(category);
    }
}