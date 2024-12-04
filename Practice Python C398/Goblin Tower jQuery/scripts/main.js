// powershell command to start website: Start-process C:\Users\dhunnicut\Documents\html-js\GoblinTower\home.html

var character = {
  Name: 'Bob',
  Race: 'Human',
  Class: 'Warrior',
  maxHealth:30,
  currentHealth:30,
  Gold: 200,
  steps:0,
  potions:10,
  Level: 0
};

var potionRestoreHealth = 3;
var encounterChance = 20;
var encounterStore = 3;
var goblinDamage = 1;
var potionCost = 10;
var goblinGold = 5;
var heroTurn = true;
var meleeCount = 0;
var heroTurnMsg = "Hero: ";
var goblinTurnMsg = "Goblin: ";
var goblinHealth = 0;
var heroHealth = 0;
var goblinPresent = false;

// Goblin stats:
// health  min=5, max=10
// attack  min=2, max=3
// defense min=1, max=2
// Math.floor(Math.random() * (max - min + 1) + min)

var goblin = {
  health: 5
}

function createGoblin() {
  goblin.health = Math.floor(Math.random() * (10 - 5 + 1) + 5)
}

function refreshCharacterInfo(){
  character.Level = Math.floor(character.steps/10);
  $("#goblinCharacter").css('margin-top', 600-(64 * (character.Level+1)));

  $("#level").text(character.Level);
  $("#steps").text(character.steps % 10);
  $("#currentHealth").text(character.currentHealth );
  $("#potions").text(character.potions );
  $("#gold").text(character.Gold );
}

function refreshGoblinHealthInfo() {
  $("#postedGoblinHealth").text("Goblin Health: " + goblin.health);
}

function onStepClick(event){
  event.preventDefault();
  $(".goblin").hide();
  $("#buyPotionbtn").hide();
  var encounter = Math.floor(Math.random() * 100) + 1;
  character.steps++;
  $("#message").prepend("<p><em>You've taken a step</em></p>");
  
  if(goblinPresent) {
    // if goblin present and you keep stepping you loose health.
    character.currentHealth -= 1;
  }  
  if(encounter < encounterChance){
    $(".goblin").show();
    $("#fightGoblinBtn").show();
    $("#message").prepend("<p><strong>You've encountered a goblin!</strong></p>");
    createGoblin();  //create goblin if you encounter one. 
    $("#postedGoblinHealth").text("Goblin Health: " + goblin.health);
    whoGoesFirst(); //determine who goes first in the attack
    goblinPresent = true;
  }

  if(character.currentHealth <= 0){
    $("#stepForward").hide();
  }
 
  if(character.steps % encounterStore == 0  && character.Gold >= 10){
    $("#buyPotionbtn").show();
  }

  refreshCharacterInfo();
}

function onBuyPotionClick(event){
  event.preventDefault();
  if(character.Gold >= potionCost){
    character.Gold-=potionCost;
    character.potions++;
    $("#message").prepend("<p><em>You've bought a potion</em></p>");
    $("#drinkPotionBtn").show();
  }
  if(character.Gold <= 10){
    $("#buyPotionbtn").hide();
  }
  
  refreshCharacterInfo();
}

function onDrinkPotionClick(event){
  event.preventDefault();
  if(character.potions > 0){
    character.potions--;
    if(character.currentHealth + 2 > character.maxHealth){
      character.currentHealth = character.maxHealth;
    }else{
      character.currentHealth = character.currentHealth + 2;
    }
  }
  if(character.potions <= 0){
    $("#drinkPotionBtn").hide();
  }
  refreshCharacterInfo();
}

// Math.floor(Math.random() * (max - min + 1) + min)
function heroAttack() {
  // Attack min=1, max=3
  return Math.floor(Math.random() * (3 - 1 + 1) + 1);
}

function heroDefense() {
  // Defense min=1, max=5
  return Math.floor(Math.random() * (5 - 1 + 1) + 1);
}

function goblinAttack() {
  // Attack min=2, max=3
  return Math.floor(Math.random() * (3 - 2 + 1) + 2);
}

function goblinDefense() {
  // Defense min=1, max=2
  return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}

function calcDamage(atk, def) {
  // Calculate the damage
  if (atk > def){
    return atk - def;
  } else {
    return 0;
  }
}

