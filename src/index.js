import './styles.css';
import Game from './game';
import { gameConfig } from './config';

const game = new Game(gameConfig.fieldSize);
game.start();