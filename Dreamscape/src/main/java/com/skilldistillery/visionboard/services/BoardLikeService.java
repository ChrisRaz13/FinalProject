package com.skilldistillery.visionboard.services;

import java.util.List;

import com.skilldistillery.visionboard.entities.BoardLike;
import com.skilldistillery.visionboard.entities.BoardLikeId;

public interface BoardLikeService {
	List<BoardLike> index();
	
	BoardLike create(BoardLike boardLike);
	
	BoardLike findById(BoardLikeId blId);
	
	boolean delete(BoardLikeId id);
	
	
}
