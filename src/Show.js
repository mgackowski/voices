//import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import Conductor from './Conductor';

class Channel {

    constructor() {
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
        ]
        this.randomise();
        this.audioObject.volume = 0.2;
    }

    get isEnded() {
        return this.audioObject.ended;
    }

    randomise() {
        this.audioObject = new Audio(
            this.sounds[Math.floor(Math.random() * this.sounds.length)].src);
        this.audioObject.volume = 0.2;
    }

    play() {
        this.audioObject.play();
    }


};

const Show = {

    init() {

        //this.scene = new THREE.Scene();
        //this.scene.background = new THREE.Color( 0xffffff );
        //this.camera = new THREE.OrthographicCamera(-5,5,5,-5,1,1000 );

        //this.renderer = new THREE.WebGLRenderer();
        //this.renderer.setSize( window.innerWidth, window.innerHeight );
        //this.renderer.setClearColor( 0xffffff, 0);
        document.body.removeChild( document.getElementById("introText"));

        this.conductor = new Conductor(this.scene);

        //const loader = new GLTFLoader();
        //loader.load(
        //    './glb/artefact.glb',
        //    ( gltf ) => {
        //        this.artifact = gltf.scene;
        //        this.scene.add( this.artifact );
        //    },
        //    ( xhr ) => {
        //        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        //    },
        //    ( error ) => {
        //        console.error( 'A model loading error happened.', error );
        //    },
        //);
        //let pointLight = new THREE.PointLight( 0xffffff, 1000, 100 );
        //pointLight.position.set( 0, 0, 0 );
        //this.scene.add( pointLight );

        //this.camera.position.x = 1;
        //this.camera.position.y = 0;
        //this.camera.position.z = 1;
        //this.camera.lookAt(0,0,0);

        this.tLastFrame = window.performance.now();

    },

    main(tCurrentFrame = window.performance.now()) {

        window.requestAnimationFrame(() => this.main(tCurrentFrame = window.performance.now()));

        let elapsedTime = tCurrentFrame - this.tLastFrame;
        this.tLastFrame = tCurrentFrame;
        this.update(elapsedTime);

        this.render();

    },

    update(elapsedTime) {

        this.conductor.update(elapsedTime);
        //this.artifact.rotation.y += 0.00005 * elapsedTime;

    },

    render() {
        //this.renderer.render( this.scene, this.camera );
    }


};

document.addEventListener('click', (event) => {
    Show.init();
    Show.main();
});