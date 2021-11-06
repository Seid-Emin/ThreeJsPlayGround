import {useEffect} from 'react';
import './App.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';


export const App = () => {
    let camera, scene, renderer;

    const params = {
        clipIntersection: true,
        planeConstant: {
            x: 1,
            y: -1,
            z: -1
        },
        showHelpers: true,
    };

    const clipPlanes = [
        new THREE.Plane(new THREE.Vector3(1, 0, 0), params.planeConstant.x),
        new THREE.Plane(new THREE.Vector3(0, -1, 0), params.planeConstant.x),
        new THREE.Plane(new THREE.Vector3(0, 0, -1), params.planeConstant.x),
        // new THREE.Plane(new THREE.Vector3(0, 0, 1), -1),
        // new THREE.Plane(new THREE.Vector3(0, 1, 0), -1),
        // new THREE.Plane(new THREE.Vector3(1, 0, 0), -1),
    ];

    useEffect(() => {
        init();
        render();
    }, []);

    function init() {
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.localClippingEnabled = true;
        document.body.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
        camera.position.set(3, 4, 3.0);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render); // use only if there is no animation loop
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.enablePan = false;

        const light = new THREE.HemisphereLight(0xffffff, 0x080808, 1.5);
        light.position.set(-1.25, 1, 1.25);
        scene.add(light);

        const group = new THREE.Group();

        for (let i = 1; i <= 30; i += 2) {
            const geometry = new THREE.SphereGeometry(i / 30, 48, 24);
            const material = new THREE.MeshLambertMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
                side: THREE.DoubleSide,
                clippingPlanes: clipPlanes,
                clipIntersection: params.clipIntersection,
            });

            group.add(new THREE.Mesh(geometry, material));
        }

        scene.add(group);

        // helpers
        const helpers = new THREE.Group();
        helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
        helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
        helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
        // helpers.add(new THREE.PlaneHelper(clipPlanes[3], 2, 0x00FFFF));
        // helpers.add(new THREE.PlaneHelper(clipPlanes[4], 2, 0x008080));
        // helpers.add(new THREE.PlaneHelper(clipPlanes[5], 2, 0x000080));
        helpers.visible = true;
        scene.add(helpers);

        // gui
        const gui = new dat.GUI();

        gui.add(params, 'clipIntersection').name('clip intersection').onChange(function (value) {
            const children = group.children;
            for (let i = 0; i < children.length; i++) {
                children[i].material.clipIntersection = value;
            }

            render();
        });

        // gui.add(params, 'planeConstant', -1, 1).step(0.01).name('plane constant').onChange(function (value) {
        //     for (let j = 0; j < clipPlanes.length; j++) {
        //         clipPlanes[j].constant = value;
        //     }
        //
        //     render();
        // });

        gui.add(params.planeConstant, 'x', -1, 1).step(0.01).name('plane constant x1 ').onChange(function (value) {
            // for (let j = 0; j < clipPlanes.length; j++) {
                clipPlanes[0].constant = value;
            // }

            render();
        });
        gui.add(params.planeConstant, 'y', -1, 1).step(0.01).name('plane constant y1').onChange(function (value) {
            // for (let j = 0; j < clipPlanes.length; j++) {
                clipPlanes[1].constant = value;
            // }

            render();
        });
        gui.add(params.planeConstant, 'z', -1, 1).step(0.01).name('plane constant z1').onChange(function (value) {
            // for (let j = 0; j < clipPlanes.length; j++) {
                clipPlanes[2].constant = value;
            // }

            render();
        });
        // gui.add(params, 'planeConstant', -1, 1).step(0.01).name('plane constant z2').onChange(function (value) {
        //     // for (let j = 0; j < clipPlanes.length; j++) {
        //         clipPlanes[3].constant = value;
        //     // }
        //
        //     render();
        // });
        // gui.add(params, 'planeConstant', -1, 1).step(0.01).name('plane constant y2').onChange(function (value) {
        //     // for (let j = 0; j < clipPlanes.length; j++) {
        //         clipPlanes[4].constant = value;
        //     // }
        //
        //     render();
        // });
        // gui.add(params, 'planeConstant', -1, 1).step(0.01).name('plane constant x2').onChange(function (value) {
        //     // for (let j = 0; j < clipPlanes.length; j++) {
        //         clipPlanes[5].constant = value;
        //     // }
        //
        //     render();
        // });

        gui.add(params, 'showHelpers').name('show helpers').onChange(function (value) {
            helpers.visible = value;

            render();
        });

        window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        render();
    }

    function render() {
        renderer.render(scene, camera);
    }


    return <div className="App"/>;
};