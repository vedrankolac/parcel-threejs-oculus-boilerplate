import { BoxGeometry, Mesh } from 'three';

const cube = material => {
  const geometry = new BoxGeometry();
  const mesh = new Mesh( geometry, material );
  const speed = Math.random() + 0.4;

  mesh.tick = (delta) => {
    mesh.rotation.x += delta * speed;
    mesh.rotation.y += delta * speed;
  };

  return mesh;
}

export { cube };