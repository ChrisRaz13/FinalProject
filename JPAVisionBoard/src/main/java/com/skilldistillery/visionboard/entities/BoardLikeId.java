package com.skilldistillery.visionboard.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class BoardLikeId implements Serializable {
	private int userId;
	private int boardId;
	
	//methods and constructors
	
	public BoardLikeId() {
		super();
	}

	public BoardLikeId(int userId, int boardId) {
		super();
		this.userId = userId;
		this.boardId = boardId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getBoardId() {
		return boardId;
	}

	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(boardId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BoardLikeId other = (BoardLikeId) obj;
		return Objects.equals(boardId, other.boardId) && Objects.equals(userId, other.userId);
	}

}
