const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  let park;
  let dinosaur1;
  let dinosaur2;
  let dinosaur3;
  let dinosaur4;
  let dinosaur5;
  let dinosaur6;
  let dinosaur7;
  let dinosaur8;

  beforeEach(function () {
    dinosaur1 = new Dinosaur('t-rex', 'carnivore', 500);
    dinosaur2 = new Dinosaur('diplodocus', 'herbivore', 300);
    dinosaur3 = new Dinosaur('triceratops', 'herbivore', 250);
    dinosaur4 = new Dinosaur('velociraptor', 'carnivore', 200);
    dinosaur5 = new Dinosaur('velociraptor', 'carnivore', 200);
    dinosaur6 = new Dinosaur('velociraptor', 'carnivore', 200);
    dinosaur7 = new Dinosaur('velociraptor', 'carnivore', 200);
    dinosaur8 = new Dinosaur('oviraptor', 'omnivore', 85)
    dinosaurs = [dinosaur1, dinosaur2, dinosaur3, dinosaur4, dinosaur5, dinosaur6, dinosaur7]
    park = new Park('Jurassic Park', 25);
  })

  it('should have a name', function() {
    assert.strictEqual(park.name, 'Jurassic Park');
  });

  it('should have a ticket price', function() {
    assert.strictEqual(park.ticketPrice, 25);
  });

  it('should have a collection of dinosaurs', function() {
    park.dinosaurs = [dinosaur1, dinosaur2, dinosaur3, dinosaur4];
    assert.deepStrictEqual(park.dinosaurs, [dinosaur1, dinosaur2, dinosaur3, dinosaur4]);
  });

  it('should be able to add a dinosaur to its collection', function() {
    park.addToDinosaurs(dinosaur1);
    assert.deepStrictEqual(park.dinosaurs, [dinosaur1]);
  });

  it('should be able to remove a dinosaur from its collection', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    park.removeDinosaur(dinosaur1);
    assert.strictEqual(park.dinosaurs.length, 6);
  });

  it('should be able to find the dinosaur that attracts the most visitors', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.strictEqual(park.findMostPopularDinosaur(), 't-rex');
  });

  it('should be able to find all dinosaurs of a particular species', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.deepStrictEqual(park.findAllOfParticularSpecies('velociraptor'), [dinosaur4, dinosaur5, dinosaur6, dinosaur7]);
  });

  it('should be able to calculate the total number of visitors per day', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.strictEqual(park.calculateDailyVisitors(), 1850)
  });

  it('should be able to calculate the total number of visitors per year', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.strictEqual(park.calculateAnnualVisitors(2021), 675250)
  });

  it('should be able to calculate the total number of visitors in a leap year', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.strictEqual(park.calculateAnnualVisitors(2020), 677100)
  });

  it('should be able to calculate total revenue for one year', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    assert.strictEqual(park.calculateAnnualRevenue(2021), 16881250)
  });

  it('should be able to remove all dinosaurs of a particular species', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    park.removeAllDinosaursBySpecies('velociraptor');
    assert.strictEqual(park.dinosaurs.length, 3);
  });

  it('should be able to find number of dinosaurs of each diet type', function() {
    for (let dinosaur of dinosaurs) {
      park.addToDinosaurs(dinosaur);
    }
    park.addToDinosaurs(dinosaur8)
    assert.deepStrictEqual(park.findNumberOfDinosaursByDietType(), {'carnivore': 5, 'herbivore': 2, 'omnivore': 1})
  });

});
