import {useEffect} from 'react';
import './App.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

let camera, scene, renderer;

export const App = () => {

    const params = {
        clipIntersection: true,
        planeConstant: 0,
        showHelpers: false,
    };

    const clipPlanes = [
        new THREE.Plane(new THREE.Vector3(0, 0, 10), 0), // z1
        new THREE.Plane(new THREE.Vector3(0, 4, 0), 0), // y1
        new THREE.Plane(new THREE.Vector3(4, 0, 0), 0),// x1
        new THREE.Plane(new THREE.Vector3(-4, 0, 0), 0), // x2
        new THREE.Plane(new THREE.Vector3(0, -4, 0), 0),// y2
        new THREE.Plane(new THREE.Vector3(0, 0, -10), 0), // z2
    ];

    function init() {

    }


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);

    camera.position.set(10, 5, 20);
    controls.update();

    const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(mesh);

    const planeGeometry = new THREE.PlaneGeometry(15, 15, 10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);

    const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);


    const globalPlaneZ1 = new THREE.Plane(new THREE.Vector3(0, 0, 10), 1);
    const globalPlaneY1 = new THREE.Plane(new THREE.Vector3(0, 4, 0), 1);
    const globalPlaneX1 = new THREE.Plane(new THREE.Vector3(4, 0, 0), 1);
    const globalPlaneX2 = new THREE.Plane(new THREE.Vector3(-4, 0, 0), 1);
    const globalPlaneY2 = new THREE.Plane(new THREE.Vector3(0, -4, 0), 1);
    const globalPlaneZ2 = new THREE.Plane(new THREE.Vector3(0, 0, -10), 1);

    renderer.clippingPlanes = [globalPlaneZ1, globalPlaneY1, globalPlaneX1, globalPlaneX2, globalPlaneY2, globalPlaneZ2];
    renderer.localClippingEnabled = true;

    const clippingMaterial = new THREE.MeshPhongMaterial({
        clippingPlanes: [localPlane],
        clipShadows: true,
    });


    useEffect(() => {
        document.body.appendChild(renderer.domElement);
        renderer.render(scene, camera);
        animate();

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);


    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        // mesh.rotation.x += .002;
        // mesh.rotation.y += .005;
        // mesh.rotation.z += .009;
        //
        // planeMesh.rotation.x += .004;
        // planeMesh.rotation.y += .008;
        // planeMesh.rotation.z += .002;
    }


    return <div className="App"/>;
};