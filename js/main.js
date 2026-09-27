import { Canvas } from "./view/canvas.js";
import { Render } from "./view/render.js";
import { Field } from "./entities/field.js";

const ROOT_SELECTOR = "#root";

const field = new Field();
const canvas = new Canvas(ROOT_SELECTOR);
const render = new Render(canvas);

field.init();
canvas.init(field.canvasSize);
render.init(field);