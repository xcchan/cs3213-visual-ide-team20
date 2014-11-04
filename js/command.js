/**
 *  CS3212 Software Systems Design Team 20
 */
var VisualIDE = (function(ide) {
  'use strict';

  // ---------- Original Commands -----------
  VisualIDE.cmds = [
    {
      id          : 0,
      name        : "X Position",
      parms       : ['Horizontal Position'],
      def_value   : '0',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "numberInput",
	  category	  : 0
    },
    {
      id          : 1,
      name        : "Y Position",
      parms       : ['Vertical Position'],
      def_value   : '0',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "numberInput",
	  category	  : 0
    },
    {
      id          : 4,
      name        : "Move",
      parms       : ['Steps'],
      def_value   : '10',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "numberInput",
	  category	  : 0
    },
    {
      id: 10,
      name        : "Assign",
      parms       : [],
      def_value   : [5,10],
      classes     : [],
      isContainer : true,
      extraHtml   : [],
	  template    : "assign",
	  category	  : 0
    },
    {
      id: 11,
      name        : "Rotate",
      parms       : [],
      def_value   : 90,
      classes     : [],
      isContainer : true,
      extraHtml   : [],
	  template    : "numberInput",
	  category	  : 0
    },
    {
      id: 8,
      name        : "IF",
      parms       : ['Condition'],
      def_value   : '0',
      classes     : ["command-if"],
      isContainer : true,
      extraHtml   : ["<ul></ul>"],
	  template    : "ifCondition",
	  category	  : 1
    },
    {
      id: 7,
      name        : "Repeat",
      parms       : ['Number of times'],
      def_value   : '5',
      classes     : ["command-loop"],
      isContainer : true,
      extraHtml   : ["<ul></ul>"],
	  template    : "repeat",
	  category	  : 1
    },
    {
      id: 9,
      name        : "Loop",
      parms       : [],
      def_value   : '',
      classes     : ["command-loop"],
      isContainer : true,
      extraHtml   : ["<ul></ul>"],
	  template    : "loop",
	  category	  : 1
    },
    {
      id          : 5,
      name        : "Change Costume",
      parms       : ['Image URL'],
      def_value   : 'http://placehold.it/100x150.png/fafafa/000000&text=character',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "textInput",
	  category	  : 2
    },
    {
      id          : 6,
      name        : "Change Background",
      parms       : ['Image URL'],
      def_value   : 'http://placehold.it/800x600.png/000000/ffffff&text=background',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "textInput",
	  category	  : 2
    },
    {
      id          : 2,
      name        : "Show Character",
      parms       : [],
      def_value   : '0',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "",
	  category	  : 2
    },
    {
      id          : 3,
      name        : "Hide Character",
      parms       : [],
      def_value   : '0',
      classes     : [],
      isContainer : false,
      extraHtml   : [],
	  template    : "",
	  category	  : 2
    },
  ];
  
  VisualIDE.Categories = {
	map: ["Basic", "Condition and Loops", "Extras"]
  };
  
  // Categories of  commands, 
  // To allow them to have other views as well?
  
  return ide;

}( VisualIDE || {} ));


//~ Enum reference(s):
//~ http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/