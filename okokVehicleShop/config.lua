Config = {}

Config.UseOkokTextUI = true -- true = okokTextUI (I recommend you using this since it is way more optimized than the default ShowHelpNotification) | false = ShowHelpNotification

Config.Key = 38 -- [E] Key to open the interaction, check here the keys ID: https://docs.fivem.net/docs/game-references/controls/#controls

Config.UseokokRequests = true -- true = use okokRequests for hiring people | false = don't use okokRequests - https://okok.tebex.io/package/4724985

Config.UseSameImageForVehicles = false -- true = use the same image for all vehicles (vehicle.png) | false = use different images for each vehicle (vehicle_id.png)

Config.HideMinimap = true -- If true it'll hide the minimap when the vehicle shop menu is opened

Config.TimeBetweenTransition = 7000 -- how much time it stays in a camera before changing, in miliseconds

Config.TransitionTime = 4000 -- how much time it takes to go from one camera to another (camera movement), in miliseconds

Config.ShakeAmplitude = 0.2 -- camera shake

Config.UseKMh = true -- true = use KM/h | false = use miles/h

Config.MaxVehiclesSpeed = 450 -- Max speed a vehicle can go at (it is only used for UI purposes, it does NOT change the speed of a vehicle)

Config.TestDriveTime = 40 -- In seconds

Config.StopTestDriveCmd = "cancel" -- command to stop the test drive

Config.PlateLetters  = 3 -- How many letters the plate has

Config.PlateNumbers  = 3 -- How many numbers the plate has

Config.PlateUseSpace = true	-- If the plate uses spaces between letters and numbers

Config.OrderCompletedPercentage = 10 -- When a employee completes the misson he will get this percentage as a reward, 10 = 10%

Config.HireRange = 3 -- How close a player needs to be to be in the hiring range

Config.AdminCommand = "vsadmin" -- command to open the admin menu

Config.OwnerBuyVehiclePercentage = 10 -- How much of a discount the owner has to order a vehicle (bases on the min. price)

Config.SellBusinessReceivePercentage = 50 -- How much a player will receive for selling his business (in percentage, 50 = 50%)

Config.ClearMoneyWhenBusinessIsSold = false -- true = remove the money from the society when sold | false = do not remove the money

Config.MaxDealershipsPerPlayer = 1 -- How many vehicle shops a player can own

Config.MaxEmployeesPerDealership = 10 -- How many employees a vehicle shop can hire

Config.AdminGroups = { -- Admin groups that can access the admin menu
	"superadmin",
	"admin",
	"mod"
}

Config.JobRanks = { -- These are the ranks available on the vehicle shops, you can add or remove as many as you want but leave at least 1
	"Newbie",		-- ID: 1
	"Experienced",	-- ID: 2
	"Expert",		-- ID: 3
	"Sub-Owner"		-- ID: 4 
}

Config.SubOwnerRank = 4 -- ID of the rank that will work as a secondary owner

Config.TruckBlip = {blipId = 67, blipColor = 2, blipScale = 0.9, blipText = "Truck"} -- Blip of the truck when someone accepts an order

Config.TrailerBlip = {blipId = 515, blipColor = 2, blipScale = 0.9, blipText = "Trailer"} -- Blip of the trailer when someone accepts an order (for vehicle shops with big vehicles)

Config.OrderBlip = {blipId = 478, blipColor = 5, blipText = "Order"}  -- Blip of the ordered vehicle when someone accepts an order

Config.TowMarker = {id = 21, size = {x = 0.5, y = 0.5, z = 0.5}, color = {r = 94, g = 255, b = 155}} -- The marker to tow a vehicle when someone accepts an order

