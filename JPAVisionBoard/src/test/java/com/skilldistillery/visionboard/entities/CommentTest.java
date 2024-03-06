package com.skilldistillery.visionboard.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class CommentTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Comment comment;

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
	    comment = em.find(Comment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		comment = null;
	    em.close();
	}
	
	
	@Test
	void test_Comment_entity_mapping() {
		assertNotNull(comment);
		assertEquals("Amazing travel goals!", comment.getComment());
	}

	@Test
	void test_Comment_Post_ManyToOne() {
		assertNotNull(comment.getBoard());
		assertEquals(1, comment.getBoard().getId());
	}
	
	@Test
	void test_Comment_User_and_Board_mapping() {
	    assertNotNull(comment);
	    assertNotNull(comment.getUser());
	    assertEquals("test", comment.getUser().getUsername());
	    assertNotNull(comment.getBoard());
	    assertEquals(1, comment.getBoard().getId());
	}

}
