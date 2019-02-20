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
    console.log(display);      

    //We need to listen for when a button is clicked
    keys.addEventListener('click', e => {
        if (e.target.matches('button')){                        
            //Here we are getting the value of the key pressed
            //Either it is an action key or a number key

            const key = e.target;
            console.log("below is the key")
            console.log(key)
            console.log(Array.from(key))
            //Here we are getting the action of the button set in the data-action of the HTML
            const action = key.dataset.action;

            //The number of the button that is pressed 
            const keyTextContent = key.textContent;

            //Let's get the display number from HTML
            const displayedNumber = display.textContent;
            //console.log(displayedNumber) //This is printing 0 at this point 

            //Remove selectedOperator class 
                //I want to loop through 
                //keys.parentNode.children
                       
            if(
                action === 'add' || //OR
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ){
                //I want to add a class to show the user that they have clicked an operator key
                key.classList.add("selectedOperator");                
            }
            
            if(action === 'calculate'){
                console.log(action)
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

            //If the display number is 0, the number pressed needs to replace it            
            if (!action) {
                if (displayedNumber === '0'){
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

             


        }  //End of if statemnet for e.target.matches function 
});

   

   

   

});

   





   

