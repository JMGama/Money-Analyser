/*!
 * jQuery Internationalization library - Message Store
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
 * choose one license or the other and you don't have to notify anyone which license you are using.
 * You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) ***REMOVED***
	'use strict';

	var MessageStore = function () ***REMOVED***
		this.messages = ***REMOVED***};
		this.sources = ***REMOVED***};
	};

	function jsonMessageLoader( url ) ***REMOVED***
		var deferred = $.Deferred();

		$.getJSON( url )
			.done( deferred.resolve )
			.fail( function ( jqxhr, settings, exception ) ***REMOVED***
				$.i18n.log( 'Error in loading messages from ' + url + ' Exception: ' + exception );
				// Ignore 404 exception, because we are handling fallabacks explicitly
				deferred.resolve();
			} );

		return deferred.promise();
	}

	/**
	 * See https://github.com/wikimedia/jquery.i18n/wiki/Specification#wiki-Message_File_Loading
	 */
	MessageStore.prototype = ***REMOVED***

		/**
		 * General message loading API This can take a URL string for
		 * the json formatted messages.
		 * <code>load('path/to/all_localizations.json');</code>
		 *
		 * This can also load a localization file for a locale <code>
		 * load( 'path/to/de-messages.json', 'de' );
		 * </code>
		 * A data object containing message key- message translation mappings
		 * can also be passed Eg:
		 * <code>
		 * load( ***REMOVED*** 'hello' : 'Hello' }, optionalLocale );
		 * </code> If the data argument is
		 * null/undefined/false,
		 * all cached messages for the i18n instance will get reset.
		 *
		 * @param ***REMOVED***string|Object} source
		 * @param ***REMOVED***string} locale Language tag
		 * @return ***REMOVED***jQuery.Promise}
		 */
		load: function ( source, locale ) ***REMOVED***
			var key = null,
				deferred = null,
				deferreds = [],
				messageStore = this;

			if ( typeof source === 'string' ) ***REMOVED***
				// This is a URL to the messages file.
				$.i18n.log( 'Loading messages from: ' + source );
				deferred = jsonMessageLoader( source )
					.done( function ( localization ) ***REMOVED***
						messageStore.set( locale, localization );
					} );

				return deferred.promise();
			}

			if ( locale ) ***REMOVED***
				// source is an key-value pair of messages for given locale
				messageStore.set( locale, source );

				return $.Deferred().resolve();
			} else ***REMOVED***
				// source is a key-value pair of locales and their source
				for ( key in source ) ***REMOVED***
					if ( Object.prototype.hasOwnProperty.call( source, key ) ) ***REMOVED***
						locale = key;
						// No ***REMOVED***locale} given, assume data is a group of languages,
						// call this function again for each language.
						deferreds.push( messageStore.load( source[ key ], locale ) );
					}
				}
				return $.when.apply( $, deferreds );
			}

		},

		/**
		 * Set messages to the given locale.
		 * If locale exists, add messages to the locale.
		 *
		 * @param ***REMOVED***string} locale
		 * @param ***REMOVED***Object} messages
		 */
		set: function ( locale, messages ) ***REMOVED***
			if ( !this.messages[ locale ] ) ***REMOVED***
				this.messages[ locale ] = messages;
			} else ***REMOVED***
				this.messages[ locale ] = $.extend( this.messages[ locale ], messages );
			}
		},

		/**
		 *
		 * @param ***REMOVED***string} locale
		 * @param ***REMOVED***string} messageKey
		 * @return ***REMOVED***boolean}
		 */
		get: function ( locale, messageKey ) ***REMOVED***
			return this.messages[ locale ] && this.messages[ locale ][ messageKey ];
		}
	};

	$.extend( $.i18n.messageStore, new MessageStore() );
}( jQuery ) );
