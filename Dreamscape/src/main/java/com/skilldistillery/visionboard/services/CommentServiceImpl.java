package com.skilldistillery.visionboard.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.Comment;
import com.skilldistillery.visionboard.repositories.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {
    
    @Autowired
    CommentRepository commentRepo;

    @Override
    public List<Comment> index() {
        return commentRepo.findAll();
    }

    @Override
    public Comment findById(int id) {
        return commentRepo.findById(id);
    }

    @Override
    public Comment create(Comment newComment) {
        return commentRepo.save(newComment);
    }

    @Override
    public Comment update(int id, Comment existingComment) {
        Comment comment = findById(id);

        comment.setUser(existingComment.getUser());
        comment.setCreatedAt(existingComment.getCreatedAt());
        comment.setUpdatedAt(existingComment.getUpdatedAt());
        comment.setComment(existingComment.getComment());
        comment.setEnabled(existingComment.getEnabled());
        comment.setBoard(existingComment.getBoard());

        return commentRepo.save(comment);
    }

    @Override
    public boolean delete(int id) {
        Comment comment = commentRepo.findById(id);
        if (comment != null) {
            commentRepo.delete(comment);
            return true;
        } else {
            return false;
        }
    }

	@Override
	public List<Comment> getCommentsByBoardId(int id) {
	    return commentRepo.findByBoardId(id);
	}
}
