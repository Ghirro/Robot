# MarsRobot

Mars Robot is a simple program that will let you steer a robot around a grid using the command line.

## Installation

Once you've cloned the repository simply type:

```
npm install
```

To get the required packages. 

## Start

To start the application simply use

```
node app.js
```

From there you can start inputting commands.

### Grid Setup Command

The **first** command that you need to enter is the Grid Setup command. This describes how large your Grid will be in the form of [x, y] coordinates.

```
5 3
```

### Robot Preparation Command

The next command should be your robot preparation command. This comes in the format [x, y, orientation] where ***x*** and ***y*** are the robots position on the grid and ***orientation*** is one of N, S, E or W describing the direction the robot is pointing in.

Sample:

```
1 1 E
```

### Making your Robot Do Something

The final command is a string of characters that describe actions for your robot to take, there are currently three:

* F: Move the robot one coordinate forward in it's current direction
* L: Turn the robot 90 degrees to it's left
* R: Turn the robot 90 degrees to it's right

Sample:
```
RFRFRFRF
```

After your string the Robot will report back it's position and whether it fell off the grid. Remember that dead robots (one's that have previously fallen off the grid) will leave a scent and prevent your robot from killing itself from that position again.

## Modifying The Robot

### Adding a new command

To add a new command to your robot you can simply edit the command mappings:

```javascript
this.commandMappings.H = 'helloWorld';
this.helloWorld = function () {
  this.respond('Hello World');
};
```

***Note:*** If you're adding a command that will create a new orientation, i.e. one that isn't N,S,E,W you'll have to add an orientation mapping.

### Adding an orientation mapping

Orientation mappings describe how the robot should display an angle description and respond to moving in that direction. They take the following form:

```javascript
var northEastOrientationMapping = {
  degree: 45,
  symbol: 'NE',
  move: function (x,y) {
    return [x+1, y+1];
  }  
}
```

To add an orientation mapping you can simply do the following:

```javascript
this.orientationMappings.push(northEastOrientationMapping);
```

