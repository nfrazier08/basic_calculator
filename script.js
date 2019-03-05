document.addEventListener('DOMContentLoaded', function(){
    
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator_keys');   
    const display = calculator.querySelector('.display');  
    //const state = calculator.dataset   
    
    //const action = key.dataset.action
    
    const calculate = (n1, operator, n2) => {
        const firstInput = parseFloat(n1)
        const secondInput = parseFloat(n2)

        if(operator === 'add') return firstInput + secondInput
        if(operator === 'subtract') return firstInput - secondInput
        if(operator === 'multiply') return firstInput * secondInput
        if(operator === 'divide') return firstInput / secondInput        
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
        
        const keyTextContent = key.textContent     

        const keyType = getKeyType(key)                 
        const {
           firstNumber,
           operator, 
           modifiedValue, 
           previousKeyType
        } = state
                
        //const firstNumber = state.firstNumber   
        //const modifiedValue = state.modifiedValue //I believe this gets used below
        //const operator = state.operator
        //const previousKeyType = state.previousKeyType   

        //IF STATEMENTS
        if(keyType === 'number') {
           return displayedNumber === '0' || 
                previousKeyType === 'operator' || 
                previousKeyType === 'calculate'
            ? keyTextContent   
            : displayedNumber + keyTextContent                    
        }  
        
        if(keyType === 'decimal'){
            if(!displayedNumber.includes('.')) return displayedNumber + '.'
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'            
            return displayedNumber                    
        }

        if(keyType === 'operator'){
            //const firstNumber = calculator.dataset.firstNumber
            //const operator = calculator.dataset.operator
            //const secondNumber = displayedNumber
        
            return firstNumber &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'            
                ? calculate(firstNumber, operator, displayedNumber)
                : displayedNumber
            }
        
        
        if(keyType === 'clear') return 0

        if(keyType === 'calculate'){
            //const firstNumber = calculator.dataset.firstNumber
            //const operator = state.operator        
            //const modifiedValue = state.modifiedValue
            return firstNumber

            ? previousKeyType === 'calculate'
                ? calculate(displayedNumber, operator, modifiedValue)        
                : calculate(firstNumber, operator, displayedNumber)
            :  displayedNumber            
        }        
    } //End of createResultsString
    
    //============================================================
    const updateCalculatorState = (key, calculator, calculatedValue, displayedNumber) => {
        //alert("yes!")
        const keyType = getKeyType(key)
        
        const {
            firstNumber, 
            operator, 
            modifiedValue, 
            previousKeyType
        } = calculator.dataset

        calculator.dataset.previousKeyType = keyType

        //Variables
        // key
        // calculator
        // calculatedValue
        // displayedNum
        // modifiedValue

        if (keyType === 'operator') {
            //key.classList.add("selected"); 

            calculator.dataset.operator = key.dataset.action
            calculator.dataset.firstNumber = firstNumber &&
                operator && 
                previousKeyType !== 'operator' && 
                previousKeyType !== 'calculate'                    
            ? calculatedValue
            : displayedNumber                    
        } //operator

        if (keyType === 'clear' && key.textContent === 'AC'){                                           
                calculator.dataset.firstNumber = ''
                calculator.dataset.operator = ''
                calculator.dataset.modifiedValue = ''
                calculator.dataset.previousKeyType = ''            
        } //clear

        //if (keyType !== 'clear'){
            //const clearButton = calculator.querySelector('[data-action=clear]') 
            //clearButton.textContent = 'CE'
        //} //not clear

        if(keyType === 'calculate'){
            calculator.dataset.modifiedValue = firstNumber && previousKeyType === 'calculate'
                ? modifiedValue
                : displayedNumber
        }          
        
    } //End of updateCalculatorState function

    const updateVisualState = (key, calculator) => {
        const keyType = getKeyType(key)

        //Released 'selected' state from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selected'));

        if(keyType === 'operator') key.classList.add('selected')
        if(keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
        if(keyType !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
    
    keys.addEventListener('click', e => {
        
        if (!e.target.matches('button')) return        

            const key = e.target
            const displayedNumber = display.textContent;

            //Pure Stuff       
            const resultString = createResultsString(key, displayedNumber, calculator.dataset)
            
            //UpdateState
            display.textContent = resultString            
            updateCalculatorState(key, calculator, resultString, displayedNumber)   
            updateVisualState(key, calculator)     
    }) //End of click event


});
