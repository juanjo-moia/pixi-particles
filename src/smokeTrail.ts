import * as particles from "@pixi/particle-emitter";
import { Container } from "pixi.js";

export const createSmokeTrail = (parentContainer: Container) => {
    const container = new Container();
    parentContainer.addChild(container);
    const emitter = new particles.Emitter(container, {
        emit: true,
        autoUpdate: true,
        lifetime: {
            min: 0.5,
            max: 0.7,
        },
        frequency: 0.01,
        // emitterLifetime: 0.15,
        maxParticles: 500,
        addAtBack: false,
        pos: {
            x: 400,
            y: 300,
        },
        behaviors: [
            {
                type: "alpha",
                config: {
                    alpha: {
                        list: [
                            {
                                time: 0,
                                value: 1,
                            },
                            {
                                time: 1,
                                value: 0,
                            },
                        ],
                    },
                },
            },
            {
                type: "moveSpeed",
                config: {
                    speed: {
                        list: [
                            {
                                time: 0,
                                value: 100,
                            },
                            {
                                time: 1,
                                value: 500,
                            },
                        ],
                    },
                },
            },
            {
                type: "scale",
                config: {
                    scale: {
                        list: [
                            {
                                time: 0,
                                value: 0.1,
                            },
                            {
                                time: 1,
                                value: 0.5,
                            },
                        ],
                    },
                    minMult: 1,
                },
            },
            {
                type: "rotation",
                config: {
                    accel: 0,
                    minSpeed: 10,
                    maxSpeed: 100,
                    minStart: 80,
                    maxStart: 100,
                },
            },
            {
                type: "textureRandom",
                config: {
                    textures: ["assets/CartoonSmoke.png"],
                },
            },
            {
                type: "spawnPoint",
                config: {},
            },
        ],
    });

    return emitter;
};
