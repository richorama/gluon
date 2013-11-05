var Gluon = {
	parseOptions: function(options){
		if (!options){
			options = {};
		}
		if (!options.ignoreList){
			options.ignoreList = [];
		}
		if (options.sessionId === undefined){
			options.sessionId = "";
		}
		return options;
	},

	formatName : function(name){
		name = name[0].toUpperCase() + name.slice(1);
		return name.replace(/[a-z][A-Z]/g, function(x){ return x[0] + " " + x[1].toUpperCase()})
			.replace(/[_][a-z]/, function(x){ return " " + x[1].toUpperCase()})
			.replace(/[_][A-Z]/, function(x){ return " " + x[1]});
	},

	edit : function(obj, options){
		if (!obj){
			return "";
		}
		options = Gluon.parseOptions(options);

		var html = '';
		for(var prop in obj){
			if (!options.ignoreList.indexOf(prop)){
				continue;
			}
			switch (typeof obj[prop]){
				case 'string':
					html += '<div class="form-group"><label for="' + prop + '">' + Gluon.formatName(prop) + '</label><input type="text" class="form-control ' + options.sessionId + '" id="' + prop + '" value="' + obj[prop] + '"></div>';
					break;
				case 'boolean':
				 	html += '<div class="form-group"><label><input class="' + options.sessionId + '"" type="checkbox" ' + (obj[prop] ? 'checked' : '') + '> ' + Gluon.formatName(prop) + '</label></div>';
					break;
				case 'number':
					html += '<div class="form-group"><label for="' + prop + '">' + Gluon.formatName(prop) + '</label><input type="number" class="form-control ' + options.sessionId + '" id="' + prop + '" value="' + obj[prop] + '"></div>';
					break;
			}
		}
		html += "";
		return html;
	},
	view : function(obj, options){
		if (!obj){
			return "";
		}
		options = Gluon.parseOptions(options);

		var html = '<div class="form-horizontal">';
		for(var prop in obj){
			if (!options.ignoreList.indexOf(prop)){
				continue;
			}
			switch (typeof obj[prop]){
				case 'string':
				case 'number':
				case 'boolean':
					html += '<div class="form-group"><div class="col-md-6"><strong>' + Gluon.formatName(prop) + '</strong></div><div class="col-md-6">' + obj[prop] + '</div></div>';
					break;
			}
		}
		html += "</div>";
		return html;		

	},
	table : function(objs, options){
		if (!objs || !objs.length){
			return "";
		}
		options = Gluon.parseOptions(options);

		var html = '<table class="table table-bordered"><tr>';

		var obj = objs[0];
		for(var prop in obj){
			if (!options.ignoreList.indexOf(prop)){
				continue;
			}
			switch (typeof obj[prop]){
				case 'string':
				case 'number':
				case 'boolean':
					html += '<th>' + Gluon.formatName(prop) + '</th>';
					break;
			}
		}
		html += "</tr>";

		objs.forEach(function(obj){
			html += "<tr>";
			for(var prop in obj){
				if (!options.ignoreList.indexOf(prop)){
					continue;
				}
				switch (typeof obj[prop]){
					case 'string':
					case 'number':
					case 'boolean':
						html += '<td>' + obj[prop] + '</td>';
						break;
				}
			}

			html += "</tr>";
		});

		html += "</table>";
		return html;		


	}
}