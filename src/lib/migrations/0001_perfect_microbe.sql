CREATE TABLE `store` (
	`id` varchar(255) NOT NULL DEFAULT (UUID()),
	`name` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `store_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `store_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;