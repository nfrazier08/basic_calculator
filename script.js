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

    //We need to listen for when a button is clicked
    keys.addEventListener('click', e => {
        if (e.target.matches('button')){                        
            //Here we are getting the value of the key pressed
            //Either it is an action key or a number key

            const keys = e.target;
            const action = e.target.dataset.action;
            
            if(

                action === 'add' || //OR
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ){
                console.log(action);
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

                                               

                                 };

                  }                                         

    });

   

   

   

});

   





   

