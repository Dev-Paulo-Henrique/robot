const dance = 0;
const dead = 1;
const look = 2;
const jump = 3;
const sayNo = 4;
const punch = 5;
const run = 6;
const sitting = 7;
const standing = 8;
const thumbsUp = 9;
const walking = 10;
const jumpAndRun = 11;
const wave = 12;
const sayYes = 13;
var output = document.querySelector("#output").textContent;

var audio = new Audio(
  "https://thumbs.dreamstime.com/audiothumb_10834/108343657.mp3"
);
var areYouthere = 0;

// const actions = [ dance, dead, look, jump, sayNo, punch, run, sitting, standing, thumbsUp, walking, jumpAndRun, wave, sayYes ];

(() => {
  function start() {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = function (event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const content = event.results[i][0].transcript.trim();
          output = content;
        }
      }
    };
  }
  document.addEventListener("DOMContentLoaded", () => start());
})();

var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// renderer.setPixelRatio( window.devicePixelRatio );
// renderer.outputEncoding = THREE.sRGBEncoding;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;
camera.position.y = 1;
var light = new THREE.DirectionalLight(0xefefff, 3);
light.position.set(1, 1, 1).normalize();
scene.add(light);
var light = new THREE.DirectionalLight(0xffefef, 3);
light.position.set(-1, -1, -1).normalize();
scene.add(light);
window.addEventListener("resize", function () {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
var loader = new THREE.GLTFLoader();
var mixer;
var model;

loader.load("RobotExpressive.glb", function (gltf) {
  gltf.scene.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
      node.material.side = THREE.DoubleSide;
    }
  });

  model = gltf.scene;
  model.scale.set(0.35, 0.35, 0.35);
  scene.add(model);

  
  mixer = new THREE.AnimationMixer(model);
  //   let playLooking =
  //   let stopLooking =

  mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).setLoop(THREE.LoopOnce);
  mixer.clipAction(gltf.animations[wave]).play();
  mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
  setInterval(() => {
    if (output === "fala comigo") {
      audio.play();
      output = "";
    }
    if (
      output === "Oi" ||
      output === "olá" ||
      output === "tchau"
    ) {
      mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).play();
      output = "";
    }
    if (output === "corre") {
      mixer.clipAction(gltf.animations[look]).fadeOut(0.5).play();
      mixer.clipAction(gltf.animations[run]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[look]).stop();
      }, 500);
      output = "";
    }
    if (output === "pare de correr") {
      mixer.clipAction(gltf.animations[run]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[run]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (output === "anda") {
      mixer.clipAction(gltf.animations[look]).fadeOut(0.5).play();
      mixer.clipAction(gltf.animations[walking]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[look]).stop();
      }, 500);
      output = "";
    }
    if (output === "pare de andar") {
      mixer.clipAction(gltf.animations[walking]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[walking]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (output === "tudo bem com você") {
      mixer.clipAction(gltf.animations[look]).fadeOut(0.5).play();
      mixer.clipAction(gltf.animations[sayYes]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[sayYes]).fadeOut(0.5).play();
        mixer.clipAction(gltf.animations[look]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 1500);
      output = "";
    }
    if (output === "salta" || output === "pula") {
      mixer.clipAction(gltf.animations[look]).fadeOut(0.5).play();
      mixer.clipAction(gltf.animations[jump]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[jump]).fadeOut(0.5).play();
        mixer.clipAction(gltf.animations[jump]).stop();
        mixer.clipAction(gltf.animations[look]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 600);
      output = "";
    }
    if (output === "finge de morto") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[dead]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[dead]).setEffectiveTimeScale(0);
      }, 900);
      output = "";
    }
    if (output === "volta aqui") {
      mixer.clipAction(gltf.animations[dead]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[dead]).setEffectiveTimeScale(1);
        mixer.clipAction(gltf.animations[dead]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (
      output === "certeza" ||
      output === "tem certeza" ||
      output === "como você está"
    ) {
      mixer.clipAction(gltf.animations[thumbsUp]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[thumbsUp]).stop();
      }, 1500);
      output = "";
    }
    if (output === "tá com fome") {
      mixer.clipAction(gltf.animations[sayNo]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[sayNo]).fadeIn(0.5).stop();
        mixer.clipAction(gltf.animations[look]).play();
      }, 1600);
      output = "";
    }
  }, 1000);
});

var clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);
  //if (model) model.rotation.y += 0.025;

  renderer.render(scene, camera);
}

render();
