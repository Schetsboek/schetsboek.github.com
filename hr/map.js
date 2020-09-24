// Map
map = new OpenLayers.Map("map");
let mapnik         = new OpenLayers.Layer.OSM();
let fromProjection = new OpenLayers.Projection("EPSG:4326");
let toProjection   = new OpenLayers.Projection("EPSG:900913");
let position       = new OpenLayers.LonLat(4.75,51.82).transform( fromProjection, toProjection);
let zoom           = 10; 
map.addLayer(mapnik);
// Enable markers
let markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

// TODO Cookies?

//Setup global variables
let api_key = "";
let student_id = "";
let weatherStationsData = {};

//Setup weatherstation list
fetch('https://smartthings-weatherstations.herokuapp.com/api/weatherStation')
  .then(response => response.json())
  .then(data => weatherStationList(data));
  
//School location
lonLat = new OpenLayers.LonLat(4.467646,51.912480)
  .transform(
	new OpenLayers.Projection("EPSG:4326"),
	map.getProjectionObject()
  );
size = new OpenLayers.Size(23,23);
offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
icon = new OpenLayers.Icon('hr_icon.png', size, offset);
let marker = new OpenLayers.Marker(lonLat, icon);
marker.events.register("click", marker, function() {
	openPopup("logo.png", "Hogeschool Rotterdam", "Op deze locatie is ook het Stadslab te vinden. Wauw!");
});
markers.addMarker(marker);

map.setCenter(position, zoom );

