var hasCreated = false;

function slide(){
	var count = 0;
	var previousPos = [];
	var containerWidth = document.getElementById("vehicle-catalog_slider").clientWidth;
	var nextButton = document.getElementById("next-button");
	var previousButton = document.getElementById("previous-button");
	var slide = document.getElementById("slide");

	firstCardLeftMargin = 0;
	cardWidthAndRightMargin = 273.17 + 15;
	totalWidth = slide.clientWidth;

	slide.style.transform = `translate(0px,0px)`;

	const transformSlide = (val) => {
		if(totalWidth > 1729) {
			slide.style.transform = `translate(${val}px,0px)`;
		}
	};

	const getCurrentPosition = () => {
		const stringValue = slide.style.transform;
		const transformValue = stringValue.substring(stringValue.indexOf("(") + 1, stringValue.lastIndexOf("p"));

		return transformValue ? parseInt(transformValue) : 0;
	};

	const getNextPosition = () => {
		const currentPosition = getCurrentPosition();
		const lastVisiblePixel = containerWidth + -1 * currentPosition;
		const lastFullyVisibleCard = Math.floor((lastVisiblePixel - firstCardLeftMargin) / cardWidthAndRightMargin);
		const distanceToNextCard = lastFullyVisibleCard * cardWidthAndRightMargin + firstCardLeftMargin;

		if (distanceToNextCard + cardWidthAndRightMargin < totalWidth) {
			if (previousPos[count-1] != getCurrentPosition()){
				previousPos[count] = getCurrentPosition();
				count += 1;
			}
		}

		if (distanceToNextCard + containerWidth > totalWidth) {
			return totalWidth - containerWidth + firstCardLeftMargin;
		} 


		return distanceToNextCard;
	};

	if(!hasCreated) {
		hasCreated = true;
		nextButton.addEventListener("click", (event) => {
			transformSlide(-getNextPosition());
		});

		previousButton.addEventListener("click", (event) => {
			if (count > 0){
				transformSlide(previousPos[count-1]);
				count -= 1;
			}
		});
	}
	
}

var selectedWindow = "";
var hasStartedOnce = false;
var currentCategories = [];
var currentType = "";
var vehiclesInStand = [];
var shopID = "";
var overviewInfos = [];
var table = [];
var allSalesTable = [];
var vehicles = [];
var orders = [];
var isWorking = false;
var catalog = [];
var employeesList = [];
var rankTags = [];
var closePeopleList = [];
var previousValue = 1;
var previousValue2 = 0;
var subOwnerRank = 0;
var inAdminMenu = false;
var icon = "avatar_male.png";
var bestEmployeeIcon = "";
var selected_vehicle_id = "";
var vehicle_image = "vehicle";
var use_same_image = true;
var businessSellPrice = 0;
var vehicleCategory = "";

var admin_shops = [];
var admin_vehicles = [];
var admin_vehiclesInStock = "";
var admin_shopsWithoutOwner = "";
var admin_totalMoney = "";
var admin_name = "";
var admin_group = "";
var admin_typeCategoriesVehicles = [];

var changeOwnerData = [];

function addStr(str, index, stringToAdd){
	return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

window.addEventListener('message', function(event) {
	item = event.data;
	switch (event.data.action) {
		case 'loading':
			selectedWindow = "loading";
			$('.loading_menu').fadeIn();
			break
		case 'openVehicleshop':
			document.documentElement.style.setProperty('--percentage-width1', "0%");
			document.documentElement.style.setProperty('--percentage-width2', "0%");
			document.documentElement.style.setProperty('--percentage-width3', "0%");
			document.documentElement.style.setProperty('--percentage-width4', "0%");

			selectedWindow = "vehicles";
			inAdminMenu = false

			currentCategories = event.data.categories;
			currentType = event.data.type;
			vehiclesInStand = event.data.vehicles;
			use_same_image = event.data.useSameImage;
			shopID = event.data.id;

			$(".vehicle_info").fadeOut();
			$(".vehicle_stats").fadeOut();
			$("#goback-button").fadeOut();
			setColors(event.data.colors);
			showCategories(currentCategories);
			break

		case 'openVehicleshopMenu':
			inAdminMenu = false
			overviewInfos.name = event.data.name;
			overviewInfos.rank = event.data.rank;
			overviewInfos.rankTag = event.data.rankTag;
			overviewInfos.balance = event.data.shop.money;
			overviewInfos.bestEmployee = event.data.bestEmployee;
			overviewInfos.top3 = event.data.top3;
			overviewInfos.id = event.data.id;
			allSalesTable = event.data.sales;
			allSalesTable = allSalesTable.reverse();
			vehicles = event.data.vehicles;
			orders = event.data.orders;
			isWorking = event.data.isWorking;
			catalog = event.data.catalog;
			employeesList = event.data.employeesList;
			rankTags = event.data.rankTags;
			subOwnerRank = event.data.subOwner;
			use_same_image = event.data.useSameImage;

			$("#sellbusiness-price").html(numberWithSpaces(event.data.businessSellPrice));

			if(event.data.sex == "m"){
				icon = "avatar_male.png";
			} else {
				icon = "avatar_female.png";
			}

			if(overviewInfos.bestEmployee.sex == "m"){
				bestEmployeeIcon = "avatar_male.png";
			} else {
				bestEmployeeIcon = "avatar_female.png";
			}

			if(catalog != undefined) {
				catalog.sort(function(a, b){
					if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
					if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
					return 0;
				})
			}

			if(vehicles != undefined) {
				vehicles.sort(function(a, b){
					if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
					if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
					return 0;
				})
			}

			if(employeesList != undefined) {
				employeesList.sort(function(a, b){
					if(a.rank > b.rank) { return -1; }
					if(a.rank < b.rank) { return 1; }
					return 0;
				})
			}

			if(selectedWindow == "loading"){
				openOverview();
				$(".vehicle_menu").fadeIn();
			}
			setTimeout(function(){
				$('.loading_menu').fadeOut();
			}, 300);
			break
			
		case 'afterSpawningVehicle':
			var data = event.data.data;
			var maxSpeed = event.data.maxSpeed;
			var topSpeed = (data.topspeed/maxSpeed)*100;
			var acceleration = data.acceleration;
			var brakes = data.brakes*70;
			var handling = data.handling*10;

			if(acceleration > 8) {
				acceleration = acceleration * 5;
			} else if(acceleration > 2){
				acceleration = acceleration * 10;
			} else {
				acceleration = acceleration * 200;
			}
			
			if(topSpeed > 100){
				topSpeed = 100
			}

			if(acceleration > 100){
				acceleration = 100
			}

			if(brakes > 100){
				brakes = 100
			}

			if(handling > 100){
				handling = 100
			}

			$('#vehicle_brand').html(event.data.brand);
			$('#vehicle_model').html(event.data.model);
			$('#vehicle_price').html(event.data.price);
			$(".vehicle_info").fadeIn();
			$(".vehicle_stats").fadeIn();

			document.documentElement.style.setProperty('--percentage-width1', topSpeed+"%");
			document.documentElement.style.setProperty('--percentage-width2', acceleration+"%");
			document.documentElement.style.setProperty('--percentage-width3', brakes+"%");
			document.documentElement.style.setProperty('--percentage-width4', handling+"%");

			if(event.data.price != "0€") {
				document.getElementById(event.data.id).disabled = false;
			}

			break
			
		case 'testDrive':
			$(".vehicle_info").fadeOut();
			$(".vehicle_stats").fadeOut();
			$(".vehicle_shop").fadeOut();
			$("#goback-button").fadeOut();
			break
			
		case 'closeVehicleshop':
			closeMenu();
			break
			
		case 'updateMoney':
			overviewInfos.balance = event.data.money;
			if(selectedWindow == "overview") {
				$('#societyBalance').html(numberWithSpaces(event.data.money));
			}
			break
			
		case 'updateOrders':
			orders = event.data.orders;
			isWorking = event.data.isWorking;

			if(selectedWindow == "orders") {
				ordersTable();
			}
			break

		case 'updateStockAndCatalog':
			vehicles = event.data.vehicles;
			catalog = event.data.catalog;

			catalog.sort(function(a, b){
				if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
				if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
				return 0;
			})

			vehicles.sort(function(a, b){
				if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
				if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
				return 0;
			})

			if(selectedWindow == "stock") {
				updateStock();
			} else if(selectedWindow == "catalog") {
				updateCatalog();
			}
			break

		case 'updatePriceTable':
			catalog = event.data.catalog;

			catalog.sort(function(a, b){
				if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
				if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
				return 0;
			})

			if(selectedWindow == "pricetable"){
				updatePriceTable();
			}
			break

		case 'updateEmployees':
			employeesList = event.data.employeesList;
			overviewInfos.bestEmployee = event.data.bestEmployee;

			employeesList.sort(function(a, b){
				if(a.rank > b.rank) { return -1; }
				if(a.rank < b.rank) { return 1; }
				return 0;
			})

			if(selectedWindow == "employees") {
				updateEmployees();
			}
			break

		case 'closePeople':
			closePeopleList = event.data.closePeople;
			var num = closePeopleList.length;
			var dropdown = ``;
			if(num > 0){
				for(var i = 0; i < num; i++) {
					dropdown += `
						<option value="${i}">${closePeopleList[i].name}</option>
					`;
				}
			} else {
				dropdown = `
						<option value="1">No one close</option>
					`;
			}
			

			$('#dropdown_to_hire').html(dropdown);
			break

		case 'adminMenu':
			inAdminMenu = true
			admin_shops = event.data.shops;
			admin_vehicles = event.data.vehicles;
			admin_totalMoney = event.data.totalMoney;
			admin_vehiclesInStock = event.data.vehiclesInStock;
			admin_shopsWithoutOwner = event.data.shopsWithoutOwner;
			admin_name = event.data.name;
			admin_group = event.data.group;
			admin_typeCategoriesVehicles = event.data.typeCategoriesVehicles;

			admin_shops.sort(function(a, b){
				if(a.shop_name.toUpperCase() < b.shop_name.toUpperCase()) { return -1; }
				if(a.shop_name.toUpperCase() > b.shop_name.toUpperCase()) { return 1; }
				return 0;
			})

			admin_vehicles.sort(function(a, b){
				if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
				if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
				return 0;
			})

			var num = admin_typeCategoriesVehicles.length;
			var dropdown = `<option value="0">Select an option</option>`;

			for(var i = 0; i < num; i++) {
				dropdown += `
					<option value="${i+1}">${capitalizeFirstLetter(admin_typeCategoriesVehicles[i].type)}</option>
				`;
			}
			$('#dropdown_type').html(dropdown);

			admin_overview();
			$(".vehicle_menu").fadeIn();
			break

		case 'updateAdminMenus':
			admin_shops = event.data.shops;
			admin_vehicles = event.data.vehicles;
			admin_totalMoney = event.data.totalMoney;
			admin_vehiclesInStock = event.data.vehiclesInStock;
			admin_shopsWithoutOwner = event.data.shopsWithoutOwner;
			admin_name = event.data.name;
			admin_group = event.data.group;
			admin_typeCategoriesVehicles = event.data.typeCategoriesVehicles;

			admin_shops.sort(function(a, b){
				if(a.shop_name.toUpperCase() < b.shop_name.toUpperCase()) { return -1; }
				if(a.shop_name.toUpperCase() > b.shop_name.toUpperCase()) { return 1; }
				return 0;
			})

			admin_vehicles.sort(function(a, b){
				if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
				if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
				return 0;
			})

			if(selectedWindow == "adminMenu_overview") {
				admin_overview();
			} else if(selectedWindow == "adminMenu_vehicles") {
				vehicles_overview();
			}
			break

		case 'buyBusiness':
			selectedWindow = "buyBusiness";
			$("#shop_price").html(`${numberWithSpaces(event.data.price)}€`);
			$("#shop_name").html(event.data.name);
			var modalId = $('#buybusiness_modal');
	    var buyBusinessModal = new bootstrap.Modal(modalId);
	    buyBusinessModal.show();
			break
	}
});

$(document).on('click', "#buybusiness_btn_modal", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "buyBusiness"
	}));
});

