var table_size = 0;

function createTable() {
	deletePreviousTable();

	var tableSizeInput = document.getElementById("table_size_input");
	var tableSize = tableSizeInput.value;
	table_size = parseInt(tableSize);

	var arrageDiv = document.getElementById("dynamic_arrange");
	var table = document.createElement("table");
	table.id = "image_arrange"

	var tableBody = document.createElement('tbody');
	table.appendChild(tableBody);

	empty_slot = tableSize * tableSize;
	place_counter = 1
	for (var i=0; i<tableSize; i++){
		var tr = document.createElement('tr');
		tr.id = "row"+i
		tr.className = "image_row";
		tableBody.appendChild(tr);

		for (var j=0; j<tableSize; j++){
			var td = document.createElement('td');
			td.className = "image_slot";
			td.id = "slot"+place_counter;

			var content_container = document.createElement("div");

			if (place_counter == empty_slot) {
				content_container.appendChild(document.createTextNode("?"));
				content_container.id = "part?";
			}
			else {
				content_container.appendChild(document.createTextNode(place_counter));
				content_container.id = "part"+place_counter;
			}
			td.appendChild(content_container);
			tr.appendChild(td);
			place_counter++;
		}
	}
	arrageDiv.appendChild(table);
	set_clickables();
}

function deletePreviousTable() {
	var tableDiv = document.getElementById("dynamic_arrange");
	var previousTable = document.getElementById("image_arrange");

	if (previousTable) {
		tableDiv.removeChild(previousTable);
	}
}

function swap_slot(id) {
	var empty_slot = document.getElementById('part?').parentElement;
	var replace_slot = document.getElementById(id);

	var empty_part = empty_slot.firstChild;
	var replace_part = replace_slot.firstChild;

	replace_slot.replaceChild(empty_part.cloneNode(true), replace_part);
	empty_slot.replaceChild(replace_part, empty_part);
	set_clickables();
}

function reset_clickables() {
	var rows = $(".image_row");
	for (var i = 0; i < rows.length; i++) {
		for (var j = 0; j < rows[i].childNodes.length; j++) {
			rows[i].childNodes[j].onclick = null;
		}
	}
}

function set_clickables() {
	reset_clickables();

	var image_table = document.getElementById('image_arrange');
	var empty_slot = document.getElementById('part?').parentElement;

	var part_row = parseInt(empty_slot.parentElement.id.substring(3));
	var part_index = 0;
	for (var i = 0; i < empty_slot.parentElement.childNodes.length; i++) {
		if (empty_slot.parentElement.childNodes[i] == empty_slot) {
			part_index = i;
			break;
		}
	}

	if (parseInt(part_index) > 0) {
		empty_slot.parentElement.childNodes[part_index - 1].onclick = call_swap;	
	}
	if (parseInt(part_index) < empty_slot.parentElement.childNodes.length - 1) {
		empty_slot.parentElement.childNodes[part_index + 1].onclick = call_swap;	
	}

	var uprow = document.getElementById('row'+(part_row + 1));
	if (uprow) {
		uprow.childNodes[part_index].onclick = call_swap;	
	}
	var downrow = document.getElementById('row'+(part_row - 1));
	if (downrow) {
		downrow.childNodes[part_index].onclick = call_swap;	
	}
}

function call_swap() {
	swap_slot(this.id);
	check_victory();
}

function check_victory() {
	var rows = $(".image_row");
	for (var i = 0; i < rows.length; i++) {
		for (var j = 0; j < rows[i].childNodes.length; j++) {
			if (rows[i].childNodes[j].id.substring(4) != rows[i].childNodes[j].firstChild.id.substring(4)) {
				if (rows[i].childNodes[j].firstChild.id == "part?") {
					continue;
				}
				return;
			}
		}
	}

	alert("You won!");
}

function mix_board() {
	var number_of_swaps = Math.pow(table_size, 4);
	if (number_of_swaps > 50000) {
		number_of_swaps = 50000;
	}

	for (var i = 0; i < number_of_swaps ; i++) {
		var sequence_number = Math.floor((Math.random() * Math.pow(table_size, 2)) + 1);
		var id = "slot"+sequence_number;
		var slot = $("#"+id)[0];
		if (slot && (slot.onclick != null || slot.onclick != undefined)) {
			swap_slot(id);
		}
	}
}