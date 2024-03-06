package com.skilldistillery.visionboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Category;
import com.skilldistillery.visionboard.entities.Post;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

		Post findById(int id);

	}