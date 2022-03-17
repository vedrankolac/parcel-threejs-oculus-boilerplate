import {Math, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide } from 'three';

const createFloor = scene => {
  const geometry = new PlaneGeometry(400, 400, 20, 20);
  const parameters = {
    color: 0x999999,
    side: DoubleSide,
    emissive: 0x000000,
    roughness: 0.6,
    metalness: 0.0
  } 
  const material = new MeshStandardMaterial(parameters);
  const mesh = new Mesh( geometry, material );
  mesh.rotation.x = Math.degToRad(90);
  scene.add(mesh)
  return mesh;
}

export { createFloor };