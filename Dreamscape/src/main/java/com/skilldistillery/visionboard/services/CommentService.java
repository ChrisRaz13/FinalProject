package com.skilldistillery.visionboard.services;

import java.util.List;

import com.skilldistillery.visionboard.entities.Comment;

public interface CommentService {

	List<Comment> index();

	Comment findById(int id);

	Comment create(Comment newComment);

	Comment update(int id, Comment existingComment);

	boolean delete(int id);

}
