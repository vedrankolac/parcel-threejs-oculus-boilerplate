import { SphereGeometry, Mesh } from 'three';

const sphere = material => {
  const geometry = new SphereGeometry();
  const mesh = new Mesh( geometry, material );

  return mesh;
}

export { sphere };