let nav_documentation = document.getElementById('documentation');
nav_documentation.onclick = (event) => {
	closePopup();
		
	let popup_div = document.createElement("div");
	popup_div.classList.add("documentation_div");
	// Titlebar
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	titlebar_icon.src = "documentation_icon.png";
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = "Documentatie";
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_subtitle.textContent = "Gebruik van de API";
	titlebar_header.appendChild(titlebar_subtitle);
	
	let hr = document.createElement("hr");
	hr.classList.add("breakline");
	popup_div.appendChild(hr);
	
	let info1_table = document.createElement("div");
	info1_table.classList.add("table_row");
	popup_div.appendChild(info1_table);
	
	let info_rows = ["Filler text die doet alsof het informatief is.", "Filler text die doet alsof het informatief is.", "Filler text die doet alsof het informatief is."];
	for(let i = 0; i < info_rows.length; i++) {
		let info1_row = document.createElement("div");
		info1_row.classList.add("table_description");
		info1_row.textContent = info_rows[i];
		info1_table.appendChild(info1_row);
	}
	
	let info2_table = document.createElement("div");
	info2_table.classList.add("table_row");
	popup_div.appendChild(info2_table);
	
	let info2_row = document.createElement("div");
	info2_row.classList.add("table_description");
	info2_row.textContent = "Filler text die geeneens doet alsof het informatief is!";
	info2_table.appendChild(info2_row);
	
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	close_row.appendChild(close_popup);

	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

let nav_login = document.getElementById('login');
nav_login.onclick = (event) => {
	closePopup();
	
	let popup_div = document.createElement("div");
	popup_div.classList.add("popup_div");
	accountPopup(popup_div, "Inloggen");
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	close_row.appendChild(close_popup);
	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

let nav_register = document.getElementById('register');
nav_register.onclick = (event) => {
	closePopup();
	
	let popup_div = document.createElement("div");
	popup_div.classList.add("popup_div");
	accountPopup(popup_div, "Registreren");
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	close_row.appendChild(close_popup);
	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

let nav_account = document.getElementById("account");
nav_account.onclick = (event) => {
	apiPopup("login_icon.png", "API Key", api_key);
}

function eventPopup(weatherStationID){
	closePopup();
	
	let popup_div = document.createElement("div");
	popup_div.classList.add("popup_div");
	// Titlebar
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	//TODO event_icon
	titlebar_icon.src = "event_icon.png";
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = "Event versturen.";
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_subtitle.textContent = "Hiervoor moet u ingelogd én eigenaar van dit station zijn.";
	titlebar_header.appendChild(titlebar_subtitle);
	
	let hr = document.createElement("hr");
	hr.classList.add("breakline");
	popup_div.appendChild(hr);
	
	// Event input
	let event_table = document.createElement("div");
	event_table.classList.add("table_row");
	popup_div.appendChild(event_table);
	
	let event_row = document.createElement("div");
	event_row.classList.add("table_description");
	event_row.textContent = "Event:";
	event_table.appendChild(event_row);
	
	let event_input = document.createElement("input");
	event_input.classList.add("table_input");
	event_input.placeholder = 'Event...';
	event_table.appendChild(event_input);
	
	// Parameter input
	let parameter_table = document.createElement("div");
	parameter_table.classList.add("table_row");
	popup_div.appendChild(parameter_table);
	
	let parameter_row = document.createElement("div");
	parameter_row.classList.add("table_description");
	parameter_row.textContent = "Parameter:";
	parameter_table.appendChild(parameter_row);
	
	let parameter_input = document.createElement("input");
	parameter_input.classList.add("table_input");
	parameter_input.placeholder = 'Parameter...';
	parameter_table.appendChild(parameter_input);
	
	let send_table = document.createElement("div");
	send_table.classList.add("table_row");
	popup_div.appendChild(send_table);
	
	let send_row = document.createElement("div");
	send_row.classList.add("table_description");
	send_table.appendChild(send_row);
	
	let event_popup = document.createElement("button");
	event_popup.classList.add("table_button");
	event_popup.textContent = "Versturen";
	event_popup.addEventListener('click', (event) => {
		// TODO
		console.log(event_input.value);
		console.log(parameter_input.value);
		
		let data = {};
		data.WeatherStationID = weatherStationID;
		data.Event = event_input.value;
		data.Parameter = parameter_input.value;
		event_input.value = "";
		parameter_input.value = "";

		
		fetch("https://smartthings-weatherstations.herokuapp.com/api/event", {
			method: "POST", 
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'access-key' : api_key
			},
			body: JSON.stringify(data)
		}).then(response => 
			response.text()
		)
		.then((body) => {
			let reply = JSON.parse(body);
			//TODO 200 check
			if('message' in reply){
				openPopup("event_icon.png","Onbekende error.","Bent u ingelogd én eigenaar van dit station?");
			} else {
				openPopup("event_icon.png","Verstuurd.","Het weerstation kan het event terugvinden op de server.");
			}
		});
		data = "";
	})
	send_row.appendChild(event_popup);
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	close_row.appendChild(close_popup);
	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

function accountPopup(popup_div, type){
	closePopup();
	
	// Titlebar
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	titlebar_icon.src = "login_icon.png";
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = type;
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_subtitle.textContent = "Verkrijgen API key en rechten op de website";
	titlebar_header.appendChild(titlebar_subtitle);
	
	let hr = document.createElement("hr");
	hr.classList.add("breakline");
	popup_div.appendChild(hr);
	
	// Studentnumber input
	let studentnumber_table = document.createElement("div");
	studentnumber_table.classList.add("table_row");
	popup_div.appendChild(studentnumber_table);
	
	let studentnumber_row = document.createElement("div");
	studentnumber_row.classList.add("table_description");
	studentnumber_row.textContent = "Studentnummer:";
	studentnumber_table.appendChild(studentnumber_row);
	
	let studentnumber_input = document.createElement("input");
	studentnumber_input.classList.add("table_input");
	studentnumber_input.placeholder = 'Studentnummer...';
	studentnumber_table.appendChild(studentnumber_input);
	
	// Password input
	let password_table = document.createElement("div");
	password_table.classList.add("table_row");
	popup_div.appendChild(password_table);
	
	let password_row = document.createElement("div");
	password_row.classList.add("table_description");
	password_row.textContent = "Wachtwoord:";
	password_table.appendChild(password_row);
	
	let password_input = document.createElement("input");
	password_input.classList.add("table_input");
	password_input.placeholder = 'Uniek wachtwoord...';
	password_input.type = 'Password';
	password_table.appendChild(password_input);
	
	if(type == "Registreren") {
		let hr = document.createElement("hr");
		hr.classList.add("breakline");
		popup_div.appendChild(hr);
		
		// Stationname input
		let stationname_table = document.createElement("div");
		stationname_table.classList.add("table_row");
		popup_div.appendChild(stationname_table);
		
		let stationname_row = document.createElement("div");
		stationname_row.classList.add("table_description");
		stationname_row.textContent = "Stationsnaam:";
		stationname_table.appendChild(stationname_row);
		
		let stationname_input = document.createElement("input");
		stationname_input.classList.add("table_input");
		stationname_input.placeholder = 'Stationsnaam...';
		stationname_table.appendChild(stationname_input);
		
		// Latitude input
		let latitude_table = document.createElement("div");
		latitude_table.classList.add("table_row");
		popup_div.appendChild(latitude_table);
		
		let latitude_row = document.createElement("div");
		latitude_row.classList.add("table_description");
		latitude_row.textContent = "Latitude:";
		latitude_table.appendChild(latitude_row);
		
		let latitude_input = document.createElement("input");
		latitude_input.classList.add("table_input");
		latitude_input.placeholder = '4...';
		latitude_table.appendChild(latitude_input);
		
		// Longitude input
		let longitude_table = document.createElement("div");
		longitude_table.classList.add("table_row");
		popup_div.appendChild(longitude_table);
		
		let longitude_row = document.createElement("div");
		longitude_row.classList.add("table_description");
		longitude_row.textContent = "Longitude:";
		longitude_table.appendChild(longitude_row);
		
		let longitude_input = document.createElement("input");
		longitude_input.classList.add("table_input");
		longitude_input.placeholder = '51...';
		longitude_table.appendChild(longitude_input);
	}
	
	let login_table = document.createElement("div");
	login_table.classList.add("table_row");
	popup_div.appendChild(login_table);
	
	let login_row = document.createElement("div");
	login_row.classList.add("table_description");
	login_table.appendChild(login_row);
	
	let login_popup = document.createElement("button");
	login_popup.classList.add("table_button");
	login_popup.textContent = type;
	login_popup.addEventListener('click', (event) => {		
		let data = {};
		data.StudentCode = studentnumber_input.value;
		data.Password = password_input.value;
		studentnumber_input.value = "";
		password_input.value = "";

		if(type == "Registreren"){
			fetch("https://smartthings-weatherstations.herokuapp.com/api/register", {
				method: "POST", 
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => 
				response.text()
			)
			.then((body) => {
				let reply = JSON.parse(body);
				if('message' in reply){
					if(reply.message == "studentcode is already registered"){
						openPopup("login_icon.png","Error: Studentnummer is al geregistreerd.","Probeer in te loggen in plaats van te registreren.");
					} else {
						openPopup("login_icon.png","Error: Gegevens zijn incorrect.","Andere mogelijkheid is dat de service down is.");
					}
				} else {
					let key = reply.Key;
					let studentID = reply.StudentID;
					
					let data = {};
					data.WeatherStationName = stationname_input.value;
					data.Latitude = latitude_input.value;
					data.Longitude = longitude_input.value;
					stationname_input.value = "";
					latitude_input.value = "";
					longitude_input.value = "";
					
					fetch("https://smartthings-weatherstations.herokuapp.com/api/weatherStation", {
						method: "POST", 
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					}).then(response => 
						response.text()
					)
					.then((body) => {
						let reply = JSON.parse(body);
						if('message' in reply){
							openPopup("login_icon.png","Error: Gegevens zijn incorrect.","Andere mogelijkheid is dat de service down is.");
						} else {
							openPopup("login_icon.png","Succes: Geregistreerd en ingelogd.","API Key is te vinden in het menu onder 'Account'.");
						}
					});
					loggedIn(Key, StudentID);
				}
			});
		} else {
			fetch("https://smartthings-weatherstations.herokuapp.com/api/login", {
				method: "POST", 
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => 
				response.text()
			)
			.then((body) => {
				let reply = JSON.parse(body);
				if('message' in reply){
					openPopup("login_icon.png","Error: Gegevens zijn incorrect.","Andere mogelijkheid is dat de service down is.");
				} else {
					openPopup("login_icon.png","Succes: Ingelogd.","API Key is te vinden in het menu onder 'Account'.");
					loggedIn(reply.Key, reply.StudentID);
				}
			});
		}
		data = "";
	})
	login_row.appendChild(login_popup);
}

function loggedIn(key, studentId){
	api_key = key;
	student_id = studentId;
	let nav_login = document.getElementById('login');
	nav_login.style = "display: none;";
	let nav_register = document.getElementById('register');
	nav_register.style = "display: none;";
	let nav_account = document.getElementById('account');
	nav_account.style = "display: flex;";
}
function logout(){
	api_key = "";
	student_id = "";
	let nav_login = document.getElementById('login');
	nav_login.style = "display: flex;";
	let nav_register = document.getElementById('register');
	nav_register.style = "display: flex;";
	let nav_account = document.getElementById('account');
	nav_account.style = "display: none;";
}

function weatherStationList(jsonArray) {
	let weatherstation_list = document.getElementById("weatherstation_list");
	let loader = document.getElementById("loader");
	loader.style = "display: none;";
	for(let i = 0; i < jsonArray.length; i++) {
		let jsonObject = jsonArray[i];
		// Add to weatherstation_list

		let weatherstation = document.createElement("div");
		weatherstation.classList.add("nav_subitem");
		// Icon
		let icon_div = document.createElement("div");
		icon_div.classList.add("nav_icon");
		weatherstation.appendChild(icon_div);

		let icon_img = document.createElement("img");
		icon_img.width = "34";
		icon_img.height = "34";
		icon_img.src = "weatherstation.png";
		icon_img.alt = "Weerstation"
		icon_div.appendChild(icon_img);	
		
		let header_div = document.createElement("div");
		header_div.classList.add("nav_header");
		weatherstation.appendChild(header_div);
		
		let title_div = document.createElement("div");
		title_div.classList.add("nav_title");
		title_div.textContent = jsonObject.StationName;
		header_div.appendChild(title_div);
		
		let subtitle_div = document.createElement("div");
		subtitle_div.classList.add("nav_subtitle");
		subtitle_div.id = jsonObject.ID + "_datatypes";
		header_div.appendChild(subtitle_div);

		weatherstation.onclick = (event) => {
			weatherStationPopup(jsonObject);
		}
		
		weatherstation_list.appendChild(weatherstation);
		
		// Add to map
		let size = new OpenLayers.Size(15,24);
		let offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		let icon = new OpenLayers.Icon('marker.png', size, offset);
		let lonLat = new OpenLayers.LonLat(jsonObject.Longitude, jsonObject.Latitude)
		  .transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
		  );
		  
		let marker = new OpenLayers.Marker(lonLat, icon);
		marker.events.register("click", marker, function() {
			weatherStationPopup(jsonObject);
		});

		markers.addMarker(marker);
	}
	//Setup weatherstation data
	fetch('https://smartthings-weatherstations.herokuapp.com/api/weatherData?AVG=true')
	  .then(response => response.json())
	  .then(data => groupWeatherData(data));
}

function groupWeatherData(jsonArray) {
	for(let i = 0; i < jsonArray.length; i++) {
		let jsonObject = jsonArray[i];
		if(jsonObject.WeatherStationID in weatherStationsData === false){
			weatherStationsData[jsonObject.WeatherStationID] = [];
		}
		let data = {};
		data.DataType = jsonObject.DataType;
		data.Average = jsonObject.Average;
		weatherStationsData[jsonObject.WeatherStationID].push(data);
		let datatypes_div = document.getElementById(jsonObject.WeatherStationID + "_datatypes");
		if(datatypes_div.textContent == ""){
			datatypes_div.textContent = jsonObject.DataType;
		} else {
			datatypes_div.textContent += ", " + jsonObject.DataType;
		}
	}
}

function closePopup(){
	let overlay = document.getElementById("overlay");
	overlay.style.display = "none";
	while(overlay.firstChild != null) {
		overlay.removeChild(overlay.firstChild);
	}
}

function weatherStationPopup(jsonObject){
	closePopup();

	let popup_div = document.createElement("div");
	popup_div.classList.add("popup_div");
	
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	titlebar_icon.src = "weatherstation_icon.png";
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = jsonObject.StationName;
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_header.appendChild(titlebar_subtitle);

	let hr = document.createElement("hr");
	hr.classList.add("breakline");
	popup_div.appendChild(hr);
	
	let subtitle = "";
	if(weatherStationsData[jsonObject.ID] !== undefined) {
		for(let i = 0; i < weatherStationsData[jsonObject.ID].length; i++){
			if(subtitle == ""){
				subtitle += weatherStationsData[jsonObject.ID][i].DataType;
			} else {
				subtitle += ", " + weatherStationsData[jsonObject.ID][i].DataType;
			}
			
			let data_table = document.createElement("div");
			data_table.classList.add("table_row");
			popup_div.appendChild(data_table);
			
			let data_row = document.createElement("div");
			data_row.classList.add("table_description");
			data_row.textContent = weatherStationsData[jsonObject.ID][i].DataType;
			data_table.appendChild(data_row);
			
			let data_input = document.createElement("div");
			data_input.classList.add("table_value");
			let data_rounded;
			if(isNaN(weatherStationsData[jsonObject.ID][i].Average)){
				data_rounded = weatherStationsData[jsonObject.ID][i].Average
			} else {
				data_rounded = Math.round(weatherStationsData[jsonObject.ID][i].Average * 100) / 100;
			}
			switch(weatherStationsData[jsonObject.ID][i].DataType){
				case "Humidity":
					if(data_rounded > 1) {
						data_input.textContent = data_rounded + "%";
					} else {
						data_input.textContent = (data_rounded*100) + "%";
					}
					break;
				case "Temperature":
					data_input.textContent = data_rounded + "°C";
					break;
				case "WindSpeed":
					data_input.textContent = data_rounded + "m/s";
					break;
				case "WindDirection":
					data_input.textContent = data_rounded + "°";
					break;
				default: 
					data_input.textContent = data_rounded;
					break;
			}
			data_table.appendChild(data_input);
		}
	}
	titlebar_subtitle.textContent = subtitle;

	let event_table = document.createElement("div");
	event_table.classList.add("table_row");
	popup_div.appendChild(event_table);
	
	let event_row = document.createElement("div");
	event_row.classList.add("table_description");
	event_table.appendChild(event_row);
	
	if(jsonObject.StudentID == student_id){
		let event_popup = document.createElement("button");
		event_popup.classList.add("table_button");
		event_popup.textContent = 'Event versturen';
		event_popup.addEventListener('click', (event) => {
			eventPopup(jsonObject.ID);
		})
		event_row.appendChild(event_popup);
		
		event_row.classList.add("table_description");
	} else {
		event_row.textContent = "Eigenaar? Log in om events te versturen.";
	}
	
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	close_row.appendChild(close_popup);

	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

function apiPopup(){
	closePopup();

	let popup_div = document.createElement("div");
	popup_div.classList.add("api_div");
	
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	titlebar_icon.src = "login_icon.png";
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = "API_Key";
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_subtitle.textContent = api_key;
	titlebar_header.appendChild(titlebar_subtitle);
	
	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	
	let logout_popup = document.createElement("button");
	logout_popup.classList.add("table_button");
	logout_popup.textContent = 'Uitloggen';
	logout_popup.addEventListener('click', (event) => {
		logout();
		closePopup();
	})
	close_row.appendChild(logout_popup);
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	close_row.appendChild(close_popup);

	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}

function openPopup(icon, title, subtitle){
	closePopup();

	let popup_div = document.createElement("div");
	popup_div.classList.add("popup_div");
	// Titlebar
	let titlebar_table = document.createElement("div");
	titlebar_table.classList.add("table_top");
	popup_div.appendChild(titlebar_table);
	
	let titlebar_icon = document.createElement("img");
	titlebar_icon.classList.add("table_icon");
	titlebar_icon.src = icon;
	titlebar_table.appendChild(titlebar_icon);
	
	let titlebar_header = document.createElement("div");
	titlebar_header.classList.add("table_header");
	titlebar_table.appendChild(titlebar_header)
	
	let titlebar_title = document.createElement("h3");
	titlebar_title.classList.add("table_title");
	titlebar_title.textContent = title;
	titlebar_header.appendChild(titlebar_title);
	
	let titlebar_subtitle = document.createElement("h4");
	titlebar_subtitle.classList.add("table_subtitle");
	titlebar_subtitle.textContent = subtitle;
	titlebar_header.appendChild(titlebar_subtitle);

	let close_table = document.createElement("div");
	close_table.classList.add("table_row");
	popup_div.appendChild(close_table);
	
	let close_row = document.createElement("div");
	close_row.classList.add("table_description");
	close_table.appendChild(close_row);
	
	let close_popup = document.createElement("button");
	close_popup.classList.add("table_button");
	close_popup.textContent = 'Sluiten';
	close_popup.addEventListener('click', (event) => {
		closePopup();
	})
	close_row.appendChild(close_popup);

	let overlay = document.getElementById("overlay");
	overlay.appendChild(popup_div);
	overlay.style.display = "block";
}