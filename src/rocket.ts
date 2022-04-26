import { Emitter } from "@pixi/particle-emitter";
import { Sprite, Texture } from "pixi.js";
import { createSmoke } from "./smoke";
import { createSmokeTrail } from "./smokeTrail";

export class Rocket {
    sprite: Sprite;
    state: WaitingForLaunchState | LaunchingState | FlyingState;

    constructor(x: number, y: number) {
        this.sprite = Sprite.from("assets/rocket_waiting_for_launch.png");
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 25;
        this.sprite.height = 50;
        this.sprite.anchor.set(0.5, 1);
        this.state = new WaitingForLaunchState(this);
    }

    onUpdate(dt: number) {
        this.state = this.state.update(dt);
    }

    onEvent(event: string) {
        this.state = this.state.onEvent(event);
    }
}

class WaitingForLaunchState {
    rocket: Rocket;

    constructor(rocket: Rocket) {
        this.rocket = rocket;
    }

    update(dt: number): WaitingForLaunchState | LaunchingState {
        return this;
    }

    onEvent(event: string): WaitingForLaunchState | LaunchingState {
        console.log(`WaitingForLaunchState - onEvent(${event})`);
        if (event === "Launch") {
            this.onExit();
            return new LaunchingState(this.rocket);
        }

        return this;
    }

    onEnter(): void {
        console.log("WaitingForLaunchState - onEnter()");
    }

    onExit(): void {
        console.log("WaitingForLaunchState - onExit()");
    }
}

class LaunchingState {
    rocket: Rocket;
    smoke?: Emitter[];

    constructor(rocket: Rocket) {
        this.rocket = rocket;
        this.onEnter();
    }

    update(dt: number): LaunchingState {
        const diceThrow = Math.random() >= 0.5;
        if (diceThrow) {
            this.rocket.sprite.x += 0.3 * dt;
        } else {
            this.rocket.sprite.x -= 0.3 * dt;
        }
        return this;
    }

    onEvent(event: string): LaunchingState {
        console.log(`LaunchingState - onEvent(${event})`);
        if (event === "LiftOff") {
            this.onExit();
            return new FlyingState(this.rocket);
        }

        return this;
    }

    onEnter(): void {
        console.log("LaunchingState - onEnter()");
        this.rocket.sprite.texture = Texture.from(
            "assets/rocket_launching.png"
        );
        this.smoke = createSmoke(this.rocket.sprite.parent);
    }

    onExit(): void {
        console.log("LaunchingState - onExit()");
        this.smoke?.map((s) => (s.emit = false));
    }
}

class FlyingState {
    rocket: Rocket;
    trail?: Emitter;

    constructor(rocket: Rocket) {
        this.rocket = rocket;
        this.onEnter();
    }

    update(dt: number): FlyingState {
        this.rocket.sprite.y -= 0.3 * dt;
        this.trail?.updateSpawnPos(this.rocket.sprite.x, this.rocket.sprite.y);
        return this;
    }

    onEvent(event: string): FlyingState {
        console.log(`FlyingState - onEvent(${event})`);
        return this;
    }

    onEnter(): void {
        console.log("FlyingState - onEnter()");
        this.rocket.sprite.texture = Texture.from("assets/rocket_flying.png");
        this.trail = createSmokeTrail(this.rocket.sprite.parent);
    }

    onExit(): void {
        console.log("FlyingState - onExit()");
    }
}
