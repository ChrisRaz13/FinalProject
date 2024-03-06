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

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
    private User user;

    @BeforeAll
    static void setUpBeforeAll() throws Exception {
        emf = Persistence.createEntityManagerFactory("JPAVisionBoard");
    }

    @AfterAll
    static void tearDownAfterClass() throws Exception {
        emf.close();
    }

    @BeforeEach
    void setUp() throws Exception {
        em = emf.createEntityManager();
        user = em.find(User.class, 1);

    }

    @AfterEach
    void tearDown() throws Exception {
        user = null;
        em.close();
    }
    
    @Test
    void test() {
    	assertNotNull(user);
    	assertEquals("test", user.getUsername());
    }
    
    @Test
    void test_User_Boards_OneToMany() {
        assertNotNull(user.getBoards());
        assertTrue(user.getBoards().size() > 0);
        assertEquals("Test's Health", user.getBoards().get(0).getTitle());
    }

    @Test
    void test_User_Comments_OneToMany() {
        assertNotNull(user.getComments());
        assertTrue(user.getComments().size() > 0);
        assertEquals("Amazing travel goals!", user.getComments().get(0).getComment());
    }

    @Test
    void test_User_BoardLikes_OneToMany() {
        assertNotNull(user.getBoardLikes());
        assertTrue(user.getBoardLikes().size() > 0);
        assertNotNull(user.getBoardLikes().get(0).getBoard());
    }


}

