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

class BoardTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Board board;

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
		board = em.find(Board.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		board = null;
		em.close();
	}

	@Test
	void test_Board_entity_mapping() {
		assertNotNull(board);
		assertEquals("John's Travels", board.getTitle());
	}
	
	@Test
	void test_Board_User_mapping() {
	    Board board = em.find(Board.class, 1);
	    assertNotNull(board);
	    assertNotNull(board.getUser());
	    assertEquals("john", board.getUser().getUsername());
	}

}
