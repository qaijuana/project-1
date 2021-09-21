const keystroke =
    ["w", "i", "a", "s", "d", "j", "k", "l"]
    ;







$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.

    const user = {
        "name": null,
        "currentScore": 0,
        "currentChoice": -1,
        "currentLight": null,
        "currentStreak": 0,
        "accuracy": null,
        "highStreak": 0,
        "highScore": 0,
    }
    
    const ai = {
        "name": "Dexter",
        "currentScore": 0,
        "currentChoice": -1
    } 



    //!GAME MECHANISM IS BELOW 


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
                // console.log ("userIndex: " + userIndex)
                // console.log("userChoice: " + userTrigger)
                // console.log( userIndex )
                user.currentLight = this
                user.currentChoice = userIndex
                console.log(user.currentChoice)
                compareChoice(user.currentLight)
                return userIndex
            }
        })
        
        
    }); 
    
    $('.bttn').on("click", e => {
        $lightUp(e.currentTarget)
        const mouseChoice = e.currentTarget.innerText.toLowerCase()
        const mouseIndex = keystroke.indexOf(mouseChoice)
        // console.log("mouseChoice: " + mouseChoice)
        // console.log("mouseIndex: " + mouseIndex)
        return mouseIndex
    });

    //! Condition: if div matches targetGen it will light up. User will now have to follow through to hit the light target.

    theAI = () => {

        //? targetGen makes a random selection for keystroke for user to hit with the key within a set time

        const targetGen = Math.floor( (Math.random() * (keystroke.length) ));

        //! This followed by a condition to run $lightUp when matched with targetGen condition 
        // const test = $('.bttn').map( x => {
        //     console.log (x)
        // })

        const aiBrain = $(".bttn").map( function() {
            // console.log (this)
            const aiChoice = this.innerText.toLowerCase();
            const aiIndex = $bttnArray.indexOf(aiChoice);
            // console.log(aiIndex)
            if ( aiIndex === targetGen) {
            $aiLightUp(this)
            // console.log("aiIndex: " + aiIndex)
            // console.log("aiChoice: " + aiChoice)
            ai.currentChoice = aiIndex
            console.log(ai.currentChoice)
            return aiIndex
            }   

        })

    return ( aiBrain )
    };

    //!
    //! this guy is producing intervals 
    //!
    const aiSpeed = setInterval(theAI, 700)

    outOfTime = () => {
        return clearInterval(aiSpeed)
    };

    //! Temporary timer
    setTimeout(outOfTime, 60_000)

    // const gameSpeed = setInterval(timerDisplay ,1000)

    //! timerDisplay() is supposed to append a timer into html (Not done)

    ////
    //! Function to stop count
    ////


    clockCount = () => {
        return clearInterval(gameSpeed)
    }

    //!
    //! Final Time 45_000ms
    //!
    // setTimeout(outOfTime, 45_000)

    // setTimeout(clockCount, 60_000)





    ////
    //! GAME RULES AND CONDITIONS 
    ////
    const missed = [];
    compareChoice = (light) => {
        
        if (user.currentChoice === ai.currentChoice) {
            $scoreLightUp(light)
            user.currentScore = user.currentScore + 1
            user.currentStreak += 1
            console.log("current Score " + user.currentScore)
            console.log("current streak " + user.currentStreak)
            console.log("sick")
        } else {
            user.currentStreak = 0
            missed.push(ai.currentChoice)
            console.log("current Score " + user.currentScore)
            console.log("current streak " + user.currentStreak)
            // console.log(missed)
            console.log("suck")
        } 
        if (missed.length > 3) {
            for (let i = 0; i < missed.length; i++) {
                missed.pop()
            }
            console.log("missed: " + missed)
            $missLightUp(light)
            user.currentScore -= 5
            console.log("current Score " + user.currentScore)
            console.log("current streak " + user.currentStreak)
        }
        if (user.currentStreak > 20) {
            user.currentScore += 2
        }
        
        
        
        console.log("missed: " + missed)
    }
    




    //! THIS SECTION BELOW IS ALL ABOUT LIGTING THE SCREEN UP

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
        }, 800);
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
        }, 500);
    }

});