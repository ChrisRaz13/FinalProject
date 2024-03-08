package com.skilldistillery.visionboard.services;

import java.util.List;

import com.skilldistillery.visionboard.entities.Board;

public interface BoardService {

	List<Board> index();

	Board findById(int id);

	Board create(Board newBoard);

	Board update(int id, Board existingBoard);

	boolean delete(int id);
	
	List<Board> findByUserId(int userId);
	
	List<Board> findLikedBoardsByUserId(int userId);

}
