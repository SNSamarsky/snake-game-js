import { Canvas } from "./view/canvas.js";
import { Render } from "./view/render.js";
import { Field } from "./entities/field.js";
import { Food } from "./entities/food.js";

const ROOT_SELECTOR = "#root";

const field = new Field();
const food = new Food();
const canvas = new Canvas(ROOT_SELECTOR);
const render = new Render(canvas);

field.init();
food.init(field)
canvas.init(field.canvasSize);
render.init(field, food);