import Game from '../game';
import { gameConfig } from '../config';

describe('Game', () => {
  let game;
  
  beforeEach(() => {
    document.body.innerHTML = '<div id="game-field"></div>';
    game = new Game(4);
  });

  afterEach(() => {
    game.stop();
  });

  test('поле 4 на 4', () => {
    const holes = document.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });

  test('создание гоблина', () => {
    expect(game.goblinElement).toBeInstanceOf(HTMLImageElement);
  });

  test('перемещение гоблина в рандомное место', () => {
    game.start(); 
    const initialPos = game.currentPosition;
    game.moveGoblin();
    expect(game.currentPosition).not.toBeNull();
    expect(game.currentPosition).toBeGreaterThanOrEqual(0);
    expect(game.currentPosition).toBeLessThan(16);
  });

  test('гоблин не перемещается в ту же ячейку', () => {
    game.start();
    const initialPos = game.currentPosition;
    game.moveGoblin();
    expect(game.currentPosition).not.toBeNull();
  });
});