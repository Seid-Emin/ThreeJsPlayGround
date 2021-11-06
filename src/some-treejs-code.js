// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xaaaaaa);
//
// const cam = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth,
//     window.innerHeight,
//     0.1,
//     1000
// );
//
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// document.body.appendChild(renderer.domElement);
//
// cam.position.z = 5;
//
// const light = new THREE.PointLight(0xffffff, 4, 100);
// light.position.x = 1;
// light.position.y = -1;
// scene.add(light);
//
// const light2 = new THREE.DirectionalLight(0xffffff, 1);
// light2.position.x = 1;
// light2.position.y = -1;
// light2.position.z = 1;
// scene.add(light2);
//
// const texture = new THREE.TextureLoader().load('./core/assets/rock_texture.jpg');
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
// const material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
// const material2 = new THREE.MeshLambertMaterial({ color: 0x000000 });
//
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// const cube2 = new THREE.Mesh(geometry, material2);
// scene.add(cube2);
//
// const orbit = new OrbitControls(cam, renderer.domElement);
//
// // adding resizing capability
// window.addEventListener('resize', () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//
//     renderer.setSize(width, height)
// })