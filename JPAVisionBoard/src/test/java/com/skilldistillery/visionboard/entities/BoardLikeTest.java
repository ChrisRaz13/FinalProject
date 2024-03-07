package com.skilldistillery.visionboard.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class BoardLikeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private BoardLike boardLike;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	    emf = Persistence.createEntityManagerFactory("JPAVisionBoard");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	    emf.close();
	}
	
	@BeforeEach
	void setUp() throws Exception {
	    em = emf.createEntityManager();
	    BoardLikeId id = new BoardLikeId(1, 2);
	    boardLike = em.find(BoardLike.class, id);
	}

	@AfterEach
	void tearDown() throws Exception {
		boardLike = null;
	    em.close();
	}
	
	
	@Test
	void test_Board_entity_mapping() {
		assertNotNull(boardLike);
		assertEquals(2, boardLike.getBoard().getId());
	}

}
