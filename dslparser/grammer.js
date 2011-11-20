
start
  = dslconstraint/whiteSpace

whiteSpace = whiteSpace:(' ')* {return '';}

dslconstraint
  = leftdslexpression:dslexpression whiteSpace rightdslexpressions:(dsloperator:dsloperator whiteSpace dslexpression:dslexpression {return [dsloperator,dslexpression];})* 
{
  var result=[];
  result.push(leftdslexpression);
  for(var i in rightdslexpressions)
      result=result.concat(rightdslexpressions[i]);
  return result;
}
dsloperator
  = operator:('and' / 'or') {return operator;}

dslexpression 
  = dsldiscreateexp / dslcontiniousexp


dsldiscreateexp
  = dsldiscreatevar:dsldiscreatevar whiteSpace dsldiscreateclause:dsldiscreateclause {return {variable:dsldiscreatevar,clause:dsldiscreateclause};}

dsldiscreatevar
  = variable:('city'/'team'/'school')

dsldiscreateclause
  = operator:('in') whiteSpace values:tupple {return {operator:operator,values:values};}
   / operator:('='/'!=') whiteSpace values:literalValue {return {operator:operator,values:values};}


tupple "tuple"
  = '(' whiteSpace stringValues:stringValues whiteSpace ')' {return stringValues;}
    / '(' whiteSpace numberValues:numberValues whiteSpace ')' {return numberValues;}

stringValues
  = leftStringValue:stringValue rightStringValues:(whiteSpace ',' whiteSpace rightStringValue:stringValue {return rightStringValue;})* {rightStringValues.push(leftStringValue);
                      return rightStringValues;} 

stringValue 'stringValue'
  = '\''stringValue:[a-zA-Z0-9 ]+'\'' {return stringValue.join('');}

numberValues
  = numberValue (','numberValue)*

numberValue 'numberValue'
  = digits:[0-9]+(','[0-9]+)? {return parseFloat(digits.join(""), 10); }

literalValue=stringValue/numberValue

dslcontiniousexp = dslcontiniousvar whiteSpace operator:('>'/'<'/'>='/'<=') whiteSpace dslcontiniousval

dslcontiniousvar = 'age'/'startDate'

dslcontiniousval = dateValue/numberValue

dateValue 'dateValue '= dateValue:([0-9][1-9]'/'[0-9][1-9]'/'[0-9][0-9]([0-9][0-9])?) {return dateValue.join('');}
