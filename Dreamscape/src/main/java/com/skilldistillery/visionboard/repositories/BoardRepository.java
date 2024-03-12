package com.skilldistillery.visionboard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

	Board findById(int id);
	
	List<Board> findByUserId(int userId);
	
    @Query("SELECT b FROM Board b JOIN BoardLike bl ON bl.user.id = b.user.id WHERE b.user.id = :userId")
    List<Board> findLikedBoardsByUserId(@Param("userId") int userId);
    
}