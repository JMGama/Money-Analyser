/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) ***REMOVED***
	'use strict';

	var nav, I18N,
		slice = Array.prototype.slice;
	/**
	 * @constructor
	 * @param ***REMOVED***Object} options
	 */
	I18N = function ( options ) ***REMOVED***
		// Load defaults
		this.options = $.extend( ***REMOVED***}, I18N.defaults, options );

		this.parser = this.options.parser;
		this.locale = this.options.locale;
		this.messageStore = this.options.messageStore;
		this.languages = ***REMOVED***};

		this.init();
	};

	I18N.prototype = ***REMOVED***
		/**
		 * Initialize by loading locales and setting up
		 * String.prototype.toLocaleString and String.locale.
		 */
		init: function () ***REMOVED***
			var i18n = this;

			// Set locale of String environment
			String.locale = i18n.locale;

			// Override String.localeString method
			String.prototype.toLocaleString = function () ***REMOVED***
				var localeParts, localePartIndex, value, locale, fallbackIndex,
					tryingLocale, message;

				value = this.valueOf();
				locale = i18n.locale;
				fallbackIndex = 0;

				while ( locale ) ***REMOVED***
					// Iterate through locales starting at most-specific until
					// localization is found. As in fi-Latn-FI, fi-Latn and fi.
					localeParts = locale.split( '-' );
					localePartIndex = localeParts.length;

					do ***REMOVED***
						tryingLocale = localeParts.slice( 0, localePartIndex ).join( '-' );
						message = i18n.messageStore.get( tryingLocale, value );

						if ( message ) ***REMOVED***
							return message;
						}

						localePartIndex--;
					} while ( localePartIndex );

					if ( locale === 'en' ) ***REMOVED***
						break;
					}

					locale = ( $.i18n.fallbacks[ i18n.locale ] && $.i18n.fallbacks[ i18n.locale ][ fallbackIndex ] ) ||
						i18n.options.fallbackLocale;
					$.i18n.log( 'Trying fallback locale for ' + i18n.locale + ': ' + locale + ' (' + value + ')' );

					fallbackIndex++;
				}

				// key not found
				return '';
			};
		},

		/*
		 * Destroy the i18n instance.
		 */
		destroy: function () ***REMOVED***
			$.removeData( document, 'i18n' );
		},

		/**
		 * General message loading API This can take a URL string for
		 * the json formatted messages. Example:
		 * <code>load('path/to/all_localizations.json');</code>
		 *
		 * To load a localization file for a locale:
		 * <code>
		 * load('path/to/de-messages.json', 'de' );
		 * </code>
		 *
		 * To load a localization file from a directory:
		 * <code>
		 * load('path/to/i18n/directory', 'de' );
		 * </code>
		 * The above method has the advantage of fallback resolution.
		 * ie, it will automatically load the fallback locales for de.
		 * For most usecases, this is the recommended method.
		 * It is optional to have trailing slash at end.
		 *
		 * A data object containing message key- message translation mappings
		 * can also be passed. Example:
		 * <code>
		 * load( ***REMOVED*** 'hello' : 'Hello' }, optionalLocale );
		 * </code>
		 *
		 * A source map containing key-value pair of languagename and locations
		 * can also be passed. Example:
		 * <code>
		 * load( ***REMOVED***
		 * bn: 'i18n/bn.json',
		 * he: 'i18n/he.json',
		 * en: 'i18n/en.json'
		 * } )
		 * </code>
		 *
		 * If the data argument is null/undefined/false,
		 * all cached messages for the i18n instance will get reset.
		 *
		 * @param ***REMOVED***string|Object} source
		 * @param ***REMOVED***string} locale Language tag
		 * @return ***REMOVED***jQuery.Promise}
		 */
		load: function ( source, locale ) ***REMOVED***
			var fallbackLocales, locIndex, fallbackLocale, sourceMap = ***REMOVED***};
			if ( !source && !locale ) ***REMOVED***
				source = 'i18n/' + $.i18n().locale + '.json';
				locale = $.i18n().locale;
			}
			if ( typeof source === 'string' &&
				// source extension should be json, but can have query params after that.
				source.split( '?' )[ 0 ].split( '.' ).pop() !== 'json'
			) ***REMOVED***
				// Load specified locale then check for fallbacks when directory is specified in load()
				sourceMap[ locale ] = source + '/' + locale + '.json';
				fallbackLocales = ( $.i18n.fallbacks[ locale ] || [] )
					.concat( this.options.fallbackLocale );
				for ( locIndex = 0; locIndex < fallbackLocales.length; locIndex++ ) ***REMOVED***
					fallbackLocale = fallbackLocales[ locIndex ];
					sourceMap[ fallbackLocale ] = source + '/' + fallbackLocale + '.json';
				}
				return this.load( sourceMap );
			} else ***REMOVED***
				return this.messageStore.load( source, locale );
			}

		},

		/**
		 * Does parameter and magic word substitution.
		 *
		 * @param ***REMOVED***string} key Message key
		 * @param ***REMOVED***Array} parameters Message parameters
		 * @return ***REMOVED***string}
		 */
		parse: function ( key, parameters ) ***REMOVED***
			var message = key.toLocaleString();
			// FIXME: This changes the state of the I18N object,
			// should probably not change the 'this.parser' but just
			// pass it to the parser.
			this.parser.language = $.i18n.languages[ $.i18n().locale ] || $.i18n.languages[ 'default' ];
			if ( message === '' ) ***REMOVED***
				message = key;
			}
			return this.parser.parse( message, parameters );
		}
	};

	/**
	 * Process a message from the $.I18N instance
	 * for the current document, stored in jQuery.data(document).
	 *
	 * @param ***REMOVED***string} key Key of the message.
	 * @param ***REMOVED***string} param1 [param...] Variadic list of parameters for ***REMOVED***key}.
	 * @return ***REMOVED***string|$.I18N} Parsed message, or if no key was given
	 * the instance of $.I18N is returned.
	 */
	$.i18n = function ( key, param1 ) ***REMOVED***
		var parameters,
			i18n = $.data( document, 'i18n' ),
			options = typeof key === 'object' && key;

		// If the locale option for this call is different then the setup so far,
		// update it automatically. This doesn't just change the context for this
		// call but for all future call as well.
		// If there is no i18n setup yet, don't do this. It will be taken care of
		// by the `new I18N` construction below.
		// NOTE: It should only change language for this one call.
		// Then cache instances of I18N somewhere.
		if ( options && options.locale && i18n && i18n.locale !== options.locale ) ***REMOVED***
			String.locale = i18n.locale = options.locale;
		}

		if ( !i18n ) ***REMOVED***
			i18n = new I18N( options );
			$.data( document, 'i18n', i18n );
		}

		if ( typeof key === 'string' ) ***REMOVED***
			if ( param1 !== undefined ) ***REMOVED***
				parameters = slice.call( arguments, 1 );
			} else ***REMOVED***
				parameters = [];
			}

			return i18n.parse( key, parameters );
		} else ***REMOVED***
			// FIXME: remove this feature/bug.
			return i18n;
		}
	};

	$.fn.i18n = function () ***REMOVED***
		var i18n = $.data( document, 'i18n' );

		if ( !i18n ) ***REMOVED***
			i18n = new I18N();
			$.data( document, 'i18n', i18n );
		}
		String.locale = i18n.locale;
		return this.each( function () ***REMOVED***
			var $this = $( this ),
				messageKey = $this.data( 'i18n' ),
				lBracket, rBracket, type, key;

			if ( messageKey ) ***REMOVED***
				lBracket = messageKey.indexOf( '[' );
				rBracket = messageKey.indexOf( ']' );
				if ( lBracket !== -1 && rBracket !== -1 && lBracket < rBracket ) ***REMOVED***
					type = messageKey.slice( lBracket + 1, rBracket );
					key = messageKey.slice( rBracket + 1 );
					if ( type === 'html' ) ***REMOVED***
						$this.html( i18n.parse( key ) );
					} else ***REMOVED***
						$this.attr( type, i18n.parse( key ) );
					}
				} else ***REMOVED***
					$this.text( i18n.parse( messageKey ) );
				}
			} else ***REMOVED***
				$this.find( '[data-i18n]' ).i18n();
			}
		} );
	};

	String.locale = String.locale || $( 'html' ).attr( 'lang' );

	if ( !String.locale ) ***REMOVED***
		if ( typeof window.navigator !== undefined ) ***REMOVED***
			nav = window.navigator;
			String.locale = nav.language || nav.userLanguage || '';
		} else ***REMOVED***
			String.locale = '';
		}
	}

	$.i18n.languages = ***REMOVED***};
	$.i18n.messageStore = $.i18n.messageStore || ***REMOVED***};
	$.i18n.parser = ***REMOVED***
		// The default parser only handles variable substitution
		parse: function ( message, parameters ) ***REMOVED***
			return message.replace( /\$(\d+)/g, function ( str, match ) ***REMOVED***
				var index = parseInt( match, 10 ) - 1;
				return parameters[ index ] !== undefined ? parameters[ index ] : '$' + match;
			} );
		},
		emitter: ***REMOVED***}
	};
	$.i18n.fallbacks = ***REMOVED***};
	$.i18n.debug = false;
	$.i18n.log = function ( /* arguments */ ) ***REMOVED***
		if ( window.console && $.i18n.debug ) ***REMOVED***
			window.console.log.apply( window.console, arguments );
		}
	};
	/* Static members */
	I18N.defaults = ***REMOVED***
		locale: String.locale,
		fallbackLocale: 'en',
		parser: $.i18n.parser,
		messageStore: $.i18n.messageStore
	};

	// Expose constructor
	$.i18n.constructor = I18N;
}( jQuery ) );
