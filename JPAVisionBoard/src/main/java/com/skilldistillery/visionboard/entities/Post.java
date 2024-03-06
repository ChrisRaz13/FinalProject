package com.skilldistillery.visionboard.entities;

import java.time.LocalDate;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String description;

    private String title;

    private boolean completed;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "overlay_text")
    private String overlayText;

    @Column(name = "completed_date")
    private LocalDate completedDate;

    private boolean enabled;

    private Boolean published;

    private Integer scale;

    private Integer layer;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "post_has_category",
	joinColumns = @JoinColumn(name = "post_id"),
	inverseJoinColumns = @JoinColumn(name = "category_id"))
	private List<Category> categories;

	//methods and constructors
	
	public Post() {
		super();
	}

	public Post(int id, String description, String title, boolean completed, LocalDateTime createdAt,
			LocalDateTime updatedAt, LocalDate dueDate, String imageUrl, String videoUrl, String overlayText,
			LocalDate completedDate, boolean enabled, Boolean published, Integer scale, Integer layer, Board board,
			List<Category> categories) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.completed = completed;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.dueDate = dueDate;
		this.imageUrl = imageUrl;
		this.videoUrl = videoUrl;
		this.overlayText = overlayText;
		this.completedDate = completedDate;
		this.enabled = enabled;
		this.published = published;
		this.scale = scale;
		this.layer = layer;
		this.board = board;
		this.categories = categories;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean getCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
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

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getOverlayText() {
		return overlayText;
	}

	public void setOverlayText(String overlayText) {
		this.overlayText = overlayText;
	}

	public LocalDate getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(LocalDate completedDate) {
		this.completedDate = completedDate;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getPublished() {
		return published;
	}

	public void setPublished(Boolean published) {
		this.published = published;
	}

	public Integer getScale() {
		return scale;
	}

	public void setScale(Integer scale) {
		this.scale = scale;
	}

	public Integer getLayer() {
		return layer;
	}

	public void setLayer(Integer layer) {
		this.layer = layer;
	}

	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
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
		Post other = (Post) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Post [id=" + id + ", description=" + description + ", title=" + title + ", completed=" + completed
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", dueDate=" + dueDate + ", imageUrl="
				+ imageUrl + ", videoUrl=" + videoUrl + ", overlayText=" + overlayText + ", completedDate="
				+ completedDate + ", enabled=" + enabled + ", published=" + published + ", scale=" + scale + ", layer="
				+ layer + ", board=" + board + "]";
	}
  

}
