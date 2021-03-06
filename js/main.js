$(document).ready(function(){
	$(".save-load-file").hide();
});

$('#run-btn').on('click', function (e) {
	VisualIDE.Interpreter.stop();
	$(this).attr('disabled','disabled');
	$('#stop-btn').removeAttr('disabled');
	VisualIDE.DragDrop.disableDrag();
	VisualIDE.Interpreter.run();
	$( document ).trigger( "miaRunning" );
});

$('#stop-btn').attr('disabled','disabled');
$('#stop-btn').on('click', function (e) {
	endRun();
});

function endRun() {	
	$( document ).trigger( "miaStop" );
	$('#stop-btn').attr('disabled','disabled');
	$('#run-btn').removeAttr('disabled');
	VisualIDE.DragDrop.enableDrag();
	VisualIDE.Interpreter.stop();
}

$('.btn-clear-procedure').on('click', function (e) {
	var delay = 1;
	$( $('#list-procedures > li').get().reverse() ).each( function() {
		delay++;
		$( this ).delay( 100 * delay ).animate( {
			opacity: '0',
			width: 'toggle'
		}, 400, function() {
			$(this).remove();
		});
	});
});

$('#login-btn').on('click', function (e) {
	loginGoogle();
});

$('#dropbox-btn').on('click', function (e) {
	loginDropbox();
});

$('#howitworks-btn').on('click', function (e) {
	startTour();
});

var HomeView = Backbone.View.extend({
	el: '.page',
	render: function () {
		//this.$el.html("<h4>HelloWorld</h4>");
	}
});

var homeView = new HomeView();

var Router = Backbone.Router.extend({
	routes: {
		"": "home"
	}
});

var router = new Router();
router.on('route:home', function() {
	// render home view
	homeView.render();
});

// Create a new rendering area.
jQuery(document).ready(function() {
	
	var spriteName = "Pikachu";
	var path = "../img/pikachu.gif";
	var canvas = initCanvas(spriteName, path);

	// Save and load program
	saveLoadProgram(canvas);

	initIntepreter(canvas, spriteName);

	initLayout(canvas);
	
	$('#main-loader').delay(500).fadeOut(400, function(){
		$('#dashboard').hide();
		$('#dashboard').removeClass('loading');
		$('#dashboard').fadeIn(1000);
		$('#main-loader').remove();
	});
		
});

function initCanvas(spriteName, path) {
	var canvas = new VisualIDE.Canvas(document.getElementById('canvas'));
	// Draw default sprite
	var sprite = new VisualIDE.CanvasSprite(path);
	canvas.addSprite(spriteName, sprite);
	
	return canvas;
}

function initIntepreter(canvas, spriteName) {
	VisualIDE.Interpreter(canvas, spriteName);
}

