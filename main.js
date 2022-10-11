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

var msg = new SpeechSynthesisUtterance();

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
          // var mds = [content.split(" ")]
          // alert(output)
          // console.log(content.split(" "))
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
scene.background = new THREE.Color(0xefefff);
scene.fog = new THREE.Fog(0xefefff, 10, 50);
var light = new THREE.DirectionalLight(0xefefff, 3);
light.position.set(1, 1, 1).normalize();
scene.add(light);
const hemiLight = new THREE.HemisphereLight(0xefefff, 3);
hemiLight.position.set(-1, -1, -1).normalize();
scene.add(hemiLight);
//Divisão do fundo
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshPhongMaterial({ color: 0x87ceeb, depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
scene.add(mesh);
//Quadriculado
const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);
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

  mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).setLoop(THREE.LoopOnce);
  mixer.clipAction(gltf.animations[wave]).play();
  mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
  setInterval(() => {
    if (output === "fala comigo") {
      audio.play();
      output = "";
    }
    if (output === "Oi" || output === "olá" || output === "tchau") {
      mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[wave]).fadeIn(0.5).play();
      output = "";
    }
    if (output === "senta" || output === "sente") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[sitting]).fadeIn(1).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[sitting]).setEffectiveTimeScale(0);
      }, 200);
      output = "";
    }
    if (output === "levanta" || output === "levante") {
      mixer.clipAction(gltf.animations[sitting]).fadeOut(1).play();
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      // mixer.clipAction(gltf.animations[standing]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[sitting]).setEffectiveTimeScale(1);
        mixer.clipAction(gltf.animations[sitting]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
        // mixer.clipAction(gltf.animations[standing]).setEffectiveTimeScale(0);
      }, 1000);
      output = "";
    }
    if (output === "dança" || output === "dance") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[dance]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[look]).stop();
      }, 500);
      output = "";
    }
    if (output === "pare de dançar" || output === "para de dançar") {
      mixer.clipAction(gltf.animations[dance]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[dance]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (output === "corre" || output === "corra") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[run]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[look]).stop();
      }, 500);
      output = "";
    }
    if (output === "pare de correr" || output === "para de correr") {
      mixer.clipAction(gltf.animations[run]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[run]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (output === "anda" || output === "ande") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[walking]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[look]).stop();
      }, 500);
      output = "";
    }
    if (output === "pare de andar" || output === "para de andar") {
      mixer.clipAction(gltf.animations[walking]).fadeOut(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[walking]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      output = "";
    }
    if (output === "quer me bater") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[punch]).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[punch]).fadeOut(0.5).play();
        mixer.clipAction(gltf.animations[look]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 400);
      output = "";
    }
    if (output === "tudo bem com você") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[sayYes]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[sayYes]).fadeOut(0.5).play();
        mixer.clipAction(gltf.animations[look]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 1500);
      output = "";
    }
    if (output === "salta" || output === "pule") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[jump]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[jump]).fadeOut(0.5).play();
        mixer.clipAction(gltf.animations[look]).stop();
        mixer.clipAction(gltf.animations[look]).fadeIn(0.5).play();
      }, 500);
      setTimeout(() => {
        mixer.clipAction(gltf.animations[jump]).stop();
      }, 700);
      output = "";
    }
    if (output === "finge de morto" || output === "desliga") {
      mixer.clipAction(gltf.animations[look]).fadeIn(0.5).stop();
      mixer.clipAction(gltf.animations[dead]).fadeIn(0.5).play();
      setTimeout(() => {
        mixer.clipAction(gltf.animations[dead]).setEffectiveTimeScale(0);
      }, 900);
      output = "";
    }
    if (output === "volta aqui" || output === "ressuscita") {
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
    if (output.split(" ")[0] === "soma" || output.split(" ")[0] === "somar") {
      msg.text = `O resultado da soma é: ${
        parseInt(output.split(" ")[1]) + parseInt(output.split(" ")[3])
      }`;
      window.speechSynthesis.speak(msg);
      output = "";
    }
    if (
      output.split(" ")[0] === "subtrai" ||
      output.split(" ")[0] === "subtrair"
    ) {
      msg.text = `O resultado da subtração é: ${
        parseInt(output.split(" ")[1]) - parseInt(output.split(" ")[3])
      }`;
      window.speechSynthesis.speak(msg);
      output = "";
    }
    if (
      output.split(" ")[0] === "multiplica" ||
      output.split(" ")[0] === "multiplicar"
    ) {
      msg.text = `O resultado da multiplicação é: ${
        parseInt(output.split(" ")[1]) * parseInt(output.split(" ")[3])
      }`;
      window.speechSynthesis.speak(msg);
      output = "";
    }
    if (
      output.split(" ")[0] === "divida" ||
      output.split(" ")[0] === "dividir"
    ) {
      msg.text = `O resultado da divisão é: ${
        parseInt(output.split(" ")[1]) / parseInt(output.split(" ")[3])
      }`;
      window.speechSynthesis.speak(msg);
      output = "";
    }
  }, 100);
});

var clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);
  // if (model) camera.rotation.y += 0.025;
  // if (model) model.rotation.y += 0.025;

  renderer.render(scene, camera);
}

render();
