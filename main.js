(() => {
    const output = document.querySelector('#output');
    function start() {
        const recognition = new webkitSpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = "pt-BR";
        recognition.continuous = true;
        recognition.start();
        // This event happens when you talk in the microphone
        recognition.onresult = function (event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    // Here you can get the string of what you told
                    const content = event.results[i][0].transcript.trim();
                    output.textContent = content
                }
            }
        };
    };
    document.addEventListener('DOMContentLoaded', () => start());
})();

var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
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
    mixer.clipAction(gltf.animations[10]).play();
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
