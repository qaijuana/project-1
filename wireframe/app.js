const keystroke =
    ["w", "i", "a", "s", "d", "j", "k", "l"]
;







$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.




    //!GAME RULES 


// console.log($('.bttn'))

$buttonCheck = $( ".bttn" ).map( function () {
    $target = $( this ).prop("innerText").toLowerCase();
    return $target
  });

$bttnArray = $buttonCheck.toArray();
console.log($bttnArray)
console.log($buttonCheck);
console.log(keystroke)


  //? $targetGen makes a random selection for keystroke for user to hit with the key within a set time


theAI = () => {
    $targetGen = keystroke[ Math.floor((Math.random() * (keystroke.length)))];
    console.log  ($bttnArray.indexOf($targetGen))
};


// timerDisplay = () => {
//     for (let i = 0; i < 60; i++) {
//         setInterval(
//         ($(".nav1").text(i).css("font-size", "2rem"))
//         , 1000)

//     }
// }



//!
//! this guy is generating a random index per 500ms
//!
// const aiSpeed = setInterval(theAI, 500) 
// const gameSpeed = setInterval(timerDisplay ,1000)


outOfTime = () => {
    return clearInterval(aiSpeed)
};

clockCount = () => {
    return clearInterval(gameSpeed)
}

//!
//! Final Time 60_000ms
//!

// setTimeout(outOfTime, 5000)
setTimeout(outOfTime(gameSpeed), 6000)



const userTyping = 
        $('body').on("keydown", e => {
            console.log (e.key);    
            console.log (keystroke.indexOf(e.key));    
        })




    $('.bttn').on("click", e => {
        $lightUp(e.currentTarget)
    });

    // $buttonInfo = $('.bttn').prop("innerText");
    // console.log($buttonInfo)

//! VVV This parts runs its value to array Keystroke to ensure if its true or false for game rules later.
    

    $lightUp = (e) => {
        e.classList
            .add('active');
        setInterval(() => {
            e.classList
                .remove('active')
        }, 300);
    }

    

    
    

});