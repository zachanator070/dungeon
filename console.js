
// global variables
var lines = ['You find yourself in a dark dank dungeon.','Typing \'help\' would probably help.','>'];
var maxCharsPerLine = 50;
var maxLinesPerScreen = 14;

// used to determine if we will accept more commands
var playing = true;

function addChar(event){

  if(!playing){
    return;
  }

  var code = event.which || event.keyCode;

  var key = String.fromCharCode(code);

  var lastLine = lines[lines.length-1];

  // if any key was pressed, and the cursor was showing, delete it
  if(lastLine[lastLine.length-1] == "|"){
    lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
    lastLine = lines[lines.length-1];
  }

  // if enter was pressed then process command
  if(key == "\r"){

    if(lastLine[0] == ">"){
      lastLine = lastLine.substr(1,lastLine.length - 1)
    }

    runCommand(lastLine);

    if(playing){
      addNewLine(">");
    }

  }
  // if backspace was pressed, then delete a character
  else if(code == 8){
    if(lastLine.length > 1){
      lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
    }
  }
  // if we pressed the shift key, do not add a character
  else if(code == 16){
    return;
  }

  // else we just need to add a new character
  else{

    // if shift key was not pressed we need to make the letter lowercase
    if(!event.shiftKey && code >= 65 && code <= 90){
      code += 32;
      key = String.fromCharCode(code);
    }

    // if we went over the max charactters per line, add a new line
    if(lastLine.length == maxCharsPerLine){
      addNewLine("");
    }
    lines[lines.length-1] += key;

  }

  // update with the new info
  updateConsole();

}

// adds new lines to the lines array
function addNewLine(line){

  var moreLines = line.split("\n");

  if(moreLines.length >1){
    moreLines.forEach(function(line){

      addNewLine(line);

    });
    return;
  }

  if(line.length > maxCharsPerLine){
    var words = line.split(" ");
    var tempLine = "";

    words.forEach(function(word){
      if((tempLine+word).length + 1 < maxCharsPerLine){
        tempLine += word + " ";
      }
      else{
        addNewLine(tempLine);
        tempLine = word + " ";
      }
    });

    addNewLine(tempLine);
    return;
  }

  // if we are under our max lines
  if(lines.length==maxLinesPerScreen){
    lines.splice(0,1);
  }

  lines.push(line);

}

function updateConsole(){

  var content = '';
  lines.forEach(function(value, index){

    // if the async call added a cursor, and it is not the last line, delete
    // the cursor

    if(index != lines.length-1 && value[value.length-1] == "|"){
      lines[lines.length-1] = line.substring(0, line.length - 1);
    }

    content += value + "\r\n";

  });

  var console = document.getElementById('console');
  console.focus();
  console.innerHTML = content;

}

function runCommand(command){

  // this function is defined in parse.js
  var tokens = parse(command);

  // this function is defined in command.js
  doCommand(tokens);

}

// add a blinking cursor effect
function blink(){
  var lastLine = lines[lines.length-1];
  // add a cursor, or delete it
  if(lastLine[lastLine.length-1] != "|"){
    lines[lines.length-1] += "|";
  }
  else{
    lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
  }

  updateConsole();
}

function selectConsole(){
  $('#console').focus();
}
