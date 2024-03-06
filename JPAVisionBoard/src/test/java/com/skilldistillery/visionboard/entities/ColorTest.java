package com.skilldistillery.visionboard.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class ColorTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Color color;

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
		color = em.find(Color.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		color = null;
		em.close();
	}

	@Test
	void test_Board_entity_mapping() {
		assertNotNull(color);
		assertEquals("white", color.getName());
	}

	@Test
	void test_Color_Boards_mapping() {
		Color color = em.find(Color.class, 2);
		assertNotNull(color);
		assertTrue(color.getBoards().size() > 0);
	}

}