Config.Stands = { -- Vehicle shops informations
	{
		name = "Vehicle Shop", -- name of the vehicle shop
		coords = {x = -57.50, y = -1096.73, z = 26.42}, -- Marker/Shop position
		ownerCoords = {x = -31.66, y = -1114.00, z = 26.42}, -- Marker/Shop position for owner/employees
		spawnFlatbedPos = {x = -16.95, y = -1105.34, z = 26.67, h = 160.0}, -- Where the flatbed/truck is spawned for the orders
		missionsVehicleSpawn = { -- Locations where someone who accepted an order will have to go (it is random)
			{x = -465.99, y = -618.22, z = 31.17, h = 100.0},
			--{x = 218.46, y = -850.71, z = 30.16, h = 100.0},
		},
		radius = 1, -- Interaction radius for the markers
		price = 10000, -- Price of the vehicle shop
		blip = {blipId = 225, blipColor = 3, blipScale = 0.9, blipText = "Vehicleshop"}, -- Blip informations for vehicleshop blip
		ownerBlip = {blipId = 225, blipColor = 2, blipScale = 0.9, blipText = "Vehicleshop Panel"}, -- Blip informations for shops you own/work for
		buyBlip = {blipId = 225, blipColor = 1, blipScale = 0.9, blipText = "Vehicleshop to buy"}, -- Blip informations for shop on sale
		marker = {id = 20, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}}, -- Marker informations for the vehicle shop
		ownerMarker = {id = 21, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}}, -- Marker informations for the owning menu
		towHeight = 1.0, -- How high the vehicle is in the tow truck when gotten from an order
		bigVehicles = false, -- Set to true if it's airplanes/helicopters/etc... it'll use a truck instead of a flatbed to get the ordered vehicles
		type = "vehicles", -- Type of shop (will change displayed vehicles) | CAN be repeated on other shops
		id = "vehicles1", -- ID of the shop, it's used to get what shop is opened | needs to be DIFFERENT for each shop
	},
	{
		name = "Air Shop",
		coords = {x = -949.5, y = -2946.55, z = 13.95},
		ownerCoords = {x = -941.51, y = -2955.03, z = 13.95},
		spawnFlatbedPos = {x = -947.62, y = -2976.86, z = 13.95, h = 270.0},
		missionsVehicleSpawn = {
			{x = -1835.77, y = 2979.52, z = 32.81, h = 100.0},
		},
		radius = 1,
		price = 12000,
		blip = {blipId = 64, blipColor = 3, blipScale = 0.9, blipText = "Air shop"},
		ownerBlip = {blipId = 64, blipColor = 2, blipScale = 0.9, blipText = "Air shop Panel"},
		buyBlip = {blipId = 64, blipColor = 1, blipScale = 0.9, blipText = "Air shop to buy"},
		marker = {id = 20, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}},
		ownerMarker = {id = 21, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}},
		towHeight = 1.3,
		bigVehicles = true,
		type = "air",
		id = "air1",
	},
	{
		name = "Water Shop",
		coords = {x = -720.77, y = -1324.92, z = 1.6},
		ownerCoords = {x = -712.16, y = -1298.88, z = 5.1},
		spawnFlatbedPos = {x = -719.77, y = -1286.15, z = 5.0, h = 120.0},
		missionsVehicleSpawn = {
			{x = -758.15, y = -1488.26, z = 5.0, h = 280.0},
		},
		radius = 1,
		price = 14000,
		blip = {blipId = 427, blipColor = 3, blipScale = 0.9, blipText = "Water shop"},
		ownerBlip = {blipId = 427, blipColor = 2, blipScale = 0.9, blipText = "Water shop Panel"},
		buyBlip = {blipId = 427, blipColor = 1, blipScale = 0.9, blipText = "Water shop to buy"},
		marker = {id = 20, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}},
		ownerMarker = {id = 21, color = {r = 94, g = 255, b = 155}, size = {x = 0.5, y = 0.5, z = 0.5}},
		towHeight = 0.9,
		bigVehicles = true,
		type = "water",
		id = "water1",
	},
}

Config.ShowVehicle = { -- Display vehicle
	["vehicles1"] = { -- ID of the vehicle shop
		position = {x = -44.21, y = -1097.06, z = 26.42, h = 160.0}, -- Where to spawn the display vehicles
		noVehicleCam = {x = -44.21-1.49, y = -1097.06-7.65, z = 26.42+1.15}, -- Camera position when there is no vehicle to be displayed
		testDrive = {x = -1733.25, y = -2901.43, z = 13.94, h = 330.0}, -- Where to start the test drive
		vehicleSpawn = {x = -27.65, y = -1082.03, z = 26.64, h = 70.0}, -- Where the vehicle spawns when bought
	},
	["air1"] = {
		position = {x = -1652.0, y = -3142.69, z = 13.99, h = 70.0},
		noVehicleCam = {x = -1652.0-12.49, y = -3142.69-0.65, z = 13.99+2.15},
		testDrive = {x = -1733.25, y = -2901.43, z = 13.94, h = 330.0},
		vehicleSpawn = {x = -1023.91, y = -3060.6, z = 13.94, h = 70.0},
	},
	["water1"] = {
		position = {x = -828.54, y = -1448.08, z = -0.5, h = 70.0},
		noVehicleCam = {x = -828.54-12.49, y = -1448.08-0.65, z = -0.5+3.15},
		testDrive = {x = -878.02, y = -1360.32, z = 2.0, h = 330.0},
		vehicleSpawn = {x = -706.78, y = -1333.57, z = 2.0, h = 70.0},
	},
}

