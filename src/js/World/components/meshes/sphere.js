import { SphereGeometry, Mesh } from 'three';

const sphere = (material, radius) => {
  const geometry = new SphereGeometry(radius, 64, 64);
  const mesh = new Mesh( geometry, material );

  return mesh;
}

export { sphere };