<!DOCTYPE html>
<html>
  <head>
    <title>Ping Pong Game</title>
    <style>
      canvas {
        background: black;
        display: block;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <canvas id="pingPong" width="800" height="400"></canvas>
    <script>
      // Get the canvas and its context
      const canvas = document.getElementById("pingPong");
      const context = canvas.getContext("2d");

      // Paddle
      const paddleWidth = 10;
      const paddleHeight = 100;
      let paddleY = (canvas.height - paddleHeight) / 2;

      // Ball
      const ballSize = 10;
      let ballX = canvas.width / 2;
      let ballY = canvas.height / 2;
      let ballSpeedX = 5;
      let ballSpeedY = 5;

      // Update the game
      function update() {
        // Move the ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Bounce off top and bottom
        if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
          ballSpeedY = -ballSpeedY;
        }

        // Bounce off the paddle
        if (
          ballX - ballSize < paddleWidth &&
          ballY > paddleY &&
          ballY < paddleY + paddleHeight
        ) {
          ballSpeedX = -ballSpeedX;
        }

        // Ball out of bounds
        if (ballX - ballSize < 0) {
          // Reset the ball
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballSpeedX = 5;
          ballSpeedY = 5;
        }
      }

      // Draw the game
      function draw() {
        // Clear the canvas
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the paddle
        context.fillStyle = "white";
        context.fillRect(0, paddleY, paddleWidth, paddleHeight);

        // Draw the ball
        context.beginPath();
        context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        context.fill();
      }

      // Game loop
      function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
      }

      // Handle user input
      document.addEventListener("mousemove", (e) => {
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        paddleY = mouseY - paddleHeight / 2;
      });

      // Start the game loop
      gameLoop();
    </script>
  </body>
</html>
