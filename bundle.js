(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import * as THREE from 'three';
var ArtifactManager = /*#__PURE__*/function () {
  function ArtifactManager(threeScene) {
    _classCallCheck(this, ArtifactManager);

    this._objects = [];
    this._scene = threeScene;
  }

  _createClass(ArtifactManager, [{
    key: "add",
    value: function add(object) {
      var obj = object; //let geometry = new THREE.BoxGeometry();
      //let material = new THREE.MeshBasicMaterial( { color: 0xffecc4 } );
      //material.transparent = true;
      //let cube = new THREE.Mesh( geometry, material );
      //this._scene.add(cube);
      //console.log(obj.ypos);
      //cube.position.x = obj.xpos;
      //cube.position.y = obj.ypos;
      //cube.position.z = obj.zpos;

      obj._manager = this; //obj._mesh = cube;

      this._objects.push(obj);
    }
  }, {
    key: "remove",
    value: function remove(object) {
      this._objects = this._objects.filter(function (entity) {
        return entity !== object;
      }); //this._scene.remove(object.mesh);
    }
  }, {
    key: "update",
    value: function update(delta) {
      this._objects.forEach(function (obj) {
        obj.update(delta);
      });
    }
  }, {
    key: "objects",
    get: function get() {
      return this._objects;
    }
  }]);

  return ArtifactManager;
}();

var _default = ArtifactManager;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _artifact = _interopRequireDefault(require("./artifact"));

var _ArtifactManager = _interopRequireDefault(require("./ArtifactManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Conductor = /*#__PURE__*/function () {
  function Conductor(threeScene) {
    var _this = this;

    _classCallCheck(this, Conductor);

    this.sounds = [{
      src: "./ogg/dreamC3.ogg",
      instrument: "dream",
      pitch: [1]
    }, {
      src: "./ogg/dreamC4.ogg",
      instrument: "dream",
      pitch: [8]
    }, {
      src: "./ogg/dreamD3.ogg",
      instrument: "dream",
      pitch: [2]
    }, {
      src: "./ogg/dreamF3.ogg",
      instrument: "dream",
      pitch: [4]
    }, {
      src: "./ogg/pianoA4.ogg",
      instrument: "piano",
      pitch: [13]
    }, {
      src: "./ogg/pianoC4.ogg",
      instrument: "piano",
      pitch: [8]
    }, {
      src: "./ogg/pianoC4D5C5.ogg",
      instrument: "piano",
      pitch: [8, 16, 15]
    }, {
      src: "./ogg/pianoCis4.ogg",
      instrument: "piano",
      pitch: [8.5]
    }, {
      src: "./ogg/pianoD4.ogg",
      instrument: "piano",
      pitch: [9]
    }, {
      src: "./ogg/pianoDis5.ogg",
      instrument: "piano",
      pitch: [16.5]
    }, {
      src: "./ogg/pianoE4D4A4.ogg",
      instrument: "piano",
      pitch: [10, 9, 13]
    }, {
      src: "./ogg/pianoG4A4C5.ogg",
      instrument: "piano",
      pitch: [12, 13, 15]
    }, {
      src: "./ogg/pianoG4F4.ogg",
      instrument: "piano",
      pitch: [12, 11]
    }, {
      src: "./ogg/stratoA3.ogg",
      instrument: "strato",
      pitch: [6]
    }, {
      src: "./ogg/stratoD4.ogg",
      instrument: "strato",
      pitch: [9]
    }, {
      src: "./ogg/stratoE4.ogg",
      instrument: "strato",
      pitch: [10]
    }, {
      src: "./ogg/stratoF4.ogg",
      instrument: "strato",
      pitch: [11]
    }];
    this.artifacts = new _ArtifactManager["default"](threeScene);
    this.channels = [];
    var numOfChannels = 5;
    var introductionDelay = 5000;
    var volume = 0.2;

    var _loop = function _loop(i) {
      var artifactIndex = Math.floor(Math.random() * _this.sounds.length);

      _this.channels.push(new Audio(_this.sounds[artifactIndex].src));

      _this.channels[i].volume = volume;
      setTimeout(function () {
        _this.channels[i].play();
      }, introductionDelay * i);

      _this.sounds[artifactIndex].pitch.forEach(function (p) {
        var newCube = new _artifact["default"](0, p, 0);

        _this.artifacts.add(newCube);
      });
    };

    for (var i = 0; i < numOfChannels; i++) {
      _loop(i);
    }

    ;
  }

  _createClass(Conductor, [{
    key: "update",
    value: function update(delta) {
      var _this2 = this;

      this.artifacts.update(delta);
      this.channels.forEach(function (el) {
        if (el.ended) {
          var artifactIndex = Math.floor(Math.random() * _this2.sounds.length);
          el.src = _this2.sounds[artifactIndex].src;
          el.play();

          _this2.sounds[artifactIndex].pitch.forEach(function (p) {
            var newCube = new _artifact["default"](0, p, 0);

            _this2.artifacts.add(newCube);
          });
        }
      });
    }
  }]);

  return Conductor;
}();

var _default = Conductor;
exports["default"] = _default;

},{"./ArtifactManager":1,"./artifact":4}],3:[function(require,module,exports){
"use strict";

var _Conductor = _interopRequireDefault(require("./Conductor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Channel = /*#__PURE__*/function () {
  function Channel() {
    _classCallCheck(this, Channel);

    this.sounds = [{
      src: "./ogg/dreamC3.ogg",
      instrument: "dream",
      pitch: [1]
    }, {
      src: "./ogg/dreamC4.ogg",
      instrument: "dream",
      pitch: [8]
    }, {
      src: "./ogg/dreamD3.ogg",
      instrument: "dream",
      pitch: [2]
    }, {
      src: "./ogg/dreamF3.ogg",
      instrument: "dream",
      pitch: [4]
    }, {
      src: "./ogg/pianoA4.ogg",
      instrument: "piano",
      pitch: [13]
    }, {
      src: "./ogg/pianoC4.ogg",
      instrument: "piano",
      pitch: [8]
    }, {
      src: "./ogg/pianoC4D5C5.ogg",
      instrument: "piano",
      pitch: [8, 16, 15]
    }, {
      src: "./ogg/pianoCis4.ogg",
      instrument: "piano",
      pitch: [8.5]
    }, {
      src: "./ogg/pianoD4.ogg",
      instrument: "piano",
      pitch: [9]
    }, {
      src: "./ogg/pianoDis5.ogg",
      instrument: "piano",
      pitch: [16.5]
    }, {
      src: "./ogg/pianoE4D4A4.ogg",
      instrument: "piano",
      pitch: [10, 9, 13]
    }, {
      src: "./ogg/pianoG4A4C5.ogg",
      instrument: "piano",
      pitch: [12, 13, 15]
    }, {
      src: "./ogg/pianoG4F4.ogg",
      instrument: "piano",
      pitch: [12, 11]
    }, {
      src: "./ogg/stratoA3.ogg",
      instrument: "strato",
      pitch: [6]
    }, {
      src: "./ogg/stratoD4.ogg",
      instrument: "strato",
      pitch: [9]
    }, {
      src: "./ogg/stratoE4.ogg",
      instrument: "strato",
      pitch: [10]
    }, {
      src: "./ogg/stratoF4.ogg",
      instrument: "strato",
      pitch: [11]
    }];
    this.randomise();
    this.audioObject.volume = 0.2;
  }

  _createClass(Channel, [{
    key: "randomise",
    value: function randomise() {
      this.audioObject = new Audio(this.sounds[Math.floor(Math.random() * this.sounds.length)].src);
      this.audioObject.volume = 0.2;
    }
  }, {
    key: "play",
    value: function play() {
      this.audioObject.play();
    }
  }, {
    key: "isEnded",
    get: function get() {
      return this.audioObject.ended;
    }
  }]);

  return Channel;
}();

;
var Show = {
  init: function init() {
    //this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color( 0xffffff );
    //this.camera = new THREE.OrthographicCamera(-5,5,5,-5,1,1000 );
    //this.renderer = new THREE.WebGLRenderer();
    //this.renderer.setSize( window.innerWidth, window.innerHeight );
    //this.renderer.setClearColor( 0xffffff, 0);
    document.body.removeChild(document.getElementById("introText"));
    this.conductor = new _Conductor["default"](this.scene); //const loader = new GLTFLoader();
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
  main: function main() {
    var _this = this;

    var tCurrentFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.performance.now();
    window.requestAnimationFrame(function () {
      return _this.main(tCurrentFrame = window.performance.now());
    });
    var elapsedTime = tCurrentFrame - this.tLastFrame;
    this.tLastFrame = tCurrentFrame;
    this.update(elapsedTime);
    this.render();
  },
  update: function update(elapsedTime) {
    this.conductor.update(elapsedTime); //this.artifact.rotation.y += 0.00005 * elapsedTime;
  },
  render: function render() {//this.renderer.render( this.scene, this.camera );
  }
};
document.addEventListener('click', function (event) {
  Show.init();
  Show.main();
});

},{"./Conductor":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Artifact = /*#__PURE__*/function () {
  function Artifact() {
    _classCallCheck(this, Artifact);
  }

  _createClass(Artifact, [{
    key: "contructor",
    value: function contructor(xpos, ypos, zpos) {
      this._manager = undefined;
      this._xpos = xpos;
      this._ypos = ypos;
      this._zpos = zpos;
      this._opacity = 1;
    }
  }, {
    key: "update",
    value: function update(delta) {
      //this._opacity -= 0.00001 * delta;
      //this._mesh.material.opacity = this._opacity;
      //console.log(this._mesh.material.opacity);
      if (this._manager != undefined && this._opacity <= 0) {
        this._manager.remove(this);
      }
    }
  }, {
    key: "render",
    value: function render() {//
    }
  }, {
    key: "xpos",
    get: function get() {
      return this._xpos;
    }
  }, {
    key: "ypos",
    get: function get() {
      return this._ypos;
    }
  }, {
    key: "zpos",
    get: function get() {
      return this._zpos;
    }
  }, {
    key: "opacity",
    get: function get() {
      return this._opacity;
    }
  }]);

  return Artifact;
}();

var _default = Artifact;
exports["default"] = _default;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL01pa29sYWovQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FydGlmYWN0TWFuYWdlci5qcyIsInNyYy9Db25kdWN0b3IuanMiLCJzcmMvU2hvdy5qcyIsInNyYy9hcnRpZmFjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtJQUVNLGU7QUFFRiwyQkFBYSxVQUFiLEVBQXlCO0FBQUE7O0FBQ3JCLFNBQUssUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUssTUFBTCxHQUFjLFVBQWQ7QUFDSDs7Ozt3QkFNRyxNLEVBQVE7QUFDUixVQUFJLEdBQUcsR0FBRyxNQUFWLENBRFEsQ0FFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBQSxHQUFHLENBQUMsUUFBSixHQUFlLElBQWYsQ0FaUSxDQWFSOztBQUVBLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsR0FBbkI7QUFFSDs7OzJCQUVNLE0sRUFBUTtBQUNYLFdBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUEsTUFBTTtBQUFBLGVBQUksTUFBTSxLQUFLLE1BQWY7QUFBQSxPQUEzQixDQUFoQixDQURXLENBRVg7QUFDSDs7OzJCQUVNLEssRUFBTztBQUNWLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBdUIsVUFBQyxHQUFELEVBQVM7QUFDNUIsUUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLEtBQVg7QUFDSCxPQUZEO0FBR0g7Ozt3QkFoQ2E7QUFDVixhQUFPLEtBQUssUUFBWjtBQUNIOzs7Ozs7ZUFrQ1UsZTs7Ozs7Ozs7Ozs7QUM3Q2Y7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTSxTO0FBRUYscUJBQVksVUFBWixFQUF3QjtBQUFBOztBQUFBOztBQUNwQixTQUFLLE1BQUwsR0FB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QUFXO0FBQzFDLEVBQUEsSUFBSSxDQUFDLElBQUw7QUFDQSxFQUFBLElBQUksQ0FBQyxJQUFMO0FBQ0gsQ0FIRDs7Ozs7Ozs7Ozs7Ozs7OztJQ25ITSxROzs7Ozs7OytCQUVTLEksRUFBTSxJLEVBQU0sSSxFQUFNO0FBQ3pCLFdBQUssUUFBTCxHQUFnQixTQUFoQjtBQUVBLFdBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNIOzs7MkJBZU0sSyxFQUFPO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBSSxLQUFLLFFBQUwsSUFBaUIsU0FBakIsSUFBOEIsS0FBSyxRQUFMLElBQWlCLENBQW5ELEVBQXNEO0FBQ2xELGFBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsSUFBckI7QUFDSDtBQUNKOzs7NkJBRVEsQ0FDTDtBQUNIOzs7d0JBeEJVO0FBQ1AsYUFBTyxLQUFLLEtBQVo7QUFDSDs7O3dCQUNVO0FBQ1AsYUFBTyxLQUFLLEtBQVo7QUFDSDs7O3dCQUNVO0FBQ1AsYUFBTyxLQUFLLEtBQVo7QUFDSDs7O3dCQUNhO0FBQ1YsYUFBTyxLQUFLLFFBQVo7QUFDSDs7Ozs7O2VBaUJVLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2ltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmNsYXNzIEFydGlmYWN0TWFuYWdlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHRocmVlU2NlbmUpIHtcclxuICAgICAgICB0aGlzLl9vYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2NlbmUgPSB0aHJlZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvYmplY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3RzO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGQob2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IG9iamVjdDtcclxuICAgICAgICAvL2xldCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgpO1xyXG4gICAgICAgIC8vbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweGZmZWNjNCB9ICk7XHJcbiAgICAgICAgLy9tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgLy9sZXQgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcclxuICAgICAgICAvL3RoaXMuX3NjZW5lLmFkZChjdWJlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG9iai55cG9zKTtcclxuICAgICAgICAvL2N1YmUucG9zaXRpb24ueCA9IG9iai54cG9zO1xyXG4gICAgICAgIC8vY3ViZS5wb3NpdGlvbi55ID0gb2JqLnlwb3M7XHJcbiAgICAgICAgLy9jdWJlLnBvc2l0aW9uLnogPSBvYmouenBvcztcclxuXHJcbiAgICAgICAgb2JqLl9tYW5hZ2VyID0gdGhpcztcclxuICAgICAgICAvL29iai5fbWVzaCA9IGN1YmU7XHJcblxyXG4gICAgICAgIHRoaXMuX29iamVjdHMucHVzaChvYmopO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUob2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IHRoaXMuX29iamVjdHMuZmlsdGVyKGVudGl0eSA9PiBlbnRpdHkgIT09IG9iamVjdCk7XHJcbiAgICAgICAgLy90aGlzLl9zY2VuZS5yZW1vdmUob2JqZWN0Lm1lc2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YSkge1xyXG4gICAgICAgIHRoaXMuX29iamVjdHMuZm9yRWFjaCggKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBvYmoudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJ0aWZhY3RNYW5hZ2VyOyIsImltcG9ydCBBcnRpZmFjdCBmcm9tIFwiLi9hcnRpZmFjdFwiO1xyXG5pbXBvcnQgQXJ0aWZhY3RNYW5hZ2VyIGZyb20gXCIuL0FydGlmYWN0TWFuYWdlclwiO1xyXG5cclxuY2xhc3MgQ29uZHVjdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aHJlZVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBbXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvZHJlYW1DMy5vZ2dcIiwgaW5zdHJ1bWVudDogXCJkcmVhbVwiLCBwaXRjaDogWzFdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9kcmVhbUM0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcImRyZWFtXCIsIHBpdGNoOiBbOF19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL2RyZWFtRDMub2dnXCIsIGluc3RydW1lbnQ6IFwiZHJlYW1cIiwgcGl0Y2g6IFsyXX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvZHJlYW1GMy5vZ2dcIiwgaW5zdHJ1bWVudDogXCJkcmVhbVwiLCBwaXRjaDogWzRdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0E0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTNdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0M0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbOF19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vQzRENUM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbOCwxNiwxNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vQ2lzNC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJwaWFub1wiLCBwaXRjaDogWzguNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRDQub2dnXCIsIGluc3RydW1lbnQ6IFwicGlhbm9cIiwgcGl0Y2g6IFs5XX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvcGlhbm9EaXM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTYuNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRTRENEE0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTAsOSwxM119LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRzRBNEM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTIsMTMsMTVdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0c0RjQub2dnXCIsIGluc3RydW1lbnQ6IFwicGlhbm9cIiwgcGl0Y2g6IFsxMiwxMV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3N0cmF0b0EzLm9nZ1wiLCBpbnN0cnVtZW50OiBcInN0cmF0b1wiLCBwaXRjaDogWzZdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9zdHJhdG9ENC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJzdHJhdG9cIiwgcGl0Y2g6IFs5XX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvc3RyYXRvRTQub2dnXCIsIGluc3RydW1lbnQ6IFwic3RyYXRvXCIsIHBpdGNoOiBbMTBdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9zdHJhdG9GNC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJzdHJhdG9cIiwgcGl0Y2g6IFsxMV19XHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmFydGlmYWN0cyA9IG5ldyBBcnRpZmFjdE1hbmFnZXIodGhyZWVTY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IG51bU9mQ2hhbm5lbHMgPSA1O1xyXG4gICAgICAgIGxldCBpbnRyb2R1Y3Rpb25EZWxheSA9IDUwMDA7XHJcbiAgICAgICAgbGV0IHZvbHVtZSA9IDAuMjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZkNoYW5uZWxzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFydGlmYWN0SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNvdW5kcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jaGFubmVscy5wdXNoKG5ldyBBdWRpbyh0aGlzLnNvdW5kc1thcnRpZmFjdEluZGV4XS5zcmMpKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFubmVsc1tpXS52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmNoYW5uZWxzW2ldLnBsYXkoKTsgfSwgaW50cm9kdWN0aW9uRGVsYXkgKiBpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc291bmRzW2FydGlmYWN0SW5kZXhdLnBpdGNoLmZvckVhY2goIChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q3ViZSA9IG5ldyBBcnRpZmFjdCgwLHAsMCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMuYWRkKG5ld0N1YmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGEpIHtcclxuXHJcbiAgICAgICAgdGhpcy5hcnRpZmFjdHMudXBkYXRlKGRlbHRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBpZihlbC5lbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFydGlmYWN0SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNvdW5kcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5zb3VuZHNbYXJ0aWZhY3RJbmRleF0uc3JjO1xyXG4gICAgICAgICAgICAgICAgZWwucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc291bmRzW2FydGlmYWN0SW5kZXhdLnBpdGNoLmZvckVhY2goIChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0N1YmUgPSBuZXcgQXJ0aWZhY3QoMCxwLDApOyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5hZGQobmV3Q3ViZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmR1Y3RvcjsiLCIvL2ltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuLy9pbXBvcnQgR0xURkxvYWRlciBmcm9tICd0aHJlZS1nbHRmLWxvYWRlcic7XHJcbmltcG9ydCBDb25kdWN0b3IgZnJvbSAnLi9Db25kdWN0b3InO1xyXG5cclxuY2xhc3MgQ2hhbm5lbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBbXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvZHJlYW1DMy5vZ2dcIiwgaW5zdHJ1bWVudDogXCJkcmVhbVwiLCBwaXRjaDogWzFdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9kcmVhbUM0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcImRyZWFtXCIsIHBpdGNoOiBbOF19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL2RyZWFtRDMub2dnXCIsIGluc3RydW1lbnQ6IFwiZHJlYW1cIiwgcGl0Y2g6IFsyXX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvZHJlYW1GMy5vZ2dcIiwgaW5zdHJ1bWVudDogXCJkcmVhbVwiLCBwaXRjaDogWzRdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0E0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTNdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0M0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbOF19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vQzRENUM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbOCwxNiwxNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vQ2lzNC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJwaWFub1wiLCBwaXRjaDogWzguNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRDQub2dnXCIsIGluc3RydW1lbnQ6IFwicGlhbm9cIiwgcGl0Y2g6IFs5XX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvcGlhbm9EaXM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTYuNV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRTRENEE0Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTAsOSwxM119LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3BpYW5vRzRBNEM1Lm9nZ1wiLCBpbnN0cnVtZW50OiBcInBpYW5vXCIsIHBpdGNoOiBbMTIsMTMsMTVdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9waWFub0c0RjQub2dnXCIsIGluc3RydW1lbnQ6IFwicGlhbm9cIiwgcGl0Y2g6IFsxMiwxMV19LFxyXG4gICAgICAgICAgICB7c3JjOiBcIi4vb2dnL3N0cmF0b0EzLm9nZ1wiLCBpbnN0cnVtZW50OiBcInN0cmF0b1wiLCBwaXRjaDogWzZdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9zdHJhdG9ENC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJzdHJhdG9cIiwgcGl0Y2g6IFs5XX0sXHJcbiAgICAgICAgICAgIHtzcmM6IFwiLi9vZ2cvc3RyYXRvRTQub2dnXCIsIGluc3RydW1lbnQ6IFwic3RyYXRvXCIsIHBpdGNoOiBbMTBdfSxcclxuICAgICAgICAgICAge3NyYzogXCIuL29nZy9zdHJhdG9GNC5vZ2dcIiwgaW5zdHJ1bWVudDogXCJzdHJhdG9cIiwgcGl0Y2g6IFsxMV19XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMucmFuZG9taXNlKCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb09iamVjdC52b2x1bWUgPSAwLjI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzRW5kZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXVkaW9PYmplY3QuZW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9taXNlKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9PYmplY3QgPSBuZXcgQXVkaW8oXHJcbiAgICAgICAgICAgIHRoaXMuc291bmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc291bmRzLmxlbmd0aCldLnNyYyk7XHJcbiAgICAgICAgdGhpcy5hdWRpb09iamVjdC52b2x1bWUgPSAwLjI7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvT2JqZWN0LnBsYXkoKTtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuY29uc3QgU2hvdyA9IHtcclxuXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgICAgICAvL3RoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuICAgICAgICAvL3RoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvciggMHhmZmZmZmYgKTtcclxuICAgICAgICAvL3RoaXMuY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSgtNSw1LDUsLTUsMSwxMDAwICk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XHJcbiAgICAgICAgLy90aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcclxuICAgICAgICAvL3RoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHhmZmZmZmYsIDApO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50cm9UZXh0XCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25kdWN0b3IgPSBuZXcgQ29uZHVjdG9yKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICAvL2NvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKCk7XHJcbiAgICAgICAgLy9sb2FkZXIubG9hZChcclxuICAgICAgICAvLyAgICAnLi9nbGIvYXJ0ZWZhY3QuZ2xiJyxcclxuICAgICAgICAvLyAgICAoIGdsdGYgKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYXJ0aWZhY3QgPSBnbHRmLnNjZW5lO1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLnNjZW5lLmFkZCggdGhpcy5hcnRpZmFjdCApO1xyXG4gICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgLy8gICAgKCB4aHIgKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCBgJHsoIHhoci5sb2FkZWQgLyB4aHIudG90YWwgKiAxMDAgKX0lIGxvYWRlZGAgKTtcclxuICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgIC8vICAgICggZXJyb3IgKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUuZXJyb3IoICdBIG1vZGVsIGxvYWRpbmcgZXJyb3IgaGFwcGVuZWQuJywgZXJyb3IgKTtcclxuICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgIC8vKTtcclxuICAgICAgICAvL2xldCBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoIDB4ZmZmZmZmLCAxMDAwLCAxMDAgKTtcclxuICAgICAgICAvL3BvaW50TGlnaHQucG9zaXRpb24uc2V0KCAwLCAwLCAwICk7XHJcbiAgICAgICAgLy90aGlzLnNjZW5lLmFkZCggcG9pbnRMaWdodCApO1xyXG5cclxuICAgICAgICAvL3RoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSAxO1xyXG4gICAgICAgIC8vdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IDA7XHJcbiAgICAgICAgLy90aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gMTtcclxuICAgICAgICAvL3RoaXMuY2FtZXJhLmxvb2tBdCgwLDAsMCk7XHJcblxyXG4gICAgICAgIHRoaXMudExhc3RGcmFtZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1haW4odEN1cnJlbnRGcmFtZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSkge1xyXG5cclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubWFpbih0Q3VycmVudEZyYW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpKSk7XHJcblxyXG4gICAgICAgIGxldCBlbGFwc2VkVGltZSA9IHRDdXJyZW50RnJhbWUgLSB0aGlzLnRMYXN0RnJhbWU7XHJcbiAgICAgICAgdGhpcy50TGFzdEZyYW1lID0gdEN1cnJlbnRGcmFtZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZFRpbWUpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb25kdWN0b3IudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAvL3RoaXMuYXJ0aWZhY3Qucm90YXRpb24ueSArPSAwLjAwMDA1ICogZWxhcHNlZFRpbWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy90aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIFNob3cuaW5pdCgpO1xyXG4gICAgU2hvdy5tYWluKCk7XHJcbn0pOyIsImNsYXNzIEFydGlmYWN0IHtcclxuXHJcbiAgICBjb250cnVjdG9yKHhwb3MsIHlwb3MsIHpwb3MpIHtcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICB0aGlzLl94cG9zID0geHBvcztcclxuICAgICAgICB0aGlzLl95cG9zID0geXBvcztcclxuICAgICAgICB0aGlzLl96cG9zID0genBvcztcclxuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeHBvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feHBvcztcclxuICAgIH1cclxuICAgIGdldCB5cG9zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl95cG9zO1xyXG4gICAgfVxyXG4gICAgZ2V0IHpwb3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pwb3M7XHJcbiAgICB9XHJcbiAgICBnZXQgb3BhY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGEpIHtcclxuICAgICAgICAvL3RoaXMuX29wYWNpdHkgLT0gMC4wMDAwMSAqIGRlbHRhO1xyXG4gICAgICAgIC8vdGhpcy5fbWVzaC5tYXRlcmlhbC5vcGFjaXR5ID0gdGhpcy5fb3BhY2l0eTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuX21lc2gubWF0ZXJpYWwub3BhY2l0eSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hbmFnZXIgIT0gdW5kZWZpbmVkICYmIHRoaXMuX29wYWNpdHkgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcnRpZmFjdDsiXX0=
