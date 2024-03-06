package com.skilldistillery.visionboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.visionboard.entities.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

	Board findById(int id);

}