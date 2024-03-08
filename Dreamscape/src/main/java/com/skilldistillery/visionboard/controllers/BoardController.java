package com.skilldistillery.visionboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.visionboard.entities.Board;
import com.skilldistillery.visionboard.services.BoardService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class BoardController {
		
		@Autowired
		private BoardService boardService;

		@GetMapping("boards")
		public List<Board> index() {
			return boardService.index();
		}

		@GetMapping("boards/{id}")
		public Board findById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
			Board board = boardService.findById(id);
			if (board == null) {
				response.setStatus(404);
			}
			return board;
		}

		@PostMapping("boards")
		public Board create(@RequestBody Board board, HttpServletRequest request, HttpServletResponse response) {
			Board newBoard = boardService.create(board);
			if (newBoard == null) {
				response.setStatus(400);
				return null;
			} else {
				response.setStatus(201);
				response.setHeader("Location", request.getRequestURL().append("/").append(newBoard.getId()).toString());
				return newBoard;
			}
		}

		@PutMapping("boards/{id}")
		public Board update(@PathVariable("id") Integer id, @RequestBody Board board, HttpServletResponse res) {
			board = boardService.update(id, board);
			if (board == null) {
				res.setStatus(404);
			}
			return board;
		}

		@DeleteMapping("boards/{id}")
		public void delete(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
			try {
				if (boardService.delete(id)) {
					response.setStatus(204);
				} else {
					response.setStatus(404);
				}
			} catch (Exception e) {
				response.setStatus(400);
				e.printStackTrace();
			}
		}
		
		@GetMapping("boards/search/{userId}")
		public List<Board> findByUserId(@PathVariable("userId") int userId,
				                       HttpServletRequest request, HttpServletResponse response) {
			List<Board> boards = boardService.findByUserId(userId);
			if (boards == null) {
				response.setStatus(404);
			}
			return boards;
		}
		
		@GetMapping("boards/search/likedbyuser/{userId}")
		public List<Board> findLikedBoardsByUserId(@PathVariable("userId") int userId,
				                       HttpServletRequest request, HttpServletResponse response) {
			List<Board> boards = boardService.findLikedBoardsByUserId(userId);
			if (boards == null) {
				response.setStatus(404);
			}
			return boards;
		}
		
		
}













