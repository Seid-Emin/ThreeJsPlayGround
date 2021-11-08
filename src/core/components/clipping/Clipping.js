// import * as THREE  from 'three';
//
// export const Clipping = {
//     // materials
//     BoxWireframe: new THREE.LineBasicMaterial({ color: 0x000000, lineWidth: 2 }),
//     BoxWireActive: new THREE.LineBasicMaterial({ color: 0xf83610, lineWidth: 4 }),
//     lines: [],
//     selection(low, high) {
//         this.limitLow = low;
//         this.limitHigh = high;
//
//         this.box = new THREE.BoxGeometry(1, 1, 1);
//         this.boxMesh = new THREE.Mesh(this.box, Clipping.BoxWireframe);
//
//         this.vertices = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
//         this.updateVertices();
//
//         const v = this.vertices;
//
//         // this.touchMeshes = new THREE.Object3D();
//         // this.displayMeshes = new THREE.Object3D();
//         this.meshGeometries = [];
//         this.lineGeometries = [];
//         this.selectables = [];
//
//         this.faces = [];
//         const f = this.faces;
//         this.faces.push(new Clipping.selectionBoxFace('y1', v[0], v[1], v[5], v[4], this));
//         this.faces.push(new Clipping.selectionBoxFace('z1', v[0], v[2], v[3], v[1], this));
//         this.faces.push(new Clipping.selectionBoxFace('x1', v[0], v[4], v[6], v[2], this));
//         this.faces.push(new Clipping.selectionBoxFace('x2', v[7], v[5], v[1], v[3], this));
//         this.faces.push(new Clipping.selectionBoxFace('y2', v[7], v[3], v[2], v[6], this));
//         this.faces.push(new Clipping.selectionBoxFace('z2', v[7], v[6], v[4], v[5], this));
//
//         const l0 = new Clipping.selectionBoxLine(v[0], v[1], f[0], f[1], this);
//         const l1 = new Clipping.selectionBoxLine(v[0], v[2], f[1], f[2], this);
//         const l2 = new Clipping.selectionBoxLine(v[0], v[4], f[0], f[2], this);
//         const l3 = new Clipping.selectionBoxLine(v[1], v[3], f[1], f[3], this);
//         const l4 = new Clipping.selectionBoxLine(v[1], v[5], f[0], f[3], this);
//         const l5 = new Clipping.selectionBoxLine(v[2], v[3], f[1], f[4], this);
//         const l6 = new Clipping.selectionBoxLine(v[2], v[6], f[2], f[4], this);
//         const l7 = new Clipping.selectionBoxLine(v[3], v[7], f[3], f[4], this);
//         const l8 = new Clipping.selectionBoxLine(v[4], v[5], f[0], f[5], this);
//         const l9 = new Clipping.selectionBoxLine(v[4], v[6], f[2], f[5], this);
//         const l10 = new Clipping.selectionBoxLine(v[5], v[7], f[3], f[5], this);
//         const l11 = new Clipping.selectionBoxLine(v[6], v[7], f[4], f[5], this);
//
//         this.setBox();
//         this.setUniforms();
//     },
//     planeGeometry(v0, v1, v2, v3) {
//         THREE.BufferGeometry.call(this);
//
//         this.vertices.push(v0, v1, v2, v3);
//         this.faces.push(new THREE.Face3(0, 1, 2));
//         this.faces.push(new THREE.Face3(0, 2, 3));
//
//         this.computeFaceNormals();
//         this.computeVertexNormals();
//     },
//     selectionBoxFace(axis, v0, v1, v2, v3, selection) {
//         const frontFaceGeometry = new Clipping.planeGeometry(v0, v1, v2, v3);
//         frontFaceGeometry.dynamic = true;
//         selection.meshGeometries.push(frontFaceGeometry);
//
//         const frontFaceMesh = new THREE.Mesh(frontFaceGeometry, Clipping.ma);
//         frontFaceMesh.axis = axis;
//         frontFaceMesh.guardian = this;
//         selection.touchMeshes.add(frontFaceMesh);
//         selection.selectables.push(frontFaceMesh);
//
//         const backFaceGeometry = new Clipping.planeGeometry(v3, v2, v1, v0);
//         backFaceGeometry.dynamic = true;
//         selection.meshGeometries.push(backFaceGeometry);
//
//         const backFaceMesh = new THREE.Mesh(backFaceGeometry, Clipping.BoxWireframe);
//         selection.displayMeshes.add(backFaceMesh);
//
//         Clipping.lines = [];
//     },
//     selectionBoxLine(v0, v1, f0, f1, selection) {
//         const lineGeometry = new THREE.BufferGeometry();
//         lineGeometry.vertices.push(v0, v1);
//         lineGeometry.computeLineDistances();
//         lineGeometry.dynamic = true;
//         selection.lineGeometries.push(lineGeometry);
//
//         this.line = new THREE.LineSegments(lineGeometry, Clipping.BoxWireframe);
//         selection.displayMeshes.add(this.line);
//
//         f0.lines.push(this);
//         f1.lines.push(this);
//     },
//     uniforms: {
//         clipping: {
//             color: { type: 'c', value: new THREE.Color(0x3d9ecb) },
//             clippingLow: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
//             clippingHigh: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
//         },
//
//         caps: {
//             color: { type: 'c', value: new THREE.Color(0xf83610) },
//         },
//     },
//     setToNormalizedDeviceCoordinates(event, window) {
//
//         this.setFromEvent(event);
//         this.x = (this.x / window.innerWidth) * 2 - 1;
//         this.y = -(this.y / window.innerHeight) * 2 + 1;
//         return this;
//
//     },
//     setFromEvent(event) {
//         this.x = (event.clientX !== undefined) ? event.clientX : (event.touches && event.touches[0].clientX);
//         this.y = (event.clientY !== undefined) ? event.clientY : (event.touches && event.touches[0].clientY);
//         return this;
//
//     },
//     picking( simulation ) {
//         let intersected, value = null;
//         const mouse = new THREE.Vector2();
//         const ray = new THREE.Raycaster();
//
//         const normals = {
//             x1: new THREE.Vector3( -1,  0,  0 ),
//             x2: new THREE.Vector3(  1,  0,  0 ),
//             y1: new THREE.Vector3(  0, -1,  0 ),
//             y2: new THREE.Vector3(  0,  1,  0 ),
//             z1: new THREE.Vector3(  0,  0, -1 ),
//             z2: new THREE.Vector3(  0,  0,  1 )
//         };
//
//         const plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), CAPS.MATERIAL.Invisible );
//         simulation.scene.add( plane );
//
//         const targeting = function ( event ) {
//
//             mouse.setToNormalizedDeviceCoordinates = this.setToNormalizedDeviceCoordinates( event, window );
//
//             ray.setFromCamera( mouse, simulation.camera );
//
//             const intersects = ray.intersectObjects( simulation.selection.selectables );
//
//             if ( intersects.length > 0 ) {
//                 const candidate = intersects[ 0 ].object;
//
//                 if ( intersected !== candidate ) {
//                     if ( intersected !== null ) {
//                         intersected.guardian.rayOut();
//                     }
//
//                     candidate.guardian.rayOver();
//                     intersected = candidate;
//
//                     simulation.renderer.domElement.style.cursor = 'pointer';
//                     // simulation.throttledRender();
//                 }
//             } else if ( intersected !== null ) {
//                 intersected.guardian.rayOut();
//                 intersected = null;
//
//                 simulation.renderer.domElement.style.cursor = 'auto';
//                 // simulation.throttledRender();
//             }
//         };
//
//         const beginDrag = function ( event ) {
//             mouse.setToNormalizedDeviceCoordinates = this.setToNormalizedDeviceCoordinates( event, window );
//             ray.setFromCamera( mouse, simulation.camera );
//             const intersects = ray.intersectObjects( simulation.selection.selectables );
//
//             if ( intersects.length > 0 ) {
//                 event.preventDefault();
//                 event.stopPropagation();
//                 simulation.controls.enabled = false;
//
//                 const intersectionPoint = intersects[ 0 ].point;
//                 const axis = intersects[ 0 ].object.axis;
//
//                 if ( axis === 'x1' || axis === 'x2' ) {
//                     intersectionPoint.setX( 0 );
//                 } else if ( axis === 'y1' || axis === 'y2' ) {
//                     intersectionPoint.setY( 0 );
//                 } else if ( axis === 'z1' || axis === 'z2' ) {
//                     intersectionPoint.setZ( 0 );
//                 }
//
//                 plane.position.copy( intersectionPoint );
//
//                 const newNormal = simulation.camera.position.clone().sub(
//                     simulation.camera.position.clone().projectOnVector( normals[ axis ] )
//                 );
//
//                 plane.lookAt( newNormal.add( intersectionPoint ) );
//                 simulation.renderer.domElement.style.cursor = 'move';
//                 // simulation.throttledRender();
//
//                 const continueDrag = function ( event ) {
//                     event.preventDefault();
//                     event.stopPropagation();
//
//                     mouse.setToNormalizedDeviceCoordinates = Clipping.setToNormalizedDeviceCoordinates( event, window );
//                     ray.setFromCamera( mouse, simulation.camera );
//
//                     const intersects = ray.intersectObject( plane );
//                     if ( intersects.length > 0 ) {
//                         if ( axis === 'x1' || axis === 'x2' ) {
//                             value = intersects[ 0 ].point.x;
//                         } else if ( axis === 'y1' || axis === 'y2' ) {
//                             value = intersects[ 0 ].point.y;
//                         } else if ( axis === 'z1' || axis === 'z2' ) {
//                             value = intersects[ 0 ].point.z;
//                         }
//
//                         simulation.selection.setValue( axis, value );
//                         // simulation.throttledRender();
//                     }
//                 };
//
//                 const endDrag = function ( event ) {
//                     simulation.controls.enabled = true;
//                     simulation.renderer.domElement.style.cursor = 'pointer';
//
//                     document.removeEventListener( 'mousemove',   continueDrag, true );
//                     document.removeEventListener( 'mouseup',     endDrag, false );
//
//                 };
//
//                 document.addEventListener( 'mousemove', continueDrag, true );
//                 document.addEventListener( 'mouseup',     endDrag, false );
//             }
//         };
//
//         simulation.renderer.domElement.addEventListener( 'mousemove',  targeting, true );
//         simulation.renderer.domElement.addEventListener( 'mousedown',  beginDrag, false );
//     }
// };
//
// Clipping.selection.prototype = {
//     constructor: Clipping.selection,
//
//     updateVertices: function () {
//         this.vertices[0].set(this.limitLow.x, this.limitLow.y, this.limitLow.z);
//         this.vertices[1].set(this.limitHigh.x, this.limitLow.y, this.limitLow.z);
//         this.vertices[2].set(this.limitLow.x, this.limitHigh.y, this.limitLow.z);
//         this.vertices[3].set(this.limitHigh.x, this.limitHigh.y, this.limitLow.z);
//         this.vertices[4].set(this.limitLow.x, this.limitLow.y, this.limitHigh.z);
//         this.vertices[5].set(this.limitHigh.x, this.limitLow.y, this.limitHigh.z);
//         this.vertices[6].set(this.limitLow.x, this.limitHigh.y, this.limitHigh.z);
//         this.vertices[7].set(this.limitHigh.x, this.limitHigh.y, this.limitHigh.z);
//     },
//
//     updateGeometries: function () {
//         for (let i = 0; i < this.meshGeometries.length; i++) {
//             this.meshGeometries[i].verticesNeedUpdate = true;
//             this.meshGeometries[i].computeBoundingSphere();
//             this.meshGeometries[i].computeBoundingBox();
//         }
//
//         for (let i = 0; i < this.lineGeometries.length; i++) {
//             this.lineGeometries[i].verticesNeedUpdate = true;
//         }
//     },
//
//     setBox: function () {
//         const width = new THREE.Vector3();
//         width.subVectors(this.limitHigh, this.limitLow);
//
//         this.boxMesh.scale.copy(width);
//         width.multiplyScalar(0.5).add(this.limitLow);
//         this.boxMesh.position.copy(width);
//     },
//
//     setUniforms: function () {
//         const uniforms = Clipping.uniforms.clipping;
//         uniforms.clippingLow.value.copy(this.limitLow);
//         uniforms.clippingHigh.value.copy(this.limitHigh);
//     },
//
//     setValue: function (axis, value) {
//         const buffer = 0.4;
//         const limit = 14;
//
//         if (axis === 'x1') {
//             this.limitLow.x = Math.max(-limit, Math.min(this.limitHigh.x - buffer, value));
//         } else if (axis === 'x2') {
//             this.limitHigh.x = Math.max(this.limitLow.x + buffer, Math.min(limit, value));
//         } else if (axis === 'y1') {
//             this.limitLow.y = Math.max(-limit, Math.min(this.limitHigh.y - buffer, value));
//         } else if (axis === 'y2') {
//             this.limitHigh.y = Math.max(this.limitLow.y + buffer, Math.min(limit, value));
//         } else if (axis === 'z1') {
//             this.limitLow.z = Math.max(-limit, Math.min(this.limitHigh.z - buffer, value));
//         } else if (axis === 'z2') {
//             this.limitHigh.z = Math.max(this.limitLow.z + buffer, Math.min(limit, value));
//         }
//
//         this.setBox();
//         this.setUniforms();
//
//         this.updateVertices();
//         this.updateGeometries();
//     },
// };
//
// Clipping.selectionBoxFace.prototype = {
//     constructor: Clipping.selectionBoxFace,
//
//     rayOver: function () {
//         this.highlightLines(true);
//     },
//
//     rayOut: function () {
//         this.highlightLines(false);
//     },
//
//     highlightLines: function (b) {
//         for (let i = 0; i < this.lines.length; i++) {
//             this.lines[i].setHighlight(b);
//         }
//     },
// };
//
// Clipping.selectionBoxLine.prototype = {
//     constructor: Clipping.selectionBoxLine, setHighlight: function (b) {
//         this.line.material = b ? Clipping.BoxWireActive : Clipping.BoxWireframe;
//     },
// };
//
// Clipping.planeGeometry.prototype = new THREE.BufferGeometry();
// Clipping.planeGeometry.prototype.constructor = Clipping.planeGeometry;