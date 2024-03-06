-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema finaldb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `finaldb` ;

-- -----------------------------------------------------
-- Schema finaldb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `finaldb` DEFAULT CHARACTER SET utf8 ;
USE `finaldb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(250) NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `role` VARCHAR(200) NOT NULL DEFAULT 'standard',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `image_url` VARCHAR(2000) NULL,
  `about_me` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `color` ;

CREATE TABLE IF NOT EXISTS `color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `value` VARCHAR(7) NOT NULL DEFAULT '#FFFFFF',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `value_UNIQUE` (`value` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `board` ;

CREATE TABLE IF NOT EXISTS `board` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  `description` TEXT NULL,
  `enabled` TINYINT NULL,
  `color_id` INT NOT NULL,
  `published` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_board_user1_idx` (`user_id` ASC),
  INDEX `fk_board_color1_idx` (`color_id` ASC),
  CONSTRAINT `fk_board_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_color1`
    FOREIGN KEY (`color_id`)
    REFERENCES `color` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post` ;

CREATE TABLE IF NOT EXISTS `post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` TEXT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `completed` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `due_date` DATE NULL,
  `image_url` VARCHAR(2000) NULL,
  `video_url` VARCHAR(2000) NULL,
  `overlay_text` VARCHAR(2000) NULL,
  `completed_date` DATE NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `published` TINYINT NULL,
  `scale` TINYINT(5) NULL,
  `board_id` INT NOT NULL,
  `layer` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_post_board1_idx` (`board_id` ASC),
  CONSTRAINT `fk_post_board1`
    FOREIGN KEY (`board_id`)
    REFERENCES `board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `comment` TEXT NOT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `board_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `in_reply_to_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_comment_board1_idx` (`board_id` ASC),
  INDEX `fk_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_comment_comment1_idx` (`in_reply_to_id` ASC),
  CONSTRAINT `fk_comment_board1`
    FOREIGN KEY (`board_id`)
    REFERENCES `board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`in_reply_to_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `board_like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `board_like` ;

CREATE TABLE IF NOT EXISTS `board_like` (
  `user_id` INT NOT NULL,
  `board_id` INT NOT NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`user_id`, `board_id`),
  INDEX `fk_user_has_board_board1_idx` (`board_id` ASC),
  INDEX `fk_user_has_board_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_board_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_board_board1`
    FOREIGN KEY (`board_id`)
    REFERENCES `board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `created_at` DATETIME NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `post_has_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post_has_category` ;

CREATE TABLE IF NOT EXISTS `post_has_category` (
  `post_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`post_id`, `category_id`),
  INDEX `fk_post_has_category_category1_idx` (`category_id` ASC),
  INDEX `fk_post_has_category_post1_idx` (`post_id` ASC),
  CONSTRAINT `fk_post_has_category_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS final@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'final'@'localhost' IDENTIFIED BY 'vision';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'final'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `enabled`, `role`, `created_at`, `updated_at`, `image_url`, `about_me`) VALUES (1, 'test', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 'test@test.test', 'Test', 'Test', 1, 'standard', '2024-03-05T10:00:00', '2024-03-05T10:00:00', NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `enabled`, `role`, `created_at`, `updated_at`, `image_url`, `about_me`) VALUES (2, 'john', '$2a$10$mmKnPfJ3xFFpgbJYiMnhUuL2wZEYfjPi0tdHF01hDPLblKgXgQP1W', 'john@john.john', 'John', 'Doe', 1, 'standard', NULL, NULL, NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `enabled`, `role`, `created_at`, `updated_at`, `image_url`, `about_me`) VALUES (3, 'admin', '$2a$10$lbDUjbWEymwRyxKDyObFKOIJv.Wm9Dm1taspaCNjfVi8hc1Ih8q6S', 'admin@admin.admin', 'System', 'Administrator', 1, 'admin', NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `color`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `color` (`id`, `name`, `value`) VALUES (1, 'white', '#FFFFFF');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (2, 'light pink', '#FFB6C1');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (3, 'peach', '#FFDAB9');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (4, 'lavender', '#E6E6FA');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (5, 'baby blue', '#89CFF0');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (6, 'mint green', '#98FF98');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (7, 'light yellow', '#FFFFE0');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (8, 'pale aqua', '#BCD4E6');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (9, 'blush', '#DE5D83');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (10, 'beige', '#F5F5DC');
INSERT INTO `color` (`id`, `name`, `value`) VALUES (11, 'powder blue', '#B0E0E6');

COMMIT;


-- -----------------------------------------------------
-- Data for table `board`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `board` (`id`, `title`, `created_at`, `updated_at`, `user_id`, `description`, `enabled`, `color_id`, `published`) VALUES (1, 'John\'s Travels', '2024-03-05T10:15:00', '2024-03-05T10:15:00', 2, 'This vision board helps to remind me of the trips I have taken and the trips I want to take still.', 1, 2, 1);
INSERT INTO `board` (`id`, `title`, `created_at`, `updated_at`, `user_id`, `description`, `enabled`, `color_id`, `published`) VALUES (2, 'Test\'s Health', '2024-03-05T10:15:00', '2024-03-05T10:15:00', 1, 'This vision board is meant to help visualize my health and fitness journey.', 1, 10, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `post` (`id`, `description`, `title`, `completed`, `created_at`, `updated_at`, `due_date`, `image_url`, `video_url`, `overlay_text`, `completed_date`, `enabled`, `published`, `scale`, `board_id`, `layer`) VALUES (1, 'My trip to Paris was a dream!', 'Paris Trip', 1, '2024-03-06 00:25:00', '2024-03-06 00:25:00', '2024-12-20', NULL, NULL, 'A Dream Come True', '2024-03-01', 1, 1, 5, 1, NULL);
INSERT INTO `post` (`id`, `description`, `title`, `completed`, `created_at`, `updated_at`, `due_date`, `image_url`, `video_url`, `overlay_text`, `completed_date`, `enabled`, `published`, `scale`, `board_id`, `layer`) VALUES (2, 'Starting my 30-day yoga challenge.', 'Yoga Challenge', 0, '2024-03-06 00:30:00', '2024-03-06 00:30:00', '2024-04-05', NULL, NULL, 'Day 1: The Journey Begins', NULL, 1, 1, 5, 2, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `comment` (`id`, `created_at`, `updated_at`, `comment`, `enabled`, `board_id`, `user_id`, `in_reply_to_id`) VALUES (1, '2024-03-06 00:15:00', '2024-03-06 00:15:00', 'Amazing travel goals!', 1, 1, 1, NULL);
INSERT INTO `comment` (`id`, `created_at`, `updated_at`, `comment`, `enabled`, `board_id`, `user_id`, `in_reply_to_id`) VALUES (2, '2024-03-06 00:20:00', '2024-03-06 00:20:00', 'Keep up with your fitness journey!', 1, 2, 2, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `board_like`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `board_like` (`user_id`, `board_id`, `created_at`) VALUES (1, 2, '2024-03-06 00:05:00');
INSERT INTO `board_like` (`user_id`, `board_id`, `created_at`) VALUES (2, 1, '2024-03-06 00:10:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (1, 'fitness goals', '2024-03-06 00:00:00', 'Categories related to physical health and workout regimes.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (2, 'career milestones', '2024-03-06 00:00:00', 'Professional achievements and career development objectives.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (3, 'travel destinations', '2024-03-06 00:00:00', 'Dream destinations and travel plans.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (4, 'personal growth', '2024-03-06 00:00:00', 'Self-improvement and educational pursuits.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (5, 'financial goals', '2024-03-06 00:00:00', 'Financial targets and investment plans.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (6, 'creative projects', '2024-03-06 00:00:00', 'Artistic endeavors and creative expressions.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (7, 'home improvement', '2024-03-06 00:00:00', 'Home renovation and decoration ideas.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (8, 'educational milestones', '2024-03-06 00:00:00', 'Academic goals and learning achievements.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (9, 'relationship goals', '2024-03-06 00:00:00', 'Objectives for building and nurturing personal relationships.', NULL);
INSERT INTO `category` (`id`, `name`, `created_at`, `description`, `image_url`) VALUES (10, 'health and wellness', '2024-03-06 00:00:00', 'Activities for maintaining and improving mental and physical health.', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post_has_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `finaldb`;
INSERT INTO `post_has_category` (`post_id`, `category_id`) VALUES (1, 3);
INSERT INTO `post_has_category` (`post_id`, `category_id`) VALUES (2, 1);
INSERT INTO `post_has_category` (`post_id`, `category_id`) VALUES (2, 10);

COMMIT;

