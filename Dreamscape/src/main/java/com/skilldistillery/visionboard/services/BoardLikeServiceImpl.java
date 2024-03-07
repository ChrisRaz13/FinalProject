package com.skilldistillery.visionboard.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.Board;
import com.skilldistillery.visionboard.entities.BoardLike;
import com.skilldistillery.visionboard.entities.BoardLikeId;
import com.skilldistillery.visionboard.entities.User;
import com.skilldistillery.visionboard.repositories.BoardLikeRepository;
import com.skilldistillery.visionboard.repositories.BoardRepository;
import com.skilldistillery.visionboard.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BoardLikeServiceImpl implements BoardLikeService {
	@Autowired
	BoardLikeRepository blRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	BoardRepository boardRepo;
	
	
	@Override
	public List<BoardLike> index() {
		return blRepo.findAll();
	}

	@Override
	public BoardLike create(BoardLike boardLike) {
	    // Retrieve the User and Board objects based on the provided IDs
	    User user = userRepo.findById(boardLike.getUser().getId()).orElse(null);
	    Board board = boardRepo.findById(boardLike.getBoard().getId());

	    if (user == null || board == null) {
	        return null;
	    }

	    // Create the BoardLikeId using the IDs of the User and Board
	    BoardLikeId blId = new BoardLikeId(user.getId(), board.getId());

	    // Set the User, Board, and created timestamp for the BoardLike entity
	    boardLike.setUser(user);
	    boardLike.setBoard(board);
	    boardLike.setId(blId);
	    
	    System.out.println(boardLike);

	    // Save the BoardLike entity using the repository
	    return blRepo.save(boardLike);
	}

	@Override
	public BoardLike findById(BoardLikeId blId) {
		return blRepo.findByBoardLikeId(blId);
	}

	@Override
	public boolean delete(BoardLikeId id) {
		BoardLike boardLike = blRepo.findByBoardLikeId(id);
		boolean deleted = false;
		if (boardLike != null) {
			blRepo.deleteByUserIdAndBoardId(id.getUserId(), id.getBoardId());
			deleted = true;
		}
		return deleted;

	}

	
	
}
