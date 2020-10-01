//import * as THREE from 'three';

class ArtifactManager {

    constructor (threeScene) {
        this._objects = [];
        this._scene = threeScene;
    }

    get objects() {
        return this._objects;
    };

    add(object) {
        let obj = object;
        //let geometry = new THREE.BoxGeometry();
        //let material = new THREE.MeshBasicMaterial( { color: 0xffecc4 } );
        //material.transparent = true;
        //let cube = new THREE.Mesh( geometry, material );
        //this._scene.add(cube);
        //console.log(obj.ypos);
        //cube.position.x = obj.xpos;
        //cube.position.y = obj.ypos;
        //cube.position.z = obj.zpos;

        obj._manager = this;
        //obj._mesh = cube;

        this._objects.push(obj);

    }

    remove(object) {
        this._objects = this._objects.filter(entity => entity !== object);
        //this._scene.remove(object.mesh);
    }

    update(delta) {
        this._objects.forEach( (obj) => {
            obj.update(delta);
        })
    }

}

export default ArtifactManager;