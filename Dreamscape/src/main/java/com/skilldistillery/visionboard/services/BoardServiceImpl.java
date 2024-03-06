package com.skilldistillery.visionboard.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.Board;
import com.skilldistillery.visionboard.repositories.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardRepository boardRepo;

	@Override
	public List<Board> index() {
		return boardRepo.findAll();
	}

	@Override
	public Board findById(int id) {
		return boardRepo.findById(id);
	}

	@Override
	public Board create(Board newBoard) {
		return boardRepo.save(newBoard);
	}

	@Override
	public Board update(int id, Board existingBoard) {
		Board board = findById(id);

		
		board.setTitle(existingBoard.getTitle());
		board.setCreatedAt(existingBoard.getCreatedAt());
		board.setUpdatedAt(existingBoard.getUpdatedAt());
		board.setDescription(existingBoard.getDescription());
		board.setEnabled(existingBoard.getEnabled());
		board.setPublished(existingBoard.getPublished());
		board.setColor(existingBoard.getColor());
		
		board.setComments(existingBoard.getComments());
		return boardRepo.save(board);
	}

	@Override
	public boolean delete(int id) {
		Board board = boardRepo.findById(id);
		if (board != null) {
			boardRepo.delete(board);
			return true;
		} else {
			return false;
		}
	}
}
