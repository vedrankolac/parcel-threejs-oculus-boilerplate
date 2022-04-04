import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { blue } from './components/materials/blue.js';
import { cube } from './components/meshes/cube.js'
import { createFloor } from './components/meshes/floor.js'
import { VrControls } from './system/VrControls.js'

class World {
  constructor() {
    const renderer = createRenderer();
    const scene = createScene(renderer);
    const camera = createCamera();
    this.loop = new Loop(camera, scene, renderer);

    const dolly = createDolly(camera, scene);
    dolly.position.set(0, 0, 40);

    const vrControls = new VrControls(renderer, dolly, camera);
    this.loop.updatables.push(vrControls);

    const floor = createFloor(scene);
    const lights = createLights(scene);
    const material = blue(0x292966);

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
        this.loop.updatables.push(temp_cube);
      }
    }
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };