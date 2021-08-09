const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground
var wall_right
var wall_left
var bridge
var jointPoint
var jointLink
var stones = []

function preload() {
  backgroundImg = loadImage("assets/background.png")

  //Creating 2 animations for moving zombie left to right and right to left
  leftToRightZombie = loadAnimation("./assets/zombie1.png", "./assets/zombie2.png", "./assets/zombie1.png");
  rightToLeftZombie = loadAnimation("./assets/zombie3.png", "./assets/zombie4.png", "./assets/zombie3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 8, width * 2, 20, "green")
  wall_left = new Base(170, height / 2 + 50, 600, 100, "brown")
  wall_right = new Base(width - 90, height / 2 + 50, 600, 100, "brown")

  //Modified bridge location
  bridge = new Bridge(30, { x: 50, y: height / 2 - 100 })
  //Modified joint point location
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20)

  Composite.add(bridge.body, jointPoint)
  jointLink = new link(bridge, jointPoint)

  for (var i = 0; i <= 10; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 100);
    var stone = new Stone(x, y, 40);
    stones.push(stone);
  }
  zombie = createSprite(width / 2, height - 110)

  //Added animation to the zombie
  zombie.addAnimation("leftToRight", leftToRightZombie);
  zombie.addAnimation("rightToLeft", rightToLeftZombie);

  //Scaled zombie and assigned initial velocity
  zombie.scale = 0.1
  zombie.velocityX = 10

  //Adjusted position of the button
  breakbutton = createButton("")
  breakbutton.position(width - 250, height / 2 -50)
  //Added code to add image and style the button in style.css
  breakbutton.class("breakbutton")
  //Changed mousePressed to mouseClicked to make the code work
  breakbutton.mouseClicked(handleButtonPressed)

}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  drawSprites()
  ground.display()
  //Hid the left and right walls
  // wall_left.display()
  // wall_right.display()
  bridge.show()

  for (var stone of stones) {
    stone.display();
  }
  //jointPoint.display()
  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;

    // Change animation to "rightToLeft"

  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    // Change animation to "leftToRight"
  }
}
function handleButtonPressed() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500)
}