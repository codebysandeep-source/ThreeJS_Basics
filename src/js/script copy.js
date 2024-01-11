//project package initialization -> npm init
//3js packages install -> npm install three
//for running code - install -> npm instal parcel -g
//to run code ->  parcel ./src/index.html
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
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

camere.position.set(0, 2, 5); //set(x-axis, y-axis, z-axis)

//orbit
orbit.update();

// Geometry
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial( {color : 0xcdaaef});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camere);
}

renderer.setAnimationLoop(animate);