function whoGoesFirst() {
  // Determines who gets the first attack
  var whoStarts = Math.floor(Math.random() * (2) + 1);
  if (whoStarts == 1) {
    // hero gets first attack
    $("#message").prepend("<p><em>You spotted your enemy first and swing your sword!</em></p>");
  } else {
    $("#message").prepend("<p><em>The goblin surprises you and attacks!</em></p>");
  }
  // post goblin health to webpage

}

function MeleeMsg() {
  if(heroTurn) {
    return heroTurnMsg;
  } else {
    return goblinTurnMsg;
  }
}

function onFightGoblinClick(event){
  // fight to the death!

  heroHealth = character.currentHealth;
  goblinHealth = goblin.health;
   
  if (heroTurn) {
    damage = calcDamage(heroAttack(), goblinDefense());
    goblinHealth -= damage;
    goblin.health = goblinHealth;
    $("#postedGoblinHealth").text("Goblin Health: " + goblin.health); 
  } else {
    damage = calcDamage(goblinAttack(), heroDefense());
    heroHealth -= damage;
    character.currentHealth = heroHealth;
    refreshCharacterInfo();
  }

  switch (damage){
    case 0:
      $("#message").prepend("<p><em>" + MeleeMsg() + "Miss!</em></p>");
      break;
    case 1:
      $("#message").prepend("<p><em>" + MeleeMsg() + "Just a nick!</em></p>");
      break;
    case 2:
      $("#message").prepend("<p><em>" + MeleeMsg() + "Good hit!</em></p>");
      break;
    case 3:
      $("#message").prepend("<p><em>" + MeleeMsg() + "devastating blow!</em></p>");
      break;
  }
  
  heroTurn = !heroTurn;

  if(heroHealth > 0 && goblinHealth <= 0) {
    $("#message").prepend("<p><em>Congratulations, you killed a goblin!</em></p>");
    $("#message").prepend("<p><em>You received some gold!</em></p>");
    character.Gold += Math.floor(Math.random() * (20 - 5 + 1) + 5);
    character.currentHealth = heroHealth;
    $("#fightGoblinBtn").hide(); //no more fighting
    $(".goblin").hide();
    refreshCharacterInfo();
    $("#postedGoblinHealth").text("Goblin Health: " + 0);
  }

  if(heroHealth <= 0 && goblinHealth > 0) {
    $("#message").prepend("<p><em>You have died!</em></p>");
    character.currentHealth = heroHealth;
    $("#fightGoblinBtn").hide(); //no more fighting
    $("#stepForward").hide();
    $(".goblin").hide();
    refreshCharacterInfo();
  }
}

function onRenameHeroClick(event){
  var nameAddOn = [" the Great", " the Happy", " the Strong", " the Brave", " the Lucky", 
  " the Wise", " the Powerful", " the Peaceful"];  
  
  $("#Name").text(prompt("What is your hero's name?") + 
    nameAddOn[Math.floor(Math.random()*nameAddOn.length)]);
    DisplayStartBtns();
}

function hideAllBtns() {
  $(".goblin").hide();
  $("#buyPotionbtn").hide();
  $("#drinkPotionBtn").hide();
  $("#fightGoblinBtn").hide();
  $("#startOverBtn").hide();
}

function DisplayStartBtns() {
  $(".goblin").hide();
  $("#buyPotionbtn").show();
  $("#drinkPotionBtn").hide();
  $("#fightGoblinBtn").hide();
  $("#startOverBtn").hide();
}

$(document).ready(function(){
  DisplayStartBtns();
  $("#Name").text(character.Name);
  $("#Race").text(character.Race);
  $("#Class").text(character.Class);
  $("#currentHealth").text(character.currentHealth);
  $("#maxHealth").text(character.maxHealth);
  $(document).on('click','#stepForward',onStepClick);
  $(document).on('click','#buyPotionbtn',onBuyPotionClick);
  $(document).on('click','#drinkPotionBtn',onDrinkPotionClick);
  $(document).on('click','#fightGoblinBtn',onFightGoblinClick);
  $(document).on('click','#renameHeroBtn',onRenameHeroClick);
  console.log(character.Name);
  console.log("something happened here.");
});