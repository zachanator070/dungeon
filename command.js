
function doCommand(tokens){

  if(tokens.length>0){
    var token = tokens[0];

    if(token.type == 'GO'){
      doGo(tokens);
    }

    else if(token.type == 'HELP'){
      showHelp(tokens);
    }

    else if(token.type == 'USE'){
      doUse(tokens);
    }

    else if(token.type == 'TAKE'){
      doTake(tokens);
    }

    else if(token.type == 'SAY'){
      doSay(tokens);
    }

    else if(token.type == 'INFO'){
      showRoomInfo(tokens);
    }

    else if(token.type == 'INVENTORY'){
      showInventory(tokens);
    }

    else{
      addNewLine('I don\'t know what you are trying to do.');
    }
  }

}

function showRoomInfo(tokens){
  if(tokens.length > 1){
    addNewLine('Too many arguments given.');
  }
  else{
	printRoomDescription();
  }
}

function printRoomDescription(){
	description = position.description
	position.inventory.forEach(function(item){
		if(item.hasOwnProperty("description")){			
		  description += " " + item.description;
		}
    });
    addNewLine(description);
}

function showInventory(tokens){
  if(tokens.length > 1){
    addNewLine('Too many arguments given.');
  }
  else{
    addNewLine("You have in your inventory:");
    inventory.forEach(function(item){
      addNewLine(item.name);
    });
  }
}

function doGo(tokens){

  if(tokens.length != 2){
    addNewLine('Where are you going?');
  }
  else{
    // delete GO token
    tokens.splice(0,1);
    var direction = tokens[0].value;

    if(direction == 'north' || direction == 'n'){
      if(position.hasOwnProperty('northDoor')){
        if(position.northDoor.status == "unlocked"){
          position = position.northDoor.room;
          printRoomDescription();
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('You cannot go that direction.');
      }
    }

    else if(direction == 'south' || direction == 's'){
      if(position.hasOwnProperty('southDoor')){
        if(position.southDoor.status == "unlocked"){
          position = position.southDoor.room;
          printRoomDescription();
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('You cannot go that direction.');
      }
    }

    else if(direction == 'east' || direction == 'e'){
      if(position.hasOwnProperty('eastDoor')){
        if(position.eastDoor.status == "unlocked"){
          position = position.eastDoor.room;
          printRoomDescription();
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('You cannot go that direction.');
      }
    }

    else if(direction == 'west' || direction == 'w'){
      if(position.hasOwnProperty('westDoor')){
        if(position.westDoor.status == "unlocked"){
          position = position.westDoor.room;
          printRoomDescription();
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('You cannot go that direction.');
      }
    }

    else{
      addNewLine('You do not have the option to do that.')
    }

  }
}

function doUse(tokens){

  if(tokens.length == 2){
    var name = tokens[1].value;
    var item = findItem(name);
    if(item != null){
		if(item.hasOwnProperty('use')){
		  var result = item.use(null);
		  addNewLine(result);			
		}
		else{
			addNewLine("I cannot do that with a " + item.name)
		}
    }
    else{
      addNewLine("You cannot find a "+name);
    }
  }
  else if(tokens.length == 4){

    var name1 = tokens[1].value;
    var item1 = findItem(name1);

    if(item1 != null){

      var name2 = tokens[3].value;
      var item2 = findItem(name2);

      if(item2 != null){
		  if(tokens[0].value.toLowerCase() == "attack"){
			  var result = item2.use(item1);
			  addNewLine(result);
		  }
		  else{
			  var result = item1.use(item2);
			  addNewLine(result);			  
		  }
      }
      else{
        addNewLine("You cannot find a "+name2);
      }
    }

    else{
      addNewLine("You cannot find a "+name1);
    }
  }
  else{
    addNewLine('You are tyring to use something, but are obviously lost on how to do so.');
  }

}

function doTake(tokens){

  if(tokens.length == 2){
    var name = tokens[1].value;
    var item = null;
    var index = -1;

    position.inventory.forEach(function(tempItem,tempIndex){
      if(tempItem.name == name){
        item = tempItem;
        index = tempIndex;
      }
    });

    if(item != null){
      if(item.mobile){
        position.inventory.splice(index,1);
        inventory.push(item);
        addNewLine("You pick up the "+name);
      }
      else{
        addNewLine("You cannot pick up the " + name);
      }
    }
    else{
      addNewLine("You cannot find a "+name);
    }
  }
  else{
    addNewLine('You are trying to pick something up, but lost on how to do so.');
  }

}

function doSay(tokens){

  var verb = tokens[0].value;

  // remove SAY token
  tokens.splice(0,1);

  var sentence = '';

  tokens.forEach(function(value){
    sentence += value.value + " ";
  });

  addNewLine('You '+verb+": "+sentence);

  if(tokens.length == 1 && (tokens[0].value == 'friend' || tokens[0].value == 'mellon') && position == room2){
    room2.northDoor.status = 'unlocked';
    addNewLine('Your knowledge of The Lord of the Rings lore has paid off. You hear the door unlock and glow with elvish runes.');
  }
}

function findItem(name){

  if(name == "door"){
    return {name:"door"};
  }

  var item = null;

  inventory.forEach(function(tempItem){
    if(tempItem.name == name){
      item = tempItem;
    }
  });

  position.inventory.forEach(function(tempItem){
    if(tempItem.name == name){
      item = tempItem;
    }
  });

  return item;
}

function showHelp(tokens){
  if(tokens.length == 1){
    addNewLine("Some available commands are:\n"+
    "HELP [command]\n"+
    "GO [north | south | east | west]\n"+
    "USE [item]\n"+
    "USE [item] WITH [item]\n"+
    "TAKE [item]\n"+
    "INVENTORY\n"+
    "INFO");
  }
  else{
    // delete HELP token
    tokens.splice(0,1);
    var token = tokens[0];
    if(token.type == 'GO'){
      addNewLine("Travel in some direction.\nEx: go east");
    }

    else if(token.type == 'USE'){
      addNewLine("Use an item by itself.\n\tEx: use lantern\n"+
      "Or use an item with another item.\n\tEx: use lantern with wood");
    }

    else if(token.type == 'TAKE'){
      addNewLine("Adds an item from the room to your personal inventory.\n"+
      "Ex: take book");
    }

    else if(token.type == 'INVENTORY'){
      addNewLine("Displays what is in the players inventory. Also can be called with \'inv\'.");
    }

    else if(token.type == 'INFO'){
      addNewLine("Displays the description of the current room.");
    }

    else if(token.type == 'HELP'){
      addNewLine("You are already using the help command, it looks like you dont\'t need any more help.");
    }

    else{
      addNewLine('No help information exists for that.');
    }
  }
}
