import { AmbientLight, DirectionalLight, PointLight } from 'three';

const createLights = scene => {
  const light_ambient = new AmbientLight({ color: 0x000000, intensity: 1 })
  scene.add(light_ambient)

  const light = new DirectionalLight('white', 2);
  light.position.set(6, 6, 6);
  scene.add(light)

  const light1 = new PointLight( 0xffffff, 200, 0 );
  light1.position.set( 0, 200, 0 );
  scene.add( light1 );

  const light2 = new PointLight( 0xffffff, 200, 0 );
  light2.position.set( 100, 200, 100 );
  scene.add( light2 );

  const light3 = new PointLight( 0xffffff, 200, 0 );
  light3.position.set( - 100, - 200, - 100 );
  scene.add( light3 );
}

export { createLights };