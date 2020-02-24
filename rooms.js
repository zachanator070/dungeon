
var inventory=[];

var room1 = {};
var room2 = {};
var room3 = {};
var room4 = {};

var position = room1;

room1.description = 'You are in a cold dark room that smells of old socks. You are reminded'+
  ' of those horrible days of gym class. You see a door to the north. It looks flimsy and you'+
  ' bet that it would not last long against a sturdy weapon. A hallway leads to the east.';
room1.northDoor={};
room1.northDoor.status='locked';
room1.northDoor.room= room4;
room1.eastDoor={};
room1.eastDoor.status='unlocked';
room1.eastDoor.room = room2
room1.inventory=[];

room2.description="There is a door to the north. "+
  "There is a hallway to the west where an offensive smell lurks.";
room2.westDoor={};
room2.westDoor.status='unlocked';
room2.westDoor.room = room1;
room2.northDoor={};
room2.northDoor.status='locked';
room2.northDoor.room=room3;
room2.inventory = [
    {
      name:'book',
      mobile:true,
      description:"An old book lies propped uo against the wall. It's pages look filled with "+
      "wisdom from the sages of old.",
      use:function(target){
        if(target == null){
            return "The old tome reads: Speak friend and enter.";
        }
        else{
          if (target.hasOwnProperty('name')){
            return 'You throw the book at the '+target.name+" and nothing happens.";
          }
          else{
            return 'It\'s a book. That\'s not how it is used.';
          }
        }
      }
    },
    {
      name:'chair',
      mobile:true,
      description: "A chair stands in the room waiting for a suitor to plop their rump down for a rest.",
      use:function(target){
        if(target == null){
            return "You sit down on the chair and start to comtemplate on life. You "+
            "notice how cold, dark, and depressing this dungeon is and decide that those"+
            " princesses aren\'t going to rescue themselves or else some other guy wearing"+
            " green and some overalls will do it.";
        }
        else{
          if (target.hasOwnProperty('name')){
            return 'You smack the '+target.name+" with the chair with rage like you are"+
            " facing your greatest foe in the ring with the crowd shouting \'USE THE CHAIR\',"+
            " but alas no one is around to notice your victory over the "+target.name+". Your wrestling,"+
            " moves have no effect otherwise.";
          }
          else{
            return 'A sword is very usefull, but not that usefull.';
          }
        }
      }
    },
    {
      name:'dirt',
      mobile:true,
      description:"The room has lots of dirt on the floor, ground to a pulp from frequent"+
        " use by the previous residents.",
      use:function(target){
        if(target == null){
          return "You eat the dirt. You feel sick. You had low expectations of this, but were still disappointed.";
        }
        else{
          return "The "+target.name+" is now smothered in dirt. You have made a mess of yourself "+
          "and you are proud of it.";
        }
      }
    },
    {
      name:'window',
      mobile:false,
      description: 'A window lies squarely on the door to the north. You can see the brilliant light of the next room '+
      "peaking through the window.",
      use:function(target){
        if(target == null){
          return "You peer through the window, a brilliant light prevents you from seeing much.";
        }
        else{
          return "You place the "+target.name+" up against the glass so that the "+ target.name +
          " can take a look too. You feel proud to help out an inannimate object.";
        }
      }
    }
  ];

room3.description="A plaque against the wall reads: It is dangerous to"+
  " go alone, take this. There is a door that leads to the south.";
room3.southDoor={};
room3.southDoor.status='unlocked';
room3.southDoor.room=room2;
room3.inventory=[
    {
      name:'sword',
      mobile:true,
      description: "The room is lit up with a spectacular light radiating from a glorius "+
        "sword protruding out of the ground.",
      use:function(target){
        if(target == null){
            return "The sword is somehow glowing despite this dark depressing dungeon."+
            " You feel heroic and courageous by just wielding the mighty blade.";
        }
        else{
          if (target.hasOwnProperty('name')){
            if(target.name == 'door' && position.hasOwnProperty('northDoor') && position.northDoor.status == 'locked'){
              position.northDoor.status = 'unlocked';
              room1.description = 'You are in a cold dark room that smells of old socks. You are reminded'+
              ' of those horrible days of gym class. The door to the north is smashed to bits, revealing another room. A hallway leads to the east.';
              return 'You hack the door to pieces clearing the way into the room to the north.';

            }
            return 'The '+target.name+" is threatened by your sword. Although it is inannimate,"+
            " its fear is palpable in the air.";
          }
          else{
            return 'I don\'t know what to do here.';
          }
        }
      }
    }
  ];

room4.description = "Upon entering the room, you hear a loud \'BANG\' as steel bars fall"+
  " covering the doorway you just came through. You see no other exit from the room."+
  " The room is dimly lit by a single candle on a strawberry cake standing"+
  " on a table in the center of the room. A note is on the table next to the cake.";
room4.inventory=[
    {
      name:'cake',
      mobile:true,
      use:function(){
        room4.description = "Upon entering the room, you hear a loud \'BANG\' as steel bars fall"+
          " covering the doorway you just came through. You see no other exit from the room."+
          " The table has the reminants of a cake on it, left over from your party for one."+
          " A note is on the table next to the cake.";
        return "You stuff your face in the cake. No one is around to enjoy this cake,"+
        " so you have a sad birthday party by yourself.";
      }
    },
    {
      name:'note',
      mobile:true,
      use:function(target){
        playing = false;
        return 'The note reads: Here is the cake as promised.\n'+
        " _____   ___  ___  ___ _____ \n"+
        "|  __ \\ / _ \\ |  \\/  ||  ___| \n"+
        "| |  \\// /_\\ \\| .  . || |__  \n"+
        "| | __ |  _  || |\\/| ||  __|  \n"+
        "| |_\\ \\| | | || |  | || |___ \n"+
        " \\____/\\_| |_/\\_|  |_/\\____/ \n"+
        "  _____  _   _ ___________ \n"+
        " |  _  || | | |  ___| ___ \\\n"+
        " | | | || | | | |__ | |_/ /\n"+
        " | | | || | | |  __||    /\n"+
        " \\ \\_/ /\\ \\_/ / |___| |\\ \\\n"+
        "  \\___/  \\___/\\____/\\_| \\_| \n";
      }
    }
  ];