function admin_overview() {
	selectedWindow = "adminMenu_overview";
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Overview</span></span>
							<div>
								<span class="username align-middle">
									<span id="playerName">${admin_name}</span> <span id="avatar"><img src="img/${icon}" class="avatar"></span>
								</span>
								<div id="grade">${admin_group}</div>
							</div>`);
	$('.sidebar-title').html(`Admin`);
	$('#sidebar').html(`
		<p class="sidebar-item mt-2 selected" id="overview_page_admin"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
		<p class="sidebar-item" id="veh_page_admin"><i class="fas fa-car"></i> <span class="ms-1">Vehicles</span></p>
	`);

	$('#center_infos').html(`<div class="d-flex flex-column flex-grow-1 page-cont">
								<div class="row" style="height: 110px;">
									<div class="col col-md-3 d-flex justify-content-center" style="padding-right: 8px;">
										<div class="card w-100 text-center justify-content-center" style="background-color: #1f5eff;">
											<div style="font-size: 20px;">TOTAL DEALERSHIPS</div>
											<div style="font-size: 20px;">${admin_shops.length}</div>
										</div>
									</div>
									<div class="col col-md-3 d-flex justify-content-center" style="padding-left: 8px; padding-right: 8px;">
										<div class="card w-100 text-center justify-content-center" style="background-color: #1f5eff;">
											<div style="font-size: 20px;">TOTAL MONEY</div>
											<div style="font-size: 20px;">${numberWithSpaces(admin_totalMoney)}€</div>
										</div>
									</div>
									<div class="col col-md-3 d-flex justify-content-center" style="padding-left: 8px; padding-right: 8px;">
										<div class="card w-100 text-center justify-content-center" style="background-color: #1f5eff;">
											<div style="font-size: 20px;">VEHICLES IN STOCK</div>
											<div style="font-size: 20px;">${numberWithSpaces(admin_vehiclesInStock)}</div>
										</div>
									</div>
									<div class="col col-md-3 d-flex justify-content-center" style="padding-left: 8px;">
										<div class="card w-100 text-center justify-content-center" style="background-color: #1f5eff;">
											<div style="font-size: 20px;">WITHOUT OWNER</div>
											<div style="font-size: 20px;">${admin_shopsWithoutOwner}</div>
										</div>
									</div>
								</div>
								<div class="card d-flex flex-column flex-grow-1">
									<div class="card-header card-header_ov text-center">
										<span class="fs-18"><i class="fas fa-tools"></i> Manage Dealerships</span>
									</div>
									<div class="window-admin-ov">
										<div class="card-body card-body_ov flex-grow-1">
											<div class="row h-100">
												<table id="adminManageDealershipsTable" style="max-height: 350px;">
													<thead>
														<tr>
															<th class="text-center">Name</th>
															<th class="text-center">Owner</th>
															<th class="text-center">Stock</th>
															<th class="text-center">Actions</th>
														</tr>
													</thead>
													<tbody id="adminManageDealershipsTableData">
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>`);

	var row = '';
	var num = admin_shops.length;
	var modal = '';

	for(var i = 0; i < num; i++) {
		var modal_id = "AdminModal_"+admin_shops[i].shop_id;
		var input_id = modal_id+"input";
		var modal_id_owner = modal_id+"_owner";
		var input_id_owner = modal_id_owner+"input";
		var owner_name_modal = modal_id+"_owner_name";
		var owner_id_modal = modal_id+"_owner_id";
		var owner_name_modals = modal_id+"_owner_names";
		var owner_id_modals = modal_id+"_owner_ids";
		var confirm_change_owner = modal_id+"confirmChange";
		var confirm_edit_changes = modal_id+"confirmEdit";

		if(admin_shops[i].owner_name == undefined) {
			admin_shops[i].owner_name = "Unowned";
		}

		if(admin_shops[i].owner == undefined) {
			admin_shops[i].owner = "";
		}

		if(admin_shops[i].allStock > 0){
			row += `<tr>
						<td class="text-center align-middle">${admin_shops[i].shop_name}</td>
						<td class="text-center align-middle">${admin_shops[i].owner_name}</td>
						<td class="text-center align-middle">Yes</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
					</tr>`
		} else {
			row += `<tr>
						<td class="text-center align-middle">${admin_shops[i].shop_name}</td>
						<td class="text-center align-middle">${admin_shops[i].owner_name}</td>
						<td class="text-center align-middle">No</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
					</tr>`
		}

		var myEle = document.getElementById(`${modal_id}`);
		if(!myEle){
			modal += `
				<div class="modal fade" id="${modal_id}" tabindex="-1">
					<div class="modal-dialog modal-lg modal-dialog-centered">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4">
								<div class="text-center">
									<span class="modal-title">Edit Dealership</span>
								</div>
								<hr>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditDealershipModal"></button>
								<div class="row d-flex justify-content-center">
									<div class="col-md-6" style="border-right: 1px solid #3e3f4b;">
										<label class="modal-title-addveh">Name <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="editds_dsname" class="form-control flex-grow-1" value="${admin_shops[i].shop_name}" disabled>
										<label class="modal-title-addveh" style="margin-top: 15px;">Owner Name <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="${owner_name_modal}" class="form-control flex-grow-1" value="${admin_shops[i].owner_name}" disabled>
										<label class="modal-title-addveh" style="margin-top: 15px;">Owner Identifier <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="${owner_id_modal}" class="form-control flex-grow-1" value="${admin_shops[i].owner}" disabled>
									</div>
									<div class="col-md-6">
										<label class="modal-title-addveh">Money</label>
										<input type="number" id="${input_id}" class="form-control flex-grow-1" value="${admin_shops[i].money}">
										<label class="modal-title-addveh" style="margin-top: 15px;">Stock <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="number" id="editds_stock" class="form-control flex-grow-1" value="${admin_shops[i].allStock}" disabled>
									</div>
								</div>
								<div class="cowner d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#${modal_id_owner}" data-bs-dismiss="modal">
									<i class="fas fa-exchange-alt"></i>&nbsp;CHANGE OWNER
								</div>
								<div class="d-flex justify-content-center flex-column" id="${confirm_edit_changes}">
									<button type="button" id="confirmEditDealership" class="btn btn-blue flex-grow-1 modal-btn" data-input_id="${input_id}" data-shop="${i}" data-bs-toggle="modal" data-bs-target="#editDealershipModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="modal fade" id="${modal_id_owner}" tabindex="-1">
					<div class="modal-dialog modal-lg modal-dialog-centered">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4">
								<div class="text-center">
									<span class="modal-title">Change Owner [${admin_shops[i].shop_name}]</span>
								</div>
								<hr>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeAddVehicleModal"></button>
								<div class="row d-flex justify-content-center">
									<div class="col-md-6" style="border-right: 1px solid #3e3f4b;">
										<label class="modal-title-addveh">Current Owner Name <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="${owner_name_modals}" class="form-control flex-grow-1" value="${admin_shops[i].owner_name}" disabled>
										<label class="modal-title-addveh" style="margin-top: 15px;">Current Owner Identifier <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="${owner_id_modals}" class="form-control flex-grow-1" value="${admin_shops[i].owner}" disabled>
									</div>
									<div class="col-md-6">
										<label class="modal-title-addveh">New Owner Identifier</label>
										<input type="text" id="${input_id_owner}" class="form-control flex-grow-1" placeholder="Identifier">
									</div>
								</div>
								<div class="d-flex justify-content-center flex-column" id="${confirm_change_owner}">
									<button type="button" id="confirmChangeOwner" class="btn btn-blue flex-grow-1 modal-btn" data-owner="${admin_shops[i].owner}" data-shop="${admin_shops[i].shop_id}" data-input="${input_id_owner}" data-bs-dismiss="modal"><i class="fas fa-plus"></i> CHANGE OWNER</button>
								</div>
							</div>
						</div>
					</div>
				</div>`;
		} else {
			$("#"+owner_name_modal).val(admin_shops[i].owner_name);
			$("#"+owner_id_modal).val(admin_shops[i].owner);
			$("#"+owner_name_modals).val(admin_shops[i].owner_name);
			$("#"+owner_id_modals).val(admin_shops[i].owner);
			$("#"+input_id).val(admin_shops[i].money);

			$("#"+confirm_edit_changes).html(`<button type="button" id="confirmEditDealership" class="btn btn-blue flex-grow-1 modal-btn" data-input_id="${input_id}" data-shop="${i}" data-bs-toggle="modal" data-bs-target="#editDealershipModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>`);
			$("#"+confirm_change_owner).html(`<button type="button" id="confirmChangeOwner" class="btn btn-blue flex-grow-1 modal-btn" data-owner="${admin_shops[i].owner}" data-shop="${admin_shops[i].shop_id}" data-input="${input_id_owner}" data-bs-dismiss="modal"><i class="fas fa-plus"></i> CHANGE OWNER</button>`);
		}
		
	}

	if (modal != '') {
		$("body").append(modal);
	}

	$('#adminManageDealershipsTableData').html(row)

	var table_id = document.getElementById('adminManageDealershipsTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		paging: false,
		searchable: false,
	}));
}

