var addRowBtn;
var addCellBtn;
var removeCellBtn;
var removeRowBtn;
var table;
var items;
var allRows;

function init() {
	addRowBtn = document.getElementById('bottom_plus');
	addCellBtn = document.getElementById('right_plus');
	removeCellBtn = document.getElementById('top_minus');
	removeRowBtn = document.getElementById('left_minus');
	table = document.getElementById('table');
	items = document.getElementsByClassName('item');
	allRows = document.getElementsByClassName('row');

	var buttons = document.getElementsByClassName('btn-minus');
	Array.from(buttons).forEach(function(btn) {
	    btn.addEventListener("mouseover", function() { this.style.display = 'flex'});
	    btn.addEventListener("mouseout", function() { this.style.display = 'none'});
	});

	addCellBtn.addEventListener("click", addCell);
	addRowBtn.addEventListener("click", addRow);
	removeCellBtn.addEventListener("click", removeCell);
	removeRowBtn.addEventListener("click", removeRow);

	initItems();
};

function initItems() {
	Array.from(items).forEach(function(elem) {
	    elem.addEventListener("mouseover", cellMouseover);
	    elem.addEventListener("mouseout", cellMouseout);
	});
};


function cellMouseover() {

	if(table.rows[0].childElementCount != 1) {
		removeCellBtn.style.cssText = 'left:'+this.offsetLeft+'px; display:flex;';
		var cellIndex = this.cellIndex;
		removeCellBtn.setAttribute('data-cell-index', cellIndex);
	}
	if(table.rows.length != 1) {
		removeRowBtn.style.cssText = 'top:'+this.offsetTop+'px; display:flex;';
		var rowIndex = this.parentNode.rowIndex;
		removeRowBtn.setAttribute('data-row-index', rowIndex);
	}
};

function cellMouseout() {
	
	removeCellBtn.style.display = 'none';
	removeRowBtn.style.display = 'none';
};

function addCell() {
   
	Array.from(allRows).forEach(function(rows) {

		var newCell = rows.insertCell(-1);
		newCell.classList.add("item");
	});
	initItems();
};

function addRow() {

	var newRow = table.insertRow(-1);
	newRow.classList.add("row");
		Array.from(allRows[0].cells).forEach(function(rows) {
			var newRowCell = newRow.insertCell(0);
			newRowCell.classList.add("item");
			rows.addEventListener("mouseover", cellMouseover);
		});
	initItems();
};

function removeCell() {
   
    var cellIndex = this.getAttribute('data-cell-index');
	Array.from(allRows).forEach(function(row) {
		row.deleteCell(cellIndex);
		if(row.childElementCount <= cellIndex || row.childElementCount == 1) {
			removeCellBtn.style.display = 'none';
		}
	});
};

function removeRow() {
	
	var rowIndex = this.getAttribute('data-row-index');
	table.deleteRow(rowIndex);
	if(table.rows.length <= rowIndex || table.rows.length == 1 ) {
		removeRowBtn.style.display = 'none';
	}
};