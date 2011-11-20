/**
 * Created by JetBrains WebStorm.
 * User: capacman
 * Date: 11/19/11
 * Time: 6:49 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = (function(){
  /* Generated by PEG.js 0.6.2 (http://pegjs.majda.cz/). */

  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "dslconstraint": parse_dslconstraint,
        "dsldiscreateclause": parse_dsldiscreateclause,
        "dsldiscreateexp": parse_dsldiscreateexp,
        "dsldiscreatevar": parse_dsldiscreatevar,
        "dsloperator": parse_dsloperator,
        "literalValue": parse_literalValue,
        "numberValue": parse_numberValue,
        "numberValues": parse_numberValues,
        "start": parse_start,
        "stringValue": parse_stringValue,
        "stringValues": parse_stringValues,
        "tupple": parse_tupple,
        "whiteSpace": parse_whiteSpace
      };

      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }

      var pos = 0;
      var reportMatchFailures = true;
      var rightmostMatchFailuresPos = 0;
      var rightmostMatchFailuresExpected = [];
      var cache = {};

      function padLeft(input, padding, length) {
        var result = input;

        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }

        return result;
      }

      function escape(ch) {
        var charCode = ch.charCodeAt(0);

        if (charCode <= 0xFF) {
          var escapeChar = 'x';
          var length = 2;
        } else {
          var escapeChar = 'u';
          var length = 4;
        }

        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }

      function quote(s) {
        /*
         * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
         * string literal except for the closing quote character, backslash,
         * carriage return, line separator, paragraph separator, and line feed.
         * Any character may appear in the form of an escape sequence.
         */
        return '"' + s
          .replace(/\\/g, '\\\\')            // backslash
          .replace(/"/g, '\\"')              // closing quote character
          .replace(/\r/g, '\\r')             // carriage return
          .replace(/\n/g, '\\n')             // line feed
          .replace(/[\x80-\uFFFF]/g, escape) // non-ASCII characters
          + '"';
      }

      function matchFailed(failure) {
        if (pos < rightmostMatchFailuresPos) {
          return;
        }

        if (pos > rightmostMatchFailuresPos) {
          rightmostMatchFailuresPos = pos;
          rightmostMatchFailuresExpected = [];
        }

        rightmostMatchFailuresExpected.push(failure);
      }

      function parse_start() {
        var cacheKey = 'start@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var result2 = parse_dslconstraint();
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result1 = parse_whiteSpace();
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_whiteSpace() {
        var cacheKey = 'whiteSpace@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var result1 = [];
        if (input.substr(pos, 1) === " ") {
          var result3 = " ";
          pos += 1;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\" \"");
          }
        }
        while (result3 !== null) {
          result1.push(result3);
          if (input.substr(pos, 1) === " ") {
            var result3 = " ";
            pos += 1;
          } else {
            var result3 = null;
            if (reportMatchFailures) {
              matchFailed("\" \"");
            }
          }
        }
        var result2 = result1 !== null
          ? (function(whiteSpace) {return '';})(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_dslconstraint() {
        var cacheKey = 'dslconstraint@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_dsldiscreateexp();
        if (result3 !== null) {
          var result4 = parse_whiteSpace();
          if (result4 !== null) {
            var result5 = [];
            var savedPos2 = pos;
            var savedPos3 = pos;
            var result9 = parse_dsloperator();
            if (result9 !== null) {
              var result10 = parse_whiteSpace();
              if (result10 !== null) {
                var result11 = parse_dsldiscreateexp();
                if (result11 !== null) {
                  var result7 = [result9, result10, result11];
                } else {
                  var result7 = null;
                  pos = savedPos3;
                }
              } else {
                var result7 = null;
                pos = savedPos3;
              }
            } else {
              var result7 = null;
              pos = savedPos3;
            }
            var result8 = result7 !== null
              ? (function(dsloperator, dslexpression) {return [dsloperator,dslexpression];})(result7[0], result7[2])
              : null;
            if (result8 !== null) {
              var result6 = result8;
            } else {
              var result6 = null;
              pos = savedPos2;
            }
            while (result6 !== null) {
              result5.push(result6);
              var savedPos2 = pos;
              var savedPos3 = pos;
              var result9 = parse_dsloperator();
              if (result9 !== null) {
                var result10 = parse_whiteSpace();
                if (result10 !== null) {
                  var result11 = parse_dsldiscreateexp();
                  if (result11 !== null) {
                    var result7 = [result9, result10, result11];
                  } else {
                    var result7 = null;
                    pos = savedPos3;
                  }
                } else {
                  var result7 = null;
                  pos = savedPos3;
                }
              } else {
                var result7 = null;
                pos = savedPos3;
              }
              var result8 = result7 !== null
                ? (function(dsloperator, dslexpression) {return [dsloperator,dslexpression];})(result7[0], result7[2])
                : null;
              if (result8 !== null) {
                var result6 = result8;
              } else {
                var result6 = null;
                pos = savedPos2;
              }
            }
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(leftdslexpression, rightdslexpressions) {
            var result=[];
            result.push(leftdslexpression);
            for(var i in rightdslexpressions)
                result=result.concat(rightdslexpressions[i]);
            return result;
          })(result1[0], result1[2])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_dsloperator() {
        var cacheKey = 'dsloperator@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        if (input.substr(pos, 3) === "and") {
          var result4 = "and";
          pos += 3;
        } else {
          var result4 = null;
          if (reportMatchFailures) {
            matchFailed("\"and\"");
          }
        }
        if (result4 !== null) {
          var result1 = result4;
        } else {
          if (input.substr(pos, 2) === "or") {
            var result3 = "or";
            pos += 2;
          } else {
            var result3 = null;
            if (reportMatchFailures) {
              matchFailed("\"or\"");
            }
          }
          if (result3 !== null) {
            var result1 = result3;
          } else {
            var result1 = null;;
          };
        }
        var result2 = result1 !== null
          ? (function(operator) {return operator;})(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_dsldiscreateexp() {
        var cacheKey = 'dsldiscreateexp@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_dsldiscreatevar();
        if (result3 !== null) {
          var result4 = parse_whiteSpace();
          if (result4 !== null) {
            var result5 = parse_dsldiscreateclause();
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(dsldiscreatevar, dsldiscreateclause) {return {variable:dsldiscreatevar,clause:dsldiscreateclause};})(result1[0], result1[2])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_dsldiscreatevar() {
        var cacheKey = 'dsldiscreatevar@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        if (input.substr(pos, 4) === "city") {
          var result3 = "city";
          pos += 4;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\"city\"");
          }
        }
        if (result3 !== null) {
          var result0 = result3;
        } else {
          if (input.substr(pos, 4) === "team") {
            var result2 = "team";
            pos += 4;
          } else {
            var result2 = null;
            if (reportMatchFailures) {
              matchFailed("\"team\"");
            }
          }
          if (result2 !== null) {
            var result0 = result2;
          } else {
            if (input.substr(pos, 6) === "school") {
              var result1 = "school";
              pos += 6;
            } else {
              var result1 = null;
              if (reportMatchFailures) {
                matchFailed("\"school\"");
              }
            }
            if (result1 !== null) {
              var result0 = result1;
            } else {
              var result0 = null;;
            };
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_dsldiscreateclause() {
        var cacheKey = 'dsldiscreateclause@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos2 = pos;
        var savedPos3 = pos;
        if (input.substr(pos, 2) === "in") {
          var result12 = "in";
          pos += 2;
        } else {
          var result12 = null;
          if (reportMatchFailures) {
            matchFailed("\"in\"");
          }
        }
        if (result12 !== null) {
          var result13 = parse_whiteSpace();
          if (result13 !== null) {
            var result14 = parse_tupple();
            if (result14 !== null) {
              var result10 = [result12, result13, result14];
            } else {
              var result10 = null;
              pos = savedPos3;
            }
          } else {
            var result10 = null;
            pos = savedPos3;
          }
        } else {
          var result10 = null;
          pos = savedPos3;
        }
        var result11 = result10 !== null
          ? (function(operator, values) {return {operator:operator,values:values};})(result10[0], result10[2])
          : null;
        if (result11 !== null) {
          var result9 = result11;
        } else {
          var result9 = null;
          pos = savedPos2;
        }
        if (result9 !== null) {
          var result0 = result9;
        } else {
          var savedPos0 = pos;
          var savedPos1 = pos;
          if (input.substr(pos, 1) === "=") {
            var result8 = "=";
            pos += 1;
          } else {
            var result8 = null;
            if (reportMatchFailures) {
              matchFailed("\"=\"");
            }
          }
          if (result8 !== null) {
            var result4 = result8;
          } else {
            if (input.substr(pos, 2) === "!=") {
              var result7 = "!=";
              pos += 2;
            } else {
              var result7 = null;
              if (reportMatchFailures) {
                matchFailed("\"!=\"");
              }
            }
            if (result7 !== null) {
              var result4 = result7;
            } else {
              var result4 = null;;
            };
          }
          if (result4 !== null) {
            var result5 = parse_whiteSpace();
            if (result5 !== null) {
              var result6 = parse_literalValue();
              if (result6 !== null) {
                var result2 = [result4, result5, result6];
              } else {
                var result2 = null;
                pos = savedPos1;
              }
            } else {
              var result2 = null;
              pos = savedPos1;
            }
          } else {
            var result2 = null;
            pos = savedPos1;
          }
          var result3 = result2 !== null
            ? (function(operator, values) {return {operator:operator,values:values};})(result2[0], result2[2])
            : null;
          if (result3 !== null) {
            var result1 = result3;
          } else {
            var result1 = null;
            pos = savedPos0;
          }
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_tupple() {
        var cacheKey = 'tupple@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos2 = pos;
        var savedPos3 = pos;
        if (input.substr(pos, 1) === "(") {
          var result12 = "(";
          pos += 1;
        } else {
          var result12 = null;
          if (reportMatchFailures) {
            matchFailed("\"(\"");
          }
        }
        if (result12 !== null) {
          var result13 = parse_whiteSpace();
          if (result13 !== null) {
            var result14 = parse_stringValues();
            if (result14 !== null) {
              var result15 = parse_whiteSpace();
              if (result15 !== null) {
                if (input.substr(pos, 1) === ")") {
                  var result16 = ")";
                  pos += 1;
                } else {
                  var result16 = null;
                  if (reportMatchFailures) {
                    matchFailed("\")\"");
                  }
                }
                if (result16 !== null) {
                  var result10 = [result12, result13, result14, result15, result16];
                } else {
                  var result10 = null;
                  pos = savedPos3;
                }
              } else {
                var result10 = null;
                pos = savedPos3;
              }
            } else {
              var result10 = null;
              pos = savedPos3;
            }
          } else {
            var result10 = null;
            pos = savedPos3;
          }
        } else {
          var result10 = null;
          pos = savedPos3;
        }
        var result11 = result10 !== null
          ? (function(stringValues) {return stringValues;})(result10[2])
          : null;
        if (result11 !== null) {
          var result9 = result11;
        } else {
          var result9 = null;
          pos = savedPos2;
        }
        if (result9 !== null) {
          var result0 = result9;
        } else {
          var savedPos0 = pos;
          var savedPos1 = pos;
          if (input.substr(pos, 1) === "(") {
            var result4 = "(";
            pos += 1;
          } else {
            var result4 = null;
            if (reportMatchFailures) {
              matchFailed("\"(\"");
            }
          }
          if (result4 !== null) {
            var result5 = parse_whiteSpace();
            if (result5 !== null) {
              var result6 = parse_numberValues();
              if (result6 !== null) {
                var result7 = parse_whiteSpace();
                if (result7 !== null) {
                  if (input.substr(pos, 1) === ")") {
                    var result8 = ")";
                    pos += 1;
                  } else {
                    var result8 = null;
                    if (reportMatchFailures) {
                      matchFailed("\")\"");
                    }
                  }
                  if (result8 !== null) {
                    var result2 = [result4, result5, result6, result7, result8];
                  } else {
                    var result2 = null;
                    pos = savedPos1;
                  }
                } else {
                  var result2 = null;
                  pos = savedPos1;
                }
              } else {
                var result2 = null;
                pos = savedPos1;
              }
            } else {
              var result2 = null;
              pos = savedPos1;
            }
          } else {
            var result2 = null;
            pos = savedPos1;
          }
          var result3 = result2 !== null
            ? (function(numberValues) {return numberValues;})(result2[2])
            : null;
          if (result3 !== null) {
            var result1 = result3;
          } else {
            var result1 = null;
            pos = savedPos0;
          }
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_stringValues() {
        var cacheKey = 'stringValues@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_stringValue();
        if (result3 !== null) {
          var result4 = [];
          var savedPos2 = pos;
          var savedPos3 = pos;
          var result8 = parse_whiteSpace();
          if (result8 !== null) {
            if (input.substr(pos, 1) === ",") {
              var result9 = ",";
              pos += 1;
            } else {
              var result9 = null;
              if (reportMatchFailures) {
                matchFailed("\",\"");
              }
            }
            if (result9 !== null) {
              var result10 = parse_whiteSpace();
              if (result10 !== null) {
                var result11 = parse_stringValue();
                if (result11 !== null) {
                  var result6 = [result8, result9, result10, result11];
                } else {
                  var result6 = null;
                  pos = savedPos3;
                }
              } else {
                var result6 = null;
                pos = savedPos3;
              }
            } else {
              var result6 = null;
              pos = savedPos3;
            }
          } else {
            var result6 = null;
            pos = savedPos3;
          }
          var result7 = result6 !== null
            ? (function(rightStringValue) {return rightStringValue;})(result6[3])
            : null;
          if (result7 !== null) {
            var result5 = result7;
          } else {
            var result5 = null;
            pos = savedPos2;
          }
          while (result5 !== null) {
            result4.push(result5);
            var savedPos2 = pos;
            var savedPos3 = pos;
            var result8 = parse_whiteSpace();
            if (result8 !== null) {
              if (input.substr(pos, 1) === ",") {
                var result9 = ",";
                pos += 1;
              } else {
                var result9 = null;
                if (reportMatchFailures) {
                  matchFailed("\",\"");
                }
              }
              if (result9 !== null) {
                var result10 = parse_whiteSpace();
                if (result10 !== null) {
                  var result11 = parse_stringValue();
                  if (result11 !== null) {
                    var result6 = [result8, result9, result10, result11];
                  } else {
                    var result6 = null;
                    pos = savedPos3;
                  }
                } else {
                  var result6 = null;
                  pos = savedPos3;
                }
              } else {
                var result6 = null;
                pos = savedPos3;
              }
            } else {
              var result6 = null;
              pos = savedPos3;
            }
            var result7 = result6 !== null
              ? (function(rightStringValue) {return rightStringValue;})(result6[3])
              : null;
            if (result7 !== null) {
              var result5 = result7;
            } else {
              var result5 = null;
              pos = savedPos2;
            }
          }
          if (result4 !== null) {
            var result1 = [result3, result4];
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(leftStringValue, rightStringValues) {rightStringValues.push(leftStringValue);
                                return rightStringValues;})(result1[0], result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_stringValue() {
        var cacheKey = 'stringValue@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        if (input.substr(pos, 1) === "'") {
          var result3 = "'";
          pos += 1;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\"'\"");
          }
        }
        if (result3 !== null) {
          var result4 = [];
          if (input.substr(pos).match(/^[a-zA-Z0-9 ]/) !== null) {
            var result6 = input.charAt(pos);
            pos++;
          } else {
            var result6 = null;
            if (reportMatchFailures) {
              matchFailed("[a-zA-Z0-9 ]");
            }
          }
          while (result6 !== null) {
            result4.push(result6);
            if (input.substr(pos).match(/^[a-zA-Z0-9 ]/) !== null) {
              var result6 = input.charAt(pos);
              pos++;
            } else {
              var result6 = null;
              if (reportMatchFailures) {
                matchFailed("[a-zA-Z0-9 ]");
              }
            }
          }
          if (result4 !== null) {
            if (input.substr(pos, 1) === "'") {
              var result5 = "'";
              pos += 1;
            } else {
              var result5 = null;
              if (reportMatchFailures) {
                matchFailed("\"'\"");
              }
            }
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(stringValue) {return stringValue.join('');})(result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_numberValues() {
        var cacheKey = 'numberValues@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var result1 = parse_numberValue();
        if (result1 !== null) {
          var result2 = [];
          var savedPos1 = pos;
          if (input.substr(pos, 1) === ",") {
            var result4 = ",";
            pos += 1;
          } else {
            var result4 = null;
            if (reportMatchFailures) {
              matchFailed("\",\"");
            }
          }
          if (result4 !== null) {
            var result5 = parse_numberValue();
            if (result5 !== null) {
              var result3 = [result4, result5];
            } else {
              var result3 = null;
              pos = savedPos1;
            }
          } else {
            var result3 = null;
            pos = savedPos1;
          }
          while (result3 !== null) {
            result2.push(result3);
            var savedPos1 = pos;
            if (input.substr(pos, 1) === ",") {
              var result4 = ",";
              pos += 1;
            } else {
              var result4 = null;
              if (reportMatchFailures) {
                matchFailed("\",\"");
              }
            }
            if (result4 !== null) {
              var result5 = parse_numberValue();
              if (result5 !== null) {
                var result3 = [result4, result5];
              } else {
                var result3 = null;
                pos = savedPos1;
              }
            } else {
              var result3 = null;
              pos = savedPos1;
            }
          }
          if (result2 !== null) {
            var result0 = [result1, result2];
          } else {
            var result0 = null;
            pos = savedPos0;
          }
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_numberValue() {
        var cacheKey = 'numberValue@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        if (input.substr(pos).match(/^[0-9]/) !== null) {
          var result9 = input.charAt(pos);
          pos++;
        } else {
          var result9 = null;
          if (reportMatchFailures) {
            matchFailed("[0-9]");
          }
        }
        if (result9 !== null) {
          var result3 = [];
          while (result9 !== null) {
            result3.push(result9);
            if (input.substr(pos).match(/^[0-9]/) !== null) {
              var result9 = input.charAt(pos);
              pos++;
            } else {
              var result9 = null;
              if (reportMatchFailures) {
                matchFailed("[0-9]");
              }
            }
          }
        } else {
          var result3 = null;
        }
        if (result3 !== null) {
          var savedPos2 = pos;
          if (input.substr(pos, 1) === ",") {
            var result6 = ",";
            pos += 1;
          } else {
            var result6 = null;
            if (reportMatchFailures) {
              matchFailed("\",\"");
            }
          }
          if (result6 !== null) {
            if (input.substr(pos).match(/^[0-9]/) !== null) {
              var result8 = input.charAt(pos);
              pos++;
            } else {
              var result8 = null;
              if (reportMatchFailures) {
                matchFailed("[0-9]");
              }
            }
            if (result8 !== null) {
              var result7 = [];
              while (result8 !== null) {
                result7.push(result8);
                if (input.substr(pos).match(/^[0-9]/) !== null) {
                  var result8 = input.charAt(pos);
                  pos++;
                } else {
                  var result8 = null;
                  if (reportMatchFailures) {
                    matchFailed("[0-9]");
                  }
                }
              }
            } else {
              var result7 = null;
            }
            if (result7 !== null) {
              var result5 = [result6, result7];
            } else {
              var result5 = null;
              pos = savedPos2;
            }
          } else {
            var result5 = null;
            pos = savedPos2;
          }
          var result4 = result5 !== null ? result5 : '';
          if (result4 !== null) {
            var result1 = [result3, result4];
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(digits) {return parseFloat(digits.join(""), 10); })(result1[0])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_literalValue() {
        var cacheKey = 'literalValue@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var result2 = parse_stringValue();
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result1 = parse_numberValue();
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function buildErrorMessage() {
        function buildExpected(failuresExpected) {
          failuresExpected.sort();

          var lastFailure = null;
          var failuresExpectedUnique = [];
          for (var i = 0; i < failuresExpected.length; i++) {
            if (failuresExpected[i] !== lastFailure) {
              failuresExpectedUnique.push(failuresExpected[i]);
              lastFailure = failuresExpected[i];
            }
          }

          switch (failuresExpectedUnique.length) {
            case 0:
              return 'end of input';
            case 1:
              return failuresExpectedUnique[0];
            default:
              return failuresExpectedUnique.slice(0, failuresExpectedUnique.length - 1).join(', ')
                + ' or '
                + failuresExpectedUnique[failuresExpectedUnique.length - 1];
          }
        }

        var expected = buildExpected(rightmostMatchFailuresExpected);
        var actualPos = Math.max(pos, rightmostMatchFailuresPos);
        var actual = actualPos < input.length
          ? quote(input.charAt(actualPos))
          : 'end of input';

        return 'Expected ' + expected + ' but ' + actual + ' found.';
      }

      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */

        var line = 1;
        var column = 1;
        var seenCR = false;

        for (var i = 0; i <  rightmostMatchFailuresPos; i++) {
          var ch = input.charAt(i);
          if (ch === '\n') {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === '\r' | ch === '\u2028' || ch === '\u2029') {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }

        return { line: line, column: column };
      }



      var result = parseFunctions[startRule]();

      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostMatchFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var errorPosition = computeErrorPosition();
        throw new this.SyntaxError(
          buildErrorMessage(),
          errorPosition.line,
          errorPosition.column
        );
      }

      return result;
    },

    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };

  /* Thrown when a parser encounters a syntax error. */

  result.SyntaxError = function(message, line, column) {
    this.name = 'SyntaxError';
    this.message = message;
    this.line = line;
    this.column = column;
  };

  result.SyntaxError.prototype = Error.prototype;

  return result;
})();