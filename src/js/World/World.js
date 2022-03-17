import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { blue } from './components/materials/blue.js';
import { cube } from './components/meshes/cube.js'
import { sphere } from './components/meshes/sphere.js'

let loop;

class World {
  constructor() {
    const renderer = createRenderer();
    const scene = createScene(renderer);
    const camera = createCamera();
    loop = new Loop(camera, scene, renderer);

    const controls = new OrbitControls(camera, renderer.domElement)
    const lights = createLights(scene);
    const material = blue(0x2222cc);

    const nItems = 8;
    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let temp_cube = cube(material);
        temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5;
        temp_cube.position.z = -4;
        scene.add( temp_cube );
        loop.updatables.push(temp_cube);
      }
    }
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };