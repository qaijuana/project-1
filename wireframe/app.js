const keystroke =
    ["w", "i", "a", "s", "d", "j", "k", "l"]
    ;



const userCard = {
    "name": null,
    "currentScore": null,
    "accuracy": null,
}



$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.




    //!GAME RULES 


    // console.log($('.bttn'))

    $buttonCheck = $(".bttn").map(function () {
        $target = $(this).prop("innerText").toLowerCase();
        return $target
    });

    $bttnArray = $buttonCheck.toArray();
    // console.log($bttnArray)
    // console.log($buttonCheck);
    // console.log(keystroke)




    const userTyping =
        $('body').on("keydown", e => {
            const keyNormalize = e.key.toLowerCase();
            const userIndex = keystroke.indexOf(e.key.toLowerCase());
            //! Condition: if div matches targetGen it will light up. 
            //? Visuals for User to see as guide
            const userChoice = $(".bttn").map(function () {
                const userTrigger = this.innerText.toLowerCase()
                 if (userTrigger === keyNormalize) {
                    $lightUp(this);
                    console.log ("userIndex: " + userIndex)
                    console.log("userChoice: " + userTrigger)
                    // console.log( userIndex )
                    return userIndex
                }
            })
        // return (userIndex);   sod 
            
    });



    
    //? targetGen makes a random selection for keystroke for user to hit with the key within a set time

    


    theAI = () => {

        const targetGen = 
        keystroke [Math.floor( (Math.random() * (keystroke.length) ))];
    
        //! This followed by a condition to run $lightUp when matched with targetGen condition 
        const aiBrain = $(".bttn").map(function () {
            const aiChoice = this.innerText.toLowerCase();
            const aiIndex = $bttnArray.indexOf(targetGen);
            
            //! Condition: if div matches targetGen it will light up. User will now have to follow through to hit the light target.
            if ( aiChoice === targetGen) {
                $aiLightUp(this)
                console.log("aiChoice: " + aiChoice)
                console.log("aiIndex: " + aiIndex)
                return (aiIndex)
            }   
        })
    };


    const theRules = () => {
        console.log(theAI)
        console.log(userTyping)

    }

    // theRules();






    //!
    //! this guy is generating a random index per 500ms
    //!
    const aiSpeed = setInterval(theAI, 1000)
    // const gameSpeed = setInterval(timerDisplay ,1000)

    //! timerDisplay() is supposed to append a timer into html (Not done)

    ////
    //! Function to stop count
    ////

    outOfTime = () => {
        return clearInterval(aiSpeed)
    };

    clockCount = () => {
        return clearInterval(gameSpeed)
    }

    //!
    //! Final Time 45_000ms
    //!
    // setTimeout(outOfTime, 45_000)

    setTimeout(outOfTime, 10_000)
    // setTimeout(clockCount, 60_000)



    

    // console.log(userTyping)

    $('.bttn').on("click", e => {
        $lightUp(e.currentTarget)
        const mouseChoice = e.currentTarget.innerText.toLowerCase()
        const mouseIndex = keystroke.indexOf(mouseChoice)
        // console.log("mouseChoice: " + mouseChoice)
        // console.log("mouseIndex: " + mouseIndex)
        return mouseIndex
    });


    ////
    //! This shows where AI or User is at on screen.
    ////
    $lightUp = (e) => {
        e.classList
            .add('active');
        setInterval(() => {
            e.classList
                .remove('active')
        }, 700);
    }

    $aiLightUp = (e) => {
        e.classList
            .add('activeAI');
        setInterval(() => {
            e.classList
                .remove('activeAI')
        }, 600);
    }


    $scoreLightUp = (e) => {
        e.classList
            .add('activeScore');
        setInterval(() => {
            e.classList
                .remove('activeScore')
        }, 600);
    }

    $missLightUp = (e) => {
        e.classList
            .add('activeMiss');
        setInterval(() => {
            e.classList
                .remove('activeMiss')
        }, 800);
    }

});