var score = 0;
var totalScore = 0;
var shots = 0;

var rectangle = document.createElement('div');
rectangle.style.width = '75px';
rectangle.style.height = '50px';
rectangle.style.border = '1px solid green'; // Set the border color to green
rectangle.style.position = 'absolute';
rectangle.style.left = '150px';
rectangle.style.top = '100px';
rectangle.style.display = 'none';
document.body.appendChild(rectangle);

var arrow = document.createElement('div');
arrow.style.position = 'absolute';
arrow.style.width = '1px'; // Length of the line
arrow.style.height = '50px'; // Thickness of the line
arrow.style.border = '1px solid red'; // Color of the line
arrow.style.transformOrigin = 'center center'; // Set the rotation origin to the center
arrow.style.display = 'none';
document.body.appendChild(arrow);

function throwDart() {
    if (shots >= 3) {
        resetGame();
        return;
    }
    shots++;
    var dartboard = document.getElementById('dartboard');
    var dart = document.getElementById('dart');
    dart.style.display = 'block'; // Show the dart when throwing
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var targetX = Math.random() * dartboard.offsetWidth;
    var targetY = Math.random() * dartboard.offsetHeight;
    var dx = (targetX - x) / 100;
    var dy = (targetY - y) / 100;
    var i = 0;
    var interval = setInterval(function () {
        if (i >= 100) {
            clearInterval(interval);

            // Define dartX and dartY
            var dartX = x;
            var dartY = y;

            var rectangleX = rectangle.offsetLeft + rectangle.offsetWidth / 2;
            var rectangleY = rectangle.offsetTop + rectangle.offsetHeight / 2;

            var distanceToRectangle = Math.hypot(rectangleX - dartX, rectangleY - dartY);

            var rectangleX = rectangle.offsetLeft + rectangle.offsetWidth / 2;
            var rectangleY = rectangle.offsetTop + rectangle.offsetHeight / 2;

            var distanceToRectangle = Math.hypot(rectangleX - dartX, rectangleY - dartY);

            if (distanceToRectangle > dartboard.offsetWidth / 2) {
                document.getElementById('distance').textContent = 'Out'; // Dart hit outside the board
                score = 0; // Dart hit outside the board
            } else {
                document.getElementById('distance').textContent = 'Distance to rectangle: ' + Math.round(distanceToRectangle); // Dart hit inside the board
            }

            if (distanceToRectangle < dartboard.offsetWidth / 2) {
                if (distanceToRectangle < rectangle.offsetWidth / 2) {
                    score = 88; // Dart hit the rectangle
                } else {
                    score = (1 - distanceToRectangle / (dartboard.offsetWidth / 2)) * 88; // Dart hit inside the board but outside the rectangle
                }
                score = Math.round(score); // Round the score to the nearest integer
                totalScore += score;
            }

            document.getElementById('score').textContent = 'Score: ' + score;
            document.getElementById('totalScore').textContent = 'Total Score: ' + totalScore;

            if (shots === 3) {
                var gameButton = document.getElementById('gameButton');
                gameButton.style.color = 'red';
                gameButton.textContent = 'Reset Game';
            }
        } else {
            x += dx;
            y += dy;
            dart.style.left = x + 'px';
            dart.style.top = y + 'px';
            i++;

            var dartX = dart.offsetLeft + dart.offsetWidth / 2;
            var dartY = dart.offsetTop + dart.offsetHeight / 2;

            var dartboardX = dartboard.offsetLeft + dartboard.offsetWidth / 2;
            var dartboardY = dartboard.offsetTop + dartboard.offsetHeight / 2;

            var angle = Math.atan2(dartY - dartboardY, dartX - dartboardX) * 180 / Math.PI;

            arrow.style.transform = 'rotate(' + (angle + 90) + 'deg)'; // Adjust the angle by 90 degrees
            arrow.style.left = dartboardX - arrow.offsetWidth / 2 + 'px'; // Move the arrow to the center of the dartboard
            arrow.style.top = dartboardY - arrow.offsetHeight / 2 + 'px'; // Move the arrow to the center of the dartboard
        }
    }, 10);
}
function resetGame() {
    score = 0;
    totalScore = 0;
    shots = 0;
    var dart = document.getElementById('dart');
    dart.style.left = '50%';
    dart.style.top = '50%';
    dart.style.display = 'none'; // Hide the dart when resetting the game
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('totalScore').textContent = 'Total Score: ' + totalScore;
    document.getElementById('gameButton').style.color = ''; // Set the color to original
    document.getElementById('gameButton').textContent = 'Throw Dart';

}