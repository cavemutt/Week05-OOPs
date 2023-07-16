// The unsung battle for Middle Earth has begun! 
// The story... 
// You are the leader of a small village, one that is unique in that it's residents are unusually diverse.
// Humans, elves, and ogres all living in cooperation and beneficial harmony with the land. This small village is hardly known of by other occupants of Middle Earth, and you like it that way. For generations, only peace has reigned within it's boundaries, until one day... 
//  A roaming hoard of orcs sees a village, one they were not expecting to see, but were more than eager to steal whatever food and treasures they could find while satisfying their delight in shedding blood... 
// Many of the villagers have travelled to learn about the world, about fighting and magic, sharing their knowledge upon their return. As their leader, you must select a team to be the front line in the fight against these vicious invaders... 


// Character class as starting point for all characters 
// name, race, starting stats, weapon method type stats(magic, blade, club, bow), attack method 
// subclass Orcs with speed, power, stats randomize within orc range 
// subclass for humans, elves and ogres with their own randomized race-appropriate stats
// class for team selection 
// class for menu interface and battle 
// use name generator api(?)

// orc/human/elf/ogre speed, power plus viciousness/hope/luck/bruteForce plus weapon type if suited to race dexterity/intelligence 
// orc(club best, sword ok, magic minus, bow minus)
// human(blade best, bow better, club ok, magic ok)
// elf(magic best, bow better, blade ok, club minus)
// ogre(club best, sword meh, bow minus, magic minus)
// return stats

class Character {
    constructor(name, race, weapon) {
        this.name = name;
        this.race = race;
        this.weapon = weapon;
        this.attackStat = 0;
        this.characterStats = []
    }
    generateStats() {
        let power = 0;
        let speed = 0;
        let weaponStat = 0;
        let race = this.race;
        let weapon = this.weapon;
        let randomizer = (min, max) => Math.floor((Math.random() * (max - min)) + min)
        
        switch(race) {
            case "orc":
                power = randomizer(6, 11)
                speed = randomizer(5, 10)
                if(weapon == "club") {
                    weaponStat = 6
                } else if(weapon == "blade") {
                    weaponStat = 4
                } else if(weapon == "magic spell") {
                    weaponStat = 2
                } else if(weapon == "bow") {
                    weaponStat = 1
                } else {
                    console.error('You did not enter a valid weapon')
                }
                break;
            case "human":
                power = randomizer(8, 11)
                speed = randomizer(7, 10)
                if(weapon === "club") {
                    weaponStat = 3
                } else if(weapon === "blade") {
                    weaponStat = 6
                } else if(weapon === "magic spell") {
                    weaponStat = 1
                } else if(weapon === "bow"){
                    weaponStat = 4
                } else {
                    console.error('You did not enter a valid weapon')
                }
                break;
            case "elf":
                power = randomizer(5, 8)
                speed = randomizer(10, 14)
                if(weapon === "club") {
                    weaponStat = 1
                } else if(weapon === "blade") {
                    weaponStat = 3
                } else if(weapon === "magic spell") {
                    weaponStat = 5
                } else if(weapon === "bow") {
                    weaponStat = 6
                } else {
                    console.error('You did not enter a valid weapon')
                }
                break;
            case "ogre":
                power = randomizer(10, 14)
                speed = randomizer(4, 6)
                if(weapon === "club") {
                    weaponStat = 6
                } else if(weapon === "blade") {
                    weaponStat = 4
                } else if(weapon === "magic spell") {
                    weaponStat = 2
                } else if(weapon === "bow") {
                    weaponStat = 1
                } else {
                    console.error('You did not enter a valid weapon')
                }
                break;
            default: 
                console.error('You did not enter a valid race')
                break;
        }       
        this.characterStats.push(power, speed, weaponStat)
        return this.characterStats
    }
    calculateAttackStat() {       
        this.attackStat = this.characterStats[0] + this.characterStats[1] + this.characterStats[2]
        return this.attackStat
    }
    describe() { 
        this.generateStats()
        this.calculateAttackStat()
        return `The ${this.race} ${this.name} wields a ${this.weapon}. ${'\n'}~~ Stats ~~ ${'\n'}Power: ${this.characterStats[0]}${'\n'}Speed: ${this.characterStats[1]}${'\n'}Weapon adds: ${this.characterStats[2]}`
    }
}

class Orc extends Character {
    constructor(name, race, weapon) {
        super(name, race, weapon);
        this.viciousness = 0;
    }
    generateViciousness() {
        this.viciousness = Math.floor((Math.random() * 10) + 3)
        return this.viciousness;
    }
    totalAttackStat() {
        return this.attackStat + this.viciousness
    }
    describe() {
        return `${super.describe()}${'\n'}Viciousness: ${this.generateViciousness()}${'\n'}for a total attack of: ${this.totalAttackStat()}`
    }
} 

