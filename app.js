const KEYSTROKE =["w", "i", "a", "s", "d", "j", "k", "l"];

$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.
    const $userName = $(".userName")
    const $h4 = $("<h4>")

    // alert("Hello there!")
    // let userName = prompt("I'm Dexter.\nWhat's your name?")
    // $userName.text("vs").delay(500).text("vs " + userName)
    // alert("Hello " + userName + ". I'm Dexter.\nLets play a game.")

    // if (sign.toLowerCase() == "scorpio") {
    // alert("Wow! I'm a Scorpio too!");
    // }

    const user = {
        "name": null,
        "currentScore": 0,
        "currentChoice": -1,
        "currentStreak": 0,
        "currentButton": null,
        "accuracy": null,
        "highStreak": 0,
        "highScore": 0,
    }
    
    const ai = {
        "name": "Dexter",
        "currentChoice": -1,
        "currentButton": null
        
    } 

    // let a, b
    // let $noRepeat = null;
    // b = $noRepeat

    let noRepeat = 0

    $lightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('active');
        if (noRepeat > 0) {
            noRepeat = 0
        }
        // if ($noRepeat) {
        //     clearInterval($noRepeat)
        // }
        $noRepeat = setInterval(() => {
            e.removeClass('active')
        }, 1000);    
        // console.log(scoreLight)

    }

    

    $aiLightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        console.log(noRepeat)
        e.addClass('activeAI');
        if (noRepeat > 0) {
            noRepeat = 0
            clearInterval(noRepeat)
        }
        
        // if ($noRepeat) {
        //     clearInterval($noRepeat)
        // }
        noRepeat = setInterval(() => {
            e.removeClass('activeAI')
            // if (aiLight > 1) {
            //     aiLight = 0
            //     clearInterval($noRepeat)
            // }
        }, 800);
        // console.log(aiLight)
        // clearInterval($noRepeat)
    }
    
    
    $scoreLightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('activeScore');
        if (noRepeat > 0) {
            noRepeat = 0
        }
        noRepeat = setInterval(() => {
            e.removeClass('activeScore')
        }, 1000);
    }
    

    $missLightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('activeMiss');
        if (noRepeat > 0) {
            noRepeat = 0
        }
        noRepeat = setInterval(() => {
            e.removeClass('activeMiss')
        }, 1000);
    }
    
    //!GAME MECHANISM IS BELOW 
    
    const gameButton = $('.bttn')
    
    const userTyping = 
    $('body').on("keydown", e => {
        const keyNormalize = e.key.toLowerCase();
        const userIndex = KEYSTROKE.indexOf(keyNormalize);
        user.currentChoice = userIndex
        user.currentButton = gameButton.eq(userIndex) 
        // a = user.currentButton
        if (userIndex > -1) {
            $lightUp(user.currentButton)
            compareChoice(user.currentButton)
            }
            // console.log("userIndex: " + userIndex)
            // console.log(user.currentButton)
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
        ai.currentChoice = aiIndex
        ai.currentButton = gameButton.eq(aiIndex)
        // a = ai.currentButton
        $aiLightUp(ai.currentButton)
        
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
    
    
    
    
    $play =  () => {

        let startTimer = null;


        $start = () => {

            let gameTime = 60
            const aiSpeed = setInterval(theAI, 700)

            user.currentScore = 0
            user.currentStreak = 0

            $zoneScore.text("Score: " + `${user.currentScore}`)
            $zoneStreak.text("Streak: " + `${user.currentStreak}`)
            
            
            outOfTime = () => {
                gameTime = 0
                return clearInterval(aiSpeed)
            };
            
            
            const timeKeeper = setInterval(() => {
                $zoneTime.text("Time: " + gameTime)
                .css({
                    "font-size": "",
                    "color": ""

                })
                $zoneScore.text("Score: " + `${user.currentScore}`)
                $zoneStreak.text("Streak: " + `${user.currentStreak}`)
                $zoneHighscore.text("HighScore: " + `${user.highScore}`)
                $zoneHighstreak.text(" Longest Streak: "+ `${user.highStreak}`)

                gameTime -= 1

                 if (gameTime < 0) {
                    clearInterval(timeKeeper)
                    outOfTime()
                    $zoneTime.text("Time: " + gameTime)
                    .css({
                        "font-size": "",
                        "color": ""
                    })
                }else if (gameTime <= 3) {
                    $zoneTime.text("Time: " + gameTime)
                .css({
                    "font-size": "3rem",
                    "color": "red"

                })
                }
                // console.log(gameTime)
                
            }, 1000);
        
            if (gameTime < 0) {
                outOfTime()
                clearInterval(timeKeeper)
                alert("Time is up buddy")
            } 
            
            $(".stop").on("click", outOfTime)
        }

        
        let startTime = 3

        startTimer = setInterval(() => {
            $zoneTime.text("Time: " + startTime)
            .css({
                "font-size": "3rem",
                "color": "red"

            })
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
        
        //update HTML
        $zoneScore.text("Score: " + `${user.currentScore}`)
        $zoneStreak.text("Streak: " + `${user.currentStreak}`)
        $zoneHighscore.text("Highscore: " + `${user.highScore}`)
        $zoneHighstreak.text(" Longest Streak: "+ `${user.highStreak}`)
        
        if (user.currentChoice === ai.currentChoice) {
            // a = light
            $scoreLightUp(light)

            if (user.currentStreak > 20) {
                point = point*2; 
                user.currentScore += point
                $zoneScore.text("Score: " + `${user.currentScore}` + " +2!")
            }
            user.currentScore += point
            user.currentStreak += 1
            // console.log("sick")
        } else {
            user.currentStreak = 0
            missed.push(ai.currentChoice)
            $zoneStreak.text("Streak: " + `${user.currentStreak}` + " RESET!")
            // console.log("sucks")
        } 
        if (missed.length > 3) {
            missed = [];
            user.currentScore -= 5
            $zoneScore.text("Score: " + `${user.currentScore}` + " -5!")
            // a = light
            $missLightUp(light)
            // console.log("missed, fool.")
        }
        if (user.currentStreak > user.highStreak) {
            user.highStreak = user.currentStreak
        }
        if (user.currentScore > user.highScore) {
            user.highScore = user.currentScore

        }
        
        // console.log("missed: " + missed)
    }
    


});