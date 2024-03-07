package com.skilldistillery.visionboard.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.Category;
import com.skilldistillery.visionboard.entities.Post;
import com.skilldistillery.visionboard.repositories.CategoryRepository;
import com.skilldistillery.visionboard.repositories.PostRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(int id) {
        Optional<Category> category = Optional.of(categoryRepository.findById(id));
        return category.orElse(null);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int id, Category category) {
        Optional<Category> existingCategory = Optional.of(categoryRepository.findById(id));
        if (existingCategory.isPresent()) {
            category.setId(id);
            return categoryRepository.save(category);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteCategory(int id) {
        Optional<Category> existingCategory = Optional.of(categoryRepository.findById(id));
        if (existingCategory.isPresent()) {
            categoryRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
