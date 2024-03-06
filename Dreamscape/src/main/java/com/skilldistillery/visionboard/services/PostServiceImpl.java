package com.skilldistillery.visionboard.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.Post;
import com.skilldistillery.visionboard.repositories.PostRepository;

@Service
public class PostServiceImpl implements PostService {
    
    @Autowired
    PostRepository postRepo;

    @Override
    public List<Post> index() {
        return postRepo.findAll();
    }

    @Override
    public Post findById(int id) {
        return postRepo.findById(id);
    }

    @Override
    public Post create(Post newPost) {
        return postRepo.save(newPost);
    }

    @Override
    public Post update(int id, Post existingPost) {
        Post post = findById(id);

        post.setTitle(existingPost.getTitle());
        post.setCreatedAt(existingPost.getCreatedAt());
        post.setUpdatedAt(existingPost.getUpdatedAt());
        post.setDescription(existingPost.getDescription());
        post.setCompleted(existingPost.getCompleted());
        post.setDueDate(existingPost.getDueDate());
        post.setImageUrl(existingPost.getImageUrl());
        post.setVideoUrl(existingPost.getVideoUrl());
        post.setOverlayText(existingPost.getOverlayText());
        post.setCompletedDate(existingPost.getCompletedDate());
        post.setEnabled(existingPost.isEnabled());
        post.setPublished(existingPost.getPublished());
        post.setScale(existingPost.getScale());
        post.setLayer(existingPost.getLayer());
        //Board reference should also be updated
        post.setBoard(existingPost.getBoard());

        return postRepo.save(post);
    }

    @Override
    public boolean delete(int id) {
        Post post = postRepo.findById(id);
        if (post != null) {
            postRepo.delete(post);
            return true;
        } else {
            return false;
        }
    }
}
