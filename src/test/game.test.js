import Game from '../game';

describe('Game', () => {
  let game;
  
  beforeEach(() => {
    document.body.innerHTML = '<div id="game-field"></div>';
    game = new Game(4);
  });

  test('поле 4 на 4', () => {
    const holes = document.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });

  test('создание гоблина', () => {
    expect(game.goblinElement).toBeInstanceOf(HTMLImageElement);
  });

  test('перемещение гоблина в рандомное место', () => {
    const initialPos = game.currentPosition;
    game.moveGoblin();
    expect(game.currentPosition).not.toBe(initialPos);
  });
});