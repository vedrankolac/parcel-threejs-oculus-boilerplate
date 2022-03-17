import {MeshStandardMaterial} from 'three';

const blue = color => {
  const parameters = {
    color: color,
    emissive: 0x000000,
    roughness: 0.34,
    metalness: 0.2
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export { blue };