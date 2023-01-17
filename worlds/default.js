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
                dataScale:[2,2,2], 
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
        {
            card: {
                name:"button",
                type: "3d",
                dataLocation: "./assets/3D/SciFi_4_Left_lights.zip",
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
                behaviorModules: ["ButtonLight"],
                myScope:"right",
                layers: ["pointer"],
                translation:[0, 0, 0],
                dataScale:[2,2,2],
                shadow: true,
            }
        },
        {
            card: {
                name:"planet",
                type: "3d",
                dataLocation: "./assets/3D/space_station.zip",
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
                translation: [0, 0, 0],
                dataLocation: "./assets/3D/SciFi_gate_1.zip",
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
                translation: [-2, .20, 1],
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
                translation: [0, 0, 0],
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
                translation: [0, 0, 0],
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
                translation: [2, .20, 1],
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
       
        {
            card: {
                name: "start point",
                type: "object",
                translation: [0,3.3,12.5],
                rotation: [0,0,0],
                spawn: "default"
                //todo:this.lookTo(-0.3, 0, [0, 0, 0])
            }
        }
    ];
}