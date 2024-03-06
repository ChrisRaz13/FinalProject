package com.skilldistillery.visionboard.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	private String description;

	@Column(name = "image_url")
	private String imageUrl;

	@ManyToMany(mappedBy = "categories")
	private List<Post> posts;

	// methods and constructors

	public Category() {
		super();
	}

	public Category(int id, String name, LocalDateTime createdAt, String description, String imageUrl,
			List<Post> posts) {
		super();
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.description = description;
		this.imageUrl = imageUrl;
		this.posts = posts;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
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
		Category other = (Category) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", createdAt=" + createdAt + ", description=" + description
				+ ", imageUrl=" + imageUrl + "]";
	}

}