function initLayout(canvas) {
	
	VisualIDE.Templates.init();
	
	var dragDrop = new VisualIDE.DragDrop({
		commands: "ul.list-commands-raw",
		trash: "ul.list-trash",
		normal: "ul.list-procedures"
	});

	// Populate the raw static commands
	var commandsHtml = new VisualIDE.CommandsHtml();
	$('.list-commands-raw').append( commandsHtml.populateRawCommands() );
	commandsHtml.initCommands();
	
	// Populate some commands into the procedures list for demonstration
	$('#list-procedures').append( commandsHtml.getCommandsDemoSetHtml() );
	
	// Initialize off canvas command list panel
	$('.command-panel-btn').on('click', function(event){
		event.preventDefault();
		$('.cd-panel').addClass('is-visible');
		$("#navbar-collapse").collapse('hide');
	});
	$('.cd-panel').on('click', function(event){
		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close-btn') ) { 
			$('.cd-panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
	
	var varManager = VisualIDE.VariableManager;
	varManager.init( {
		container: $('#variable-manager-entries'),
		addBtn: '#btn-variable-manager-add',
		delBtn: '.btn-variable-manager-delete',
		selectContainer: '.select-variable'
	});
	
	var spriteManager = VisualIDE.SpriteManager;
	spriteManager.init( {
		container: $('#sprite-manager-entries-container'),
		addBtn: '#btn-sprite-manager-add',
		delBtn: '.btn-sprite-manager-delete',
		selectContainer: '.select-sprite',
		nameClass: '.sprite-manager-form-name',
		urlClass: '.sprite-manager-form-image-url',
		canvas: canvas
	});
	
	var demoManager = VisualIDE.Demo;
	demoManager.populatePrograms( $('#demo-manager-programs') );
	
	// Load demo program
	loadDemoProgram(canvas, commandsHtml);
	
	resizeAffix();
	// Re initialize affix components on browser resize
	$(window).resize(function(){
		resizeAffix();
	});

	$('.navbar-brand').tooltip('hide');
	$('.navbar-brand').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	var hideToolTip = function() {
		$('.navbar-brand').tooltip('hide');
	};
	
	var shownToolTip = false;
	$(window).scroll(function (event) {
		if ( !shownToolTip ) {
			var scroll = $(window).scrollTop();
			$('.navbar-brand').tooltip('show');
			shownToolTip = true;
			setTimeout(hideToolTip, 3000);
		}
	});
}

function resizeAffix() {
	$('.col-commands .list-commands-raw').height( $(window).height() - 
		$('.col-commands .list-commands-raw').offset().top - $('#list-trash').height() - 100 );
	
	if ( $(window).width() > 991 ) {
		$('.affix-container').affix({
			offset: {
				top: 0
			}
		});
		$('.cd-panel').removeClass('is-visible');
	} else {
		$(window).off('.affix');
		$('.affix-container')
		.removeClass("affix affix-top affix-bottom")
		.removeData("bs.affix");
	}
}

function startTour() {
	var tour = new Tour({
		steps: [
		{
			element: ".tour-commands",
			content: "Choose your desired command."
		},
		{
			element: ".tour-procedures",
			content: "Drag the command into this area and attach a value to it."
		},
		{
			element: ".tour-run-stop-buttons",
			placement: "bottom",
			content: "Once you're satisfied with the commands. You can start running the program."
		},
		{
			element: ".tour-trash",
			content: "Trash an existing command in procedure by dragging into this area. You can also clear all existing commands by clicking on the \"Clear Procedure\" button."
		},
		{
			element: ".tour-login",
			placement: "bottom",
			content: "Login to your desired platform to save your work. You can also load an previous saved work."
		}
		],
		backdrop: true,
		backdropPadding: 2,
		storage: false
	});

	tour.init();
	tour.start();
}

function saveLoadProgram(canvas)
{
	$('#save-btn').on('click', function (e) {
		if(loggedIntoGoogle()){
			saveToGoogle();
		} else if(loggedIntoDropbox()){
			saveToDropbox();
		} else {
			alert("An error has occurred. Please try to refresh this page.");
		}
	});

	$('#load-btn').on('click', function (e) {
		if(loggedIntoGoogle()){
			loadFromGoogle(canvas);
		} else if(loggedIntoDropbox()){
			loadFromDropbox(canvas);
		} else {
			alert("An error has occurred. Please try to refresh this page.");
		}
	});
}

function loadDemoProgram(canvas, commandsHtml)
{
	$('#demo-manager-programs').on('click', '#demo-bouncing-ball',function () {
		var loadDemoButton = $(this);
		var program = VisualIDE.Demo.programs[0];
		$('ul.list-procedures').html(program.procedures);
		$('#variable-manager-entries').html(program.variables);
		
		var i;
		var spriteTableArray = VisualIDE.SpriteManager.spriteTable;
		var varTableArray = VisualIDE.VariableManager.varTable;
		
		for(i=1; i<spriteTableArray.length; i++){
			canvas.removeSprite(spriteTableArray[i].name);
			spriteTableArray.splice(i, 1);
		}

		for(i=3; i<varTableArray.length; i++){
			varTableArray.splice(i, 1);
		}

		var sprite = new VisualIDE.CanvasSprite(program.spriteImg);

		VisualIDE.SpriteManager.spriteTable.push({
			name: program.spriteName,
			target: "sprite",
			url: program.spriteImg,
			defalut: false,
		});

		VisualIDE.SpriteManager.refreshView();
		VisualIDE.SpriteManager.refreshSelectVeiws();

		canvas.addSprite(program.spriteName, sprite);
		initIntepreter(canvas, program.spriteName);
	});
	
	$('#demo-manager-programs').on('click', '#demo-analog-clock',function () {
		var program = VisualIDE.Demo.getDemoClockProgram(commandsHtml);
		$('ul.list-procedures').html(program.html);
		
		for( i= VisualIDE.SpriteManager.spriteTable.length-1; i>0; i--){
			canvas.removeSprite(VisualIDE.SpriteManager.spriteTable[i].name);
			VisualIDE.SpriteManager.spriteTable.splice(i, 1);
		}
		
		var sprites = program.sprites;
		var sprite;
		
		for( i=0; i<sprites.length; i++){
			sprite = new VisualIDE.CanvasSprite( sprites[i].url );
			canvas.addSprite( sprites[i].name, sprite );
			initIntepreter(canvas, sprites[i].name );
			var spriteTemp = sprites[i];
			spriteTemp.target = sprite;
			VisualIDE.SpriteManager.spriteTable.push( spriteTemp );
		}
		
		VisualIDE.SpriteManager.refreshView();
		VisualIDE.SpriteManager.refreshSelectVeiws();
		VisualIDE.VariableManager.refreshView();
		VisualIDE.VariableManager.refreshSelectVeiws();
		
	});
}

Backbone.history.start();
