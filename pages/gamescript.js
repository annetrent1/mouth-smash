window.onclick = function() {
    var cursorCanvas = document.querySelector("#myCanvas")
    var cursorContext = cursorCanvas.getContext("2d")

    var circleCanvas = document.querySelector("#myCanvas")
    var circleContext = circleCanvas.getContext('2d')
    this.myCanvas.style.cursor = "none"
    var pointArea = document.getElementById("points").innerHTML

    var circles = [];

    var canvasPos = getPosition(cursorCanvas);
    var mouseX = 0;
    var mouseY = 0;
    var xMax = circleCanvas.width
    var yMax = circleCanvas.height
    var mouseWidth = 10
    var points = 0
    var circleSize = 40
    var numCircles = 20

    cursorCanvas.addEventListener("mousemove", setMousePosition, false);

    //Implementation of Circle object to fordraw params
    Circle.prototype.update = function() {
        circleContext.beginPath();
        this.xPos = this.xPos + this.dx
        this.yPos = this.yPos + this.dy
        if(this.xPos < 0)
          this.dx = Math.abs(this.dx)
        if(this.xPos > xMax)
          this.dx = -Math.abs(this.dx)
        if(this.yPos < 0)
          this.dy = Math.abs(this.dy)
        if(this.yPos > yMax)
          this.dy = -Math.abs(this.dy)
        circleContext.arc(this.xPos,this.yPos,this.width, 0, Math.PI * 2, false);

        circleContext.closePath();


        circleContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
        circleContext.fill();
        circleContext.lineWidth = 1;
        circleContext.strokeStyle = "black"
        circleContext.stroke();

        let xval = Math.abs(this.xPos - mouseX);
        let yval = Math.abs(this.yPos - mouseY);
        if(xval < this.width + mouseWidth && yval < this.width + mouseWidth) {
          if(mouseWidth > this.width) {
            console.log(xval, yval, this.width)
            this.isEaten = true
            if (mouseWidth < 80)
              mouseWidth += 2
            points++
            addCircle()
          }
          else {
            console.log("dead")
            if (mouseWidth > 5){
              mouseWidth -= 5
              this.isEaten = true
              addCircle()
            }

          }
        }

      }

    drawCircles()

    // Function to set circle sizes
    function Circle(speed, width, xPos, yPos) {
        this.speed = speed
        this.width = width
        this.xPos = xPos
        this.yPos = yPos
        this.dx = Math.floor(Math.random() * 2) + 1
        this.dy = Math.floor(Math.random() * 2) + 1
        this.opacity = 0.05 + Math.random() * 0.5;
        this.isEaten = false

      }

      //Main draw function to draw everything on the screen
      function drawCircles() {
        for (var i = 0; i < numCircles; i++) {
          var randomX = Math.round(-100 + Math.random() * 704);
          var randomY = Math.round(-100 + Math.random() * 528);
          var speed = 1 + Math.random() * 3;
          var size = 1 + Math.random() * circleSize;

          var circle = new Circle(speed, size, randomX, randomY);
          circles.push(circle);
        }
        numCircles = 0
        update();
      }

      function addCircle() {
          var randomX = Math.round(-100 + Math.random() * 704);
          var randomY = Math.round(-100 + Math.random() * 528);
          var speed = 1 + Math.random() * 3;
          var size = 1 + Math.random() * circleSize;

          var circle = new Circle(speed, size, randomX, randomY);
          circles.push(circle);
      }

      //Function to draw the object cursor on the canvas
      function drawCursor() {
        cursorContext.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        cursorContext.beginPath();
        cursorContext.arc(mouseX, mouseY, mouseWidth, 0, 2 * Math.PI, true);
        cursorContext.fillStyle = "#FF6A6A";
        cursorContext.fill();
        cursorContext.lineWidth = 1;
        cursorContext.strokeStyle = "black"
        cursorContext.stroke();
      }

    // function to update circles per frame
    function update() {
        drawCursor();
        pointArea = points
        for (var i = 0; i < circles.length; i++) {
            var myCircle = circles[i];
            myCircle.update();
        }
        var j = circles.length;
        while( j--) {

          if(circles[j].isEaten) {
              circles.splice(j, 1)
          }
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
        }
    }

}
