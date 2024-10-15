CREATE TABLE `billboard` (
	`id` varchar(255) NOT NULL DEFAULT (UUID()),
	`store_id` varchar(255) NOT NULL,
	`label` varchar(255) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `billboard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `billboard` ADD CONSTRAINT `billboard_store_id_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE no action ON UPDATE no action;