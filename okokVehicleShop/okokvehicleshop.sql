CREATE TABLE `okokvehicleshop_vehicles`(
	`vehicle_name` varchar(255) NOT NULL,
	`vehicle_id` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`stock` longtext NULL,
	`unlisted` longtext NULL,
	`min_price` varchar(255) NOT NULL,
	`max_price` varchar(255) NOT NULL,
	`owner_buy_price` varchar(255) NOT NULL
);

CREATE TABLE `okokvehicleshop_shops`(
	`shop_name` varchar(255) NOT NULL,
	`shop_id` varchar(255) NOT NULL,
	`owner` varchar(255) NULL DEFAULT NULL,
	`owner_name` varchar(255) NULL DEFAULT NULL,
	`money` varchar(255) NOT NULL,
	`employees` longtext NULL
);

CREATE TABLE `okokvehicleshop_saleshistory`(
	`shop_id` varchar(255) NOT NULL,
	`vehicle_name` varchar(255) NOT NULL,
	`vehicle_id` varchar(255) NOT NULL,
	`buyer_name` varchar(255) NOT NULL,
	`buyer_id` varchar(255) NOT NULL,
	`price` varchar(255) NOT NULL,
	`date` varchar(255) NOT NULL
);

CREATE TABLE `okokvehicleshop_orders`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`shop_id` varchar(255) NOT NULL,
	`shop_type` varchar(255) NOT NULL,
	`vehicle_name` varchar(255) NOT NULL,
	`vehicle_id` varchar(255) NOT NULL,
	`reward` varchar(255) NOT NULL,
	`in_progress` varchar(255) NOT NULL,
	`employee_name` varchar(255) NOT NULL,
	`employee_id` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);