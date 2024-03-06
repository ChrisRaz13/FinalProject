package com.skilldistillery.visionboard.entities;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "description")
    private String description;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean published;
    
//  @ManyToOne
//  @JoinColumn(name = "user_id", nullable = false)
//  private User user;
    
	@OneToMany(mappedBy = "board")
	private List<Post> posts;
	
	@OneToMany(mappedBy = "board")
	private List<Comment> comments;
  
  

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Boolean getPublished() {
		return published;
	}

	public void setPublished(Boolean published) {
		this.published = published;
	}
	
	

	public List<Post> getPosts() {
		return posts;
	}

	public void setPost(List<Post> posts) {
		this.posts = posts;
	}
	
	public void addPost(Post post) {
        if (posts == null) {
            posts = new ArrayList<>();
        }
        if (!posts.contains(post)) {
            posts.add(post);
            post.setBoard(this); 
        }
    }

    public void removePost(Post post) {
        if (post != null && posts != null && posts.contains(post)) {
            posts.remove(post);
            post.setBoard(null); 
        }
    }
    
	
    public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public void addComment(Comment comment) {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        if (!comments.contains(comment)) {
            comments.add(comment);
            comment.setBoard(this); 
        }
    }

    public void removeComment(Comment comment) {
        if (comment != null && comments != null && comments.contains(comment)) {
            comments.remove(comment);
            comment.setBoard(null); 
        }
    }

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Board other = (Board) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Board [id=" + id + ", title=" + title + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ ", description=" + description + ", enabled=" + enabled + ", imageUrl=" + imageUrl + ", published="
				+ published + "]";
	}

	
    


}
