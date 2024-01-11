import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui'; //npm install dat.gui

const renderer = new THREE.WebGLRenderer();

// Shadow
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camere = new THREE.PerspectiveCamera(
    75, //fov - Field of View
    window.innerWidth / window.innerHeight, //Aspect Radio
    0.1, //Near
    1000 //Far 
);

//orbit 
const orbit = new OrbitControls(camere, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camere.position.set(-10, 30, 30); //set(x-axis, y-axis, z-axis)

//orbit
orbit.update();

// Box Geometry
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial( {color : 0xcdaaef});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;

// Grid Helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


// Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(3, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color : 0x18c297,
    wireframe : false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.castShadow = true

sphere.position.set(-10, 10, 0);


// Dat GUI
const gui = new dat.GUI();

const options = {
    sphereColor : 0x18c297,
    wireframe : false,
    speed : 0.01
}

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = true;
});

gui.add(options, 'speed', 0, 0.1);  // add(object_name, object_key, min, max)

let step = 0;


// Ambient Light
const ambientLight = new THREE.AmbientLight(0xe1e1e1);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 40, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Camera Helper
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);


function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camere);

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
}

renderer.setAnimationLoop(animate);

