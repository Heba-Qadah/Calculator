/**
function validation(equation){
    let valid = 1;
    var S = new Array();
    if(equation[0] === '+' || equation[0] === '/' || equation[0] === '*' || equation[0] === ')' || equation[0] === '.' || equation[0] === '%' || equation[0] === '='){
        valid = 0;
    }
    for (let i=0; i<equation.length-1; i++){
        if((equation[i] === '+' || equation[i] === '-') && (equation[i+1] === '/' || equation[i+1] === '*' || equation[i+1] === '=' || equation[i+1] ===
            '%' || equation[i+1] === '.')){
            valid = 0;
        }else if ((equation[i] === '*' || equation[i] === '/' || equation[i] === '%' || equation[i] === '=' || equation[i] === '.')
            && (equation[i+1] === '/' || equation[i+1] === '*' || equation[i+1] === '=' || equation[i+1] ===
                '%' || equation[i+1] === '.'|| equation[i+1] === '+')){
            valid = 0;
        }else if (equation[i] === '(' && (equation[i+1] === '/' || equation[i+1] === '*' || equation[i+1] === '=' || equation[i+1] ===
            '%' || equation[i+1] === '.'|| equation[i+1] === '+')){
            valid = 0;
        }else if (equation[i] === '(' && (equation[i-1] !== '/' || equation[i-1] !== '*' || equation[i-1] !== '=' || equation[i-1] !==
            '%' || equation[i-1] !== '.'|| equation[i-1] !== '+')){
            valid = 0;
        }else if (equation[i] === ')' && (equation[i-1] === '/' || equation[i-1] === '*' || equation[i-1] === '=' || equation[i-1] ===
            '%' || equation[i-1] === '.'|| equation[i-1] === '+')){
            valid = 0;
        }else if (equation[i] === ')' && (equation[i+1] !== '/' || equation[i+1] !== '*' || equation[i+1] !== '=' || equation[i+1] !==
            '%' || equation[i+1] !== '.'|| equation[i+1] !== '+')){
            valid = 0;
        }

    }
    if(equation[equation.length-1] === '+' || equation[equation.length-1] === '/' || equation[equation.length-1] === '*' ||
        equation[equation.length-1] === ')' || equation[equation.length-1] === '.' || equation[equation.length-1] === '%' ||
        equation[equation.length-1] === '-' || equation[equation.length-1] === ')'){
        valid = 0;
    }*/

   /** for ( let i = 0 ; i < equation.length()-1; i++ ) {

        let c = equation[i];
        if ( c == '(' )
            S.push('(');
        else if ( c == ')' ) {
            if ( S.isEmpty() ) {
                valid = 0;
            }
            S.pop();
        }
    }*/
    /**if(valid === 1){

        /**let postfix = toPostfix(equation);
        let result = evaluate(postfix);
        return result;*/
       /** return 'valid';
    }

    else return 'not valid';
}
*/

//////////////////////////////////////////

function toPostfix(infix){
    let postfix ='';
    var operator = new Stack();
    let popped;

    for (let i = 0; i < infix.length; i++) {
        let get = infix[i];

        if (!isOperator(get))
            postfix += get;

        else if (get == ')')
            while ((popped = operator.pop()) != '(')
                postfix += popped;

        else {
            while (!operator.isEmpty() && get != '(' && precedence(operator.peek()) >= precedence(get))
                postfix += operator.pop();

            operator.push(get);
        }
    }
    // pop any remaining operator
    while (!operator.isEmpty())
        postfix += operator.pop();

    return postfix;

}

function isOperator(i) {
    return precedence(i) > 0;
}
function precedence(i) {

    if (i == '(' || i == ')') return 1;
    else if (i == '-' || i == '+') return 2;
    else if (i == '*' || i == '/') return 3;
    else return 0;
}



//////////////////////////////////////////////////

function evaluate(expression)
{
    let tokens = expression.toArray();

    // Stack for numbers: 'values'
    var values = new Stack();

    // Stack for Operators: 'ops'
    var ops = new Stack();

    for (let i = 0; i < tokens.length; i++)
    {
        // Current token is a whitespace, skip it
        if (tokens[i] == ' ')
            continue;

        // Current token is a number, push it to stack for numbers
        if (tokens[i] >= '0' && tokens[i] <= '9')
        {
            let sbuf;
            // There may be more than one digits in number
            while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9')
                sbuf += tokens[i++];
            values.push(parseInt(sbuf.toString()));
        }

        // Current token is an opening brace, push it to 'ops'
        else if (tokens[i] == '(')
            ops.push(tokens[i]);

        // Closing brace encountered, solve entire brace
        else if (tokens[i] == ')')
        {
            while (ops.peek() != '(')
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            ops.pop();
        }

        // Current token is an operator.
        else if (tokens[i] == '+' || tokens[i] == '-' ||
            tokens[i] == '*' || tokens[i] == '/')
        {
            // While top of 'ops' has same or greater precedence to current
            // token, which is an operator. Apply operator on top of 'ops'
            // to top two elements in values stack
            while (!ops.empty() && hasPrecedence(tokens[i], ops.peek()))
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));

            // Push current token to 'ops'.
            ops.push(tokens[i]);
        }
    }

    // Entire expression has been parsed at this point, apply remaining
    // ops to remaining values
    while (!ops.empty())
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));

    // Top of 'values' contains result, return it
    return values.pop();
}

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence( op1,  op2)
{
    if (op2 == '(' || op2 == ')')
        return false;
    if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-'))
        return false;
    else
        return true;
}

// A utility method to apply an operator 'op' on operands 'a'
// and 'b'. Return the result.
function applyOp(op, b, a) {
    switch (op)
    {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0)
                throw new
                UnsupportedOperationException("Cannot divide by zero");
            return a / b;
    }
    return 0;
}

/**    function Stack()
    {
        this.stac=new Array();
        this.pop=function(){
            return this.stac.pop();
        }
        this.push=function(item){
            this.stac.push(item);
        }
        this.isEmpty=function() {
        return this.items.length == 0;

    }
    }
*/