Config.TransitionCamerasOffset = { -- Cameras positions, you can add as many as you wish
	["vehicles1"] = { -- ID of the vehicle shop
		{x = 1.49, y = 7.65, z = 1.15}, 
		{x = 14.0, y = 5.0, z = 0.6},
		{x = 7.0, y = -5.0, z = 1.5},
		{x = -15.0, y = -3.0, z = 1.6},
	},
	["air1"] = {
		{x = 12.49, y = 0.65, z = 2.15}, 
		{x = 9.0, y = 20.0, z = 1.6},
		{x = -13.5, y = 8.0, z = 2.5},
		{x = -4.0, y = -13.0, z = 2.6},
	},
	["water1"] = {
		{x = 12.49, y = 0.65, z = 3.15}, 
		{x = 9.0, y = 20.0, z = 2.6},
		{x = -13.5, y = 8.0, z = 3.5},
		{x = -4.0, y = -13.0, z = 3.6},
	},
}

Config.VehicleshopsCategories = { -- Categories shown on the vehicle shops, this is used to set the vehicles category
	["vehicles"] = { -- TYPE of the vehicle shop
		{display = "COMMERCIALS", id = "tesla"},
		{display = "SUPERCARS", id = "gta"},
		{display = "COMPACTS", id = "nothing"},
		{display = "COUPES", id = "bmw"},
		{display = "MOTORCYCLES", id = "gta"},
		{display = "MUSCLE", id = "nissan"},
		{display = "OFF-ROAD", id = "super"},
		{display = "SEDANS", id = "gta"},
		{display = "SPORTS", id = "nissan"},
		{display = "SUVS", id = "super"},
		{display = "VANS", id = "bmw"},
	},
	["air"] = {
		{display = "BIG", id = "big"},
		{display = "MEDIUM", id = "medium"},
		{display = "SMALL", id = "small"},
	},
	["water"] = {
		{display = "BOATS", id = "boats"},
		{display = "SUBMARINE", id = "submarine"},
	},

}

Config.colors = { -- The vehicle colors, this will update the UI as well (it needs to be 10 colors, do NOT remove, add or change the color names)
	color1 = {255, 255, 255},
	color2 = {0, 0, 0},
	color3 = {150, 150, 150},
	color4 = {255, 0, 0},
	color5 = {255, 150, 0},
	color6 = {255, 230, 0},
	color7 = {0, 255, 0},
	color8 = {0, 0, 255},
	color9 = {76, 0, 255},
	color10 = {255, 0, 255},
}

Config.TextUI = { -- Text UI texts
	['open_shop'] = { 			text = '[E] To open ${shop_name}', 										color = 'darkblue', side = 'right'},
	['buy_business'] = { 		text = '[E] to buy ${name} for ${price}€', 								color = 'darkblue', side = 'right'},
	['access_business'] = { 	text = '[E] to access ${name}', 										color = 'darkblue', side = 'right'},
	['tow'] = { 				text = '[E] To tow', 													color = 'darkblue', side = 'right'},
}

Config.HelpNotification = { -- Used when Config.UseTextUI = false
	['open_shop'] = { 			text = '~INPUT_CONTEXT~ To open ${shop_name}'},
	['buy_business'] = { 		text = '~INPUT_CONTEXT~ to buy ${name} for ${price}€'},
	['access_business'] = { 	text = '~INPUT_CONTEXT~ to access ${name}'},
	['tow'] = { 				text = '~INPUT_CONTEXT~ To tow'},
}

