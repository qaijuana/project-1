const KEYSTROKE =["w", "i", "a", "s", "d", "j", "k", "l"];

$(() => {
    //! CALLING FUNCTIONS WOULD BE INSIDE HERE.
    
    
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

    // user.name = prompt("I'm Dexter! \nWhats your name?")
    // const $userName = $(".userName")
    // $userName.append("").text("vs " + user.name)

    const game = {
        "speed": 700,
        "time": 60,
    }
    const ai = {
        "name": "Dexter",
        "currentChoice": -1,
        "currentButton": null
        
    } 

    let noRepeat = 0
    const $currentScore = $(".score")
    const $currentStreak = $('.streak')
    const $currentTime = $(".time")
    const $highScore = $(".highscore")
    const $highStreak = $(".highstreak")
    const $h3 = $("<h3>")
    const $zoneScore = $currentScore.append($h3)
    const $zoneStreak = $currentStreak.append($h3)
    const $zoneTime = $currentTime
    const $zoneHighscore = $highScore.append($h3)
    const $zoneHighstreak = $highStreak.append($h3)

    const $timeSlider = $("#gameTime")
    const $speedSlider = $("#aiSpeed")
    $timeSlider.on('change', x => {
        game.time = $timeSlider.val()
    })
    $speedSlider.on('change', x => {
        game.speed = $speedSlider.val()
    })
    


    $lightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('active');
        if (noRepeat > 0) {
            noRepeat = 0
            clearInterval(noRepeat)
        }
        noRepeat = setInterval(() => {
            e.removeClass('active')
        }, 1000);    

    }

    

    $aiLightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('activeAI');
        if (noRepeat > 0) {
            noRepeat = 0
            clearInterval(noRepeat)
        }
        noRepeat = setInterval(() => {
            e.removeClass('activeAI')
        }, 800);
    }
    
    
    $scoreLightUp = (e) => {
        noRepeat = 0
        noRepeat += 1
        e.addClass('activeScore');
        if (noRepeat > 0) {
            noRepeat = 0
            clearInterval(noRepeat)
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
            clearInterval(noRepeat)
        }
        noRepeat = setInterval(() => {
            e.removeClass('activeMiss')
        }, 1000);
    }
    
    //!GAME MECHANISM IS BELOW 
    
    const gameButton = $('.bttn')

        
    theAI = () => {
        const aiIndex = Math.floor( (Math.random() * (KEYSTROKE.length) ));
        ai.currentChoice = aiIndex
        ai.currentButton = gameButton.eq(aiIndex)

        $aiLightUp(ai.currentButton)
        
    };
        
    
    let startTimer = null;
    // let game Time = 
    noRepeat = 0
    
    render = () => {
        $zoneTime.text("Time: " + game.time)
        $zoneScore.text("Score: " + `${user.currentScore}`)
        $zoneStreak.text("Streak: " + `${user.currentStreak}`)
        $zoneHighscore.text("Highscore: " + `${user.highScore}`)
        $zoneHighstreak.text(" Longest Streak: "+ `${user.highStreak}`)
    };
    
    
    $play =  () => {
        noRepeat = 0
        noRepeat += 1

        if (game.time > 0) {
            const userTyping = 
            $('body').on("keydown", e => {
                const keyNormalize = e.key.toLowerCase();
                const userIndex = KEYSTROKE.indexOf(keyNormalize);
                user.currentChoice = userIndex
                user.currentButton = gameButton.eq(userIndex) 
                if (userIndex > -1) {
                    $lightUp(user.currentButton)
                    compareChoice(user.currentButton)
                }
            });
        }
        

        $start = () => {


            const aiSpeed = setInterval(theAI, game.speed)

            user.currentScore = 0
            user.currentStreak = 0
            $zoneTime.text("Time: " + startTime)
            .css({
                "color": "black"
            })
            render()            
            outOfTime = () => {
                game.time = 0
                return clearInterval(aiSpeed)
            };
            
            game.time = game.time
            
            const timeKeeper = setInterval(() => {
                render()
                game.time -= 1

                 if (game.time < 0) {
                    clearInterval(timeKeeper)
                    outOfTime()
                    alert("Time is up buddy")
                    $zoneTime.text("Time: " + game.time)
                    .css({
                        "color": "black"
                    })
                }else if (game.time <= 3) {
                    $zoneTime.text("Time: " + game.time)
                .css({
                    "color": "red"
                })
                }
                console.log(game.time)
                
            }, 1000);
        
            
            $(".stop").on("click", outOfTime)
        }

        
        let startTime = 3
        
        if (noRepeat > 0) {
            clearInterval(startTimer)
        }

        startTimer = setInterval(() => {
            $zoneTime.text("Time: " + startTime)
            .css({
                "color": "red"
            })
            startTime -= 1
            if (startTime < 0) {
                clearInterval(startTimer)
                $start();
                
            }
        }, 1000)
        
        timerReset = () => {
            clearInterval(startTimer)
            $zoneTime.text("Time: " + 0)
                .css({
                    "color": ""
                })
        }
        $(".stop").on("click", timerReset)
    }
    
    $(".play").on("click", $play)
    

    //! GAME RULES AND CONDITIONS 


    let missed = [];
    compareChoice = (light) => {
        let point = 1
        
        //update HTML
        render()
        

            if (user.currentChoice === ai.currentChoice) {
                if (game.time > 0){    
                    $scoreLightUp(light)

                    if (user.currentStreak > 20) {
                        point = point*2; 
                        user.currentScore += point
                        $zoneScore.text("Score: " + `${user.currentScore}` + " +2!")
                    }else {
                        point = 1 
                        user.currentScore += point
                        user.currentStreak += 1
                    }
                }
            } else {
                user.currentStreak = 0
                missed.push(ai.currentChoice)
                $zoneStreak.text("Streak: " + `${user.currentStreak}` + " reset!")
            } 
            if (missed.length > 3) {
                if (game.time > 0){
                    missed = [];
                    user.currentScore -= 5
                    $zoneScore.text("Score: " + `${user.currentScore}` + " -5!")
                    $missLightUp(light)
                }
            }
            if (user.currentStreak > user.highStreak) {
                user.highStreak = user.currentStreak
            }
            if (user.currentScore > user.highScore) {
                user.highScore = user.currentScore
            }
        }
       
        

});