class Human extends Character {
    constructor(name, race, weapon) {
        super(name, race, weapon);
        this.hope = 0
    }
    generateHope() {
        this.hope = Math.floor((Math.random() * 10) + 3)
        return this.hope;
    }
    totalAttackStat() {
        return this.attackStat + this.hope
    }
    describe() {
        return `${super.describe()}${'\n'}Hope: ${this.generateHope()}${'\n'}for a total attack of: ${this.totalAttackStat()}`
    }
}

class Elf extends Character {
    constructor(name, race, weapon) {
        super(name, race, weapon);
        this.luck = 0
    }
    generateLuck() {
        this.luck = Math.floor((Math.random() * 10) + 3)
        return this.luck;
    }
    totalAttackStat() {
        return this.attackStat + this.luck
    }
    describe() {
        return `${super.describe()}${'\n'}Luck: ${this.generateLuck()}${'\n'}for a total attack of: ${this.totalAttackStat()}`
    }
}

class Ogre extends Character {
    constructor(name, race, weapon) {
        super(name, race, weapon);
        this.bruteForce = 0
    }
    generateBruteForce() {
        this.bruteForce = Math.floor((Math.random() * 10) + 5)
        return this.bruteForce;
    }
    totalAttackStat() {
        return this.attackStat + this.bruteForce
    }
    describe() {
        return `${super.describe()}${'\n'}Brute Force: ${this.generateBruteForce()}${'\n'}for a total attack of: ${this.totalAttackStat()}`
    }
}

class BattleTeam {
    constructor(name) {
        this.name = name;
        this.characters = [];
        this.teamLength = 0;
        this.teamTotal = 0;
    }
    addWarrior(character) {
        if(character instanceof Character) {
            this.characters.push(character);
            this.teamLength++
        } else {
            throw new Error(`You can only add an instance of Character. Argument is not a character: ${character}.`);
        }
    }
    teamTotalStat() {
        let teamTotal = this.teamTotal
        this.characters.forEach(character => teamTotal += character.totalAttackStat())
        return teamTotal
    }
    describe() {
        if(this.characters.length < 3) {
            return `The Hero Team ${this.name} has ${this.characters.length} warrior(s), please add ${3 - this.characters.length} more member(s).`;
        } else {
            return `The ${this.name} battle team has ${this.characters.length} warriors ready!`;
        }
    }
}

class Menu {
    constructor() {
        this.battleTeams = [];
        this.heroTeamTotal = 0;
    }

