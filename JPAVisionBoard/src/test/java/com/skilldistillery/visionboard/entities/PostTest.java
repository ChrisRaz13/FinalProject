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

public class PostTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Post post;

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
	    post = em.find(Post.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		post = null;
	    em.close();
	}
	
	
	@Test
	void test_Post_entity_mapping() {
		assertNotNull(post);
		assertEquals("Paris Trip", post.getTitle());
	}
	
	@Test
	void test_Post_Board_ManytoOne() {
		assertNotNull(post.getBoard());
		assertEquals("John's Travels", post.getBoard().getTitle());
	}
	
	@Test
	void test_Post_Categories_ManyToMany() {
	    assertNotNull(post.getCategories());
	    assertTrue(post.getCategories().size() > 0);
	    assertEquals("travel destinations", post.getCategories().get(0).getName());
	}

	
}