Config.NotificationsText = { -- Notifications texts
	['not_admin'] = {			title = "Vehicle Shop", 		text = "You don't have permission to access the admin menu", 						time = 5000, type = "error"},
	['inside_vehicle'] = {		title = "Vehicle Shop", 		text = "You can't access the vehicle shop inside a vehicle", 						time = 5000, type = "error"},
	['load_vehicle'] = {		title = "Vehicle Shop", 		text = "Loading vehicle, please wait", 												time = 3000, type = "info"},
	['stop_testdrive'] = {		title = "Vehicle Shop", 		text = "Stopping the test drive", 													time = 5000, type = "success"},
	['not_testdriving'] = {		title = "Vehicle Shop", 		text = "You are not on a test drive", 												time = 5000, type = "error"},
	['fill_fields'] = {			title = "Vehicle Shop", 		text = "Please fill the input field", 												time = 5000, type = "error"},
	['already_accepted'] = {	title = "Vehicle Shop", 		text = "You already accepted an order, complete it before accepting another",		time = 5000, type = "error"},
	['not_selected_hire'] = {	title = "Vehicle Shop", 		text = "No one was selected", 														time = 5000, type = "error"},
	['ordered_success'] = {		title = "Vehicle Shop", 		text = "You ordered x${amount} ${vehicle_name} successfully!", 						time = 5000, type = "success"},
	['some_wrong'] = {			title = "Vehicle Shop", 		text = "Something went wrong!", 													time = 5000, type = "error"},
	['not_enough_money'] = {	title = "Vehicle Shop", 		text = "You don't have enough money", 												time = 5000, type = "error"},
	['not_enough_money_s'] = {	title = "Vehicle Shop", 		text = "Your society doesn't have enough money", 									time = 5000, type = "error"},
	['accepted_order'] = {		title = "Vehicle Shop", 		text = "You accepted an order successfully", 										time = 5000, type = "success"},
	['someone_accepted'] = {	title = "Vehicle Shop", 		text = "Someone has already accepted this order", 									time = 5000, type = "error"},
	['finished_order'] = {		title = "Vehicle Shop", 		text = "You successfully finished the order and received ${reward}€", 				time = 5000, type = "success"},
	['no_ads_cancel'] = {		title = "Vehicle Shop", 		text = "You don't have any ads to cancel", 											time = 5000, type = "error"},
	['veh_not_available'] = {	title = "Vehicle Shop", 		text = "This vehicle isn't available", 												time = 5000, type = "error"},
	['price_not_valid'] = {		title = "Vehicle Shop", 		text = "This is not a valid price", 												time = 5000, type = "error"},
	['employee_not_exist'] = {	title = "Vehicle Shop", 		text = "This employee does not exist", 												time = 5000, type = "error"},
	['not_enough_to_sell'] = {	title = "Vehicle Shop", 		text = "You don't have enough vehicles to sell", 									time = 5000, type = "error"},
	['got_hired'] = {			title = "Vehicle Shop", 		text = "You got hired by ${shop_name}", 											time = 5000, type = "info"},
	['got_fired'] = {			title = "Vehicle Shop", 		text = "You got fired by ${shop_name}", 											time = 5000, type = "info"},
	['success_hired'] = {		title = "Vehicle Shop", 		text = "You successfully hired ${hired_name}", 										time = 5000, type = "success"},
	['success_fired'] = {		title = "Vehicle Shop", 		text = "You successfully fired ${fired_name}", 										time = 5000, type = "success"},
	['success_added_ad'] = {	title = "Vehicle Shop", 		text = "Added x${amount} ${vehicle_name} ads", 										time = 5000, type = "success"},
	['deposited'] = {			title = "Vehicle Shop", 		text = "Deposited ${amount}€ successfully", 											time = 5000, type = "success"},
	['withdrawn'] = {			title = "Vehicle Shop", 		text = "Whitdrawn ${amount}€ successfully", 											time = 5000, type = "success"},
	['bought_veh'] = {			title = "Vehicle Shop", 		text = "Bought ${vehicle_name} for ${vehiclePrice}€", 								time = 5000, type = "success"},
	['change_money'] = {		title = "Vehicle Shop", 		text = "Changed the ${shop_name} money to ${money} successfully", 					time = 5000, type = "success"},
	['change_info'] = {			title = "Vehicle Shop", 		text = "Changed the ${vehicle_name} informations successfully", 						time = 5000, type = "success"},
	['remove_veh'] = {			title = "Vehicle Shop", 		text = "Removed the ${vehicle_name} successfully", 									time = 5000, type = "success"},
	['created_veh'] = {			title = "Vehicle Shop", 		text = "Created a ${vehicle_name} successfully", 									time = 5000, type = "success"},
	['cancel_ads'] = {			title = "Vehicle Shop", 		text = "Canceled x${amount} ${vehicle_name} ads", 									time = 5000, type = "success"},
	['updated_price'] = {		title = "Vehicle Shop", 		text = "Updated price of ${vehicle_name} to ${amount}€", 							time = 5000, type = "success"},
	['change_rank'] = {			title = "Vehicle Shop", 		text = "${name} is now a ${job}", 													time = 5000, type = "success"},
	['already_rank'] = {		title = "Vehicle Shop", 		text = "${name} is already a ${job}", 												time = 5000, type = "error"},
	['already_employee'] = {	title = "Vehicle Shop", 		text = "${name} is your employee already", 											time = 5000, type = "error"},
	['max_shops'] = {			title = "Vehicle Shop", 		text = "You can't buy more dealerships",											time = 5000, type = "error"},
	['got_to_truck'] = {		title = "Vehicle Shop", 		text = "Go get the order marked in your minimap", 									time = 5000, type = "info"},
	['not_towing'] = {			title = "Vehicle Shop", 		text = "You need to be closer to the ordered vehicle", 								time = 5000, type = "error"},
	['towed'] = {				title = "Vehicle Shop",			text = "You successfully towed the ordered vehicle", 								time = 5000, type = "success"},
	['sold_business'] = {		title = "Vehicle Shop", 		text = "You successfully sold ${shop} for ${amount}€", 								time = 5000, type = "success"},
	['leave_business'] = {		title = "Vehicle Shop", 		text = "You successfully left ${shop}", 												time = 5000, type = "success"},
	['min_max_price'] = {		title = "Vehicle Shop", 		text = "The minimum price needs to be less than the maximum price", 				time = 5000, type = "error"},
	['owner_changed'] = {		title = "Vehicle Shop", 		text = "${owner} is now the owner of ${shop}", 										time = 5000, type = "success"},
	['max_employees'] = {		title = "Vehicle Shop", 		text = "You can only hire ${employees} employees", 									time = 5000, type = "error"},
}

