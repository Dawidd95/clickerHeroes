//stworzenie obiektow, dziedziczneie prototypowe, funkcja prototypowa, funkcje strzalkowe, przejscie z funkcji do funkcji, przypisanie wartosci do elementu na stronie www
			
function PersonGame(name, gold, exp) {
	this.name = name;
	this.gold = gold;
	this.exp = exp;
}

function Hero(name, gold, exp, atk, lvl) {
	PersonGame.call(this, name, gold, exp);
	this.atk = atk;
	this.lvl = lvl;
}

Hero.prototype = Object.create(PersonGame.prototype);

Hero.prototype.intro = function() {
	alert("Jestem bohaterem "+this.name);
}

function Enemy(name, gold, exp, hp) {
	PersonGame.call(this, name, gold, exp);
	this.hp = hp;
}

Enemy.prototype = Object.create(PersonGame.prototype);

function EnemyBoss(name, gold, exp, hp, timer) {
	Enemy.call(this, name, gold, exp, hp);
	this.timer = timer;
}

EnemyBoss.prototype = Object.create(Enemy.prototype);

let akira = new Hero("Akira Kurosawa",0,0,1,1);
let ogr = new Enemy("Cave Ogr", 100, 25, 20);
let dragon = new EnemyBoss("Dragon", 500, 150, 1000, 10000);

document.querySelector(".stats__name").innerHTML = akira.name;
document.querySelector(".gold__value").innerHTML = akira.gold;
document.querySelector(".experience__value").innerHTML = akira.exp;
document.querySelector(".attack__value").innerHTML = akira.atk;
document.querySelector(".level__value").innerHTML = akira.lvl;
document.querySelector(".stats__monster-name").innerHTML = ogr.name;
document.querySelector(".stats__hp").innerHTML = ogr.hp;

let buy = document.querySelector(".hero-window__buy");
let monsterOgr = document.querySelector(".monster__img");
		
akira.intro();

monsterOgr.addEventListener("click", () => {
	attackMonster();
	checkMonsterHp(); 	
});

let attackMonster = () => {
	ogr.hp = ogr.hp - akira.atk;
	document.querySelector(".stats__hp").innerHTML = ogr.hp;
};

let checkMonsterHp = () => {
	if(ogr.hp < 1) {
		akira.exp = akira.exp + ogr.exp;
		akira.gold = akira.gold + ogr.gold;
		document.querySelector(".experience__value").innerHTML = akira.exp;
		document.querySelector(".gold__value").innerHTML = akira.gold;
		ogr.hp = 20;
		checkHeroExp();
	} 
};

let checkHeroExp = () => {
	if(akira.exp >= 250) {
		hidePrevMonster();
		showNewMonster();
	}
}

buy.addEventListener("click", () => {
	checkHeroGold();
})

let checkHeroGold = () => {
	if(akira.gold >= 300) {
		heroAtkUp();
		heroGoldCount();
	}
}

let heroAtkUp = () => {
	akira.atk = akira.atk + 1;
	document.querySelector(".attack__value").innerHTML = akira.atk;
}

let heroGoldCount = () => {
	akira.gold = akira.gold - 300;
	document.querySelector(".gold__value").innerHTML = akira.gold;
}