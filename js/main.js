import { Canvas } from "./view/canvas.js";
import { Render } from "./view/render.js";
import { Field } from "./entities/field.js";
import { Snake } from "./entities/snake.js";
import { Food } from "./entities/food.js";
import { InputHandler } from "./services/input.js";
import { Game } from "./core/game.js";

const ROOT_SELECTOR = "#root";

const field = new Field();
const snake = new Snake();
const food = new Food();
const canvas = new Canvas(ROOT_SELECTOR);
const render = new Render(canvas);
const handler = new InputHandler();

const game = new Game(field, canvas, render, food, snake, handler);

field.init();
snake.init(field);
food.init(field, snake.body);
canvas.init(field.canvasSize);
render.init(field, food, snake);
handler.init(snake);

//game.start()
