package com.skilldistillery.visionboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Category findById(int id);


	}