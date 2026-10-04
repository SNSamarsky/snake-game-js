import { Canvas } from "./view/canvas.js";
import { Render } from "./view/render.js";
import { Field } from "./entities/field.js";
import { Snake } from "./entities/snake.js";
import { Food } from "./entities/food.js";
import { InputHandler } from "./services/input.js";
import { RecordService } from './services/storage.js';
import { Game } from "./core/game.js";


const ROOT_SELECTOR = "#root";

const field = new Field();
const snake = new Snake();
const food = new Food();
const canvas = new Canvas(ROOT_SELECTOR);
const render = new Render(canvas);
const inputHandler = new InputHandler(ROOT_SELECTOR);
const recordService = new RecordService();

const game = new Game(field, canvas, render, food, snake, inputHandler, recordService);

game.prepare();
