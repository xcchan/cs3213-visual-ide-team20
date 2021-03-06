var VisualIDE = (function(ide) {

	var tpl = ide.Templates;
	var container;
	var selectContainer;
	
	var update = "varTableUpdate";
	
	
	ide.VariableManager = {
		
		varTable: [
			{
				name: "count",
				defalut: true
			},
			{
				name: "value",
				defalut: true
			},
			{
				name: "total",
				defalut: true
			}
		],
		
		init: function( parms ) {
			
			container = parms.container;
			selectContainer = parms.selectContainer;
			
			var that = this;
			
			$(document).on('click', parms.addBtn, function() {
				var name = $(this).parent().parent().find('input').val();
				name = name.replace(/ /g,'');
				$(this).parent().parent().find('input').val('');
				
				if ( !name ) return;
				
				addVar( that, name );
				refreshManagerView( container, { varTable: that.varTable }, tpl.variableManagerEntry );
				triggerSelectViewUpdate();
			});
			
			$(document).on('miaRunning', function() {
				$(parms.addBtn).attr('disabled','disabled');
				$(parms.delBtn).each( function() {
					if ( $(this).attr('disabled') != 'disabled' ) {
						$(this).attr('disabled','disabled');
						$(this).addClass('disabled-var-delete-run');
					}
				});
			});
			
			$(document).on('miaStop', function() {
				$(parms.addBtn).removeAttr('disabled');
				$('.disabled-var-delete-run').removeAttr('disabled');
				$('.disabled-var-delete-run').removeClass('.disabled-var-delete-run');
			});
			
			$(document).on('click', parms.delBtn, function() {
				var name = $(this).parent().parent().find('input').val();
				
				deleteVar( that, name );
				refreshManagerView( container, { varTable: that.varTable }, tpl.variableManagerEntry );
				triggerSelectViewUpdate();
			});
			
			refreshManagerView( container, { varTable: this.varTable }, tpl.variableManagerEntry );
			
			$(document).on( update, selectContainer, function() {
				var selected = $(this).val();
				refreshVariableSelectView( that, $(this) );
				$(this).val( selected );
				if( !$(this).val() ) $(this)[0].selectedIndex = 0;
			});
			triggerSelectViewUpdate();
		},
		
		refreshView: function() {
			refreshManagerView( container, { varTable: this.varTable }, tpl.variableManagerEntry );
		},
		
		refreshSelectVeiws: function() {
			triggerSelectViewUpdate();
		}
	};
	
	function addVar( that, name ) {
		var objVar = {};
		objVar.defalut = false;
		objVar.name = name;
		objVar.value = 0;
		
		for ( var i=0; i<that.varTable.length; i++ ) {
			if ( that.varTable[i].name.toLowerCase() == name.toLowerCase() ) {
				return;
			}
		}
		
		that.varTable.push(objVar);
	}
	
	function deleteVar( that, name ) {
		for ( var i=0; i<that.varTable.length; i++ ) {
			if ( that.varTable[i].name.toLowerCase() == name.toLowerCase() ) {
				that.varTable.splice(i,1);
				break;
			}
		}
	}
	
	function refreshVariableSelectView( that, selectContainer ) {
		var compiled = _.template( tpl.variableSelectEntry );
		var html = compiled( { varTable: that.varTable } );
		
		selectContainer.html( html );
	}
	
	function triggerSelectViewUpdate() {
		$( selectContainer ).trigger( update );
	}
	
	return ide;

}( VisualIDE || {} ));


