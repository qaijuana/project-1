const keystroke =
    ["w", "i", "a", "s", "d", "j", "k", "l"]
;


$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.

    //!GAME RULES 
//? $targetGen makes a random selection for keystroke for user to hit with the key within a set time

// setInterval(theGame(), 500)



    $targetGen = keystroke[ Math.floor((Math.random() * keystroke.length) -1)];
    console.log ($targetGen);


    



//     $('.bttn').on("click", e => {
//         $lightUp(e.currentTarget)
//     });

//     // $buttonInfo = $('.bttn').prop("innerText");
//     // console.log($buttonInfo)

// //! VVV This parts runs its value to array Keystroke to ensure if its true or false for game rules later.
//     const userTyping =
//         $keyShots = 
//         $('body')
//         .on("keydown", e => {
//             console.log (keystroke.indexOf(e.key));    
//             })

//     $lightUp = (e) => {
//         e.classList
//             .add('active');
//         setInterval(() => {
//             e.classList
//                 .remove('active')
//         }, 300);
//     }

    

//     $( ".targets" ).each( index => {
//         $target = $( this ).prop("innerText");
//         console.log ($target);
//         // $targetIndex = keystroke.indexOf($target);
//       });
    

});