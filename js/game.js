const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class Card {
  constructor(suit, number) {
    this.suit = suits[suit];
    this.number = numbers[number];
    this.value = this.getPoint(number);
  }

  getPoint(number) {
    let value = 0;
    if (number === 0) {
      value = 11;
    } else if (number >= 10) {
      value = 10;
    } else {
      value = number + 1;
    }
    return value;
  }
}

class DeckOfCards {
  constructor() {
    this.allCards = [];

    for (let suit = 0; suit < 4; suit++) {
      for (let number = 0; number < 13; number++) {
        let card = new Card(suit, number);
        this.allCards.push(card);
      }
    }

    let temp = [];
    while (this.allCards.length > 0) {
      let randomNum = Math.floor(Math.random() * this.allCards.length);
      temp.push(this.allCards[randomNum]);
      this.allCards.splice(randomNum, 1);
    }
    this.allCards = temp;
  }

  getACard() {
    return this.allCards.shift();
  }
}

class Person {
  constructor() {
    this.cards = [];
    this.values = 0;
    this.numOfCards = 0;
    this.aces = 0;
    this.faces = 0;
    this.bj = false;
  }

  addACard(card) {
    this.cards.push(card);
    this.numOfCards += 1;
    this.values += this.addPoint(card);
    this.aces += this.haveAce(card.number);
    this.faces += this.haveFace(card.value);
    this.bj = this.isBJ();
  }

  addPoint(card) {
    if (card.number === "A" && this.aces > 1) {
      return 1;
    } else {
      return card.value;
    }
  }

  haveAce(number) {
    if (number === "A") {
      return 1;
    }
    return 0;
  }

  haveFace(value) {
    if (value === 10) {
      return 1;
    }
    return 0;
  }

  isBJ() {
    if (this.value === 21) return this.aces === 1 && this.faces === 1;
  }
}

// set deck of cards
let cards = new DeckOfCards();
