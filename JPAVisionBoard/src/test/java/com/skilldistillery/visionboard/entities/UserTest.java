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

}

