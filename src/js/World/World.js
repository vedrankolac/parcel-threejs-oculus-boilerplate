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
import { createFloor } from './components/meshes/floor.js'
import { VrControls } from './system/VrControls.js'

let loop;

class World {
  constructor() {
    const renderer = createRenderer();
    const scene = createScene(renderer);
    const camera = createCamera();
    loop = new Loop(camera, scene, renderer);

    const controls = new OrbitControls(camera, renderer.domElement)
    const vrControls = new VrControls(renderer, scene);
    loop.updatables.push(vrControls);

    const lights = createLights(scene);
    const material = blue(0x292999);

    const floor = createFloor(scene);

    const xItems = 32;
    const yItems = 4;
    const yShift = 3;
    for (let i = 0; i < xItems; i++) {
      for (let j = 0; j < yItems; j++) {
        let temp_cube = cube(material);
        temp_cube.position.x = (i - xItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - yItems/2) * 1.2 + 0.5 + yShift;
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