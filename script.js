document.addEventListener('DOMContentLoaded', function(){
    
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator_keys');   
    const display = calculator.querySelector('.display');  
    const state = calculator.dataset     
    
    const calculate = (n1, operator, n2) => {
        const firstInput = parseFloat(n1);
        const secondInput = parseFloat(n2);

        if(operator === 'add')
            return firstInput + secondInput
        if(operator === 'subtract')
            return firstInput - secondInput
        if(operator === 'multiply')
            return firstInput * secondInput
        if(operator === 'divide')
            return firstInput / secondInput        
    } //End of calculate function

    const getKeyType = (key) => {
        const {action} = key.dataset
        if(!action) return 'number'
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) return 'operator'
        return action
    } //End of getKeyType function

    const createResultsString = (key, displayedNumber, state) => {
        //VARIABLES
        console.log("these are variables")
        const keyType = getKeyType(key)

        const keyTextContent = key.textContent          
        //const action = key.dataset.action       // I don't think we need it because we have created the getKeyType function above 
        const firstNumber = state.firstNumber   
        const modifiedValue = state.modifiedValue //I believe this gets used below
        const operator = state.operator
        const previousKeyType = state.previousKeyType   

        //IF STATEMENTS
        if(keyType === 'number') {
           return 
                displayedNumber === '0' || 
                previousKeyType === 'operator' || 
                previousKeyType === 'calculate'
            ? keyTextContent   
            : displayedNumber + keyTextContent                    
        }  
        
        if(keyType === 'decimal'){
            if(!displayedNumber.includes('.')) 
                return displayedNumber + '.'
            if (previousKeyType === 'operator' || previousKeyType === 'calculate')
                return '0.'            
            return displayedNumber                    
        }

        if(
            keyType === 'operator'){
            //const firstNumber = calculator.dataset.firstNumber
            //const operator = calculator.dataset.operator
            //const secondNumber = displayedNumber

            if (
                firstNumber &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ){
                return calculate(firstNumber, operator, displayedNumber)
            } else {
                return displayedNumber
                }
            }
        
        if(keyType === 'clear') 
            return 0

        if(keyType === 'calculate'){
            const firstNumber = calculator.dataset.firstNumber
            const operator = state.operator        
            const modifiedValue = state.modifiedValue

            if (firstNumber){
                return previousKeyType === 'calculate'
                    ? calculate(firstNumber, operator, modifiedValue)        
                    : calculate(firstNumber, operator, displayedNumber)
            } else {
                return displayedNumber
            }
        }        
    } //End of createResultsString
    
    //============================================================
    const updateCalculatorState = (key, calculator, calculatedValue, displayedNumber) => {
        const keyType = getKeyType(key)
        calculator.dataset.previousKeyType = keyType

        //Variables
        // key
        // calculator
        // calculatedValue
        // displayedNum
        // modifiedValue

        //Released 'selected' state from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('selected'));

        if (keyType === 'number'){
          
        } //number

        if (keyType === 'decimal'){

        } //decimal

        if (keyType === 'operator') {
            key.classList.add("selected"); 

            calculator.dataset.operator = key.dataset.action
            calculator.dataset.firstNumber = key.dataset.firstNumber &&
                operator && 
                previousKeyType !== 'operator' && 
                previousKeyType !== 'calculate'                    
            ? calculatedValue
            : displayedNumber                    
        } //operator

        if (keyType === 'clear'){                                           
            if (key.textContent === 'AC'){
                calculator.dataset.firstNumber = ''
                calculator.dataset.operator = ''
                calculator.dataset.modifiedValue = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC';
            }
        } //clear

        if (keyType !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]') 
            clearButton.textContent = 'CE'
        } //not clear

        if(keyType === 'calculate'){
            secondNumber = calculator.dataset.modifiedValue = firstNumber && previousKeyType === 'calculate'
                ? modifiedValue
                : displayedNumber
        }          
        
    } //End of updateCalculatorState function
    
    keys.addEventListener('click', e => {
        //console.log("Is this where we are")
        if (e.target.matches('button')) return


            const key = e.target
            const displayedNumber = display.textContent

            //Pure Stuff       
            const resultString = createResultsString(key, displayedNumber, calculator.dataset)

            //UpdateState
            display.textContent = resultString            
            updateCalculatorState(key, calculator, resultString, displayedNumber)        
    }) //End of click event


});