    start() {
        alert(`An unsung battle for Middle Earth has begun! 
        The story... 
        You are the leader of a small village, one that is unique in that it's residents are unusually diverse.
        Here, humans, elves, and ogres all live in cooperation and beneficial harmony with each other and the land. This small village is hardly known of by other occupants of Middle Earth, and you like it that way. 
        For generations, only peace has reigned within it's boundaries, until one day... 
        
        A roaming hoard of orcs sees a village, one they were not expecting to see, but were more than eager to steal whatever food and treasures they could find while satisfying their delight in shedding blood... 
        
        Many of the villagers have travelled to learn about the world and about fighting, weapons and magic, sharing their knowledge upon their return. As their leader, you must select a team to be the front line in the fight against these vicious invaders...`)
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch(selection) {
                case '1':
                    this.createHeroTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.viewInvaderTeam();
                    break;
                case '4':
                    this.initiateAttack();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye')
    }
    showMainMenuOptions() {
        return prompt(`
        0) exit 
        1) create your Hero Team 
        2) view Hero Team 
        3) view Invader Team       
        4) initiate attack! 
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
        *note: team stats will change depending on how well they are working together*
        0) back
        1) create Warrior 
        2) delete Warrior
        ---------------- 
        ${teamInfo}
    `);
    }
    
    displayTeams() {
        let teamString = '';
        for(let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createHeroTeam() {
        if(this.battleTeams.length === 0 && this.battleTeams.length < 2) {
                    let name = prompt('Enter name for your Hero team: ');
                    this.battleTeams.push(new BattleTeam(name));
        } else { alert('Your Hero Team is already created!')}
    }
    createInvaderTeam() {
        this.battleTeams.push(new BattleTeam("Orc Invaders"))
    }
    addToInvaderTeam() {
        let name = ["Derek", "Brad", "Britney", "Madyson", "Bryan", "Donny", "Elon"]
        let orcWeapon = ["club", "blade", "bow", "magic spell"]
        let orc1 = this.battleTeams[1].addWarrior(new Orc(name[Math.floor(Math.random()*7)], "orc", orcWeapon[Math.floor(Math.random()*4)]))
        let orc2 = this.battleTeams[1].addWarrior(new Orc(name[Math.floor(Math.random()*7)], "orc", orcWeapon[Math.floor(Math.random()*4)]))
        let orc3 = this.battleTeams[1].addWarrior(new Orc(name[Math.floor(Math.random()*7)], "orc", orcWeapon[Math.floor(Math.random()*4)]))
    }
    viewInvaderTeam() {
        if(this.battleTeams.length <= 0) {
            alert('Please create your Hero Team first!')
            this.showMainMenuOptions()
        } else if(this.battleTeams.length === 1) {
            this.createInvaderTeam()
            this.addToInvaderTeam()
            alert(`The Orc Invaders has 3 warriors ready for battle!
            ${this.battleTeams[1].characters[0].describe()}
            ${this.battleTeams[1].characters[1].describe()}
            ${this.battleTeams[1].characters[2].describe()}
            for a total Invader force of ${this.battleTeams[1].teamTotalStat()}`)
        } else {
            alert(`The Orc Invaders has 3 warriors ready for battle!
            ${this.battleTeams[1].characters[0].describe()}
            ${this.battleTeams[1].characters[1].describe()}
            ${this.battleTeams[1].characters[2].describe()}
            for a total Invader force of ${this.battleTeams[1].teamTotalStat()}
            *note: team stats will change depending on how well they are working together*`)
        }
    }

    viewTeam() {
        if(this.battleTeams.length === 0) {
            alert('Please create your Hero Team first!')
            this.showMainMenuOptions()
        }
        let description = this.battleTeams[0].describe()
        let selection = this.showTeamMenuOptions(description);
        switch(selection) {
            case '1':
                this.createWarrior();
                break;
            case '2':
                this.deleteWarrior();
        }
    }


    createWarrior() {
        if(this.battleTeams[0].teamLength === 3) {
            alert('This battle team has 3 members and is ready for battle!')
        } else {
            let name = prompt('Enter name for new warrior: ');
            let race = prompt(`Is ${name} a 'human', 'elf' or 'ogre'? : `);
            race = ["human", "elf", "ogre"].includes(race.toLowerCase()) ? race.toLowerCase() : alert('Please enter a valid race, warrior will not be created')
            let weapon = prompt(`Will ${name} use 'club', 'blade', 'bow' or 'magic spell'?${'\n'}(hint: choose a weapon most suitable to the character for a stronger attack): `)
            weapon = ["club", "blade", "bow", "magic spell"].includes(weapon.toLowerCase()) ? weapon.toLowerCase() : alert('You did not enter a valid weapon, you may delete warrior and try again')
            switch(race) {
                case "human":
                    this.battleTeams[0].addWarrior(new Human(name, race, weapon));
                    break;
                case "elf" :
                    this.battleTeams[0].addWarrior(new Elf(name, race, weapon));
                    break;
                case "ogre" :
                    this.battleTeams[0].addWarrior(new Ogre(name, race, weapon));
                    break;
                default: 
                    alert('Please enter a valid race.')
            }
        }
        let heroTeamTotal = this.heroTeamTotal
        let description = 'Team name: ' + this.battleTeams[0].name + '\n';
        description += ' ' + this.battleTeams[0].describe() + '\n';
        for(let i = 0; i < this.battleTeams[0].characters.length; i++) {
            description += i + ') ' + this.battleTeams[0].characters[i].describe() + '\n';
            heroTeamTotal += this.battleTeams[0].characters[i].totalAttackStat() 
        }
        description += `for a team total attack force of ${heroTeamTotal}!`
        let selection = this.showTeamMenuOptions(description)
        switch(selection) {
            case '1':
                this.createWarrior();
                break;
            case '2':
                this.deleteWarrior();
        } 
    }

    deleteWarrior() {
        if(this.battleTeams[0].characters.length === 0) {
            alert('There are no members to delete')
        } else {
            let index = prompt('Enter the index of the warrior you wish to delete: ')
            if(index > -1 && index < this.battleTeams[0].characters.length) {
                this.battleTeams[0].characters.splice(index, 1);
                this.battleTeams[0].teamLength--
            }
        }
        let description = 'Team name: ' + this.battleTeams[0].name + '\n';
        description += ' ' + this.battleTeams[0].describe() + '\n';
        for(let i = 0; i < this.battleTeams[0].characters.length; i++) {
            description += i + ') ' + this.battleTeams[0].characters[i].describe() + '\n'; 
        }
        let selection = this.showTeamMenuOptions(description)
        switch(selection) {
            case '1':
                this.createWarrior();
                break;
            case '2':
                this.deleteWarrior();
        } 
    }

    initiateAttack() {
        if(this.battleTeams.length < 2 || this.battleTeams[0].characters.length < 3) {
            alert("Teams are not ready, please view both teams")
            this.showMainMenuOptions()
        } else {
            let invaderStat = this.battleTeams[1].teamTotalStat()
            let heroStat = this.battleTeams[0].teamTotalStat()
            let winner = invaderStat > heroStat ? this.battleTeams[1].name : this.battleTeams[0].name
            alert(`The Orc Invaders attack with a force of ${invaderStat}!
            The Hero Team ${this.battleTeams[0].name} attacks with a force of ${heroStat}!
            The winner of this battle is ${winner}!`)
        }
    }
}

let menu = new Menu();
menu.start()
