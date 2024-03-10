package com.skilldistillery.visionboard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	Post findById(int id);

	List<Post> findByCategories_NameContaining(String categoryName);
	
	List<Post> findByBoardId(int boardId);

}