	package com.skilldistillery.visionboard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Board;
import com.skilldistillery.visionboard.entities.BoardLike;
import com.skilldistillery.visionboard.entities.BoardLikeId;
import com.skilldistillery.visionboard.entities.User;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, BoardLikeId> {

    @Query("SELECT bl FROM BoardLike bl WHERE bl.id = :blId")
    BoardLike findByBoardLikeId(@Param("blId") BoardLikeId blId);

    void deleteByUserIdAndBoardId(int userId, int boardId);

    @Query("INSERT INTO BoardLike (id, user, board) VALUES (:id, :user, :board)")
    void createBoardLike(@Param("id") BoardLikeId id, @Param("user") User user, @Param("board") Board board);
    
    List<BoardLike> findByUserId(int userId);
}