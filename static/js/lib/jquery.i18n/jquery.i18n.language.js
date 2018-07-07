/* global pluralRuleParser */
( function ( $ ) ***REMOVED***
	'use strict';

	// jscs:disable
	var language = ***REMOVED***
		// CLDR plural rules generated using
		// libs/CLDRPluralRuleParser/tools/PluralXML2JSON.html
		pluralRules: ***REMOVED***
			ak: ***REMOVED***
				one: 'n = 0..1'
			},
			am: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			ar: ***REMOVED***
				zero: 'n = 0',
				one: 'n = 1',
				two: 'n = 2',
				few: 'n % 100 = 3..10',
				many: 'n % 100 = 11..99'
			},
			ars: ***REMOVED***
				zero: 'n = 0',
				one: 'n = 1',
				two: 'n = 2',
				few: 'n % 100 = 3..10',
				many: 'n % 100 = 11..99'
			},
			as: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			be: ***REMOVED***
				one: 'n % 10 = 1 and n % 100 != 11',
				few: 'n % 10 = 2..4 and n % 100 != 12..14',
				many: 'n % 10 = 0 or n % 10 = 5..9 or n % 100 = 11..14'
			},
			bh: ***REMOVED***
				one: 'n = 0..1'
			},
			bn: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			br: ***REMOVED***
				one: 'n % 10 = 1 and n % 100 != 11,71,91',
				two: 'n % 10 = 2 and n % 100 != 12,72,92',
				few: 'n % 10 = 3..4,9 and n % 100 != 10..19,70..79,90..99',
				many: 'n != 0 and n % 1000000 = 0'
			},
			bs: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			cs: ***REMOVED***
				one: 'i = 1 and v = 0',
				few: 'i = 2..4 and v = 0',
				many: 'v != 0'
			},
			cy: ***REMOVED***
				zero: 'n = 0',
				one: 'n = 1',
				two: 'n = 2',
				few: 'n = 3',
				many: 'n = 6'
			},
			da: ***REMOVED***
				one: 'n = 1 or t != 0 and i = 0,1'
			},
			dsb: ***REMOVED***
				one: 'v = 0 and i % 100 = 1 or f % 100 = 1',
				two: 'v = 0 and i % 100 = 2 or f % 100 = 2',
				few: 'v = 0 and i % 100 = 3..4 or f % 100 = 3..4'
			},
			fa: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			ff: ***REMOVED***
				one: 'i = 0,1'
			},
			fil: ***REMOVED***
				one: 'v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9'
			},
			fr: ***REMOVED***
				one: 'i = 0,1'
			},
			ga: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2',
				few: 'n = 3..6',
				many: 'n = 7..10'
			},
			gd: ***REMOVED***
				one: 'n = 1,11',
				two: 'n = 2,12',
				few: 'n = 3..10,13..19'
			},
			gu: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			guw: ***REMOVED***
				one: 'n = 0..1'
			},
			gv: ***REMOVED***
				one: 'v = 0 and i % 10 = 1',
				two: 'v = 0 and i % 10 = 2',
				few: 'v = 0 and i % 100 = 0,20,40,60,80',
				many: 'v != 0'
			},
			he: ***REMOVED***
				one: 'i = 1 and v = 0',
				two: 'i = 2 and v = 0',
				many: 'v = 0 and n != 0..10 and n % 10 = 0'
			},
			hi: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			hr: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			hsb: ***REMOVED***
				one: 'v = 0 and i % 100 = 1 or f % 100 = 1',
				two: 'v = 0 and i % 100 = 2 or f % 100 = 2',
				few: 'v = 0 and i % 100 = 3..4 or f % 100 = 3..4'
			},
			hy: ***REMOVED***
				one: 'i = 0,1'
			},
			is: ***REMOVED***
				one: 't = 0 and i % 10 = 1 and i % 100 != 11 or t != 0'
			},
			iu: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			iw: ***REMOVED***
				one: 'i = 1 and v = 0',
				two: 'i = 2 and v = 0',
				many: 'v = 0 and n != 0..10 and n % 10 = 0'
			},
			kab: ***REMOVED***
				one: 'i = 0,1'
			},
			kn: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			kw: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			lag: ***REMOVED***
				zero: 'n = 0',
				one: 'i = 0,1 and n != 0'
			},
			ln: ***REMOVED***
				one: 'n = 0..1'
			},
			lt: ***REMOVED***
				one: 'n % 10 = 1 and n % 100 != 11..19',
				few: 'n % 10 = 2..9 and n % 100 != 11..19',
				many: 'f != 0'
			},
			lv: ***REMOVED***
				zero: 'n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19',
				one: 'n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1'
			},
			mg: ***REMOVED***
				one: 'n = 0..1'
			},
			mk: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 or f % 10 = 1'
			},
			mo: ***REMOVED***
				one: 'i = 1 and v = 0',
				few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
			},
			mr: ***REMOVED***
				one: 'i = 0 or n = 1'
			},
			mt: ***REMOVED***
				one: 'n = 1',
				few: 'n = 0 or n % 100 = 2..10',
				many: 'n % 100 = 11..19'
			},
			naq: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			nso: ***REMOVED***
				one: 'n = 0..1'
			},
			pa: ***REMOVED***
				one: 'n = 0..1'
			},
			pl: ***REMOVED***
				one: 'i = 1 and v = 0',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
				many: 'v = 0 and i != 1 and i % 10 = 0..1 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 12..14'
			},
			prg: ***REMOVED***
				zero: 'n % 10 = 0 or n % 100 = 11..19 or v = 2 and f % 100 = 11..19',
				one: 'n % 10 = 1 and n % 100 != 11 or v = 2 and f % 10 = 1 and f % 100 != 11 or v != 2 and f % 10 = 1'
			},
			pt: ***REMOVED***
				one: 'i = 0..1'
			},
			ro: ***REMOVED***
				one: 'i = 1 and v = 0',
				few: 'v != 0 or n = 0 or n != 1 and n % 100 = 1..19'
			},
			ru: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
				many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
			},
			se: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			sh: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			shi: ***REMOVED***
				one: 'i = 0 or n = 1',
				few: 'n = 2..10'
			},
			si: ***REMOVED***
				one: 'n = 0,1 or i = 0 and f = 1'
			},
			sk: ***REMOVED***
				one: 'i = 1 and v = 0',
				few: 'i = 2..4 and v = 0',
				many: 'v != 0'
			},
			sl: ***REMOVED***
				one: 'v = 0 and i % 100 = 1',
				two: 'v = 0 and i % 100 = 2',
				few: 'v = 0 and i % 100 = 3..4 or v != 0'
			},
			sma: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			smi: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			smj: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			smn: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			sms: ***REMOVED***
				one: 'n = 1',
				two: 'n = 2'
			},
			sr: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11 or f % 10 = 1 and f % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14 or f % 10 = 2..4 and f % 100 != 12..14'
			},
			ti: ***REMOVED***
				one: 'n = 0..1'
			},
			tl: ***REMOVED***
				one: 'v = 0 and i = 1,2,3 or v = 0 and i % 10 != 4,6,9 or v != 0 and f % 10 != 4,6,9'
			},
			tzm: ***REMOVED***
				one: 'n = 0..1 or n = 11..99'
			},
			uk: ***REMOVED***
				one: 'v = 0 and i % 10 = 1 and i % 100 != 11',
				few: 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14',
				many: 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14'
			},
			wa: ***REMOVED***
				one: 'n = 0..1'
			},
			zu: ***REMOVED***
				one: 'i = 0 or n = 1'
			}
		},
		// jscs:enable

		/**
		 * Plural form transformations, needed for some languages.
		 *
		 * @param ***REMOVED***integer} count
		 *            Non-localized quantifier
		 * @param ***REMOVED***Array} forms
		 *            List of plural forms
		 * @return ***REMOVED***string} Correct form for quantifier in this language
		 */
		convertPlural: function ( count, forms ) ***REMOVED***
			var pluralRules,
				pluralFormIndex,
				index,
				explicitPluralPattern = new RegExp( '\\d+=', 'i' ),
				formCount,
				form;

			if ( !forms || forms.length === 0 ) ***REMOVED***
				return '';
			}

			// Handle for Explicit 0= & 1= values
			for ( index = 0; index < forms.length; index++ ) ***REMOVED***
				form = forms[ index ];
				if ( explicitPluralPattern.test( form ) ) ***REMOVED***
					formCount = parseInt( form.slice( 0, form.indexOf( '=' ) ), 10 );
					if ( formCount === count ) ***REMOVED***
						return ( form.slice( form.indexOf( '=' ) + 1 ) );
					}
					forms[ index ] = undefined;
				}
			}

			forms = $.map( forms, function ( form ) ***REMOVED***
				if ( form !== undefined ) ***REMOVED***
					return form;
				}
			} );

			pluralRules = this.pluralRules[ $.i18n().locale ];

			if ( !pluralRules ) ***REMOVED***
				// default fallback.
				return ( count === 1 ) ? forms[ 0 ] : forms[ 1 ];
			}

			pluralFormIndex = this.getPluralForm( count, pluralRules );
			pluralFormIndex = Math.min( pluralFormIndex, forms.length - 1 );

			return forms[ pluralFormIndex ];
		},

		/**
		 * For the number, get the plural for index
		 *
		 * @param ***REMOVED***integer} number
		 * @param ***REMOVED***Object} pluralRules
		 * @return ***REMOVED***integer} plural form index
		 */
		getPluralForm: function ( number, pluralRules ) ***REMOVED***
			var i,
				pluralForms = [ 'zero', 'one', 'two', 'few', 'many', 'other' ],
				pluralFormIndex = 0;

			for ( i = 0; i < pluralForms.length; i++ ) ***REMOVED***
				if ( pluralRules[ pluralForms[ i ] ] ) ***REMOVED***
					if ( pluralRuleParser( pluralRules[ pluralForms[ i ] ], number ) ) ***REMOVED***
						return pluralFormIndex;
					}

					pluralFormIndex++;
				}
			}

			return pluralFormIndex;
		},

		/**
		 * Converts a number using digitTransformTable.
		 *
		 * @param ***REMOVED***number} num Value to be converted
		 * @param ***REMOVED***boolean} integer Convert the return value to an integer
		 * @return ***REMOVED***string} The number converted into a String.
		 */
		convertNumber: function ( num, integer ) ***REMOVED***
			var tmp, item, i,
				transformTable, numberString, convertedNumber;

			// Set the target Transform table:
			transformTable = this.digitTransformTable( $.i18n().locale );
			numberString = String( num );
			convertedNumber = '';

			if ( !transformTable ) ***REMOVED***
				return num;
			}

			// Check if the restore to Latin number flag is set:
			if ( integer ) ***REMOVED***
				if ( parseFloat( num, 10 ) === num ) ***REMOVED***
					return num;
				}

				tmp = [];

				for ( item in transformTable ) ***REMOVED***
					tmp[ transformTable[ item ] ] = item;
				}

				transformTable = tmp;
			}

			for ( i = 0; i < numberString.length; i++ ) ***REMOVED***
				if ( transformTable[ numberString[ i ] ] ) ***REMOVED***
					convertedNumber += transformTable[ numberString[ i ] ];
				} else ***REMOVED***
					convertedNumber += numberString[ i ];
				}
			}

			return integer ? parseFloat( convertedNumber, 10 ) : convertedNumber;
		},

		/**
		 * Grammatical transformations, needed for inflected languages.
		 * Invoked by putting ***REMOVED******REMOVED***grammar:form|word}} in a message.
		 * Override this method for languages that need special grammar rules
		 * applied dynamically.
		 *
		 * @param ***REMOVED***string} word
		 * @param ***REMOVED***string} form
		 * @return ***REMOVED***string}
		 */
		// eslint-disable-next-line no-unused-vars
		convertGrammar: function ( word, form ) ***REMOVED***
			return word;
		},

		/**
		 * Provides an alternative text depending on specified gender. Usage
		 * ***REMOVED******REMOVED***gender:[gender|user object]|masculine|feminine|neutral}}. If second
		 * or third parameter are not specified, masculine is used.
		 *
		 * These details may be overriden per language.
		 *
		 * @param ***REMOVED***string} gender
		 *      male, female, or anything else for neutral.
		 * @param ***REMOVED***Array} forms
		 *      List of gender forms
		 *
		 * @return ***REMOVED***string}
		 */
		gender: function ( gender, forms ) ***REMOVED***
			if ( !forms || forms.length === 0 ) ***REMOVED***
				return '';
			}

			while ( forms.length < 2 ) ***REMOVED***
				forms.push( forms[ forms.length - 1 ] );
			}

			if ( gender === 'male' ) ***REMOVED***
				return forms[ 0 ];
			}

			if ( gender === 'female' ) ***REMOVED***
				return forms[ 1 ];
			}

			return ( forms.length === 3 ) ? forms[ 2 ] : forms[ 0 ];
		},

		/**
		 * Get the digit transform table for the given language
		 * See http://cldr.unicode.org/translation/numbering-systems
		 *
		 * @param ***REMOVED***string} language
		 * @return ***REMOVED***Array|boolean} List of digits in the passed language or false
		 * representation, or boolean false if there is no information.
		 */
		digitTransformTable: function ( language ) ***REMOVED***
			var tables = ***REMOVED***
				ar: '٠١٢٣٤٥٦٧٨٩',
				fa: '۰۱۲۳۴۵۶۷۸۹',
				ml: '൦൧൨൩൪൫൬൭൮൯',
				kn: '೦೧೨೩೪೫೬೭೮೯',
				lo: '໐໑໒໓໔໕໖໗໘໙',
				or: '୦୧୨୩୪୫୬୭୮୯',
				kh: '០១២៣៤៥៦៧៨៩',
				pa: '੦੧੨੩੪੫੬੭੮੯',
				gu: '૦૧૨૩૪૫૬૭૮૯',
				hi: '०१२३४५६७८९',
				my: '၀၁၂၃၄၅၆၇၈၉',
				ta: '௦௧௨௩௪௫௬௭௮௯',
				te: '౦౧౨౩౪౫౬౭౮౯',
				th: '๐๑๒๓๔๕๖๗๘๙', // FIXME use iso 639 codes
				bo: '༠༡༢༣༤༥༦༧༨༩' // FIXME use iso 639 codes
			};

			if ( !tables[ language ] ) ***REMOVED***
				return false;
			}

			return tables[ language ].split( '' );
		}
	};

	$.extend( $.i18n.languages, ***REMOVED***
		'default': language
	} );
}( jQuery ) );
