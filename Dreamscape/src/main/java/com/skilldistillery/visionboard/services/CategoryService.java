package com.skilldistillery.visionboard.services;

import java.util.List;

import com.skilldistillery.visionboard.entities.Category;
import com.skilldistillery.visionboard.entities.Post;

public interface CategoryService {

	List<Category> getAllCategories();

	Category getCategoryById(int id);

	Category createCategory(Category category);

	Category updateCategory(int id, Category category);

	boolean deleteCategory(int id);

}
