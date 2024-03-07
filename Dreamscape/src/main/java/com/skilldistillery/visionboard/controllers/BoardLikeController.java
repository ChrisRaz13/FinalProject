package com.skilldistillery.visionboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.visionboard.entities.BoardLike;
import com.skilldistillery.visionboard.entities.BoardLikeId;
import com.skilldistillery.visionboard.services.BoardLikeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class BoardLikeController {
	
	@Autowired
	private BoardLikeService blService;
	
	@GetMapping({ "boardLikes", "boardLikes/" })
	public List<BoardLike> index() {
		return blService.index();
	}
	
	@PostMapping("boardLikes")
	public BoardLike create(@RequestBody BoardLike boardLike, HttpServletRequest request, HttpServletResponse response) {
		BoardLike newBoardLike = blService.create(boardLike);
		if (newBoardLike == null) {
			response.setStatus(409);
			return null;
		} else {
			response.setStatus(201);
			return newBoardLike;
		}
	}
	

    @GetMapping("boardLikes/{userId}/{boardId}")
    public BoardLike getBoardLikeById(@PathVariable("userId") int userId, @PathVariable("boardId") int boardId,
    		 HttpServletRequest request, HttpServletResponse response) {
    	System.out.println("User id:" + userId);
    	System.out.println("Board id:" + boardId);
        BoardLikeId id = new BoardLikeId(userId, boardId);
        BoardLike boardLike = blService.findById(id);
        if (boardLike == null) {
        	response.setStatus(404);
        } else {
            return boardLike;
        }
        return null;
    }
    

    @DeleteMapping("boardLikes/{userId}/{boardId}")
    public void deleteBoardLike(@PathVariable("userId") int userId, @PathVariable("boardId") int boardId,
    		HttpServletRequest request, HttpServletResponse response) {
        BoardLikeId id = new BoardLikeId(userId, boardId);
		try {
			if (blService.delete(id)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
		}
    }
}
	

	























