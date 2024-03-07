package com.skilldistillery.visionboard.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.visionboard.entities.Category;
import com.skilldistillery.visionboard.services.CategoryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("categories/{id}")
    public Category getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping("categories")
    public Category createCategory(@RequestBody Category category, HttpServletRequest request, HttpServletResponse response) {
        Category newCategory = categoryService.createCategory(category);
        if (newCategory == null) {
            response.setStatus(400);
            return null;
        } else {
            response.setStatus(201);
            response.setHeader("Location", request.getRequestURL().append("/").append(newCategory.getId()).toString());
            return newCategory;
        }
    }

    @PutMapping("categories/{id}")
    public Category updateCategory(@PathVariable int id, @RequestBody Category category, HttpServletResponse response) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        if (updatedCategory == null) {
            response.setStatus(404);
        }
        return updatedCategory;
    }

    @DeleteMapping("categories/{id}")
    public void deleteCategory(@PathVariable int id, HttpServletResponse response) {
        if (!categoryService.deleteCategory(id)) {
            response.setStatus(404);
        }
    }
}
