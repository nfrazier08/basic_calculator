document.addEventListener('DOMContentLoaded', function(){

    //We need to get the keys, which are child elements of calculator keys
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator_keys');   
    const display = calculator.querySelector('.display');       
    
    //Calculate function that takes three parameters(firstNumber, operator, secondNumber)
    const calculate = (n1, operator, n2) => {
        let result = '';

        if (operator === 'add'){
            result = parseFloat(n1) + parseFloat(n2)
        } else if (operator === 'subtract'){
            result = parseFloat(n1) - parseFloat(n2)
        } else if (operator === 'multiply'){
            result = parseFloat(n1) * parseFloat(n2)
        } else if (operator === 'divide'){
            result = parseFloat(n1) / parseFloat(n2)
        }                
        return result;
    }
    
    //We need to listen for when a button is clicked
    keys.addEventListener('click', e => {
        if (e.target.matches('button')){                        
            //Here we are getting the value of the key pressed
            //Either it is an action key or a number key
            const key = e.target;
            
            //Here we are getting the action of the button set in the data-action of the HTML
            const action = key.dataset.action;

            //The number of the button that is pressed 
            const keyTextContent = key.textContent;

            //Let's get the display number from HTML
            const displayedNumber = display.textContent;
            //console.log(displayedNumber) //This is printing 0 at this point 

            //Setting custom attribute 'previous key type' to a variable
            const previousKeyType = calculator.dataset.previousKeyType;

            //Remove selected class 
                //Remove the selected class from all keys with for loop
                //In the console, key is: <button data-action="subtract" class="selected">...</button>
                //Use Array.from(), since the keys are not really an array. We are creating an array
                //The parent here is calculator_keys and all the children are the buttons

            //Release selected state
            Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('selected'));
                                
            if(
                action === 'add' || //OR
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ){
                //The whole point here is to be able to add/update the display for consecutive calculations
                //We need to be able to acces these variables as soon as they exist
                //Moved calculate up, to be accessible by all parts of code
                const firstNumber = calculator.dataset.firstValue;
                const operator = calculator.dataset.operation;
                const secondNumber = displayedNumber;

                //Set custom attribute
                calculator.dataset.previousKeyType = 'operator';   

                //We only need to check for the first number and the operator to calculate for consecutive calculations
                //If the previous key is an operator, then we do not call the calculate function
                if (firstNumber && operator && previousKeyType !== 'operator') {

                    const calculatedValue = calculate(firstNumber, operator, secondNumber);
                    display.textContent = calculatedValue;

                    //STUDY THIS!!
                    //firstNumber will now equal the updated calculated value; updating the custom data attribute firstNumber
                    calculator.dataset.firstNumber = calculatedValue;                    
                } else {
                    //If no additional calculations need to take place the first number entered to the currently displayed number
                    calculator.dataset.firstNumber = displayedNumber;
                }

                //I want to add a class to show the user that they have clicked an operator key
                key.classList.add("selected");   
                
                //We need to do two things:
                //1) store first value entered in custom attribute
                //2) store the operator entered in custom attribute

                calculator.dataset.firstValue = displayedNumber;
                calculator.dataset.operation = action;                
            }
            
            if (action === 'calculate'){
                console.log(action)
                //We will get the second value entered here and save it in a variable
                let secondNumber = displayedNumber
                
                //Repeat for first number entered
                let firstNumber = calculator.dataset.firstValue

                //Repeat for operator
                const operator = calculator.dataset.operation;

                if (firstNumber){
                    if (previousKeyType === 'calculate'){
                        firstNumber = displayedNumber
                        secondNumber = calculator.dataset.carriedSecondNumber;
                    }                
                display.textContent = calculate(firstNumber, operator, secondNumber);
                }

                //if (firstNumber && operator && previousKeyType !== 'calculate') {
                    //display.textContent = calculate(firstNumber, operator, secondNumber);
                //}
                
                //We need to carry the second value over into a custom attribute
                //Set custom attribute
                calculator.dataset.carriedSecondNumber = secondNumber;

                //Set custom attribute
                calculator.dataset.previousKeyType = 'calculate';
            };
                        
            if(action === 'clear'){
                console.log(action);

                //Set custom attribute
                calculator.dataset.previousKeyType = 'clear';
            };        

            if(action === 'decimal'){
                console.log(action);

                //Set custom attribute
                calculator.dataset.previousKey = 'decimal';

                //If a decimal is pressed it also needs to be added to the current display
                if(!displayedNumber.includes('.')){
                    display.textContent = displayedNumber + '.'
                } else if (previousKeyType === 'operator'){
                    display.textContent = '0.';
                }

                calculator.dataset.previousKeyType = 'decimal'
            };                 

            //If the display number is 0, the number pressed needs to replace it            
            if (!action) {
                if (displayedNumber === '0' || previousKeyType === 'operator'){
                    console.log('This is a number');  
                   // displayedNumber.textContent = numberPressed;                   
                   display.textContent = keyTextContent;

                   calculator.dataset.previousKey = 'number'
                }
                //Otherwise, if another number is pressed, it needs to be appended to the display number
                else {
                    display.textContent = displayedNumber + keyTextContent;
                }
            } 

          
            

                

          

        }  //End of if statemnet for e.target.matches function 
});

   

   

   

});

   





   

