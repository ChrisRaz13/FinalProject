package com.skilldistillery.visionboard.services;

import java.util.List;

import com.skilldistillery.visionboard.entities.Post;

public interface PostService {

	List<Post> index();

	Post findById(int id);

	Post create(Post newPost);

	Post update(int id, Post existingPost);

	boolean delete(int id);

}
