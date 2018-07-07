/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2011-2013 Santhosh Thottingal, Neil Kandalgaonkar
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

	var MessageParser = function ( options ) ***REMOVED***
		this.options = $.extend( ***REMOVED***}, $.i18n.parser.defaults, options );
		this.language = $.i18n.languages[ String.locale ] || $.i18n.languages[ 'default' ];
		this.emitter = $.i18n.parser.emitter;
	};

	MessageParser.prototype = ***REMOVED***

		constructor: MessageParser,

		simpleParse: function ( message, parameters ) ***REMOVED***
			return message.replace( /\$(\d+)/g, function ( str, match ) ***REMOVED***
				var index = parseInt( match, 10 ) - 1;

				return parameters[ index ] !== undefined ? parameters[ index ] : '$' + match;
			} );
		},

		parse: function ( message, replacements ) ***REMOVED***
			if ( message.indexOf( '***REMOVED******REMOVED***' ) < 0 ) ***REMOVED***
				return this.simpleParse( message, replacements );
			}

			this.emitter.language = $.i18n.languages[ $.i18n().locale ] ||
				$.i18n.languages[ 'default' ];

			return this.emitter.emit( this.ast( message ), replacements );
		},

		ast: function ( message ) ***REMOVED***
			var pipe, colon, backslash, anyCharacter, dollar, digits, regularLiteral,
				regularLiteralWithoutBar, regularLiteralWithoutSpace, escapedOrLiteralWithoutBar,
				escapedOrRegularLiteral, templateContents, templateName, openTemplate,
				closeTemplate, expression, paramExpression, result,
				pos = 0;

			// Try parsers until one works, if none work return null
			function choice( parserSyntax ) ***REMOVED***
				return function () ***REMOVED***
					var i, result;

					for ( i = 0; i < parserSyntax.length; i++ ) ***REMOVED***
						result = parserSyntax[ i ]();

						if ( result !== null ) ***REMOVED***
							return result;
						}
					}

					return null;
				};
			}

			// Try several parserSyntax-es in a row.
			// All must succeed; otherwise, return null.
			// This is the only eager one.
			function sequence( parserSyntax ) ***REMOVED***
				var i, res,
					originalPos = pos,
					result = [];

				for ( i = 0; i < parserSyntax.length; i++ ) ***REMOVED***
					res = parserSyntax[ i ]();

					if ( res === null ) ***REMOVED***
						pos = originalPos;

						return null;
					}

					result.push( res );
				}

				return result;
			}

			// Run the same parser over and over until it fails.
			// Must succeed a minimum of n times; otherwise, return null.
			function nOrMore( n, p ) ***REMOVED***
				return function () ***REMOVED***
					var originalPos = pos,
						result = [],
						parsed = p();

					while ( parsed !== null ) ***REMOVED***
						result.push( parsed );
						parsed = p();
					}

					if ( result.length < n ) ***REMOVED***
						pos = originalPos;

						return null;
					}

					return result;
				};
			}

			// Helpers -- just make parserSyntax out of simpler JS builtin types

			function makeStringParser( s ) ***REMOVED***
				var len = s.length;

				return function () ***REMOVED***
					var result = null;

					if ( message.slice( pos, pos + len ) === s ) ***REMOVED***
						result = s;
						pos += len;
					}

					return result;
				};
			}

			function makeRegexParser( regex ) ***REMOVED***
				return function () ***REMOVED***
					var matches = message.slice( pos ).match( regex );

					if ( matches === null ) ***REMOVED***
						return null;
					}

					pos += matches[ 0 ].length;

					return matches[ 0 ];
				};
			}

			pipe = makeStringParser( '|' );
			colon = makeStringParser( ':' );
			backslash = makeStringParser( '\\' );
			anyCharacter = makeRegexParser( /^./ );
			dollar = makeStringParser( '$' );
			digits = makeRegexParser( /^\d+/ );
			regularLiteral = makeRegexParser( /^[^***REMOVED***}\[\]$\\]/ );
			regularLiteralWithoutBar = makeRegexParser( /^[^***REMOVED***}\[\]$\\|]/ );
			regularLiteralWithoutSpace = makeRegexParser( /^[^***REMOVED***}\[\]$\s]/ );

			// There is a general pattern:
			// parse a thing;
			// if it worked, apply transform,
			// otherwise return null.
			// But using this as a combinator seems to cause problems
			// when combined with nOrMore().
			// May be some scoping issue.
			function transform( p, fn ) ***REMOVED***
				return function () ***REMOVED***
					var result = p();

					return result === null ? null : fn( result );
				};
			}

			// Used to define "literals" within template parameters. The pipe
			// character is the parameter delimeter, so by default
			// it is not a literal in the parameter
			function literalWithoutBar() ***REMOVED***
				var result = nOrMore( 1, escapedOrLiteralWithoutBar )();

				return result === null ? null : result.join( '' );
			}

			function literal() ***REMOVED***
				var result = nOrMore( 1, escapedOrRegularLiteral )();

				return result === null ? null : result.join( '' );
			}

			function escapedLiteral() ***REMOVED***
				var result = sequence( [ backslash, anyCharacter ] );

				return result === null ? null : result[ 1 ];
			}

			choice( [ escapedLiteral, regularLiteralWithoutSpace ] );
			escapedOrLiteralWithoutBar = choice( [ escapedLiteral, regularLiteralWithoutBar ] );
			escapedOrRegularLiteral = choice( [ escapedLiteral, regularLiteral ] );

			function replacement() ***REMOVED***
				var result = sequence( [ dollar, digits ] );

				if ( result === null ) ***REMOVED***
					return null;
				}

				return [ 'REPLACE', parseInt( result[ 1 ], 10 ) - 1 ];
			}

			templateName = transform(
				// see $wgLegalTitleChars
				// not allowing : due to the need to catch "PLURAL:$1"
				makeRegexParser( /^[ !"$&'()*,.\/0-9;=?@A-Z\^_`a-z~\x80-\xFF+\-]+/ ),

				function ( result ) ***REMOVED***
					return result.toString();
				}
			);

			function templateParam() ***REMOVED***
				var expr,
					result = sequence( [ pipe, nOrMore( 0, paramExpression ) ] );

				if ( result === null ) ***REMOVED***
					return null;
				}

				expr = result[ 1 ];

				// use a "CONCAT" operator if there are multiple nodes,
				// otherwise return the first node, raw.
				return expr.length > 1 ? [ 'CONCAT' ].concat( expr ) : expr[ 0 ];
			}

			function templateWithReplacement() ***REMOVED***
				var result = sequence( [ templateName, colon, replacement ] );

				return result === null ? null : [ result[ 0 ], result[ 2 ] ];
			}

			function templateWithOutReplacement() ***REMOVED***
				var result = sequence( [ templateName, colon, paramExpression ] );

				return result === null ? null : [ result[ 0 ], result[ 2 ] ];
			}

			templateContents = choice( [
				function () ***REMOVED***
					var res = sequence( [
						// templates can have placeholders for dynamic
						// replacement eg: ***REMOVED******REMOVED***PLURAL:$1|one car|$1 cars}}
						// or no placeholders eg:
						// ***REMOVED******REMOVED***GRAMMAR:genitive|***REMOVED******REMOVED***SITENAME}}}
						choice( [ templateWithReplacement, templateWithOutReplacement ] ),
						nOrMore( 0, templateParam )
					] );

					return res === null ? null : res[ 0 ].concat( res[ 1 ] );
				},
				function () ***REMOVED***
					var res = sequence( [ templateName, nOrMore( 0, templateParam ) ] );

					if ( res === null ) ***REMOVED***
						return null;
					}

					return [ res[ 0 ] ].concat( res[ 1 ] );
				}
			] );

			openTemplate = makeStringParser( '***REMOVED******REMOVED***' );
			closeTemplate = makeStringParser( '}}' );

			function template() ***REMOVED***
				var result = sequence( [ openTemplate, templateContents, closeTemplate ] );

				return result === null ? null : result[ 1 ];
			}

			expression = choice( [ template, replacement, literal ] );
			paramExpression = choice( [ template, replacement, literalWithoutBar ] );

			function start() ***REMOVED***
				var result = nOrMore( 0, expression )();

				if ( result === null ) ***REMOVED***
					return null;
				}

				return [ 'CONCAT' ].concat( result );
			}

			result = start();

			/*
			 * For success, the pos must have gotten to the end of the input
			 * and returned a non-null.
			 * n.b. This is part of language infrastructure, so we do not throw an internationalizable message.
			 */
			if ( result === null || pos !== message.length ) ***REMOVED***
				throw new Error( 'Parse error at position ' + pos.toString() + ' in input: ' + message );
			}

			return result;
		}

	};

	$.extend( $.i18n.parser, new MessageParser() );
}( jQuery ) );