$(document).on('click', "#confirmEditDealership", function() {
	var i = $(this).data("shop");
	var shop = admin_shops[i];
	var input_id = "#"+$(this).data("input_id");
	var money = $(input_id).val();

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "editDealershipMoney",
		shop: shop,
		money: money
	}));
});

$(document).on('click', "#confirmChangeOwner", function() {
	var shop_id = $(this).data("shop");
	var owner = $(this).data("owner");
	var input_id = "#"+$(this).data("input");
	var identifier = $(input_id).val();

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "changeOwner",
		shop_id: shop_id,
		owner: owner,
		identifier: identifier
	}));
});

function vehicles_overview() {
	selectedWindow = "adminMenu_vehicles";
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Vehicles</span></span>
							<div class="d-flex" id="top-search">
								<div class="input-group" style="margin-right: 10px;">
									<input type="search" id="searchbox" class="form-control searchbox" placeholder="Search..." style="margin-right: 1px;">
									<button type="button" id="searchbtn" class="btn btn-blue searchbtn"><i class="fas fa-search"></i></button>
								</div>
								<button type="button" id="addVehicle" class="btn btn-blue adbtn" data-bs-toggle="modal" data-bs-target="#addVehicleModal"><i class="fas fa-plus"></i> Add Vehicle</button>
							</div>`);
	$('#sidebar').html(`
		<p class="sidebar-item mt-2" id="overview_page_admin"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
		<p class="sidebar-item selected" id="veh_page_admin"><i class="fas fa-car"></i> <span class="ms-1">Vehicles</span></p>
	`);

	$('#center_infos').html(`<table id="adminVehiclesTable">
							<thead>
								<tr>
									<th class="text-center">Vehicle</th>
									<th class="text-center">Type</th>
									<th class="text-center">Min. Price</th>
									<th class="text-center">Max. Price</th>
									<th class="text-center">Actions</th>
								</tr>
							</thead>
							<tbody id="adminVehiclesTableData">
							</tbody>
						</table>`);

	admin_vehicles.sort(function(a, b){
		if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
		if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
		return 0;
	})

	var row = '';
	var num = admin_vehicles.length;
	var modal = '';

	for(var i = 0; i < num; i++) {
		var modal_id = "AdminVehicles_"+admin_vehicles[i].vehicle_id+"AdminVehicles_"+admin_vehicles[i].type+"AdminVehicles_"+admin_vehicles[i].category
		var input_id_id = modal_id+"input_id"
		var input_id_name = modal_id+"input_name"
		var input_id_max = modal_id+"input_max"
		var input_id_min = modal_id+"input_min"

		row += `<tr>
					<td class="text-center align-middle">${admin_vehicles[i].vehicle_name}</td>
					<td class="text-center align-middle">${admin_vehicles[i].type}</td>
					<td class="text-center align-middle">${admin_vehicles[i].min_price}€</td>
					<td class="text-center align-middle">${admin_vehicles[i].max_price}€</td>
					<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
				</tr>`

		var myEle = document.getElementById(`${modal_id}`);
		if(!myEle){
			modal += `
				<div class="modal fade" id="${modal_id}" tabindex="-1">
					<div class="modal-dialog modal-lg modal-dialog-centered">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4">
								<div class="text-center">
									<span class="modal-title">Edit Vehicle</span>
								</div>
								<hr>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditVehicleModal"></button>
								<div class="row d-flex justify-content-center">
									<div class="col-md-6" style="border-right: 1px solid #3e3f4b;">
										<label class="modal-title-addveh">Vehicle ID</label>
										<input type="text" id="${input_id_id}" class="form-control flex-grow-1" value="${admin_vehicles[i].vehicle_id}">
										<label class="modal-title-addveh" style="margin-top: 15px;">Vehicle Name</label>
										<input type="text" id="${input_id_name}" class="form-control flex-grow-1" value="${admin_vehicles[i].vehicle_name}">
										<label class="modal-title-addveh">Type <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="editds_dsname" class="form-control flex-grow-1" value="${capitalizeFirstLetter(admin_vehicles[i].type)}" disabled>
									</div>
									<div class="col-md-6">
										<label class="modal-title-addveh">Category <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
										<input type="text" id="editds_dsname" class="form-control flex-grow-1" value="${capitalizeFirstLetter(admin_vehicles[i].category)}" disabled>
										<label class="modal-title-addveh">Min. Price</label>
										<input type="number" id="${input_id_min}" class="form-control flex-grow-1" value="${admin_vehicles[i].min_price}">
										<label class="modal-title-addveh" style="margin-top: 15px;">Max. Price</label>
										<input type="number" id="${input_id_max}" class="form-control flex-grow-1" value="${admin_vehicles[i].max_price}">
									</div>
								</div>
								<div class="dvehicle d-flex justify-content-center align-items-center" data-vehicle="${i}" id="confirmRemoveVehicle">
									<i class="fas fa-trash"></i>&nbsp;Delete Vehicle
								</div>
								<div class="d-flex justify-content-center flex-column">
									<button type="button" id="confirmEditVehicle" class="btn btn-blue flex-grow-1 modal-btn" data-vehicle="${i}" data-input_id_vehicle_id="${input_id_id}" data-input_id_vehicle_name="${input_id_name}" data-input_id_min_price="${input_id_min}" data-input_id_max_price="${input_id_max}" data-bs-toggle="modal" data-bs-target="#editVehicleModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
								</div>
							</div>
						</div>
					</div>
				</div>`;
		}
	}

	if (modal != '') {
		$("body").append(modal);
	}

	$('#adminVehiclesTableData').html(row)

	var table_id = document.getElementById('adminVehiclesTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
}

$(document).on('click', "#confirmEditVehicle", function() {
	var i = $(this).data("vehicle");
	var vehicle = admin_vehicles[i];
	var input_id_vehicle_id = "#"+$(this).data("input_id_vehicle_id");
	var input_id_vehicle_name = "#"+$(this).data("input_id_vehicle_name");
	var input_id_min_price = "#"+$(this).data("input_id_min_price");
	var input_id_max_price = "#"+$(this).data("input_id_max_price");
	var vehicle_id = $(input_id_vehicle_id).val();
	var vehicle_name = $(input_id_vehicle_name).val();
	var min_price = $(input_id_min_price).val();
	var max_price = $(input_id_max_price).val();

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "editVehicleInfo",
		vehicle: vehicle,
		vehicle_id: vehicle_id,
		vehicle_name: vehicle_name,
		min_price: min_price,
		max_price: max_price
	}));
});

$(document).on('click', "#confirmRemoveVehicle", function() {
	admin_vehicles.sort(function(a, b){
		if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
		if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
		return 0;
	})

	var i = $(this).data("vehicle");
	var vehicle = admin_vehicles[i];
	$('.modal').modal('hide');

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "removeVehicleInfo",
		vehicle: vehicle,
	}));
});

$(document).on('click', "#overview_page_admin", function() {
	admin_overview();
});

$(document).on('click', "#veh_page_admin", function() {
	vehicles_overview();
});

function setColors(colors){
	var num = 10;
	for(var i = 0; i < num; i++) {
		var id = i+1
		var elem = document.querySelector('#color'+id);
		elem.style.backgroundColor = `rgb(${colors["color"+id][0]}, ${colors["color"+id][1]}, ${colors["color"+id][2]})`;
	}
}

function showCategories(categories) {
	var num = categories.length;
	var categoriesCard = ``;

	for(var i = 0; i < num; i++) {
		if(i == num-1){
			categoriesCard += `
				<div class="card catalog-item_card">
					<div class="card-body catalog-item_body d-flex justify-content-center align-items-center" id="${categories[i].id}" data-display="${categories[i].display}" style="margin-right: 0px;">
						<span style="font-size: 32px; letter-spacing: 1px; color: #ccc;">${categories[i].display}</span>
					</div>
				</div>
			`;
		} else {
			categoriesCard += `
				<div class="card catalog-item_card">
					<div class="card-body catalog-item_body d-flex justify-content-center align-items-center" id="${categories[i].id}" data-display="${categories[i].display}">
						<span style="font-size: 32px; letter-spacing: 1px; color: #ccc;">${categories[i].display}</span>
					</div>
				</div>
			`;
		}
		
	}
	$('#slide').html(categoriesCard);
	$(".vehicle_shop").fadeIn();
	slide();
}

function openOverview() {
	$('.sidebar-title').html(`Menu`);
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Overview</span></span>
						<div>
							<span class="username align-middle">
								<span id="playerName">${overviewInfos.name}</span> <span id="avatar"><img src="img/${icon}" class="avatar"></span>
							</span>
							<div id="grade">${overviewInfos.rankTag}</div>
						</div>`);
	$('#center_infos').html(`<div class="row h-100">
								<div class="col col-md-6 d-flex justify-content-center" style="padding-right: 8px;">
									<div class="card w-100">
										<div class="card-header card-header_ov text-center">
											<span class="ov_title"><i class="fas fa-piggy-bank"></i> Finances</span>
										</div>
										<div class="card-body card-body_ov text-center">
											<p class="card-text text-center balance_title">Balance</p>
											<p class="ew_txt"><span id="societyBalance">${numberWithSpaces(overviewInfos.balance)}</span> EUR</p>
											<hr>
											<button type="button" id="deposit_money" class="btn btn-blue finances_btn" data-bs-toggle="modal" data-bs-target="#depositModal"><i class="bi bi-upload"></i> Deposit</button>
											<button type="button" id="withdraw_money" class="btn btn-blue finances_btn" data-bs-toggle="modal" data-bs-target="#withdrawModal" style="margin-top: 12px;"><i class="bi bi-download"></i> Withdraw</button>
										</div>
									</div>
								</div>
								<div class="col col-md-6 d-flex justify-content-center" style="padding-left: 8px;">
									<div class="card w-100">
										<div class="card-header card-header_ov text-center">
											<span class="ov_title"><i class="fas fa-calendar-week"></i> Best Employee</span>
										</div>
										<div class="card-body card-body_ov text-center">
											<div><img src="img/${bestEmployeeIcon}" class="ew_img"></div>
											<p class="card-text text-center ew_txt" style="margin-top: 12px;"><span class="ew_txtc">Name:</span> <span id="societyLocalName">${overviewInfos.bestEmployee.name}</span></p>
											<p class="card-text text-center ew_txt"><span class="ew_txtc">Grade:</span> <span id="societyLocalRank">${overviewInfos.bestEmployee.rankTag}</span></p>
											<p class="card-text text-center ew_txt"><span class="ew_txtc">Earned:</span> <span id="societyLocalEarned">${numberWithSpaces(overviewInfos.bestEmployee.earned)}</span> EUR</p>
										</div>
									</div>
								</div>
							</div>
							<div class="card d-flex flex-column flex-grow-1 h-100">
								<div class="card-header card-header_ov text-center">
									<span class="fs-18"><i class="fas fa-car"></i> Most Sold Vehicles</span>
								</div>
								<div class="card-body card-body_ov flex-grow-1">
									<div class="row h-100" id="top3_overview">
									</div>
								</div>
							</div>
	`);

	selectedWindow = "overview";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2 selected" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);

		topVehicles = '';

		for(var i = 0; i < 3; i++) {
			if(!use_same_image){
				vehicle_image = overviewInfos.top3[i].id;
			}
			if (i == 0){
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-right: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			} else if (i == 1) {
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-right: 8px; padding-left: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			} else {
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-left: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			}
		}

		$('#top3_overview').html(topVehicles);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2 selected" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		topVehicles = '';

		for(var i = 0; i < 3; i++) {
			if(!use_same_image){
				vehicle_image = overviewInfos.top3[i].id;
			}
			if (i == 0){
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-right: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			} else if (i == 1) {
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-right: 8px; padding-left: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			} else {
				topVehicles += `<div class="col col-md-4 d-flex justify-content-center" style="padding-left: 8px;">
									<div class="card mostsold_card">
										<div class="card-header card-header_ov text-center">
											<span class="fs-18">${overviewInfos.top3[i].name}</span>
										</div>
										<div class="card-body text-center flex-grow-1 d-flex justify-content-center align-items-center" style="padding: 0;">
											<img src="img/${vehicle_image}.png" class="mostsoldimage">
										</div>
										<div class="fs-18 text-center">Total Sold: <span id="vehicle1_totalsold">${overviewInfos.top3[i].amount}</span></div>
									</div>
								</div>`;
			}
		}

		$('#top3_overview').html(topVehicles);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}
}

