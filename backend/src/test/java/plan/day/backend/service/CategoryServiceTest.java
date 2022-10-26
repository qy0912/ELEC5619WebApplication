package plan.day.backend.service;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import plan.day.backend.BackendApplication;
import plan.day.backend.model.Category;
import plan.day.backend.payload.request.CreateCategoryRequest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BackendApplication.class)
@WebAppConfiguration
public class CategoryServiceTest {

  @Autowired
  CategoryService categoryService;

  @Test
  public void addCategory() {
    CreateCategoryRequest createCategoryRequest = new CreateCategoryRequest();
    createCategoryRequest.setCategory_name("test");
    createCategoryRequest.setDescription("test");
    Category category = categoryService.addCategory(createCategoryRequest);
    assertEquals("test", category.getCategory_name());
    assertEquals("test", category.getDescription());
  }
}