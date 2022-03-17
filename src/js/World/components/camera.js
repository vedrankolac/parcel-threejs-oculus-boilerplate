import { PerspectiveCamera } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 200 );
  camera.position.z = 20;
  camera.position.y = 1.8;
  return camera;
}

export { createCamera };