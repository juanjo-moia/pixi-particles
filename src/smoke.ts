import * as particles from "@pixi/particle-emitter";
import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { Container } from "pixi.js";

const smokeCommon: EmitterConfigV3 = {
    emit: true,
    autoUpdate: true,
    lifetime: {
        min: 0.5,
        max: 0.7,
    },
    frequency: 0.1,
    // emitterLifetime: 0.15,
    maxParticles: 500,
    addAtBack: false,
    pos: {
        x: 400,
        y: 600,
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
                            value: 20,
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
};

export const createSmoke = (parentContainer: Container) => {
    const container = new Container();
    parentContainer.addChild(container);
    const emitters = [];
    emitters.push(
        new particles.Emitter(container, {
            ...smokeCommon,
            behaviors: [
                ...smokeCommon.behaviors,
                {
                    type: "rotation",
                    config: {
                        accel: 0,
                        minSpeed: 0,
                        maxSpeed: 1,
                        minStart: 180,
                        maxStart: 200,
                    },
                },
            ],
        }),
        new particles.Emitter(container, {
            ...smokeCommon,
            behaviors: [
                ...smokeCommon.behaviors,
                {
                    type: "rotation",
                    config: {
                        accel: 0,
                        minSpeed: 10,
                        maxSpeed: 100,
                        minStart: 0,
                        maxStart: -20,
                    },
                },
            ],
        })
    );
    return emitters;
};
