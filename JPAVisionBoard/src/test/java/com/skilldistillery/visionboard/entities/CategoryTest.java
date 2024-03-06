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

class CategoryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Category cat;

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
		cat = em.find(Category.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		cat = null;
		em.close();
	}

	@Test
	void test_Category_entity_mapping() {
		assertNotNull(cat);
		assertEquals("fitness goals", cat.getName());
	}
	
	@Test
	void test_Category_Posts_mapping() {
	    Category category = em.find(Category.class, 1);
	    assertNotNull(category);
	    assertTrue(category.getPosts().size() > 0);
	    Post post = category.getPosts().get(0);
	    assertNotNull(post);
	}

}