$(document).on('click', "#overview_page", function() {
	selectedWindow = "overview";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2 selected" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2 selected" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	}

	openOverview();
});

$(document).on('click', "#saleshistory_page", function() {
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Sales History</span></span>`);
	selectedWindow = "saleshistory";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item selected" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item selected" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}

	$('#center_infos').html(`<table id="salesHistoryTable">
							<thead>
								<tr>
									<th class="text-center">Vehicle</th>
									<th class="text-center">Price</th>
									<th class="text-center">Customer</th>
									<th class="text-center">Date</th>
								</tr>
							</thead>
							<tbody id="salesHistoryTableData">
							</tbody>
						</table>`);

	var row = '';
	var num = allSalesTable.length;

	for(var i = 0; i < num; i++) {
		row += `<tr style="height: 65px;">
					<td class="text-center align-middle">${allSalesTable[i].vehicle_name}</td>
					<td class="text-center align-middle">${numberWithSpaces(allSalesTable[i].price)}€</td>
					<td class="text-center align-middle">${allSalesTable[i].buyer_name}</td>
					<td class="text-center align-middle">${allSalesTable[i].date}</td>
				</tr>`
	}

	$('#salesHistoryTableData').html(row)

	var table_id = document.getElementById('salesHistoryTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
	
});

$(document).on('click', "#employees_page", function() {
	selectedWindow = "employees";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item selected" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item selected" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}

	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Employees</span></span>
						<div class="d-flex" id="top-search">
							
							<button type="button" id="hireEmployeeButton" class="btn btn-blue adbtn" data-bs-toggle="modal" data-bs-target="#hireEmployeeModal"><i class="fas fa-plus"></i> Hire</button>
						</div>`);

	$('#center_infos').html(`<div class="window"></div>`);

	updateEmployees();
});

$(document).on('click', "#hireEmployeeButton", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "getClosePeople",
	}));
});

$(document).on('click', "#confirmHireEmployee", function() {
	var dropdown_value = $("#dropdown_to_hire").val();
	if(closePeopleList[dropdown_value] != undefined) {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "hire",
			identifier: closePeopleList[dropdown_value].identifier,
			name: closePeopleList[dropdown_value].name,
			shop_id: overviewInfos.id,
		}));
	} else {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "not_hire",
		}));
	}
});

