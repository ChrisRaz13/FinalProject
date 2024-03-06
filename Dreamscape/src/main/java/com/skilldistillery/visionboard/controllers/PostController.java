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

import com.skilldistillery.visionboard.entities.Post;
import com.skilldistillery.visionboard.services.PostService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class PostController {
    
    @Autowired
    private PostService postService;

    @GetMapping("posts")
    public List<Post> index() {
        return postService.index();
    }

    @GetMapping("posts/{id}")
    public Post findById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
        Post post = postService.findById(id);
        if (post == null) {
            response.setStatus(404);
        }
        return post;
    }

    @PostMapping("posts")
    public Post create(@RequestBody Post post, HttpServletRequest request, HttpServletResponse response) {
        Post newPost = postService.create(post);
        if (newPost == null) {
            response.setStatus(400);
            return null;
        } else {
            response.setStatus(201);
            response.setHeader("Location", request.getRequestURL().append("/").append(newPost.getId()).toString());
            return newPost;
        }
    }

    @PutMapping("posts/{id}")
    public Post update(@PathVariable("id") Integer id, @RequestBody Post post, HttpServletResponse res) {
        post = postService.update(id, post);
        if (post == null) {
            res.setStatus(404);
        }
        return post;
    }

    @DeleteMapping("posts/{id}")
    public void delete(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (postService.delete(id)) {
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
