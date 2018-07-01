class Stack {
    constructor(){
        this.items= [];
    }

    // push function
    push(element)
    {
        // push element into the items
        this.items.push(element);
    }
    pop()
    {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    // peek function
    peek()
    {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
    // isEmpty function
    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }
    // printStack function
    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}



function validation(equation){
    let valid = 1;
    var S = new Stack();
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
    }

    for ( let i = 0 ; i < equation.length()-1; i++ ) {

        let c = equation[i];
        if ( c == '(' )
            S.push('(');
        else if ( c == ')' ) {
            if ( S.isEmpty() ) {
                valid = 0;
            }
            S.pop();
        }
    }
    if(valid === 1){

        /**let postfix = toPostfix(equation);
         let result = evaluate(postfix);
         return result;*/
        return 'valid';
    }

    else return 'not valid';
}

