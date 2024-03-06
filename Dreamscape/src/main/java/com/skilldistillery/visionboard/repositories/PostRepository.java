package com.skilldistillery.visionboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Board;
import com.skilldistillery.visionboard.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	Post findById(int id);

}