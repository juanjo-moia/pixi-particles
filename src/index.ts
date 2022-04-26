import { Application, Container, Point } from "pixi.js";
import { Rocket } from "./rocket";
import { createSmoke } from "./smoke";
import { createSmokeTrail } from "./smokeTrail";

console.log("holi");

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const rocket = new Rocket(400, 600);
app.stage.addChild(rocket.sprite);
app.ticker.add((delta) => {
    rocket.onUpdate(delta);
});
setTimeout(() => {
    rocket.onEvent("Launch");
}, 2000);
setTimeout(() => {
    rocket.onEvent("LiftOff");
}, 4000);

// createSmoke(app.stage);
