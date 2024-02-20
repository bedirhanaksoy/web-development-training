let current_score = 0;
let time = 10;
let highest = 0;

document.addEventListener('DOMContentLoaded', function () {
    var circle = document.getElementById('circle');
    var scoreContainer = document.getElementById('score-container');
    var timeContainer = document.getElementById('time-container');
    var highestDisplay = document.getElementById('highest');
    var scoreDisplay = document.getElementById('score');
    var timeDisplay = document.getElementById('time');

    circle.addEventListener('click', function () {
        moveCircleRandomly();
        updateScore();
        changeCircleProperties();
    });

    function moveCircleRandomly() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var randomX = Math.floor(Math.random() * (windowWidth - 100));
        var randomY = Math.floor(Math.random() * (windowHeight - 100));

        circle.style.left = randomX + 'px';
        circle.style.top = randomY + 'px';
    }

    function updateScore() {
        current_score++;
        scoreDisplay.textContent = current_score;
    }

    function changeCircleProperties() {
        var randomColor = getRandomColor();
        circle.style.backgroundColor = randomColor;

        var randomBackgroundColor = getRandomColor();
        document.body.style.backgroundColor = randomBackgroundColor;

        var randomSize = Math.floor(Math.random() * 100) + 50;
        circle.style.width = randomSize + 'px';
        circle.style.height = randomSize + 'px';
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function startTimer() {
        var timer = setInterval(function () {
            time--;

            if (time <= 0) {
                clearInterval(timer);
                alert("Game Over! Your score: " + current_score);
                checkHighestScore();
                highestDisplay.textContent = highest;
                resetGame();
            }

            timeDisplay.textContent = time;
        }, 1000);
    }

    const getHighestScore = async () => {
        try {
            const response = await fetch("body.php?getScoreQuery=true", {
                method: "GET",
            });
    
            if (response.ok) {
                const data = await response.json();
                highest = data.highestScore;
                updateHighestScore();
            } else {
                console.log("Failed to fetch highest score. Status: " + response.status);
            }
        } catch (error) {
            console.log("Error fetching highest score", error);
        }
        highestDisplay.textContent = highest;
    };

    const setHighestScore = async () => {
        try {
            const response = await fetch("body.php?setScoreQuery=true&newScore=" + encodeURIComponent(current_score), {
                method: "POST",
            });

            if (response.ok) {
                console.log("Score updated");
            } else {
                console.log("Failed to update score.");
            }
        } catch (error) {
            console.log("Error setting highest score", error);
        }
    };

    function updateHighestScore() {
        if (current_score > highest) {
            highest = current_score;
            setHighestScore();
        }
    }

    function checkHighestScore() {
        getHighestScore();
        highestDisplay.textContent = highest;
    }

    function resetGame() {
        highestDisplay.textContent = highest;
        current_score = 0;
        scoreDisplay.textContent = current_score;
        time = 10;
        startTimer();
    }

    startTimer();
    getHighestScore();
    if (current_score > highest) {
        highest = current_score;
        setHighestScore();
    }

    highestDisplay.textContent = highest;
});
