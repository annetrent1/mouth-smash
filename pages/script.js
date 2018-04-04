window.onload = function() {
  var video = document.getElementById('video');
  var canvasTrack = document.getElementById('canvasTrack');
  var canvasCircle = document.getElementById('canvasCircle');
  var context = canvasTrack.getContext('2d');
  var circ = canvasCircle.getContext('2d');
  var displayPoints = document.getElementById('points');
  var x = Math.floor(Math.random() * canvasCircle.width);
  var y = canvasCircle.height-30;
  var dx = 1;
  var dy = 1;
  var xMax = canvasTrack.width
  var yMax = canvasTrack.height
  var mouthX = 0
  var mouthY = 0
  var close = 40
  var isEaten = false
  var points = 0;

  function drawCircle() {
    if (isEaten) {
      x = Math.floor(Math.random() * canvasCircle.width);
      y = canvasCircle.height-30;
      isEaten = false
      points++
    }
    circ.clearRect(0, 0, canvasCircle.width, canvasCircle.height)
    if(y == 0) {
      y = canvasCircle.height-30;
      x = Math.floor(Math.random() * canvasCircle.width);
    }
      circ.beginPath();
      circ.arc(x, y, 30, 0, Math.PI*2);
      circ.fillStyle = "#0095DD";
      circ.fill();
      circ.closePath();
      x += dx
      y += dy

      if (x < 10 || x > xMax) {
        dx *= -1
      }
      if (y < 10 || y > yMax) {
        dy *= -1
      }
  }

  function checkDistance() {
    if(x - mouthX < close && y - mouthY < close) {
      console.log("Om nom nom")
      isEaten = true
    }
  }

  function gameLoop() {
    drawCircle()
    checkDistance()
    circ.font="30px Comic Sans MS"
    circ.fillStyle = "black"
    circ.align = "left"
    circ.fillText(points, 50, 50)
    mouthX = -1
    mouthY = -1
  }
  // The tracker tracks mouths but the mouth has to be close to the camera
  var tracker = new tracking.ObjectTracker('mouth')
  tracker.setInitialScale(2)
  tracker.setStepSize(2)
  tracker.setEdgesDensity(.1)

  tracking.track('#video', tracker, { camera: true })


  tracker.on('track', function(event) {
    // We need to draw our objects in here I think.
    context.clearRect(0, 0, canvasTrack.width, canvasTrack.height)

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb'
      context.strokeRect(rect.x, rect.y, rect.width, rect.height)
      context.font = '11px Helvetica'
      context.fillStyle = "#fff"
      mouthX = rect.x + (rect.width / 2)
      mouthY = rect.y + (rect.height / 2)
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
    });
  });
  setInterval(gameLoop, .1)
  var gui = new dat.GUI()
  gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01)
  gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1)
  gui.add(tracker, 'stepSize', 1, 5).step(0.1)
};
