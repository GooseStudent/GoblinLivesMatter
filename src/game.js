import goblinImage from "./img/goblin.png";
import { gameConfig } from "./config";

export default class Game {
  constructor(fieldSize = gameConfig.fieldSize) {
    this.fieldSize = fieldSize;
    this.fieldElement = document.getElementById("game-field");
    this.currentPosition = -1;
    this.goblinElement = null;
    this.intervalId = null;
    this.isGameRunning = false;
    this.moveDelay = gameConfig.moveDelayMs;

    this.init();
  }

  init() {
    this.createField();
    this.createGoblin();
  }

  createField() {
    this.fieldElement.innerHTML = "";

    for (let i = 0; i < this.fieldSize * this.fieldSize; i += 1) {
      const hole = document.createElement("div");
      hole.className = "hole";
      hole.dataset.index = i;
      this.fieldElement.append(hole);
    }
  }

  createGoblin() {
    this.goblinElement = document.createElement("img");
    this.goblinElement.src = goblinImage;
    this.goblinElement.className = "goblin";
    this.goblinElement.alt = "Goblin";
    this.goblinElement.draggable = false;
  }

  placeGoblin(position) {
    const holes = this.fieldElement.querySelectorAll(".hole");

    if (position >= 0 && position < holes.length) {
      holes[position].append(this.goblinElement);
      this.currentPosition = position;
    }
  }

  getRandomPosition(excludePosition = -1) {
    const totalCells = this.fieldSize * this.fieldSize;
    let position;

    do {
      position = Math.floor(Math.random() * totalCells);
    } while (position === excludePosition);

    return position;
  }

  moveGoblin() {
    if (!this.isGameRunning) {
      return;
    }

    const newPosition = this.getRandomPosition(this.currentPosition);
    this.placeGoblin(newPosition);
  }

  start() {
    if (this.isGameRunning) {
      return;
    }

    this.isGameRunning = true;

    const startPosition = this.getRandomPosition();
    this.placeGoblin(startPosition);

    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, this.moveDelay);
  }

  stop() {
    this.isGameRunning = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}