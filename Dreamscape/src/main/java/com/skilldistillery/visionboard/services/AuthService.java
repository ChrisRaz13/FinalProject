package com.skilldistillery.visionboard.services;

import com.skilldistillery.visionboard.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);


}
