const Dinosaur = require("./dinosaur");

const Park = function(name, ticketPrice) {
    this.name = name;
    this.ticketPrice = ticketPrice;
    this.dinosaurs = [];

}

Park.prototype.addToDinosaurs = function(dinosaur) {
    this.dinosaurs.push(dinosaur);
}

Park.prototype.removeDinosaur = function(dinosaur) {
    for (let dino of this.dinosaurs) {
        if (dino === dinosaur) {
            this.dinosaurs.splice(this.dinosaurs.indexOf(dino, 1));
        }
    }
}

Park.prototype.findMostPopularDinosaur = function() {
    let greatestNumberOfVisitors = 0;
    let mostPopularDinosaur;
    for (let dino of this.dinosaurs) {
        if (dino.guestsAttractedPerDay > greatestNumberOfVisitors) {
            greatestNumberOfVisitors = dino.guestAttractedPerDay;
            mostPopularDinosaur = dino;
        }
    }
    return mostPopularDinosaur.species
}

Park.prototype.findAllOfParticularSpecies = function(species) {
    let dinosaursOfSpecies = [];
    for (let dino of this.dinosaurs) {
        if (dino.species === species) {
            dinosaursOfSpecies.push(dino)
        }
    }
    return dinosaursOfSpecies;
}

Park.prototype.calculateDailyVisitors = function() {
    totalDailyVisitors = 0;
    for (let dino of this.dinosaurs) {
        totalDailyVisitors += dino.guestsAttractedPerDay;
    }
    return totalDailyVisitors;
}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Park.prototype.calculateAnnualVisitors = function(year) {
    if (leapYear(year)) {
        return 366 * this.calculateDailyVisitors();
    } else {
        return 365 * this.calculateDailyVisitors();
    }
}

Park.prototype.calculateAnnualRevenue = function(year) {
    return this.calculateAnnualVisitors(year) * this.ticketPrice;
}

Park.prototype.removeAllDinosaursBySpecies = function(species) {
    let dinosaursOfSpecies = this.findAllOfParticularSpecies(species);
    let remainingDinosaurs = [];
    for (let dino of this.dinosaurs) {
        if (!dinosaursOfSpecies.includes(dino)) {
            remainingDinosaurs.push(dino);
        }
    }
    this.dinosaurs = remainingDinosaurs;
}

Park.prototype.findNumberOfDinosaursByDietType = function() {
    let dietTypeFrequencies = {};
    for (let dino of this.dinosaurs) {
        if (dino.diet in dietTypeFrequencies){
            dietTypeFrequencies[dino.diet] += 1;
        } else {
            dietTypeFrequencies[dino.diet] = 1;
        }
    }
    return dietTypeFrequencies;
}

module.exports = Park;