function updateEmployees() {
	var num2 = employeesList.length;
	var added = 0;
	var row = '<div class="row g-2">';
	var modal = '';
	var employeesModalsDropdown = [];
	var num = rankTags.length;
	var dropdown = ``;

	for(var i = 0; i < num; i++) {
		dropdown += `
			<option value="${i}">${rankTags[i]}</option>
		`;
	}

	for(var i = 0; i < num2; i++) {
		var modal_id = "EmployeesModal_"+employeesList[i].identifier;
		var input_id = modal_id+"Input";
		var grade_id = modal_id+"_grade";
		var earned_id = modal_id+"_earned";
		var fire_btns = modal_id+"fire_btns";
		var fire_text = modal_id+"fire_text";
		var dropdown_id = modal_id+"dropdown";
		var employeeIcon = "avatar_male.png";
		var fire_employee_modal = modal_id+"fire_modal";
		added++;

		if(employeesList[i].sex == "m"){
			employeeIcon = "avatar_male.png";
		} else {
			employeeIcon = "avatar_female.png";
		}

		row += `
			<div class="col-md-3">
				<div class="card item_card">
					<div class="card-body text-center flex-grow-1 d-flex flex-column justify-content-between pb-1 align-items-center">
						<div class="expiration-time"><span>Earned: ${employeesList[i].earned}€</span></div>
						<img src="img/${employeeIcon}" class="image" style="border-radius: 10px;">
						<div class="item_card-spacer" style="margin-bottom: -50;">
							<div class="item-price text-center" style="line-height: 1;">${employeesList[i].rankTag}</div>
							<div class="item-title text-center" style="line-height: 1; margin-top: 7px;">${employeesList[i].name}</div>
						</div>
					</div>
					<a href="#" class="btn btn-blue d-block item_card-btn" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</a>
				</div>
			</div>
		`;

		if ((added) % 4 === 0) {
			row = addStr(row, row.length, `</div><div class="row g-2" style="margin-top: 0px;">`);
		}

		var myEle = document.getElementById(`${modal_id}`);
		if(!myEle){
			modal += `
				<div class="modal fade" id="${modal_id}" tabindex="-1">
					<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4 text-center">
								<div class="modal-title">Edit Employee</div>
								<hr>
								<div class="modal-title" style="font-weight: 500;">Name: ${employeesList[i].name}</div>
								<div class="modal-title" id="${earned_id}" style="font-weight: 500;">Total Earned: ${employeesList[i].earned}€</div>
								<div class="modal-title" id="${grade_id}" style="font-weight: 500;">Grade: ${employeesList[i].rankTag}</div>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditEmployeeModal"></button>
								<div class="d-flex justify-content-center flex-column">
									<select id="${dropdown_id}" class="form-select form-select-lg">${dropdown}</select>
									<div class="femployee" id="fire_employee_btn" data-bs-toggle="modal" data-bs-target="#${fire_employee_modal}" data-bs-dismiss="modal"><i class="fas fa-trash"></i> Fire Employee</div>
									<button type="button" id="confirmEditEmployee" data-dropdown="${dropdown_id}" data-id="${employeesList[i].identifier}" data-shop_id="${employeesList[i].shop_id}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="modal fade" id="${fire_employee_modal}" tabindex="-1">
					<div class="modal-dialog modal-lg modal-dialog-centered" style="width: 500px;">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4">
								<div class="text-center">
									<span style="font-weight: 600; font-size: 40px; text-align: center;">Are you sure?</span>
								</div>
								<hr>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeDepositMoneyModal"></button>
								<div class="text-center" id="${fire_text}" style="font-size: 30px; font-weight: 500;">Do you want to fire ${employeesList[i].name}?</div>
								<div class="d-flex justify-content-center align-items-center" style="margin-top: 10px;" id="${fire_btns}">
									<a id="cancelAction" href="#" class="btn btn-dark d-block w-50" style="border-radius: 10px; font-size: 30px; margin-right: 15px;" data-bs-dismiss="modal"><i class="fas fa-times"></i> CANCEL</a>
									<a id="fire_employee" href="#" class="btn btn-blue d-block w-50" style="border-radius: 10px; font-size: 30px;" data-id="${employeesList[i].identifier}" data-shop_id="${employeesList[i].shop_id}"><i class="fas fa-shopping-cart"></i> FIRE</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
		} else {
			$("#"+grade_id).html(`Grade: ${employeesList[i].rankTag}`);
			$("#"+earned_id).html(`Total Earned: ${employeesList[i].earned}€`);
			$("#"+fire_btns).html(`
				<a id="cancelAction" href="#" class="btn btn-dark d-block w-50" style="border-radius: 10px; font-size: 30px; margin-right: 15px;" data-bs-dismiss="modal"><i class="fas fa-times"></i> CANCEL</a>
				<a id="fire_employee" href="#" class="btn btn-blue d-block w-50" style="border-radius: 10px; font-size: 30px;" data-id="${employeesList[i].identifier}" data-shop_id="${employeesList[i].shop_id}"><i class="fas fa-shopping-cart"></i> FIRE</a>
			`);
			$("#"+fire_text).html(`Do you want to fire ${employeesList[i].name}?`);
		}
	}
	
	if (modal != '') {
		$("body").append(modal);
	}

	row += `</div>`;
	$('.window').html(row);
}

$(document).on('click', "#fire_employee", function() {
	var shop_id = $(this).data("shop_id");
	var id = $(this).data("id");
	$('.modal').modal('hide');
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "fireEmployee",
		shop_id: shop_id,
		identifier: id,
	}));
});

$(document).on('click', "#confirmEditEmployee", function() {
	var dropdown_id = '#'+$(this).data("dropdown");
	var dropdown_value = $(dropdown_id).val();
	var shop_id = $(this).data("shop_id");
	var id = $(this).data("id");
	var dropdown_i = parseInt(dropdown_value)+1

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "editEmployee",
		rank: dropdown_i,
		shop_id: shop_id,
		identifier: id,
	}));
});

$(document).on('click', "#pricetable_page", function() {
	selectedWindow = "pricetable";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item selected" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item selected" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}

	updatePriceTable();
});

function updatePriceTable() {
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Price Table</span></span>
						<div class="d-flex" id="top-search">
							<div class="input-group">
								<input type="search" id="searchbox" class="form-control searchbox" placeholder="Search..." style="margin-right: 1px;">
								<button type="button" id="searchbtn" class="btn btn-blue searchbtn"><i class="fas fa-search"></i></button>
							</div>
						</div>`);

	$('#center_infos').html(`<table id="priceTableTable">
							<thead>
								<tr>
									<th class="text-center">Vehicle</th>
									<th class="text-center">Price</th>
									<th class="text-center">Actions</th>
								</tr>
							</thead>
							<tbody id="priceTableTableData">
							</tbody>
						</table>`);

	var row = '';
	var num = catalog.length;
	var modal = '';

	for(var i = 0; i < num; i++) {
		var modal_id = "PriceTable_"+catalog[i].vehicle_id+"PriceTable_"+catalog[i].price+"PriceTable_"+catalog[i].type
		var input_id = modal_id+"Input"
		var modal_min = modal_id+"min_price"
		var modal_max = modal_id+"max_price"

		row += `<tr>
					<td class="text-center align-middle">${catalog[i].vehicle_name}</td>
					<td class="text-center align-middle">${numberWithSpaces(catalog[i].price)}€</td>
					<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
				</tr>`
	
		var myEle = document.getElementById(`${modal_id}`);
		if(!myEle){
			modal += `
				<div class="modal fade" id="${modal_id}" tabindex="-1">
					<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4 text-center">
								<div class="modal-title">Edit Vehicle</div>
								<hr>
								<div class="modal-title" style="font-weight: 500;">Name: ${catalog[i].vehicle_name}</div>
								<div class="modal-title" style="font-weight: 500;">Current Price: ${numberWithSpaces(catalog[i].price)}€</div>
								<div class="modal-title" style="font-weight: 500;">Min. Price: ${numberWithSpaces(catalog[i].min_price)}€</div>
								<div class="modal-title" style="font-weight: 500;">Max. Price: ${numberWithSpaces(catalog[i].max_price)}€</div>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditPriceModal"></button>
								<div class="d-flex justify-content-center flex-column">
									<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="New Price">
									<button type="button" id="confirmEditPrice" data-vehicle="${catalog[i].vehicle_id}" data-type="${catalog[i].type}" data-input="${input_id}" data-stock="${catalog[i].stock}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#editPriceModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
								</div>
							</div>
						</div>
					</div>
				</div>`;
		} else {
			$('#'+modal_min).html(`Min. Price: ${numberWithSpaces(catalog[i].min_price)}€`);
			$('#'+modal_max).html(`Max. Price: ${numberWithSpaces(catalog[i].max_price)}€`);
		}
	}

	if (modal != '') {
		$("body").append(modal);
	}

	$('#priceTableTableData').html(row)

	var table_id = document.getElementById('priceTableTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
}

$(document).on('click', "#confirmEditPrice", function() {
	var input_id = '#'+$(this).data("input");
	var amount = $(input_id).val();
	var vehicle_id = $(this).data("vehicle");
	var type = $(this).data("type");

	
	if(amount == ""){
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "notEnoughMoney"
		}));
	} else {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "editPrice",
			amount: amount,
			vehicle_id: vehicle_id,
			type: type,
			id: overviewInfos.id,
		}));
	}

	$(input_id).val('');
});

$(document).on('click', "#orders_page", function() {
	selectedWindow = "orders";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page" selected><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	}

	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

	ordersTable();
});

