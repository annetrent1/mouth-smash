
function start() {
    var cursorCanvas = document.querySelector("#myCanvas");
    var cursorContext = cursorCanvas.getContext("2d");

    var circleCanvas = document.querySelector("#myCanvas");
    var circleContext = circleCanvas.getContext('2d');
    this.canvas.style.cursor = "none";

    var circles = [];

    var canvasPos = getPosition(cursorCanvas);
    var mouseX = 0;
    var mouseY = 0;

    cursorCanvas.addEventListener("mousemove", setMousePosition, false);

    //Implementation of Circle object to fordraw params
    Circle.prototype.update = function() {
 
        this.counter += this.sign * this.speed;
   
        circleContext.beginPath();
   
        circleContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, 
            this.yPos + Math.sin(this.counter / 100) * this.radius, 
            this.width, 0, Math.PI * 2, false);
   
        circleContext.closePath();
   
        circleContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
        circleContext.fill();
        circleContext.lineWidth = 1;
        circleContext.strokeStyle = "black"
        circleContext.stroke();
      };

    drawCircles();

    // Function to set circle sizes
    function Circle(radius, speed, width, xPos, yPos) {
        this.radius = radius;
        this.speed = speed;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.opacity = 0.05 + Math.random() * 0.5;
   
        this.counter = 0;
   
        var signHelper = Math.floor(Math.random() * 2);
   
        if (signHelper == 1) {
          this.sign = -1;
        } else {
          this.sign = 1;
        }
      }

      //Main draw function to draw everything on the screen
      function drawCircles() {
        for (var i = 0; i < 20; i++) {
          var randomX = Math.round(Math.random() * 704);
          var randomY = Math.round(-100 + Math.random() * 528);
          var speed = 0.2 + Math.random() * 3;
          var size = 5 + Math.random() * 50;
   
          var circle = new Circle(100, speed, size, randomX, randomY);
          circles.push(circle);
        }
        update();
      }
      
      //Function to draw the object cursor on the canvas
      function drawCursor() {
        cursorContext.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        cursorContext.beginPath();
        cursorContext.arc(mouseX, mouseY, 30, 0, 2 * Math.PI, true);
        cursorContext.fillStyle = "#FF6A6A";
        cursorContext.fill();
        cursorContext.lineWidth = 1;
        cursorContext.strokeStyle = "black"
        cursorContext.stroke();
      }

    // function to update circles per frame
    function update() {
        drawCursor();
        for (var i = 0; i < circles.length; i++) {
            var myCircle = circles[i];
            myCircle.update();
        }
        requestAnimationFrame(update);
    }

    //Sets the cursor circle position to the mouse's position
    function setMousePosition(e) {
        mouseX = e.clientX - canvasPos.x;
        mouseY = e.clientY - canvasPos.y;
    }  

    //gets the mouse's position
    function getPosition(el) {
        var xPosition = 0;
        var yPosition = 0;
        
        while (el) {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
        }
        return {
            x: xPosition,
            y: yPosition
        };
    }  
}