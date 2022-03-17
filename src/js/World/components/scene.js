import { Scene, Color, Fog, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';


const createScene = renderer => {
  const scene = new Scene();
  scene.background = new Color( 0xffffff );
  
  const fog = new Fog( 0xffffff, 0, 200 );
  scene.fog = fog;
  
  const pmremGenerator = new PMREMGenerator(renderer);
  // scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.001 ).texture;

  return scene;
}

export { createScene };