function ordersTable() {
	$('#center_infos').html(`<table id="missionsTable">
							<thead>
								<tr>
									<th class="text-center">Vehicle</th>
									<th class="text-center">Reward</th>
									<th class="text-center">Employee</th>
									<th class="text-center">Actions</th>
								</tr>
							</thead>
							<tbody id="missionsTableData">
							</tbody>
						</table>`);

	var row = '';
	var num = orders.length;

	for(var i = 0; i < num; i++) {
		if(orders[i].employee_id == "" && orders[i].employee_name == "") {
			row += `<tr style="height: 65px;">
						<td class="text-center align-middle">${orders[i].vehicle_name}</td>
						<td class="text-center align-middle">${numberWithSpaces(orders[i].reward)}€</td>
						<td class="text-center align-middle">None</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" id="accept_order" data-vehicle_id="${orders[i].vehicle_id}" data-reward="${orders[i].reward}" data-shop_id="${orders[i].shop_id}" data-id="${orders[i].id}"><i class="fas fa-check"></i> ACCEPT</button></td>
					</tr>`
		} else {
			row += `<tr style="height: 65px;">
						<td class="text-center align-middle">${orders[i].vehicle_name}</td>
						<td class="text-center align-middle">${numberWithSpaces(orders[i].reward)}€</td>
						<td class="text-center align-middle">${orders[i].employee_name}</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-green btn-edit" disabled><i class="fas fa-check"></i> ACCEPTED</button></td>
					</tr>`
		}
	}

	$('#missionsTableData').html(row)

	var table_id = document.getElementById('missionsTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
}

$(document).on('click', "#ads_page", function() {
	selectedWindow = "catalog";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item selected" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item selected" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}

	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Catalog</span></span>
							<div class="d-flex" id="top-search">
								<div class="input-group" style="margin-right: 10px;">
									<input type="search" id="searchbox" class="form-control searchbox" placeholder="Search..." style="margin-right: 1px;">
									<button type="button" id="searchbtn" class="btn btn-blue searchbtn"><i class="fas fa-search"></i></button>
								</div>
								<button type="button" id="refreshbtn" class="btn btn-blue"><i class="fas fa-sync-alt"></i></button>
								<button type="button" id="placeAd" class="btn btn-blue adbtn" data-bs-toggle="modal" data-bs-target="#placeAdModal"><i class="fas fa-plus"></i> Place an Ad</button>
							</div>
	`);

	$('#center_infos').html(`<div class="window"></div>`);

	updateCatalog();
});

function updateCatalog() {

	var num = vehicles.length;
	var dropdown = ``;

	for(var i = 0; i < num; i++) {
		dropdown += `
			<option value="${i}">${vehicles[i].vehicle_name} (x${vehicles[i].stock})</option>
		`;
	}
	$('#dropdown').html(dropdown);

	var num2 = catalog.length;
	var added = 0;
	var row = '<div class="row g-2">';
	var modal = '';

	for(var i = 0; i < num2; i++) {
		if(catalog[i].stock > 0) {
			var modal_id = "CatalogModal_"+catalog[i].vehicle_id+"CatalogModal_"+catalog[i].type
			var input_id = modal_id+"Input"
			added++

			if(!use_same_image){
				vehicle_image = catalog[i].vehicle_id;
			}

			row += `
				<div class="col-md-3">
					<div class="card item_card">
						<div class="card-body text-center flex-grow-1 d-flex flex-column justify-content-between pb-1 align-items-center">
							<div class="expiration-time"><span>On Sale: ${catalog[i].stock}</span></div>
							<img src="img/${vehicle_image}.png" class="image">
							<div class="item_card-spacer">
								<div class="item-price text-center">${numberWithSpaces(catalog[i].price)} €</div>
								<div class="item-title text-center">${catalog[i].vehicle_name}</div>
							</div>
						</div>
						<a href="#" class="btn btn-blue d-block item_card-btn" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-times"></i> CANCEL</a>
					</div>
				</div>
			`;

			if ((added) % 4 === 0) {
				row = addStr(row, row.length, `</div><div class="row g-2" style="margin-top: 0px;">`);
			}

			var myEle = document.getElementById(`${modal_id}`);
			if(!myEle){
				modal += `
					<div class="modal fade" id="${modal_id}" tabindex="-1">
						<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
							<div class="modal-content myinvoices_modal-content">
								<div class="modal-body p-4 text-center">
									<span class="modal-title">Cancel Ad</span>
									<hr>
									<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeCancelAdModal"></button>
									<div class="d-flex justify-content-center flex-column">
										<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="Amount">
										<button type="button" id="cancelAd" data-vehicle="${catalog[i].vehicle_id}" data-type="${catalog[i].type}" data-input="${input_id}" data-stock="${catalog[i].stock}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#cancelAdModal" data-bs-dismiss="modal"><i class="fas fa-times"></i> CANCEL</button>
									</div>
								</div>
							</div>
						</div>
					</div>`;
			}
		}
	}
	
	if (modal != '') {
		$("body").append(modal);
	}

	row += `</div>`;
	$('.window').html(row);
}

$(document).on('click', "#confirmPlaceAd", function() {
	var id = document.getElementById("dropdown").value;
	var amount = document.getElementById("placead_amount").value;

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "addAd",
		vehicle: vehicles[id],
		amount: amount
	}));

	$("#placead_amount").val('');
});

$(document).on('click', "#cancelAd", function() {
	var input_id = '#'+$(this).data("input");
	var amount = $(input_id).val();
	var vehicle_id = $(this).data("vehicle");
	var type = $(this).data("type");
	var stock = $(this).data("stock");

	
	if(amount == ""){
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "notEnoughMoney"
		}));
	} else {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "cancelAd",
			amount: amount,
			vehicle_id: vehicle_id,
			type: type,
			id: overviewInfos.id,
		}));
	}

	$(input_id).val('');
});

$(document).on('click', "#accept_order", function() {
	var vehicle_id = $(this).data("vehicle_id");
	var reward = $(this).data("reward");
	var shop_id = $(this).data("shop_id");
	var id = $(this).data("id");

	if(!isWorking){
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "startMission",
			vehicle_id: vehicle_id,
			reward: reward,
			shop_id: shop_id,
			id: id,
		}));
	} else {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "finishOrder",
		}));
	}
	
});

$(document).on('click', "#stock_page", function() {
	$('#top_bar').html(`<span class="selected-page"><span id="page-title">Stock</span></span>
						<div class="d-flex" id="top-search">
							<div class="input-group" style="margin-right: 10px;">
								<input type="search" id="searchbox" class="form-control searchbox" placeholder="Search..." style="margin-right: 1px;">
								<button type="button" id="searchbtn" class="btn btn-blue searchbtn"><i class="fas fa-search"></i></button>
							</div>
							<button type="button" id="refreshbtn" class="btn btn-blue" style="margin-right: 0px;"><i class="fas fa-sync-alt"></i></button>
						</div>`
	);

	selectedWindow = "stock";

	if(overviewInfos.rank == 0) { 
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item selected" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="sellbusiness_btn" data-bs-toggle="modal" data-bs-target="#sellbusiness_modal"><i class="fas fa-building"></i> <span class="ms-1">Sell Business</span></p>
		`);
	} else if(overviewInfos.rank == subOwnerRank) {
		$('#sidebar').html(`
			<p class="sidebar-item mt-2" id="overview_page"><i class="bi bi-grid-1x2-fill"></i> <span class="ms-1">Overview</span></p>
			<p class="sidebar-item" id="ads_page"><i class="fas fa-book-open"></i> <span class="ms-1">Catalog</span></p>
			<p class="sidebar-item selected" id="stock_page"><i class="fas fa-warehouse"></i> <span class="ms-1">Stock</span></p>
			<p class="sidebar-item" id="pricetable_page"><i class="fas fa-tags"></i> <span class="ms-1">Price Table</span></p>
			<p class="sidebar-item" id="saleshistory_page"><i class="fas fa-chart-bar"></i> <span class="ms-1">Sales History</span></p>
			<p class="sidebar-item" id="employees_page"><i class="fas fa-user-friends"></i> <span class="ms-1">Employees</span></p>
			<p class="sidebar-item" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);
	} else {
		$('#sidebar').html(`
			<p class="sidebar-item selected" id="orders_page"><i class="fas fa-map-marked-alt"></i> <span class="ms-1">Orders</span></p>
			<p class="sidebar-item-red" id="leavebusiness_btn" data-bs-toggle="modal" data-bs-target="#leavebusiness_modal"><i class="fas fa-user-tie"></i> <span class="ms-1">Quit Job</span></p>
		`);

		$('#top_bar').html(`<span class="selected-page"><span id="page-title">Missions</span></span>`);

		ordersTable();
	}

	$('#center_infos').html(`<div class="window"></div>`);

	updateStock();
});

function updateStock() {
	var num2 = vehicles.length;
	var added = 0;
	var row = '<div class="row g-2">';
	var modal = '';

	for(var i = 0; i < num2; i++) {
		var modal_id = "StockModal_"+vehicles[i].vehicle_id+"StockModal_"+vehicles[i].type
		var input_id = modal_id+"Input"
		added++

		if(!use_same_image){
			vehicle_image = vehicles[i].vehicle_id;
		}

		row += `
			<div class="col-md-3">
				<div class="card item_card">
					<div class="card-body text-center flex-grow-1 d-flex flex-column justify-content-between pb-1 align-items-center">
						<div class="expiration-time"><span>Stock: ${vehicles[i].stock}</span></div>
						<img src="img/${vehicle_image}.png" class="image">
						<div class="item_card-spacer" style="margin-bottom: -50;">
							<div class="item-price text-center">${numberWithSpaces(vehicles[i].owner_buy_price)} €</div>
							<div class="item-title text-center">${vehicles[i].vehicle_name}</div>
						</div>
					</div>
					<a href="#" class="btn btn-blue d-block item_card-btn" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-shopping-cart"></i> BUY</a>
				</div>
			</div>
		`;

		if ((added) % 4 === 0) {
			row = addStr(row, row.length, `</div><div class="row g-2" style="margin-top: 0px;">`);
		}

		var myEle = document.getElementById(`${modal_id}`);
		if(!myEle){
			modal += `
				<div class="modal fade" id="${modal_id}" tabindex="-1">
					<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
						<div class="modal-content myinvoices_modal-content">
							<div class="modal-body p-4 text-center">
								<div class="modal-title">Buy Vehicle</div>
								<hr>
								<div class="text-center modal-title" style="font-weight: 500;">${vehicles[i].vehicle_name} for ${numberWithSpaces(vehicles[i].owner_buy_price)}€</div>
								<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeBuyVehicleModal"></button>
								<div class="d-flex justify-content-center flex-column">
									<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="Amount">
									<button type="button" id="confirmBuyVehicle" data-vehicle="${vehicles[i].vehicle_id}" data-type="${vehicles[i].type}" data-input="${input_id}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#buyVehicleModal" data-bs-dismiss="modal"><i class="fas fa-shopping-cart"></i> BUY</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	}
	
	if (modal != '') {
		$("body").append(modal);
	}

	row += `</div>`;
	$('.window').html(row);
}

$(document).on('click', "#confirmBuyVehicle", function() {
	var input_id = '#'+$(this).data("input");
	var amount = $(input_id).val();
	var vehicle_id = $(this).data("vehicle");
	var type = $(this).data("type");

	if(amount == ""){
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "notEnoughMoney"
		}));
	} else {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "buyVehicleOwner",
			amount: amount,
			vehicle_id: vehicle_id,
			type: type,
			id: overviewInfos.id,
		}));
	}

	$(input_id).val('');
});

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).on('click', "#confirmAddVehicle", function() {
	var id = document.getElementById("dropdown_type").value;
	var id2 = document.getElementById("dropdown_categories").value;
	var type = admin_typeCategoriesVehicles[id-1].type;
	var category = admin_typeCategoriesVehicles[id-1].categories[id2-1];
	var vehicle_id = document.getElementById("addvehicle_vehicleid").value;
	var vehicle_name = document.getElementById("addvehicle_vehiclename").value;
	var min_price = document.getElementById("addvehicle_minprice").value;
	var max_price = document.getElementById("addvehicle_maxprice").value;

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "addVehicleToDB",
		type: type,
		category: category.id,
		vehicle_id: vehicle_id,
		vehicle_name: vehicle_name,
		min_price: min_price,
		max_price: max_price
	}));

	$('#addvehicle_vehicleid').val('');
	$('#addvehicle_vehiclename').val('');
	$('#addvehicle_minprice').val('');
	$('#addvehicle_maxprice').val('');
	document.getElementById('confirmAddVehicle').disabled = true;
});

function checkIfEmpty() {
	if(selectedWindow == "adminMenu_vehicles") {
		if(document.getElementById("dropdown_categories").value != previousValue){
			previousValue = document.getElementById("dropdown_categories").value;
		} else if(document.getElementById("dropdown_categories").value == previousValue && document.getElementById("dropdown_type").value != previousValue2) {
			previousValue2 = document.getElementById("dropdown_type").value;
			if(document.getElementById("dropdown_type").value != 0) {
				previousValue = 0;
				var id = document.getElementById("dropdown_type").value;
				var cats = admin_typeCategoriesVehicles[id-1].categories;
				var num = cats.length;
				var dropdown = `<option value="0">Select an option</option>`;

				for(var i = 0; i < num; i++) {
					dropdown += `
						<option value="${i+1}">${capitalizeFirstLetter(admin_typeCategoriesVehicles[id-1].categories[i].display)}</option>
					`;
				}
				$('#dropdown_categories').html(dropdown);
			} else if(document.getElementById("dropdown_type").value == 0) {
				previousValue = 0;
				var dropdown = `<option value="0">Select an option</option>`;
				$('#dropdown_categories').html(dropdown);
			}
		}
		
		if(document.getElementById("dropdown_categories").value == 0 || document.getElementById("dropdown_type").value == 0 || document.getElementById("addvehicle_vehicleid").value == "" || document.getElementById("addvehicle_vehiclename").value == "" || document.getElementById("addvehicle_minprice").value == "" || document.getElementById("addvehicle_maxprice").value == ""){
			document.getElementById('confirmAddVehicle').disabled = true;
		} else {
			document.getElementById('confirmAddVehicle').disabled = false;
		}
	}
}

