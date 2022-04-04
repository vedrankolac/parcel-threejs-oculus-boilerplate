import {MeshStandardMaterial} from 'three';

const blue = color => {
  const parameters = {
    color: color,
    emissive: 0x040404,
    roughness: 0.4,
    metalness: 0.6
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export { blue };