import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let popcorn;
let scroll_target  = 0;
let current_scroll = 0;

camera.position.z = 12


const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);



const ambientLight = new THREE.AmbientLight(0xffffff, 4); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

renderer.render(scene, camera);
const background_texture = new THREE.TextureLoader().load('/grid_background.png');
scene.background = background_texture;


const model_loader = new GLTFLoader();
model_loader.load('/popcorn.glb', function (gltf) {
    popcorn = gltf.scene;
    scene.add(popcorn);
    popcorn.position.set(4, 0, 6);
    popcorn.scale.set(2.8, 2.8, 2.8)
}, undefined, function (error) {
    console.error(error)
});

function animate() {
    renderer.render(scene, camera);
    if (popcorn) {
        current_scroll += (scroll_target - current_scroll) * 0.1;
        popcorn.position.x = 4 + (current_scroll * -0.00001);
        popcorn.position.z = 6 + (current_scroll * -0.005);
        
        popcorn.rotation.y += 0.01;
        popcorn.rotation.z = current_scroll * -0.001;
    }

}

function movePopcorn() {
  scroll_target = document.body.getBoundingClientRect().top;
}


window.addEventListener('scroll', movePopcorn);




window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0,0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        movePopcorn();
    }, 50);
});