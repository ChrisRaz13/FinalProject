package com.skilldistillery.visionboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.visionboard.entities.Comment;
import com.skilldistillery.visionboard.services.CommentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class CommentController {
		
		@Autowired
		private CommentService commentService;

		@GetMapping("comments")
		public List<Comment> index() {
			return commentService.index();
		}

		@GetMapping("comments/{id}")
		public Comment findById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
			Comment comment = commentService.findById(id);
			if (comment == null) {
				response.setStatus(404);
			}
			return comment;
		}

		@PostMapping("comments")
		public Comment create(@RequestBody Comment comment, HttpServletRequest request, HttpServletResponse response) {
			Comment newComment = commentService.create(comment);
			if (newComment == null) {
				response.setStatus(400);
				return null;
			} else {
				response.setStatus(201);
				response.setHeader("Location", request.getRequestURL().append("/").append(newComment.getId()).toString());
				return newComment;
			}
		}

		@PutMapping("comments/{id}")
		public Comment update(@PathVariable("id") Integer id, @RequestBody Comment comment, HttpServletResponse res) {
			comment = commentService.update(id, comment);
			if (comment == null) {
				res.setStatus(404);
			}
			return comment;
		}

		@DeleteMapping("comments/{id}")
		public void delete(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
			try {
				if (commentService.delete(id)) {
					response.setStatus(204);
				} else {
					response.setStatus(404);
				}
			} catch (Exception e) {
				response.setStatus(400);
				e.printStackTrace();
			}
		}
		
		@GetMapping("comments/boards/{boardId}")
		public List<Comment> getCommentsByBoardId(@PathVariable("boardId") int id, HttpServletRequest request, HttpServletResponse response) {
		    List<Comment> comments = commentService.getCommentsByBoardId(id);
		    if (comments == null || comments.isEmpty()) {
		        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		    }
		    return comments;
		}



		
		
}
