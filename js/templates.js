var VisualIDE = (function(ide) {
	
	ide.Templates = {
	
		init: function() {
			$(".dropdown-menu li a").on('click', function(){
				var selText = $(this).text();
				$(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
			});
			$(".btn-toggle-if").on('click', function(){
				$(this).parent().find('select').toggleClass('no-show');
				$(this).parent().find('input').toggleClass('no-show');
			});
			
			$("body").tooltip({ selector: '[data-toggle=tooltip]' });
		},
		
		master : '<li class="command command-raw ' +
			'<% model.classes.forEach(function ( className ) { %>' +
			'<% print( className + " " ); %>' +
			'<% }); %>' + 
	
			'" data-command-id=<%= model.id %>>' +
			'<div class="handle"><i class="handle fa fa-bars fa-2x"></i></div><h4><%= model.name %></h4>' +
	
			'<%= templateFn( model ) %>' +
			
			'</li>',
			
		secondary: '<div class="command-input-wrap">' + 
			'<% parms.forEach(function (placeholder) { %>' +
			'<input id="parm1" class="form-control" placeholder="<%= placeholder %>" value="<%= def_value %>">' + 
			'<% }); %>' +
			'</div>' +  // END of command input wrap
			
			'<% extraHtml.forEach(function (extraHtml) { %>' +
			'<%= extraHtml %>' + 
			'<% }); %>',
		
		textInput: '<div class="command-input-wrap">' + 
			'<input id="parm1" class="form-control" value="<%= def_value %>">' + 
			'</div>' ,  // END of command input wrap
		
		numberInput: '<div class="command-input-wrap">' + 
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value %>">' + 
			'</div>' ,  // END of command input wrap

		loop: '<ul></ul>',			
		
		repeat: '<div class="command-input-wrap">' + 
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value %>">' + 
			'</div>' +  // END of command input wrap
			'<ul></ul>',
			
		ifCondition: '<div class="command-input-wrap">' + 
			'<div class="display-in-line">' +
			'<button data-toggle="tooltip" data-placement="left" title="Swap input type between variables and numbers." ' +
			'class="btn btn-default btn-toggle-if btn-tooltip"><i class="fa fa-undo"></i></button>' +
			'<select class="no-show">' +
				'<option value="volvo">Volvo</option>' +
				'<option value="saab">Saab</option>' +
				'<option value="mercedes">Mercedes</option>' +
				'<option value="audi">Audi</option>' +
			'</select>' +
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value %>">' + 
			'</div>' +
			
			'&nbsp;&nbsp;&nbsp;' +
			'<div class="btn-group"> <a class="btn btn-default dropdown-toggle btn-select" data-toggle="dropdown" href="#">&lt;</span></a>' +
				'<ol class="dropdown-menu">' +
					'<li><a href="#">=</a></li>' +
					'<li><a href="#">&lt;</a></li>' +
					'<li><a href="#">&gt;</a></li>' +
					'<li><a href="#">!=</a></li>' +
				'</ol>' +
			'</div>' +
			'&nbsp;&nbsp;&nbsp;' +
			'<div class="display-in-line">' +
			'<button data-toggle="tooltip" data-placement="left" title="Swap input type between variables and numbers." ' +
			'class="btn btn-default btn-toggle-if btn-tooltip"><i class="fa fa-undo"></i></button>' +
			'<select class="no-show">' +
				'<option value="volvo">Volvo</option>' +
				'<option value="saab">Saab</option>' +
				'<option value="mercedes">Mercedes</option>' +
				'<option value="audi">Audi</option>' +
			'</select>' +
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value %>">' + 
			'</div>' +
			
			'</div>' + // END of command input wrap
			
			'<ul></ul><h4 class="sub-heading">Else</h4><ul></ul>',
			
		assign: '<div class="command-input-wrap">' + 
			'<div class="display-in-line">' +
			'<select>' +
				'<option value="volvo">Volvo</option>' +
				'<option value="saab">Saab</option>' +
				'<option value="mercedes">Mercedes</option>' +
				'<option value="audi">Audi</option>' +
			'</select>' +
			'</div>' +
			
			' = ' +
			
			'<div class="display-in-line">' +
			'<button data-toggle="tooltip" data-placement="left" title="Swap input type between variables and numbers." ' +
			'class="btn btn-default btn-toggle-if btn-tooltip"><i class="fa fa-undo"></i></button>' +
			'<select class="no-show">' +
				'<option value="volvo">Volvo</option>' +
				'<option value="saab">Saab</option>' +
				'<option value="mercedes">Mercedes</option>' +
				'<option value="audi">Audi</option>' +
			'</select>' +
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value[0] %>">' + 
			'</div>' +
			
			'&nbsp;&nbsp;&nbsp;' +
			'<div class="btn-group"> <a class="btn btn-default dropdown-toggle btn-select" data-toggle="dropdown" href="#">+</span></a>' +
				'<ol class="dropdown-menu">' +
					'<li><a href="#">-</a></li>' +
					'<li><a href="#">*</a></li>' +
					'<li><a href="#">/</a></li>' +
					'<li><a href="#">%</a></li>' +
				'</ol>' +
			'</div>' +
			
			'&nbsp;&nbsp;&nbsp;' +
			'<div class="display-in-line">' +
			'<button data-toggle="tooltip" data-placement="left" title="Swap input type between variables and numbers." ' +
			'class="btn btn-default btn-toggle-if btn-tooltip"><i class="fa fa-undo"></i></button>' +
			'<select class="no-show">' +
				'<option value="volvo">Volvo</option>' +
				'<option value="saab">Saab</option>' +
				'<option value="mercedes">Mercedes</option>' +
				'<option value="audi">Audi</option>' +
			'</select>' +
			'<input id="parm1" class="form-control numbers" type="number" min="0" value="<%= def_value[1] %>">' + 
			'</div>' +
			
			'</div>', // END of command input wrap
			
		commandCategories: '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' +
			'<% category.forEach(function ( cat ) { %>' +
			'<%= templateFn( cat ) %>' +
			'<% }); %>' + 
			'</div>',
			
		commandCategory: '<div class="panel panel-default">' +
			'<div class="panel-heading" role="tab" id="headingOne">' +
			  '<h4 class="panel-title">' +
				'<a data-toggle="collapse" data-parent="#accordion" href=".collapse-<%= id %>" aria-expanded="true" aria-controls="collapse-<%= id %>">' +
				  '<%= heading %>' +
				'</a>' +
			  '</h4>' +
			'</div>' +
			'<div id="collapse-<%= id %>" class="panel-collapse collapse <% if(opened) print("in"); %> collapse-<%= id %>" role="tabpanel" aria-labelledby="headingOne">' +
			  '<div class="panel-body">' +
				'<%= content %>' +
			  '</div>' +
			'</div>' +
  '</div>',
		
	};
	
	return ide;

}( VisualIDE || {} ));