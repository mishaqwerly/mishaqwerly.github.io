class Grid {
	constructor() {
		this.addRowBtn = document.getElementById('bottom_plus');
		this.addCellBtn = document.getElementById('right_plus');
		this.removeCellBtn = document.getElementById('top_minus');
		this.removeRowBtn = document.getElementById('left_minus');
		this.table = document.getElementById('table');
		this.items = document.getElementsByClassName('item');
		this.allRows = document.getElementsByClassName('row');
		this.buttons = document.getElementsByClassName('btn-minus');
		this.component = document.getElementById('component');


	
		let buttons = document.getElementsByClassName('btn-minus');
		Array.from(buttons).forEach(function(btn) {
			btn.addEventListener("mouseover", function() { this.style.display = 'flex'});
			btn.addEventListener("mouseout", function() { this.style.display = 'none'});
		});

		this.table.addEventListener("mouseover", evt => this.cellMouseover(evt));
		this.table.addEventListener("mouseout", evt => this.cellMouseout(evt));

		this.addCellBtn.addEventListener("click", evt => this.addCell(evt));
		this.addRowBtn.addEventListener("click", evt => this.addRow(evt));
		this.removeCellBtn.addEventListener("click", evt => this.removeCell(evt));
		this.removeRowBtn.addEventListener("click", evt => this.removeRow(evt));
	}

	cellMouseover(evt) {
		if(this.table.rows[0].childElementCount !== 1) {
			var removeCellBtnOffsetLeft = evt.target.offsetLeft + 3;
			this.removeCellBtn.style.cssText = 'margin-left:'+removeCellBtnOffsetLeft+'px; display:flex;';
			var cellIndex = evt.target.cellIndex;
			this.removeCellBtn.setAttribute('data-cell-index', cellIndex);
		}
		if(this.table.rows.length !== 1) {
			var removeRowBtnOffsetTop = evt.target.offsetTop + 3;
			this.removeRowBtn.style.cssText = 'margin-top:'+removeRowBtnOffsetTop+'px; display:flex;';
			var rowIndex = evt.target.parentNode.rowIndex;
			this.removeRowBtn.setAttribute('data-row-index', rowIndex);
		}
	}

	cellMouseout(evt) {
		this.removeCellBtn.style.display = 'none';
		this.removeRowBtn.style.display = 'none';
	};


	addCell(evt) {
		Array.from(this.allRows).forEach(function(rows) {
			var newCell = rows.insertCell(-1);
			newCell.classList.add("item");
		});
	};

	addRow(evt) {
		var newRow = this.table.insertRow(-1);
		newRow.classList.add("row");
		Array.from(this.allRows[0].cells).forEach(function(rows) {
			var newRowCell = newRow.insertCell(0);
			newRowCell.classList.add("item");
		});
	};

	removeCell(evt) {
		console.log('asd');
	};

	removeRow(evt) {
		var rowIndex = evt.target.getAttribute('data-row-index');
		this.table.deleteRow(rowIndex);
		if(this.table.rows.length <= rowIndex || this.table.rows.length === 1 ) {
			this.removeRowBtn.style.display = 'none';
		}
	};



}

var grid = new Grid();