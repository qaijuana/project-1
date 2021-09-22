const KEYSTROKE =["w", "i", "a", "s", "d", "j", "k", "l"];

$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.

    const user = {
        "name": null,
        "currentScore": 0,
        "currentChoice": -1,
        "currentStreak": 0,
        
        "currentLight": null,
        "accuracy": null,
        "highStreak": 0,
        "highScore": 0,
    }
    
    const ai = {
        "name": "Dexter",
        "currentChoice": -1
    } 

    const timeKeeper = () => {

        $lightUp = (e) => {
        e.addClass('active');
        setInterval(() => {
            e.removeClass('active')
        }, 500);
    }



    $aiLightUp = (e) => {
        e.addClass('activeAI');
        setInterval(() => {
            e.removeClass('activeAI')
        }, 800);
    }


    $scoreLightUp = (e) => {
        e.addClass('activeScore');
        setInterval(() => {
            e.removeClass('activeScore')
        }, 600);
    }

    $missLightUp = (e) => {
        e.addClass('activeMiss');
        setInterval(() => {
            e.removeClass('activeMiss')
        }, 500);
    }}

    timeKeeper();


    //!GAME MECHANISM IS BELOW 
        
    const userTyping =
    $('body').on("keydown", e => {
        const keyNormalize = e.key.toLowerCase();
        const userIndex = KEYSTROKE.indexOf(keyNormalize);
        user.currentChoice = userIndex
        const userChoice = $('.bttn').eq(userIndex)
        $lightUp(userChoice)
        compareChoice(userChoice)
        console.log("userIndex: " + userIndex)
        console.log(userChoice)
        return userIndex
        
        
        


        //! Condition: if div matches targetGen it will light up. 
        //? Visuals for User to see as guide
        // const userChoice = $(".bttn").map(function () {
        //     const userTrigger = this.innerText.toLowerCase()
        //     if (userTrigger === keyNormalize) {
        //         $lightUp(this);
        //         // console.log ("userIndex: " + userIndex)
        //         // console.log("userChoice: " + userTrigger)
        //         // console.log( userIndex )
        //         user.currentLight = this
        //         user.currentChoice = userIndex
        //         console.log(user.currentChoice)
        //         compareChoice(user.currentLight)
        //         return userIndex
        //     }   
        // })
    }); 
    
    $('.bttn').on("click", e => {
        $lightUp(e.currentTarget)
        const mouseChoice = e.currentTarget.innerText.toLowerCase()
        const mouseIndex = KEYSTROKE.indexOf(mouseChoice)
        // console.log("mouseChoice: " + mouseChoice)
        // console.log("mouseIndex: " + mouseIndex)
        return mouseIndex
    });

    //! Condition: if div matches targetGen it will light up. User will now have to follow through to hit the light target.

    theAI = () => {

        //? targetGen makes a random selection for keystroke for user to hit with the key within a set time

        const aiIndex = Math.floor( (Math.random() * (KEYSTROKE.length) ));
        const aiChoice = $('.bttn').eq(aiIndex)
        $aiLightUp(aiChoice)
        ai.currentChoice = aiIndex
        console.log("aiIndex: "+ aiIndex)
        // console.log(aiChoice)
        console.log(ai.currentChoice)
        
        return aiIndex


        //! This followed by a condition to run $lightUp when matched with targetGen condition 
        // const test = $('.bttn').map( x => {
        //     console.log (x)
        // })

        // const aiBrain = $(".bttn").map( function() {
        //     // console.log (this)
        //     const aiChoice = this.innerText.toLowerCase();
        //     const aiIndex = $bttnArray.indexOf(aiChoice);
        //     // console.log(aiIndex)
        //     if ( aiIndex === targetGen) {
        //     $aiLightUp(this)
        //     // console.log("aiIndex: " + aiIndex)
        //     // console.log("aiChoice: " + aiChoice)
        //     ai.currentChoice = aiIndex
        //     // console.log(ai.currentChoice)
        //     return aiIndex
        //     }   

        // })

    // return ( aiBrain )
    };

    // theAI(); 
    //!
    //! this guy is producing intervals 
    //!
    
    const aiSpeed = setInterval(theAI, 700)
    
    outOfTime = () => {
        return clearInterval(aiSpeed)
    };
    //! Round Time
    setTimeout(outOfTime, 10_000)
    
    

    ////
    //! GAME RULES AND CONDITIONS 
    ////
    const missed = [];
    compareChoice = (light) => {
        let point = 1
        
        if (user.currentChoice === ai.currentChoice) {
            $scoreLightUp(light)
            if (user.currentStreak > 20) {
                point = point*2; 
            }
            user.currentScore += point
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
            for (let i = 0; i < 4; i++) {
                missed.pop()
            }
            // console.log("missed: " + missed)
            $missLightUp(light)
            user.currentScore -= 5
            console.log("current Score " + user.currentScore)
            console.log("current streak " + user.currentStreak)
        }
        if (user.currentStreak > user.highStreak) {
            user.highStreak = user.currentStreak
            console.log("highstreak: " + user.highStreak)
        }
        if (user.currentScore > user.highScore) {
            user.highScore = user.currentScore
            console.log ("highscore: " + user.highScore)
        }
        
        
        
        console.log("missed: " + missed)
    }
    




    //! THIS SECTION BELOW IS ALL ABOUT LIGTING THE SCREEN UP

    ////
    //! This shows where AI or User is at on screen.
    ////
    // $lightUp = (e) => {
    //     e.addClass('active');
    //     setInterval(() => {
    //         e.removeClass('active')
    //     }, 500);
    // }

    // $aiLightUp = (e) => {
    //     e.addClass('activeAI');
    //     setInterval(() => {
    //         e
    //             .removeClass('activeAI')
    //     }, 800);
    // }


    // $scoreLightUp = (e) => {
    //     e.addClass('activeScore');
    //     setInterval(() => {
    //         e.removeClass('activeScore')
    //     }, 600);
    // }

    // $missLightUp = (e) => {
    //     e.addClass('activeMiss');
    //     setInterval(() => {
    //         e.removeClass('activeMiss')
    //     }, 500);
    // }


    // $aiLightUp = (e) => {
    //     e.classList
    //         .add('activeAI');
    //     setInterval(() => {
    //         e.classList
    //             .remove('activeAI')
    //     }, 800);
    // }


    // $scoreLightUp = (e) => {
    //     e.classList
    //         .add('activeScore');
    //     setInterval(() => {
    //         e.classList
    //             .remove('activeScore')
    //     }, 600);
    // }

    // $missLightUp = (e) => {
    //     e.classList
    //         .add('activeMiss');
    //     setInterval(() => {
    //         e.classList
    //             .remove('activeMiss')
    //     }, 500);
    // }

});