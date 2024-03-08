package com.skilldistillery.visionboard.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.visionboard.entities.User;
import com.skilldistillery.visionboard.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<User> index() {
		return userRepository.findAll();
	}

	@Override
	public User findById(int id) {
		Optional<User> user = userRepository.findById(id);
		return user.orElse(null);
	}

	@Override
	public User create(User user) {
		return userRepository.save(user);
	}

	@Override
	public User update(int id, User user) {
		Optional<User> existingUser = userRepository.findById(id);
		if (existingUser.isPresent()) {
			user.setId(id);
			return userRepository.save(user);
		} else {
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
		Optional<User> existingUser = userRepository.findById(id);
		if (existingUser.isPresent()) {
			userRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean disableUser(int userId) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			user.setEnabled(false);
			userRepository.save(user);
			return true;
		}
		return false;
	}

	@Override
	public boolean enableUser(int userId) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			user.setEnabled(true);
			userRepository.save(user);
			return true;
		}
		return false;
	}

	@Override
	public User resetPassword(int userId, String newPassword) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			String encodedPassword = passwordEncoder.encode(newPassword);
			user.setPassword(encodedPassword);
			return userRepository.save(user);
		}
		return null;
	}
}
