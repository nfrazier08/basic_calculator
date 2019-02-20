document.addEventListener('DOMContentLoaded', function(){

    //What can someone do on a calculator
    //1. Number Key 0-9 Key
    //2. Operator Key (A/D/S/M);
    //3. Clear Key
    //4. Calculate Key
    //5. Decimal Key

    //We need to get the keys, which are child elements of calculator keys
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator_keys');   
    const display = calculator.querySelector('.display');       
    console.log("display is here...")
    //console.log(display);      

    //We need to listen for when a button is clicked
    keys.addEventListener('click', e => {
        if (e.target.matches('button')){                        
            //Here we are getting the value of the key pressed
            //Either it is an action key or a number key

            const key = e.target;
            console.log("below is the key")
            console.log(key)
            console.log("below is the array.from(key)")
            console.log(Array.from(key))
            //Here we are getting the action of the button set in the data-action of the HTML
            const action = key.dataset.action;

            //The number of the button that is pressed 
            const keyTextContent = key.textContent;

            //Let's get the display number from HTML
            const displayedNumber = display.textContent;
            //console.log(displayedNumber) //This is printing 0 at this point 

                                
            if(
                action === 'add' || //OR
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ){
                //I want to add a class to show the user that they have clicked an operator key
                key.classList.add("selected");   
                //Update the diplay to the clicked key, but we need to determine if the previous key is an operator
                //Will add custom attribute here to operator keys
                //I am not sure why we are using calculator here; but I will try with key and see what the results are
                //When I use 'key' here, the number pressed after the operator is appended to the number already in the display
                //When I change to calculator, the number in the display is replaced as we are looking to do 
                calculator.dataset.previousKeyType = 'operator';   

                //We need to do two things:
                //1) store first value entered in custom attribute
                //2) store the operator entered in custom attribute

                calculator.dataset.firstNum = displayedNumber;
                calculator.dataset.operation = action;
                
            }
            
            if(action === 'calculate'){
                console.log(action)
                //We will get the second value entered here and save it in a variable
                const secondNumber = displayedNumber;
                console.log("below is second number...")
                console.log(secondNumber);

                //Repeat for first number entered
                const firstNumber = calculator.dataset.firstNum;

                //Repeat for operator
                const operator = calculator.dataset.operation

                //Calculate function that takes three parameters(firstNumber, operator, secondNumber)
                const calculate = (n1, operator, n2) => {
                    let result = '';

                    if (operator === 'add'){
                        result = parseFloat(n1) + parseFloat(n2)
                    } else if (operator === 'subtract'){
                        result = parseFloat(n1) - parseFloat(n2)
                    } else if (operator === 'multiply'){
                        result = parseFloat(n1) *+ parseFloat(n2)
                    } else if (operator === 'divide'){
                        result = parseFloat(n1) / parseFloat(n2)
                    }
                    
                    return result;
                }

                display.textContent = calculate(firstNumber, operator, secondNumber);


            };
                        
            if(action === 'clear'){
                console.log(action);
            };        

            if(action === 'decimal'){
                console.log(action);
            };                 

            if(!action) {
                console.log('This is a number');  
                //Here: we are getting the number that is clicked 
                console.log(keys.textContent)  //textContent: Get the text content of an element (https://www.w3schools.com/jsref/prop_node_textcontent.asp)
            };

            //When using this, the number simply appends to the number already in the display
            //It wasn't until I used 'calculator.dataset.previousKeyType = 'operator' did the numbers stop
            //appending to the current # in the display and replace the number as expected
            //const previousKeyType = key.dataset.previousKeyType;
            const previousKeyType = calculator.dataset.previousKeyType;

            //If the display number is 0, the number pressed needs to replace it            
            if (!action) {
                if (displayedNumber === '0' || previousKeyType === 'operator'){
                   // displayedNumber.textContent = numberPressed;
                   console.log("Listening RIGHT HERE!")
                   display.textContent = keyTextContent;
                }
                //Otherwise, if another number is pressed, it needs to be appended to the display number
                else {
                    display.textContent = displayedNumber + keyTextContent;
                }
            } 

            //if a decimal is pressed it also needs to be added to the display
            if(action === 'decimal'){
                display.textContent = displayedNumber + '.'
            }

            //Remove selected class 
                //Remove the selected class from all keys with for loop
                //In the console, key is: <button data-action="subtract" class="selected">...</button>
                //Use Array.from(), since the keys are not really an array. We are creating an array
                //The parent here is calculator_keys and all the children are the buttons
                Array.from(key.parentNode.children)
                    .forEach(k => k.classList.remove('selected'))

          

        }  //End of if statemnet for e.target.matches function 
});

   

   

   

});

   





   

