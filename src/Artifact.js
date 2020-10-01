class Artifact {

    contructor(xpos, ypos, zpos) {
        this._manager = undefined;

        this._xpos = xpos;
        this._ypos = ypos;
        this._zpos = zpos;
        this._opacity = 1;
    }

    get xpos() {
        return this._xpos;
    }
    get ypos() {
        return this._ypos;
    }
    get zpos() {
        return this._zpos;
    }
    get opacity() {
        return this._opacity;
    }

    update(delta) {
        //this._opacity -= 0.00001 * delta;
        //this._mesh.material.opacity = this._opacity;
        //console.log(this._mesh.material.opacity);
        if (this._manager != undefined && this._opacity <= 0) {
            this._manager.remove(this);
        }
    }

    render() {
        //
    }

}

export default Artifact;