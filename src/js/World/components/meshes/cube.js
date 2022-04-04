import { BoxGeometry, Mesh } from 'three';

const cube = (material, width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const mesh = new Mesh( geometry, material );
  // const speed = Math.random() + 0.4;

  mesh.tick = (delta) => {
    // mesh.rotation.x += delta * speed;
    // mesh.rotation.y += delta * speed;
  };

  return mesh;
}

export { cube };