-------------------------- DISCORD LOGS

-- To set your Discord Webhook URL go to webhook.lua, line 1

Config.BotName = 'ServerName' -- Write the desired bot name

Config.ServerName = 'ServerName' -- Write your server's name

Config.IconURL = '' -- Insert your desired image link

Config.DateFormat = '%d/%m/%Y [%X]' -- To change the date format check this website - https://www.lua.org/pil/22.1.html

-- To change a webhook color you need to set the decimal value of a color, you can use this website to do that - https://www.mathsisfun.com/hexadecimal-decimal-colors.html

Config.BuyBusinessWebhook = true
Config.BuyBusinessWebhookColor = '65280'

Config.SellBusinessWebhook = true
Config.SellBusinessWebhookColor = '16711680'

Config.DepositWebhook = true
Config.DepositWebhookColor = '16776960'

Config.WithdrawWebhook = true
Config.WithdrawWebhookColor = '16776960'

Config.StartOrderWebhook = true
Config.StartOrderWebhookColor = '16742656'

Config.EndOrderWebhook = true
Config.EndOrderWebhookColor = '16742656'

Config.HireWebhook = true
Config.HireWebhookColor = '4223487'

Config.FireWebhook = true
Config.FireWebhookColor = '4223487'

Config.BuyVehicleWebhook = true
Config.BuyVehicleWebhookColor = '65535'

Config.ADStockWebhook = true
Config.ADStockWebhookColor = '7209071'

Config.CancelStockWebhook = true
Config.CancelStockWebhookColor = '7209071'

Config.BuyStockWebhook = true
Config.BuyStockWebhookColor = '7209071'

Config.EditEmployeeRankWebhook = true
Config.EditEmployeeRankWebhookColor = '4223487'

Config.QuitJobWebhook = true
Config.QuitJobWebhookColor = '16711680'