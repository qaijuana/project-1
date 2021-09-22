const KEYSTROKE =["w", "i", "a", "s", "d", "j", "k", "l"];

$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.
    $userName = $(".userName")
    $h4 = $("<h4>")

    alert("Hello there!")
    let userName = prompt("I'm Dexter.\nWhat's your name?")
    $userName.text("vs").delay(500).text("vs " + userName)
    alert("Hello " + userName + ". I'm Dexter.\nLets play a game.")

    if (sign.toLowerCase() == "scorpio") {
    alert("Wow! I'm a Scorpio too!");
    }

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


    let userLight = 0;
    let aiLight = 0;
    let scoreLight = 0;
    let missLight = 0;
    
    $lightUp = (e) => {
        // userLight += 1;
        e.addClass('active');
        // clearInterval($noRepeat)
        $noRepeat = setInterval(() => {
            e.removeClass('active')
            // if (userLight > 1) {
            //     userLight = 0
            //     clearInterval($noRepeat)
            // }
        }, 500);    
        console.log(scoreLight)

    }
    console.log()
    
    $aiLightUp = (e, repeat) => {
        // aiLight += 1
        e.addClass('activeAI');
        $noRepeat = setInterval(() => {
            e.removeClass('activeAI')
            // if (aiLight > 1) {
            //     aiLight = 0
            //     clearInterval($noRepeat)
            // }
        }, 800);
        console.log(aiLight)
        // clearInterval($noRepeat)
    }
    
    
    $scoreLightUp = (e) => {
        // scoreLight += 1
        e.addClass('activeScore');
        $noRepeat = setInterval(() => {
            e.removeClass('activeScore')
            // if (scoreLight > 0) {
            //     scoreLight = 0
            //     clearInterval($noRepeat)
            // }
        }, 600);
        console.log(scoreLight)
        // clearInterval($noRepeat)
    }
    

    $missLightUp = (e) => {
        // missLight += 1
        e.addClass('activeMiss');
        $noRepeat = setInterval(() => {
            e.removeClass('activeMiss')
            // if (missLight > 0) {
            //     missLight = 0
            //     clearInterval($noRepeat)
            // }
        }, 500);
        console.log(missLight)
        // clearInterval($noRepeat)
    }
    
    //!GAME MECHANISM IS BELOW 
    
    const gameButton = $('.bttn')
    
    const userTyping = 
    $('body').on("keydown", e => {
        const keyNormalize = e.key.toLowerCase();
        const userIndex = KEYSTROKE.indexOf(keyNormalize);
        user.currentChoice = userIndex
        const userChoice = gameButton.eq(userIndex)
        if (userIndex > -1) {
            $lightUp(userChoice)
            compareChoice(userChoice)
            }
            console.log("userIndex: " + userIndex)
            // console.log(userChoice)
            // return userIndex
    }); 
        

    //! Mouse click option
    // gameButton.on("click", e => {
    //     $lightUp(e.currentTarget)
    //     const mouseChoice = e.currentTarget.innerText.toLowerCase()
    //     const mouseIndex = KEYSTROKE.indexOf(mouseChoice)
    //     // console.log("mouseChoice: " + mouseChoice)
    //     // console.log("mouseIndex: " + mouseIndex)
    //     return mouseIndex
    // });
        
        
    theAI = () => {
        const aiIndex = Math.floor( (Math.random() * (KEYSTROKE.length) ));
        const aiChoice = gameButton.eq(aiIndex)
        $aiLightUp(aiChoice)
        ai.currentChoice = aiIndex
        console.log("aiIndex: "+ aiIndex)
        console.log(ai.currentChoice)
        
        return aiIndex
    };
        
    $currentScore = $(".score")
    $currentStreak = $('.streak')
    $currentTime = $(".time")
    $highScore = $(".highscore")
    $highStreak = $(".highstreak")
    $h3 = $("<h3>")
    $zoneScore = $currentScore.append($h3)
    $zoneStreak = $currentStreak.append($h3)
    $zoneTime = $currentTime.append($h3)
    $zoneHighscore = $highScore.append($h3)
    $zoneHighstreak = $highStreak.append($h3)
    
    
    
    $play = () => {
        
        $start = () => {
            user.currentScore = 0
            user.currentStreak = 0
            $zoneScore.text("Score: " + `${user.currentScore}`)
            $zoneStreak.text("Streak: " + `${user.currentStreak}`)
            let gameTime = 60
            const aiSpeed = setInterval(theAI, 700)
            
            outOfTime = () => {
                gameTime = 0
                return clearInterval(aiSpeed)
            };
            
            
            const timeKeeper = setInterval(() => {
                $zoneTime.text("Time: " + gameTime)
                console.log(gameTime)
                gameTime -= 1
                if (gameTime < 0) {
                    clearInterval(timeKeeper)
                    outOfTime()
                }
                
            }, 1000);
        
            if (user.currentScore < 0) {
                outOfTime()
                clearInterval(timeKeeper)
                alert("Time is up buddy")
            } 
            
            $(".stop").on("click", outOfTime)
        }
        
        let startTime = 3
        const startTimer = setInterval(() => {
            $zoneTime.text("Time: " + startTime)
            startTime -= 1
            if (startTime < 0) {
                clearInterval(startTimer)
                $start();
                
            }
        }, 1000)
    }
    
    $(".play").on("click", $play)
    

    //! GAME RULES AND CONDITIONS 


    let missed = [];
    compareChoice = (light) => {
        let point = 1
        
        $zoneScore.text("Score: " + `${user.currentScore}`)
        $zoneStreak.text("Streak: " + `${user.currentStreak}`)
        $zoneHighscore.text("Highscore: " + `${user.highScore}`)
        $zoneHighstreak.text(" Longest Streak: "+ `${user.highStreak}`)
        
        if (user.currentChoice === ai.currentChoice) {
            $scoreLightUp(light)

            if (user.currentStreak > 20) {
                point = point*2; 
                $zoneScore.text("Score: " + `${user.currentScore}` + "X2!")
            }
            user.currentScore += point
            user.currentStreak += 1

            // console.log("current Score " + user.currentScore)
            // console.log("current streak " + user.currentStreak)
            console.log("sick")
        } else {
            user.currentStreak = 0
            missed.push(ai.currentChoice)
            $zoneStreak.text("Streak: " + `${user.currentStreak}` + " RESET!")
            // console.log("current Score " + user.currentScore)
            // console.log("current streak " + user.currentStreak)
            // console.log(missed)
            console.log("sucks")
        } 
        if (missed.length > 3) {
            missed = [];
            $missLightUp(light)
            user.currentScore -= 5

            $zoneScore.text("Score: " + `${user.currentScore}` + " -5!")
            
            // console.log("missed: " + missed)
            // console.log("current Score " + user.currentScore)
            // console.log("current streak " + user.currentStreak)
            // console.log("missed, fool.")
        }
        if (user.currentStreak > user.highStreak) {
            user.highStreak = user.currentStreak

            // console.log("highstreak: " + user.highStreak)
        }
        if (user.currentScore > user.highScore) {
            user.highScore = user.currentScore



            // console.log ("highscore: " + user.highScore)
        }
        

        

        console.log("missed: " + missed)
    }
    


});