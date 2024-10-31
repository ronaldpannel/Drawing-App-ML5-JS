//ml5.js
let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({ flipped: true });
}
// function mousePressed() {
//   console.log(hands);
// }

function getHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);
  painting.clear();
  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, getHands);
}

function draw() {
  image(video, 0, 0);
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let x = (thumb.x + index.x) / 2;
    let y = (thumb.y + index.y) / 2;

    let d = dist(thumb.x, thumb.y, index.x, index.y);
    if (d < 30) {
      painting.stroke(255, 255, 0);
      painting.strokeWeight(4)
      painting.line(px, py, x, y);
     
    }
     px = x;
     py = y;
  }
  image(painting, 0, 0);
}

function windowResized() {
  resizeCanvas(640, 480);
}
