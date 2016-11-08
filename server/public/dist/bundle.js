/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _remoteVideo = __webpack_require__(1);

	var _remoteVideo2 = _interopRequireDefault(_remoteVideo);

	var _widget = __webpack_require__(2);

	var _widget2 = _interopRequireDefault(_widget);

	var _cubeWidget = __webpack_require__(4);

	var _cubeWidget2 = _interopRequireDefault(_cubeWidget);

	var _videoWidget = __webpack_require__(5);

	var _videoWidget2 = _interopRequireDefault(_videoWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let widget = new Widget()

	// let cubeWidget = new CubeWidget()
	var videoWidget = new _videoWidget2.default(_remoteVideo2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pc2 = null;
	var socket = io(location.origin);

	function onCreateAnswerSuccess(desc) {
	  pc2.setLocalDescription(desc);
	  socket.emit('answer', desc);
	}

	var remoteVideo = document.getElementById('remoteVideo');

	function gotRemoteStream(e) {
	  remoteVideo.srcObject = e.stream;
	}

	socket.on('news', function (data) {
	  console.log(data);
	});

	socket.on('emitOffer', function (data) {
	  var servers = null;
	  pc2 = new webkitRTCPeerConnection(servers);
	  pc2.onaddstream = gotRemoteStream;
	  pc2.setRemoteDescription(new RTCSessionDescription(data));
	  pc2.createAnswer().then(onCreateAnswerSuccess, null);
	});

	exports.default = remoteVideo;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _detector = __webpack_require__(3);

	var _detector2 = _interopRequireDefault(_detector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SCREEN_WIDTH = window.innerWidth,
	    SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45,
	    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;

	var Widget = function Widget() {
	  var _this = this;

	  _classCallCheck(this, Widget);

	  this.init = function () {
	    _this.camera.position.set(0, 0, 2);
	    _this.scene.add(_this.camera);
	    _this.camera.lookAt(_this.scene.position);
	  };

	  this.initRenderer = function () {
	    var renderer = null;
	    if (_detector2.default.webgl) renderer = new THREE.WebGLRenderer({ antialias: true });else renderer = new THREE.CanvasRenderer();

	    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	    var container = document.getElementById('ThreeJS');
	    container.appendChild(renderer.domElement);

	    return renderer;
	  };

	  this.resizeWidget = function (width, height) {
	    _this.renderer.setSize(width, height);
	  };

	  this.animate = function () {
	    requestAnimationFrame(_this.animate);
	    _this.render();
	    _this.update();
	    _this.renderer.render(_this.scene, _this.camera);
	  };

	  this.render = function () {};

	  this.update = function () {};

	  this.renderer = this.initRenderer();

	  this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  this.scene = new THREE.Scene();

	  this.init();

	  this.animate();
	};

	exports.default = Widget;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Detector = {

		canvas: !!window.CanvasRenderingContext2D,
		webgl: function () {
			try {
				return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
			} catch (e) {
				return false;
			}
		}(),
		workers: !!window.Worker,
		fileapi: window.File && window.FileReader && window.FileList && window.Blob,

		getWebGLErrorMessage: function getWebGLErrorMessage() {

			var element = document.createElement('div');
			element.id = 'webgl-error-message';
			element.style.fontFamily = 'monospace';
			element.style.fontSize = '13px';
			element.style.fontWeight = 'normal';
			element.style.textAlign = 'center';
			element.style.background = '#fff';
			element.style.color = '#000';
			element.style.padding = '1.5em';
			element.style.width = '400px';
			element.style.margin = '5em auto 0';

			if (!this.webgl) {

				element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
			}

			return element;
		},

		addGetWebGLMessage: function addGetWebGLMessage(parameters) {

			var parent, id, element;

			parameters = parameters || {};

			parent = parameters.parent !== undefined ? parameters.parent : document.body;
			id = parameters.id !== undefined ? parameters.id : 'oldie';

			element = Detector.getWebGLErrorMessage();
			element.id = id;

			parent.appendChild(element);
		}

	};

	exports.default = Detector;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(2);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CubeWidget = function (_Widget) {
	  _inherits(CubeWidget, _Widget);

	  function CubeWidget() {
	    _classCallCheck(this, CubeWidget);

	    var _this = _possibleConstructorReturn(this, (CubeWidget.__proto__ || Object.getPrototypeOf(CubeWidget)).call(this));

	    _this.createCube = function () {
	      var geometry = new THREE.BoxGeometry(1, 1, 1);
	      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	      return new THREE.Mesh(geometry, material);
	    };

	    _this.render = function () {
	      _this.cube.rotation.x += 0.01;
	      _this.cube.rotation.y += 0.05;
	    };

	    _this.cube = _this.createCube();
	    _this.scene.add(_this.cube);
	    return _this;
	  }

	  return CubeWidget;
	}(_widget2.default);

	exports.default = CubeWidget;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(2);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VideoWidget = function (_Widget) {
	  _inherits(VideoWidget, _Widget);

	  function VideoWidget(video) {
	    _classCallCheck(this, VideoWidget);

	    var _this = _possibleConstructorReturn(this, (VideoWidget.__proto__ || Object.getPrototypeOf(VideoWidget)).call(this));

	    _initialiseProps.call(_this);

	    _this.scene = _this.initScene();

	    // create the video element
	    //video = document.createElement( 'video' );
	    _this.video = video;
	    // video.id = 'video';
	    // video.type = ' video/ogg; codecs="theora, vorbis" ';
	    // video.src = "videos/sintel.ogv";
	    _this.video.load();
	    //video.play();

	    _this.videoImageContext = null;
	    _this.videoTexture = null;
	    _this.initVideoContext();

	    var movieScreen = _this.createMovieScreen();
	    _this.scene.add(movieScreen);

	    _this.camera.position.set(0, 150, 300);
	    _this.camera.lookAt(movieScreen.position);
	    _this.scene.add(_this.camera);
	    return _this;
	  }

	  return VideoWidget;
	}(_widget2.default);

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.initScene = function () {
	    // SCENE
	    var scene = new THREE.Scene();

	    // LIGHT
	    var light = new THREE.PointLight(0xffffff);
	    light.position.set(0, 250, 0);
	    scene.add(light);

	    // FLOOR
	    var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
	    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	    floorTexture.repeat.set(10, 10);
	    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
	    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	    floor.position.y = -0.5;
	    floor.rotation.x = Math.PI / 2;
	    scene.add(floor);

	    // SKYBOX/FOG
	    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
	    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
	    // scene.add(skyBox);
	    scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
	    return scene;
	  };

	  this.initVideoContext = function () {
	    var videoImage = document.createElement('canvas');
	    videoImage.width = 480;
	    videoImage.height = 204;

	    _this2.videoImageContext = videoImage.getContext('2d');
	    // background color if no video present
	    _this2.videoImageContext.fillStyle = '#000000';
	    _this2.videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

	    _this2.videoTexture = new THREE.Texture(videoImage);
	    _this2.videoTexture.minFilter = THREE.LinearFilter;
	    _this2.videoTexture.magFilter = THREE.LinearFilter;
	  };

	  this.createMovieScreen = function () {
	    var movieMaterial = new THREE.MeshBasicMaterial({ map: _this2.videoTexture, overdraw: true, side: THREE.DoubleSide });
	    // the geometry on which the movie will be displayed;
	    // 		movie image will be scaled to fit these dimensions.
	    var movieGeometry = new THREE.PlaneGeometry(240, 100, 4, 4);
	    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
	    movieScreen.position.set(0, 50, 0);
	    return movieScreen;
	  };

	  this.render = function () {
	    if (_this2.video.readyState === _this2.video.HAVE_ENOUGH_DATA) {
	      _this2.videoImageContext.drawImage(_this2.video, 0, 0);
	      if (_this2.videoTexture) _this2.videoTexture.needsUpdate = true;
	    }
	  };
	};

	exports.default = VideoWidget;

/***/ }
/******/ ]);