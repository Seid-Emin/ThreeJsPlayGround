import { useEffect } from 'react';
import './App.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { gui } from './core/components/gui.component'


export const App = ( ) => {
    const world = {
        plane: {
            width: 10,
            height: 10
        }
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const rendered = new THREE.WebGLRenderer();

    rendered.setSize(window.innerWidth, window.innerHeight);
    rendered.setPixelRatio(devicePixelRatio);

    camera.position.z = 5;

    const planeGeometry = new THREE.PlaneGeometry(4, 4, 10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000, side: THREE.DoubleSide, flatShading: THREE.FlatShading });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

        // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
        // const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        // scene.add(mesh);
        scene.add(planeMesh);

        const { array } = planeMesh.geometry.attributes.position;
        for (let i = 0; i < array.length; i += 3) {
            const z = array[i + 2];

            array[i + 2] = z + Math.random();
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1);
        scene.add(light);


    useEffect(() => {
        // if (!gui.__controllers.find(controller => controller.property === 'width')) {
            gui.add(world.plane, 'width', 1, 500).onChange(() => {
                planeMesh.geometry.dispose();
                planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, 4, 10)

                const { array } = planeMesh.geometry.attributes.position;
                for (let i = 0; i < array.length; i += 3) {
                    const z = array[i + 2];

                    array[i + 2] = z + Math.random();
                }
            });
        // }


        document.body.appendChild(rendered.domElement);
        // rendered.render(scene, camera);
        animate();

        return () => {
            document.body.removeChild(rendered.domElement);
        };
    }, []);


    function animate() {
        requestAnimationFrame(animate);
        rendered.render(scene, camera);
    // mesh.rotation.x += .002;
    // mesh.rotation.y += .005;
    // mesh.rotation.z += .009;
    }


    return <div className="App"/>;
};