var VisualIDE = (function(ide) {

	var tpl = ide.Templates;
	var container;
	var selectContainer;
	var canvas;
	
	var update = "spriteTableUpdate";

	ide.SpriteManager = {
		
		spriteTable: [
			{
				name: "Pikachu",
				target: undefined,
				url: '../img/pikachu.gif',
				defalut: true,
			}
		],
		
		init: function( parms ) {
			
			container = parms.container;
			selectContainer = parms.selectContainer;
			canvas = parms.canvas;
			
			var that = this;
			
			$(document).on('click', parms.addBtn, function() {
				var name = $(this).parent().parent().find( parms.nameClass ).val();
				var url = $(this).parent().parent().parent().parent().find( parms.urlClass ).val();
				name = name.replace(/ /g,'');
				
				if ( !name || !url ) return;
				
				$(this).attr('disabled','disabled');
				
				checkUrl( {
					that: that,
					name: name,
					url: url,
					urlField: $(this).parent().parent().parent().parent().find( parms.urlClass ),
					nameField: $(this).parent().parent().find( parms.nameClass ),
					btn: $(this)
				} );
			});
			
			$(document).on('click', parms.delBtn, function() {
				var name = $(this).parent().parent().find('input').val();
				
				deleteVar( that, name );
				refreshManagerView( container, { spriteTable: that.spriteTable }, tpl.spriteManagerEntry );
				triggerSelectViewUpdate();
			});
			
			$(document).on('miaRunning', function() {
				$(parms.addBtn).attr('disabled','disabled');
				$(parms.delBtn).each( function() {
					if ( $(this).attr('disabled') != 'disabled' ) {
						$(this).attr('disabled','disabled');
						$(this).addClass('disabled-sprite-delete-run');
					}
				});
			});
			
			$(document).on('miaStop', function() {
				$(parms.addBtn).removeAttr('disabled');
				$('.disabled-sprite-delete-run').removeAttr('disabled');
				$('.disabled-sprite-delete-run').removeClass('.disabled-sprite-delete-run');
			});
			
			refreshManagerView( container, { spriteTable: this.spriteTable }, tpl.spriteManagerEntry );
			
			$(document).on( update, selectContainer, function() {
				var selected = $(this).val();
				refreshVariableSelectView( that, $(this) );
				$(this).val( selected );
				if( !$(this).val() ) $(this)[0].selectedIndex = 0;
			});
			triggerSelectViewUpdate();
		},
		
		refreshView: function() {
			refreshManagerView( container, { spriteTable: this.spriteTable }, tpl.spriteManagerEntry );
		},
		
		refreshSelectVeiws: function() {
			triggerSelectViewUpdate();
		}
	};
	
	function checkUrl( parms ) {
		var img = new Image();
		$(img).load(function () {
			$(this).hide();
			parms.btn.removeAttr('disabled');
			
			try {
				var sprite = new VisualIDE.CanvasSprite(parms.url);
				canvas.addSprite(parms.name, sprite);
				addVar( parms.that, parms.name, parms.url, sprite );
				refreshManagerView( container, { spriteTable: parms.that.spriteTable }, tpl.spriteManagerEntry );
				triggerSelectViewUpdate();
				
				parms.nameField.val('');
				parms.urlField.val('');
				parms.urlField.parent().removeClass('has-error');
			}
			catch(err) {
				parms.urlField.parent().addClass('has-error');
				parms.urlField.focus();
			}
		})
		.error(function () {
			parms.btn.removeAttr('disabled');
			parms.urlField.parent().addClass('has-error');
			parms.urlField.focus();
		})
		.attr('src', parms.url);
	}
	
	function addVar( that, name, url, target ) {
		var objVar = {};
		objVar.defalut = false;
		objVar.name = name;
		objVar.url = url;
		objVar.target = target;
		
		for ( var i=0; i<that.spriteTable.length; i++ ) {
			if ( that.spriteTable[i].name.toLowerCase() == name.toLowerCase() ) {
				return;
			}
		}
		
		that.spriteTable.push(objVar);
	}
	
	function deleteVar( that, name ) {
		for ( var i=0; i<that.spriteTable.length; i++ ) {
			if ( that.spriteTable[i].name.toLowerCase() == name.toLowerCase() ) {
				that.spriteTable.splice(i,1);
				canvas.removeSprite(name);
				break;
			}
		}
	}
	
	function refreshVariableSelectView( that, selectContainer ) {
		var compiled = _.template( tpl.spriteSelectEntry );
		var html = compiled( { spriteTable: that.spriteTable } );
		
		selectContainer.html( html );
	}
	
	function triggerSelectViewUpdate() {
		$( selectContainer ).trigger( update );
	}
	
	return ide;

}( VisualIDE || {} ));

function refreshManagerView( container, model, template ) {
	var compiled = _.template( template );
	var html = compiled( model );
	
	container.html( html );
}
