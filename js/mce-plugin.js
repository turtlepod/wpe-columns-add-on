/**
 * WP Editor Column Addon
 * 
 * @author    David Chandra Purnama <david@shellcreeper.com>
 * @copyright Copyright (c) 2013, David Chandra Purnama
 * @link      http://my.wp-editor.com
 * @link      http://shellcreeper.com
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

(function(){

	/**
	 * ================================================
	 * Hide Path
	 * ================================================
	 */
	function wpe_columns_hide_path( ed, e ){
		jQuery('#' + tinyMCE.activeEditor.editorId + '_path').hide();
	};

	/**
	 * ================================================
	 * Toolbar Button Click Action
	 * ================================================
	 */
	/* 1212 */
	function wpe_columns_button_1212( ed, url ){
		/* First column content if any text selected, use it. */
		var content = '<p>Column 1</p>';
		var selected_content = tinyMCE.activeEditor.selection.getContent();
		if ( selected_content ){
			content = '<p>' + selected_content + '</p>';
		}
		/* Insert */
		var insert  = '<div class="wpe-col wpe-col-12-12">';
			insert += '<div class="wpe-col-1">';
			insert += content;
			insert += '</div>';
			insert += '<div class="wpe-col-2">';
			insert += '<p>Column 2</p>';
			insert += '</div>';
			insert += '</div>';
		tinyMCE.activeEditor.execCommand( 'mceInsertContent', 0, insert + ' ' );
	};
	/* 1323 */
	function wpe_columns_button_1323( ed, url ){
		/* First column content if any text selected, use it. */
		var content = '<p>Column 1</p>';
		var selected_content = tinyMCE.activeEditor.selection.getContent();
		if ( selected_content ){
			content = '<p>' + selected_content + '</p>';
		}
		/* Insert */
		var insert  = '<div class="wpe-col wpe-col-13-23">';
			insert += '<div class="wpe-col-1">';
			insert += content;
			insert += '</div>';
			insert += '<div class="wpe-col-2">';
			insert += '<p>Column 2</p>';
			insert += '</div>';
			insert += '</div>';
		tinyMCE.activeEditor.execCommand( 'mceInsertContent', 0, insert + ' ' );
	};
	/* 2313 */
	function wpe_columns_button_2313( ed, url ){
		/* First column content if any text selected, use it. */
		var content = '<p>Column 1</p>';
		var selected_content = tinyMCE.activeEditor.selection.getContent();
		if ( selected_content ){
			content = '<p>' + selected_content + '</p>';
		}
		/* Insert */
		var insert  = '<div class="wpe-col wpe-col-23-13">';
			insert += '<div class="wpe-col-1">';
			insert += content;
			insert += '</div>';
			insert += '<div class="wpe-col-2">';
			insert += '<p>Column 2</p>';
			insert += '</div>';
			insert += '</div>';
		tinyMCE.activeEditor.execCommand( 'mceInsertContent', 0, insert + ' ' );
	};
	/* 131313 */
	function wpe_columns_button_131313( ed, url ){
		/* First column content if any text selected, use it. */
		var content = '<p>Column 1</p>';
		var selected_content = tinyMCE.activeEditor.selection.getContent();
		if ( selected_content ){
			content = '<p>' + selected_content + '</p>';
		}
		/* Insert */
		var insert  = '<div class="wpe-col wpe-col-13-13-13">';
			insert += '<div class="wpe-col-1">';
			insert += content;
			insert += '</div>';
			insert += '<div class="wpe-col-2">';
			insert += '<p>Column 2</p>';
			insert += '</div>';
			insert += '<div class="wpe-col-3">';
			insert += '<p>Column 3</p>';
			insert += '</div>';
			insert += '</div>';
		tinyMCE.activeEditor.execCommand( 'mceInsertContent', 0, insert + ' ' );
	};

	/**
	 * ================================================
	 * Setting to Remove Column
	 * ================================================
	 */
	function wpe_columns_inline_setting( ed, e ){
		/* Editor var */
		var editor_content = jQuery( '#' + tinyMCE.activeEditor.editorId + '_ifr' ).contents();

		/* Add inline setting */
		editor_content.find( ".wpe-col" ).mousemove(function(){

			/* Add active class */
			jQuery( this ).addClass('wpe-col-active');

			/* If inline setting not exist, add it */
			if ( jQuery( this ).children('.wpe-col-remove').length <= 0 ) {
				jQuery( this ).prepend( '<div class="wpe-col-remove"></div>' );
			}
		});

		/* Remove inline setting */
		editor_content.find( ".wpe-col" ).mouseleave(function(){
			jQuery( this ).removeClass('wpe-col-active');
			jQuery( this ).find( '.wpe-col-remove' ).remove();
		});
	};


	/**
	 * ================================================
	 * Do Inline Setting
	 * ================================================
	 */
	function wpe_column_do_inline_setting( ed, e ){
		/* Editor var */
		var editor_content = jQuery( '#' + tinyMCE.activeEditor.editorId + '_ifr' ).contents();

		/* Remove box */
		editor_content.find('.wpe-col-remove').unbind("click").click(function(){

			/* Add class to delete setting */
			jQuery(this).addClass( "wpe-col-setting-ready-remove" );

			/* Add class to delete the current box */
			jQuery(this).parent( '.wpe-col' ).addClass( "wpe-col-ready-remove" );

			/* Get content */
			var col_1_content = editor_content.find('.wpe-col-ready-remove .wpe-col-1').html();
			var col_2_content = editor_content.find('.wpe-col-ready-remove .wpe-col-2').html();
			var col_3_content = '';
			if ( editor_content.find('.wpe-col-ready-remove .wpe-col-3').length > 0 ){
				col_3_content += editor_content.find('.wpe-col-ready-remove .wpe-col-3').html();
			}
			editor_content.find('.wpe-col-ready-remove').after( col_1_content + col_2_content + col_3_content );
			editor_content.find('.wpe-col-ready-remove').remove();
			editor_content.find('.wpe-col-setting-ready-remove').remove();
		});
	};

	/**
	 * ================================================
	 * Presistent adding column, to make sure no column is deleted.
	 * ================================================
	 */
	function wpe_columns_fix( ed, url ){
		/* Editor var */
		var editor_content = jQuery( '#' + tinyMCE.activeEditor.editorId + '_ifr' ).contents();

		/* Fix Column */
		editor_content.find('.wpe-col').each( function () {

			/* if there's a remove icon */
			if ( jQuery( this ).children('.wpe-col-remove').length == 0 ) {
				/* No 1st col */
				if ( jQuery(this).children('.wpe-col-1').length == 0 ) {
					/* Add after remove icon */
					jQuery( this ).children('.wpe-col-remove').after( '<div class="wpe-col-1"><p>&nbsp;</p></div>' );
				}
			}
			/* No remove icon */
			else{
				/* No 1st column, add it in the beginning */
				if ( jQuery(this).children('.wpe-col-1').length == 0 ) {
					jQuery(this).prepend( '<div class="wpe-col-1"><p>&nbsp;</p></div>' );
				}
			}
			/* No 2nd column */
			if ( jQuery(this).children('.wpe-col-2').length == 0 ) {
				/* Add it after 1st column */
				jQuery( this ).children('.wpe-col-1').after( '<div class="wpe-col-2"><p>&nbsp;</p></div>' );
			}
			
			/* 3rd column, only in 13-13-13 */
			if ( jQuery(this).hasClass('wpe-col-13-13-13') ) {
				if ( jQuery(this).children('.wpe-col-3').length == 0 ) {
					jQuery( this ).children('.wpe-col-2').after( '<div class="wpe-col-3"><p>&nbsp;</p></div>' );
				}
			}
			else{
			
			
			
			}
		});
	};

	/**
	 * ================================================
	 * Create TinyMCE Plugin for Boxes
	 * Modified from Crazy Pills Plugins
	 * http://wordpress.org/extend/plugins/crazy-pills/
	 * ================================================
	 */
	tinymce.create( 'tinymce.plugins.wpe_addon_columns', {

		/* Load inline setting on editor click */
		init : function( ed, url ) {

			/* Hide Path  */
			ed.onBeforeGetContent.add( function( ed, e ) {
				wpe_columns_hide_path( ed, e );
			});

			/* Column 1/2 - 1/2 Button */
			ed.addButton('wpe_addon_col_12_12', {
				title : 'Columns 1/2-1/2',
				image : url + '/../images/tool-icon-12-12.png',
				onclick : function() {
					wpe_columns_button_1212( ed, url );
				},
			});
			/* Column 1/3 - 2/3 Button */
			ed.addButton('wpe_addon_col_13_23', {
				title : 'Columns 1/3-2/3',
				image : url + '/../images/tool-icon-13-23.png',
				onclick : function() {
					wpe_columns_button_1323( ed, url );
				},
			});
			/* Column 2/3 - 1/3 Button */
			ed.addButton('wpe_addon_col_23_13', {
				title : 'Columns 2/3-1/3',
				image : url + '/../images/tool-icon-23-13.png',
				onclick : function() {
					wpe_columns_button_2313( ed, url );
				},
			});
			/* Column 1/3 - 1/3 - 1/3 Button */
			ed.addButton('wpe_addon_col_13_13_13', {
				title : 'Columns 1/3-1/3-1/3',
				image : url + '/../images/tool-icon-13-13-13.png',
				onclick : function() {
					wpe_columns_button_131313( ed, url );
				},
			});

			/* onInit and onEvent: Fix Column, Add Inline Setting */
			ed.onInit.add( function( ed, e ) {
				wpe_columns_fix( ed, e );
				wpe_columns_inline_setting( ed, e );
			});
			ed.onEvent.add( function( ed, e ) {
				wpe_columns_fix( ed, e );
				wpe_columns_inline_setting( ed, e );
			});

			/* Add Setting On Click */
			ed.onMouseDown.add( function( ed, e ) {
				wpe_column_do_inline_setting( ed, e );
			});
		},

		/**
		 * Creates control instances based in the incomming name.
		 */
		createControl: function (n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 */
		getInfo : function() {
			return {
				longname : "WP Editor Columns",
				author : "David Chandra Purnama",
				authorurl : 'http://shellcreeper.com',
				infourl : 'http://wp-editor.com',
				version : "0.1.1"
			};
		}
	});

	tinymce.PluginManager.add( 'wpe_addon_columns', tinymce.plugins.wpe_addon_columns );
})();