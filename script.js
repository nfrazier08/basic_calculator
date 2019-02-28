document.addEventListener('DOMContentLoaded', function(){
    //console.log("state....")

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
    }

    const updateCalculatorState = (key, calculator, calculatedValue, displayedNumber) => {
        const keyType = getKeyType(key)
        calculator.dataset.previousKeyType = keyType

        if(keyType === 'operator') {
            key.classList.add("selected"); 

            calculator.dataset.operator = key.dataset.action
            calculator.dataset.firstNumber = key.dataset.firstNumber &&
                operator && 
                previousKeyType !== 'operator' && 
                previousKeyType !== 'calculate'                    
            ? calculatedValue
            : displayedNumber                    
        }

        if(action === 'clear'){                                           
            if (key.textContent === 'AC'){
                calculator.dataset.firstNumber = ''
                calculator.dataset.operation = ''
                calculator.dataset.modifiedValue = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC';
            }
        }

        if (action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action="clear"]') 
            clearButton.textContent = 'CE'
        }
    }

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
    }

    const createResultsString = (key, displayedNumber, state) => {
        console.log("HOPPPRLJS")
        const keyType = getKeyType(key)

        const keyTextContent = key.textContent   
        //const displayedNumber = display.textContent     
        const previousKeyType = state.previousKeyType
        const action = key.dataset.action       //      

        const firstNumber = state.firstNumber        
        const operator = state.operator        
        const modifiedValue = state.modifiedValue

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
            keyType === 'add' ||
            keyType === 'subtract' ||
            keyType === 'multiply' ||
            keyType === 'divide'
        ){
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
            if (firstNumber){
                return previousKeyType === 'calculate'
                    ? calculate(firstNumber, operator, modifiedValue)        
                    : calculate(firstNumber, operator, displayedNumber)
            }
        }

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('selected'));
    }//End of createResultsString
    
    
    keys.addEventListener('click', e => {
        console.log("Is this where we are")
        if (e.target.matches('button')) return
            const displayedNumber = display.textContent   

            //Pure Stuff       
            const resultString = createResultsString(e.target, displayedNumber, calculator.dataset)

            //Impure Stuff
            display.textContent = resultString
            updateCalculatorState(key, calculator, resultString, displayedNumber)        
    })


});