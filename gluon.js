var Gluon = {
	appendButtons : function(buttons){
		var x = "";
		for (var i = 0; i < buttons.length; i++){
			var action = buttons[i];		
			if (i === 0){
				x += '<a href="javascript:void(0);" class="btn btn-primary" role="button" id="button-' + action + '">' + action + '</a> '	
			} else {
				x += '<a href="javascript:void(0);" class="btn btn-default" role="button" id="button-' + action + '">' + action + '</a> '	
			}
		}
		return x;
	},
	appendTitle : function(text){
		if (!text) return "";
		return "<h3>" + text + "</h3>"
	},
	parseOptions: function(options){
		if (!options){
			options = {};
		}
		if (!options.ignoreList){
			options.ignoreList = [];
		}
		if (options.sessionId === undefined){
			options.sessionId = "gluon";
		}
		if (options.actions === undefined){
			options.actions = [];
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
		html += Gluon.appendTitle(options.title);
		for(var prop in obj){
			if (!options.ignoreList.indexOf(prop)){
				continue;
			}
			switch (typeof obj[prop]){
				case 'string':
					if (prop.toLowerCase() === "password"){
						html += '<div class="form-group"><label for="' + prop + '">' + Gluon.formatName(prop) + '</label><input data-type="string" type="password" class="form-control ' + options.sessionId + '" id="' + prop + '" value="' + obj[prop] + '"></div>';
					} else {
						html += '<div class="form-group"><label for="' + prop + '">' + Gluon.formatName(prop) + '</label><input data-type="string" type="text" class="form-control ' + options.sessionId + '" id="' + prop + '" value="' + obj[prop] + '"></div>';
					}
					break;
				case 'boolean':
				 	html += '<div class="form-group"><label><input data-type="boolean" class="' + options.sessionId + '" type="checkbox" ' + (obj[prop] ? 'checked' : '') + ' id="' + prop + '"> ' + Gluon.formatName(prop) + '</label></div>';
					break;
				case 'number':
					html += '<div class="form-group"><label for="' + prop + '">' + Gluon.formatName(prop) + '</label><input data-type="number" type="number" class="form-control ' + options.sessionId + '" id="' + prop + '" value="' + obj[prop] + '"></div>';
					break;
			}
		}
		html += Gluon.appendButtons(options.actions);
		return html;
	},
	view : function(obj, options){
		if (!obj){
			return "";
		}
		options = Gluon.parseOptions(options);

		var html = '';
		html += Gluon.appendTitle(options.title);
		html += '<div class="form-horizontal">';
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
		html += Gluon.appendButtons(options.actions);
		return html;		

	},
	table : function(objs, options){
		if (!objs || !objs.length){
			return "";
		}
		options = Gluon.parseOptions(options);

		var html = '';
		html += Gluon.appendTitle(options.title);
		html += '<table class="table table-bordered"><tr>';

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
		html += Gluon.appendButtons(options.actions);
		return html;		
	},
	toJS: function(sessionId){
		if (sessionId === undefined){
			sessionId = "gluon";
		}
		var elements = document.getElementsByClassName(sessionId);
		var obj = {};
		for (var i = 0; i < elements.length; i++){
			var el = elements[i];
			if (!el.attributes["data-type"]) continue;

			switch (el.attributes["data-type"].value){
				case 'string':
					obj[el.id] = el.value;
					break;
				case 'number':
					obj[el.id] = Number(el.value);						
					break;
				case 'boolean':
					obj[el.id] = !(el.attributes["checked"] === undefined);
					break;
			}
		}
		return obj;
	}
}

if (module && module.exports){
	module.exports = Gluon;
}