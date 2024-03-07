package com.skilldistillery.visionboard.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    
    private String title;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private Boolean enabled;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    private Boolean published;
    
    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Post> posts;
    
    @JsonIgnore
    @OneToMany(mappedBy = "board")
    private List<Comment> comments;
    
    @OneToMany(mappedBy = "board")
    private List<BoardLike> boardLikes;

    //methods and constr
    
    public Board() {
    	super();
    }

	public Board(int id, String title, LocalDateTime createdAt, LocalDateTime updatedAt, User user, String description,
			Boolean enabled, Color color, Boolean published, List<Post> posts, List<Comment> comments,
			List<BoardLike> boardLikes) {
		super();
		this.id = id;
		this.title = title;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.user = user;
		this.description = description;
		this.enabled = enabled;
		this.color = color;
		this.published = published;
		this.posts = posts;
		this.comments = comments;
		this.boardLikes = boardLikes;
	}

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
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

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public List<BoardLike> getBoardLikes() {
		return boardLikes;
	}

	public void setBoardLikes(List<BoardLike> boardLikes) {
		this.boardLikes = boardLikes;
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
				+ ", user=" + user + ", description=" + description + ", enabled=" + enabled + ", published="
				+ published + "]";
	}
    
}