$(document).on('click', "#depositMoneyButton", function() {
	var amount = $('#deposit_value').val();
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "deposit",
		amount: amount,
	}));

	$('#deposit_value').val('');
});

$(document).on('click', "#withdrawMoneyButton", function() {
	var amount = $('#withdraw_value').val();
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "withdraw",
		amount: amount,
	}));

	$('#withdraw_value').val('');
});

$(document).on('click', ".catalog-item_body", function() {
	showVehicles(this.id, $(this).data("display"));
});

$(document).on('click', ".color", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "changeColor",
		id: this.id,
	}));
});

$(document).on('click', ".catalog-item_body-vehicle", function() {
	$('.btns').html(`
		<button type="button" id="${this.id}" class="btn btn-blue btns-buy" data-bs-toggle="modal" data-bs-target="#buyvehicle_modal" disabled><i class="fas fa-shopping-cart"></i> BUY</button>
		<button type="button" id="${this.id}" class="btn btn-white btns-test"><i class="fas fa-play"></i> TEST</button>
	`);

	selected_vehicle_id = this.id;
	$('#vehicle_name_modal').html(vehicleCategory+" "+$(this).data("name"));
	$('#vehicle_price_modal').html(numberWithSpaces($(this).data("price"))+"€");

	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "spawnVehicle",
		id: this.id,
		brand: $(this).data("display"),
		model: $(this).data("name"),
		price: numberWithSpaces($(this).data("price"))+"€",
	}));
});

$(document).on('click', ".btns-test", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "testDrive",
		id: this.id,
	}));
});

$(document).on('click', "#buyvehicle_btn_modal", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "buy",
		id: selected_vehicle_id,
		stand: shopID,
		type: currentType,
	}));
});

$(document).on('click', "#leavebusiness_btn_modal", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "leavebusiness",
	}));
});

$(document).on('click', "#sellbusiness_btn_modal", function() {
	$.post('https://okokVehicleShop/action', JSON.stringify({
		action: "sellbusiness",
	}));
});

function showVehicles(category, displayCategory) {
	var num = vehiclesInStand.length;
	var vehiclesCard = ``;
	var cardToAdd = ``;
	vehicleCategory = displayCategory;

	for(var i = 0; i < num; i++) {
		if(!use_same_image){
			vehicle_image = vehiclesInStand[i].vehicle_id;
		}

		if(vehiclesInStand[i].category == category){
			cardToAdd = `
				<div class="card catalog-item_card-vehicle">
					<span class="stock-label outofstock">OUT OF STOCK</span>
					<div class="card-body catalog-item_body-vehicle" id="${vehiclesInStand[i].vehicle_id}" data-display="${displayCategory}" data-name="${vehiclesInStand[i].vehicle_name}" data-price="0">
						<div style="line-height: 1;">${displayCategory}</div>
						<div style="line-height: 1;">${vehiclesInStand[i].vehicle_name}</div>
						<div class="d-flex justify-content-center mt-2">
							<img src="img/${vehicle_image}.png" class="image">
						</div>
					</div>
				</div>
			`;
			if(vehiclesInStand[i].stock != undefined && vehiclesInStand[i].stock[shopID] && vehiclesInStand[i].stock[shopID].amount > 0){
				cardToAdd = `
					<div class="card catalog-item_card-vehicle">
						<span class="stock-label instock">IN STOCK</span>
						<div class="card-body catalog-item_body-vehicle" id="${vehiclesInStand[i].vehicle_id}" data-display="${displayCategory}" data-name="${vehiclesInStand[i].vehicle_name}" data-price="${vehiclesInStand[i].stock[shopID].price}">
							<div style="line-height: 1;">${displayCategory}</div>
							<div style="line-height: 1;">${vehiclesInStand[i].vehicle_name}</div>
							<div class="d-flex justify-content-center mt-2">
								<img src="img/${vehicle_image}.png" class="image">
							</div>
						</div>
					</div>
				`;
			}

			vehiclesCard += cardToAdd;
		}
	}
	$('#slide').html(vehiclesCard);
	$("#goback-button").fadeIn();
	slide();
}

$(document).on('click', "#goback-button", function() {
	$("#goback-button").fadeOut();
	showCategories(currentCategories);
});

$(document).on('click', "#exit-button", function() {
	closeMenu();
});


$(document).on('click', "#logout-btn", function() {
	closeMenu();
});

$(document).on('click', "#refreshbtn", function() {
	if(selectedWindow == "catalog" || selectedWindow == "stock") {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "refreshStockAndCatalog",
		}));
	}
});

$(document).on('click', "#searchbtn", function() {
	var search_text = $("#searchbox").val();
	search_text = search_text.toLowerCase();
	var list_to_set = [];

	if(search_text == "") {

		if(selectedWindow == "catalog") {
			updateCatalog();
		} else if(selectedWindow == "stock") {
			updateStock();
		} else if(selectedWindow == "pricetable") {
			updatePriceTable();
		} else if(selectedWindow == "adminMenu_vehicles") {
			vehicles_overview();
		}

	} else if(selectedWindow == "catalog") {
		list_to_set = catalog;
		searchCatalog(list_to_set, search_text);

	} else if(selectedWindow == "stock") {
		list_to_set = vehicles;
		searchStock(list_to_set, search_text);

	} else if(selectedWindow == "pricetable") {
		list_to_set = catalog;
		searchPricetable(list_to_set, search_text);

	} else if(selectedWindow == "adminMenu_vehicles") {
		list_to_set = admin_vehicles;
		searchAdminVehicles(list_to_set, search_text);
	}
});

function searchCatalog(list, word) {
	var num = vehicles.length;
	var dropdown = ``;

	for(var i = 0; i < num; i++) {
		dropdown += `
			<option value="${i}">${vehicles[i].vehicle_name} (x${vehicles[i].stock})</option>
		`;
	}
	$('#dropdown').html(dropdown);

	var num2 = list.length;
	var added = 0;
	var row = '<div class="row g-2">';
	var modal = '';

	for(var i = 0; i < num2; i++) {
		var str = list[i].vehicle_name;
		str = str.toLowerCase();
		if (str.includes(word)) {
			if (list[i].stock > 0) {
				var modal_id = "CatalogModal_"+list[i].vehicle_id+"CatalogModal_"+list[i].type
				var input_id = modal_id+"Input"
				added++

				if(!use_same_image){
					vehicle_image = list[i].vehicle_id;
				}

				row += `
					<div class="col-md-3">
						<div class="card item_card">
							<div class="card-body text-center flex-grow-1 d-flex flex-column justify-content-between pb-1 align-items-center">
								<div class="expiration-time"><span>On Sale: ${list[i].stock}</span></div>
								<img src="img/${vehicle_image}.png" class="image">
								<div class="item_card-spacer">
									<div class="item-price text-center">${numberWithSpaces(list[i].price)} €</div>
									<div class="item-title text-center">${list[i].vehicle_name}</div>
								</div>
							</div>
							<a href="#" class="btn btn-blue d-block item_card-btn" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-times"></i> CANCEL</a>
						</div>
					</div>
				`;

				if ((added) % 4 === 0) {
					row = addStr(row, row.length, `</div><div class="row g-2" style="margin-top: 0px;">`);
				}

				var myEle = document.getElementById(`${modal_id}`);
				if(!myEle){
					modal += `
						<div class="modal fade" id="${modal_id}" tabindex="-1">
							<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
								<div class="modal-content myinvoices_modal-content">
									<div class="modal-body p-4 text-center">
										<span class="modal-title">Cancel Ad</span>
										<hr>
										<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeCancelAdModal"></button>
										<div class="d-flex justify-content-center flex-column">
											<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="Amount">
											<button type="button" id="cancelAd" data-vehicle="${list[i].vehicle_id}" data-type="${list[i].type}" data-input="${input_id}" data-stock="${list[i].stock}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#cancelAdModal" data-bs-dismiss="modal"><i class="fas fa-times"></i> CANCEL</button>
										</div>
									</div>
								</div>
							</div>
						</div>`;
				}
			}
		}
	}
	
	if (modal != '') {
		$("body").append(modal);
	}

	row += `</div>`;
	$('.window').html(row);
}

