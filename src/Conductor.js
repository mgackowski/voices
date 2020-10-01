import Artifact from "./artifact";
import ArtifactManager from "./ArtifactManager";

class Conductor {

    constructor(threeScene) {
        this.sounds = [
            {src: "./ogg/dreamC3.ogg", instrument: "dream", pitch: [1]},
            {src: "./ogg/dreamC4.ogg", instrument: "dream", pitch: [8]},
            {src: "./ogg/dreamD3.ogg", instrument: "dream", pitch: [2]},
            {src: "./ogg/dreamF3.ogg", instrument: "dream", pitch: [4]},
            {src: "./ogg/pianoA4.ogg", instrument: "piano", pitch: [13]},
            {src: "./ogg/pianoC4.ogg", instrument: "piano", pitch: [8]},
            {src: "./ogg/pianoC4D5C5.ogg", instrument: "piano", pitch: [8,16,15]},
            {src: "./ogg/pianoCis4.ogg", instrument: "piano", pitch: [8.5]},
            {src: "./ogg/pianoD4.ogg", instrument: "piano", pitch: [9]},
            {src: "./ogg/pianoDis5.ogg", instrument: "piano", pitch: [16.5]},
            {src: "./ogg/pianoE4D4A4.ogg", instrument: "piano", pitch: [10,9,13]},
            {src: "./ogg/pianoG4A4C5.ogg", instrument: "piano", pitch: [12,13,15]},
            {src: "./ogg/pianoG4F4.ogg", instrument: "piano", pitch: [12,11]},
            {src: "./ogg/stratoA3.ogg", instrument: "strato", pitch: [6]},
            {src: "./ogg/stratoD4.ogg", instrument: "strato", pitch: [9]},
            {src: "./ogg/stratoE4.ogg", instrument: "strato", pitch: [10]},
            {src: "./ogg/stratoF4.ogg", instrument: "strato", pitch: [11]}
        ];
        this.artifacts = new ArtifactManager(threeScene);

        this.channels = [];

        let numOfChannels = 5;
        let introductionDelay = 5000;
        let volume = 0.2;

        for (let i = 0; i < numOfChannels; i++) {
            let artifactIndex = Math.floor(Math.random() * this.sounds.length);

            this.channels.push(new Audio(this.sounds[artifactIndex].src));
            this.channels[i].volume = volume;
            setTimeout(() => { this.channels[i].play(); }, introductionDelay * i);

            this.sounds[artifactIndex].pitch.forEach( (p) => {
                let newCube = new Artifact(0,p,0); 
                this.artifacts.add(newCube);
            });
            
        };
    }

    update(delta) {

        this.artifacts.update(delta);

        this.channels.forEach((el) => {
            if(el.ended) {
                let artifactIndex = Math.floor(Math.random() * this.sounds.length);
                el.src = this.sounds[artifactIndex].src;
                el.play();

                this.sounds[artifactIndex].pitch.forEach( (p) => {
                    let newCube = new Artifact(0,p,0); 
                    this.artifacts.add(newCube);
                });
            }
        });
    }


}

export default Conductor;