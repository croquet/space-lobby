// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "1", "2", "3", "4", "5", "6"
    ];

    Constants.UserBehaviorDirectory = "behaviors/default";
    Constants.UserBehaviorModules = [
        "lights.js", "audio.js", "simpleSpin.js","door.js", "bloompass.js","dust.js", "glowingText.js", "worldRevolve.js"//"buttonLight.js", //,"openPortal.js"
    ];
    Constants.UseRapier = true;

    // const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_4.zip",
                dataScale:[2,2,2], //[2,2,2]
                //singleSided: true,
                behaviorModules:["WorldPawn", "FooMenu"],//["BloomPass","WorldPawn"],
                shadow: true,
                layers: ["walk"],
                translation:[0, 0, 0],

                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, 0, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/starmap_random_2020_4k.exr",
                //rotation:[0,0,Math.PI],
                dataType: "exr",
            }
        },
        // {
        //     card: {
        //         name: "image card",
        //         translation: [0, 0.4, -12],
        //         //rotation: [0, Math.PI / 2, 0],
        //         scale: [4, 4, 4],
        //         type: "2d",
        //         textureType: "image",
        //         textureLocation: "./assets/images/CroquetLogo_RGB.jpg",
        //         fullBright: true,
        //         frameColor: 0xcccccc,
        //         color: 0xbbbbbb,
        //         cornerRadius: 0.05,
        //         depth: 0.05,
        //         shadow: true,
        //     }
        // },
        // {
        //     card: {
        //         name:"dog",
        //         type: "3d",
        //         dataLocation: "./assets/3D/shiba.zip",
        //         //fileName: "/testcube_1m.glb.zip",
        //         layers: ["pointer"],
        //         translation:[0, 0.4, 10],
        //         dataScale:[1,1,1],
        //         shadow: true,
        //     }
        // },
        {
            card: {
                name:"button",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_4_Left_lights.zip",
                //fileName: "/testcube_1m.glb.zip",
                behaviorModules: ["ButtonLight"],
                myScope:"left",
                layers: ["pointer"],
                translation:[0, 0, 0],
                dataScale:[2,2,2],
                shadow: true,
            }
        },
        {
            card: {
                name:"button2",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_4_Right_lights.zip",
                //fileName: "/testcube_1m.glb.zip",
                behaviorModules: ["ButtonLight"],
                myScope:"right",
                layers: ["pointer"],
                translation:[0, 0, 0],
                dataScale:[2,2,2],
                shadow: true,
            }
        },
        // {
        //     card: {
        //         name:"panel light2",
        //         type: "3d",
        //         dataLocation: "./assets/3D/SciFi_rightpanellight.zip",
        //         //fileName: "/testcube_1m.glb.zip",
        //         behaviorModules: ["ButtonLight"],
        //         myScope:"right_panel",
        //         layers: ["pointer"],
        //         translation:[0, 0, 0],
        //         dataScale:[2,2,2],
        //         shadow: true,
        //     }
        // },
        // {
        //     card: {
        //         name:"panel light",
        //         type: "3d",
        //         dataLocation: "./assets/3D/SciFi_leftpanellight.zip",
        //         //fileName: "/testcube_1m.glb.zip",
        //         layers: ["pointer"],
        //         behaviorModules: ["ButtonLight"],
        //         myScope:"left_panel",
        //         translation:[0, 0, 0],
        //         dataScale:[2,2,2],
        //         shadow: true,
        //     }
        // },
        {
            card: {
                name:"planet",
                type: "3d",
                dataLocation: "./assets/3D/space_station.zip",
                //fileName: "/testcube_1m.glb.zip",
                behaviorModules: ["audio"],
                layers: ["pointer"],
                translation:[500, 5, -500],
                dataScale:[4,4,4],
                shadow: true,
            }
        },
        {
            card: {
                name: "door",
                //type: "object",
                type: "3d",
                modelType: "glb",
                translation: [0, 0, 0],//[-1.4447057496318962, -5.504611090090481, 30.282952880859376],
                dataLocation: "./assets/3D/SciFi_gate_1.zip",//"37HFPvPUY4QXMcTPpuY0scmEoR9I1QR5KegrT2iJ-RasX0NDR0QNGBhRXltSRBlCRBlURVhGQlJDGV5YGEIYTWJDQGd4TXFCeGQGfF5Qem1eAgQOT3FzcA8HBRheWBlURVhGQlJDGVpeVEVYQVJFRFIZW1hUVltTUkFTUlFWQltDGG9EQlEPYQ9_X1wHfgV8VgRBAGVzGm1fY20HAW98b19GXlJxUEFEWHp-TQMYU1ZDVhhCRURBXGdgQ19fVXNvDg9VUkdnQFpbUnhkA3Ncf2UGflZUb3hSclMPU3lm",
                behaviorModules: ["Door", "ButtonLight"],
                layers: ["pointer", "walk"],
                shadow: true,
                myScope: "middle_panel",
                scale: [2, 2, 2],
            }
        },

        {
            card: {
                name: "floor circle left",
                type: "object",
                translation: [-2, .20, 1],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "left",
                level: 1,

            }
        },
        {
            card: {
                name: "Dust",
                type: "object",
                translation: [0, 0, 0],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["TutorialGif"],
                shadow: true,
                myScope: "left",
                level: 1,
                //singleSided:false,

            }
        },
        {
            card: {
                name: "Text",
                type: "object",
                translation: [0, 0, 0],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["GlowText"],
                shadow: true,
                text: "Partner Needed",
                text2: "Scan QR for Entry",
                level: 1,
                //singleSided:false,

            }
        },
        {
            card: {
                name: "floor circle right",
                type: "object",
                translation: [2, .20, 1],//-1], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "right",
                level: 1,
            }
        },
        {
            card: {
                name: "floor circle middle",
                type: "object",
                translation: [0, .20, -5.75], // [7.770442246960653, 1.7540892281749288, 13.950883253194933],
                rotation: [0, 0, 0],
                behaviorModules: ["DoorButton"],
                shadow: true,
                myScope: "middle",
                level: 1,
            }
        },
        // {
        //     card: {
        //         translation: [0, 2.5, 8.5],
        //         scale: [2, 2, 2],
        //         rotation: [0, 0, 0, 1],
        //         layers: ["pointer"],
        //         name: "/Group 192.png",
        //         cornerRadius: 0.02,
        //         fileName: "/Group 192.png",
        //         fullBright: false,
        //         modelType: "img",
        //         shadow: true,
        //         singleSided: true,
        //         textureLocation: "3dbVMCMeVHmQoRX1BH8uxp6cCh6izEk_v5CbIrHYOLdIDBAQFBdeS0sCDQgBF0oRF0oHFgsVEQEQSg0LSxFLHjEQEzQrHiIRKzdVLw0DKT4NUVddHCIgI1xUVksNC0oHFgsVEQEQSgkNBxYLEgEWFwFKCAsHBQgAARIAAQIFEQgQSwo1JSMUBiAsKAIUVihJFTEuD1wWKTUFVAohHAlRFjsjAgwOMC8AJi8JPDFLAAUQBUtQIg5dHBU9NChSCjwGKVYMDRMuCyMXMB0vEhxWDz4RVRwLMgMAIgFSPhAX",
        //         textureType: "image",
        //         type: "2d",
        //     }

        // },
        {
            card: {
                name: "start point",
                type: "object",
                translation: [0,3.3,12.5],//[-20.524493842661624, 0.06300000000000061, 22.522668218635697],
                rotation: [0,0,0],//[0, -1.4990420669195301, 0],
                spawn: "default"
                //todo:this.lookTo(-0.3, 0, [0, 0, 0])
            }
        }
    ];
}