function searchStock(list, word) {
	var num2 = list.length;
	var added = 0;
	var row = '<div class="row g-2">';
	var modal = '';

	for(var i = 0; i < num2; i++) {
		var str = list[i].vehicle_name;
		str = str.toLowerCase();
		if (str.includes(word)) {
			var modal_id = "StockModal_"+list[i].vehicle_id+"StockModal_"+list[i].type
			var input_id = modal_id+"Input"
			added++

			if(!use_same_image){
				vehicle_image = list[i].vehicle_id;
			}

			row += `
				<div class="col-md-3">
					<div class="card item_card">
						<div class="card-body text-center flex-grow-1 d-flex flex-column justify-content-between pb-1 align-items-center">
							<div class="expiration-time"><span>Stock: ${list[i].stock}</span></div>
							<img src="img/${vehicle_image}.png" class="image">
							<div class="item_card-spacer" style="margin-bottom: -50;">
								<div class="item-price text-center">${numberWithSpaces(list[i].owner_buy_price)} €</div>
								<div class="item-title text-center">${list[i].vehicle_name}</div>
							</div>
						</div>
						<a href="#" class="btn btn-blue d-block item_card-btn" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-shopping-cart"></i> BUY</a>
					</div>
				</div>
			`;

			if ((added) % 4 === 0) {
				row = addStr(row, row.length, `</div><div class="row g-2" style="margin-top: 0px;">`);
			}

			var myEle = document.getElementById(`${modal_id}`);
			if(!myEle){
				modal += `
					<div class="modal fade" id="${modal_id}" tabindex="-1">
						<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
							<div class="modal-content myinvoices_modal-content">
								<div class="modal-body p-4 text-center">
									<div class="modal-title">Buy Vehicle</div>
									<hr>
									<div class="text-center modal-title" style="font-weight: 500;">${list[i].vehicle_name} for ${numberWithSpaces(list[i].owner_buy_price)}€</div>
									<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeBuyVehicleModal"></button>
									<div class="d-flex justify-content-center flex-column">
										<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="Amount">
										<button type="button" id="confirmBuyVehicle" data-vehicle="${list[i].vehicle_id}" data-type="${list[i].type}" data-input="${input_id}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#buyVehicleModal" data-bs-dismiss="modal"><i class="fas fa-shopping-cart"></i> BUY</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				`;
			}
		}
	}
	
	if (modal != '') {
		$("body").append(modal);
	}

	row += `</div>`;
	$('.window').html(row);
}

function searchPricetable(list, word) {
	var row = '';
	var num = list.length;
	var modal = '';

	for(var i = 0; i < num; i++) {
		var str = list[i].vehicle_name;
		str = str.toLowerCase();
		if (str.includes(word)) {
			var modal_id = "PriceTable_"+list[i].vehicle_id+"PriceTable_"+list[i].price+"PriceTable_"+list[i].type
			var input_id = modal_id+"Input"
			var modal_min = modal_id+"min_price"
			var modal_max = modal_id+"max_price"

			row += `<tr>
						<td class="text-center align-middle">${list[i].vehicle_name}</td>
						<td class="text-center align-middle">${numberWithSpaces(list[i].price)}€</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
					</tr>`
		
			var myEle = document.getElementById(`${modal_id}`);
			if(!myEle){
				modal += `
					<div class="modal fade" id="${modal_id}" tabindex="-1">
						<div class="modal-dialog modal-dialog-centered" style="width: 400px;">
							<div class="modal-content myinvoices_modal-content">
								<div class="modal-body p-4 text-center">
									<div class="modal-title">Edit Vehicle</div>
									<hr>
									<div class="modal-title" style="font-weight: 500;">Name: ${list[i].vehicle_name}</div>
									<div class="modal-title" style="font-weight: 500;">Current Price: ${numberWithSpaces(list[i].price)}€</div>
									<div class="modal-title" id="${modal_min}" style="font-weight: 500;">Min. Price: ${numberWithSpaces(list[i].min_price)}€</div>
									<div class="modal-title" id="${modal_max}" style="font-weight: 500;">Max. Price: ${numberWithSpaces(list[i].max_price)}€</div>
									<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditPriceModal"></button>
									<div class="d-flex justify-content-center flex-column">
										<input type="number" id="${input_id}" class="form-control flex-grow-1 text-center" placeholder="New Price">
										<button type="button" id="confirmEditPrice" data-vehicle="${list[i].vehicle_id}" data-type="${list[i].type}" data-input="${input_id}" data-stock="${list[i].stock}" class="btn btn-blue flex-grow-1 modal-btn" data-bs-toggle="modal" data-bs-target="#editPriceModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
									</div>
								</div>
							</div>
						</div>
					</div>`;
			} else {
				$('#'+modal_min).html(`Min. Price: ${numberWithSpaces(list[i].min_price)}€`);
				$('#'+modal_max).html(`Max. Price: ${numberWithSpaces(list[i].max_price)}€`);
			}
		}
	}

	if (modal != '') {
		$("body").append(modal);
	}

	$('#priceTableTableData').html(row)

	var table_id = document.getElementById('priceTableTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
}

function searchAdminVehicles(list, word) {
	list.sort(function(a, b){
		if(a.vehicle_name.toUpperCase() < b.vehicle_name.toUpperCase()) { return -1; }
		if(a.vehicle_name.toUpperCase() > b.vehicle_name.toUpperCase()) { return 1; }
		return 0;
	})

	var row = '';
	var num = list.length;
	var modal = '';

	for(var i = 0; i < num; i++) {
		var str = list[i].vehicle_name;
		str = str.toLowerCase();
		if (str.includes(word)) {
			var modal_id = "AdminVehicles_"+list[i].vehicle_id+"AdminVehicles_"+list[i].type+"AdminVehicles_"+list[i].category
			var input_id_id = modal_id+"input_id"
			var input_id_name = modal_id+"input_name"
			var input_id_max = modal_id+"input_max"
			var input_id_min = modal_id+"input_min"

			row += `<tr>
						<td class="text-center align-middle">${list[i].vehicle_name}</td>
						<td class="text-center align-middle">${list[i].type}</td>
						<td class="text-center align-middle">${list[i].min_price}€</td>
						<td class="text-center align-middle">${list[i].max_price}€</td>
						<td class="text-center align-middle"><button type="button" class="btn btn-blue btn-edit" data-bs-toggle="modal" data-bs-target="#${modal_id}"><i class="fas fa-edit"></i> EDIT</button></td>
					</tr>`

			var myEle = document.getElementById(`${modal_id}`);
			if(!myEle){
				modal += `
					<div class="modal fade" id="${modal_id}" tabindex="-1">
						<div class="modal-dialog modal-lg modal-dialog-centered">
							<div class="modal-content myinvoices_modal-content">
								<div class="modal-body p-4">
									<div class="text-center">
										<span class="modal-title">Edit Vehicle</span>
									</div>
									<hr>
									<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeEditVehicleModal"></button>
									<div class="row d-flex justify-content-center">
										<div class="col-md-6" style="border-right: 1px solid #3e3f4b;">
											<label class="modal-title-addveh">Vehicle ID</label>
											<input type="text" id="${input_id_id}" class="form-control flex-grow-1" value="${list[i].vehicle_id}">
											<label class="modal-title-addveh" style="margin-top: 15px;">Vehicle Name</label>
											<input type="text" id="${input_id_name}" class="form-control flex-grow-1" value="${list[i].vehicle_name}">
											<label class="modal-title-addveh">Type <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
											<input type="text" id="editds_dsname" class="form-control flex-grow-1" value="${capitalizeFirstLetter(list[i].type)}" disabled>
										</div>
										<div class="col-md-6">
											<label class="modal-title-addveh">Category <span style="font-size: 14px; color: #8f9094;">(NOT EDITABLE)</span></label>
											<input type="text" id="editds_dsname" class="form-control flex-grow-1" value="${capitalizeFirstLetter(list[i].category)}" disabled>
											<label class="modal-title-addveh">Min. Price</label>
											<input type="number" id="${input_id_min}" class="form-control flex-grow-1" value="${list[i].min_price}">
											<label class="modal-title-addveh" style="margin-top: 15px;">Max. Price</label>
											<input type="number" id="${input_id_max}" class="form-control flex-grow-1" value="${list[i].max_price}">
										</div>
									</div>
									<div class="dvehicle d-flex justify-content-center align-items-center" data-vehicle="${i}" id="confirmRemoveVehicle">
										<i class="fas fa-trash"></i>&nbsp;Delete Vehicle
									</div>
									<div class="d-flex justify-content-center flex-column">
										<button type="button" id="confirmEditVehicle" class="btn btn-blue flex-grow-1 modal-btn" data-vehicle="${i}" data-input_id_vehicle_id="${input_id_id}" data-input_id_vehicle_name="${input_id_name}" data-input_id_min_price="${input_id_min}" data-input_id_max_price="${input_id_max}" data-bs-toggle="modal" data-bs-target="#editVehicleModal" data-bs-dismiss="modal"><i class="fas fa-save"></i> SAVE</button>
									</div>
								</div>
							</div>
						</div>
					</div>`;
			}
		}
	}

	if (modal != '') {
		$("body").append(modal);
	}

	$('#adminVehiclesTableData').html(row)

	var table_id = document.getElementById('adminVehiclesTable');
	table.push(new simpleDatatables.DataTable(table_id, {
		perPageSelect: false,
		perPage: 7,
		searchable: false,
	}));
}

$(document).ready(function() {
	document.onkeyup = function(data) {
		if (data.which == 27) {
			closeMenu();
		}
	};
});

function closeMenu(){
	if (selectedWindow == "vehicles") {
		$(".vehicle_info").fadeOut();
		$(".vehicle_stats").fadeOut();
		$(".vehicle_shop").fadeOut();
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "close",
		}));
		selectedWindow = "";
	} else if (selectedWindow == "buyBusiness") {
		$.post('https://okokVehicleShop/action', JSON.stringify({
			action: "close_menu",
			inAdminMenu: inAdminMenu
		}));
		inAdminMenu = false
		selectedWindow = "";
	} else {
		$(".logout_menu").fadeIn();
		setTimeout(function(){
			$('#deposit_value').val('');
			$('#withdraw_value').val('');
			$(".vehicle_menu").fadeOut();
			$(".loading_menu").fadeOut();
			setTimeout(function(){
				$('#deposit_value').val('');
				$('#withdraw_value').val('');
				$(".vehicle_menu").fadeOut();
				$(".loading_menu").fadeOut();
				$(".logout_menu").fadeOut();
				$.post('https://okokVehicleShop/action', JSON.stringify({
					action: "close_menu",
					inAdminMenu: inAdminMenu
				}));
				inAdminMenu = false
				selectedWindow = "";
			}, 500);
		}, 300);
	}

	setTimeout(function(){
		$('.modal').modal('hide');
	}, 500);
}