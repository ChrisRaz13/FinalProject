package com.skilldistillery.visionboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.visionboard.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	Comment findById(int id);

}
