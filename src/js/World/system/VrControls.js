import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  AdditiveBlending,
  Line,
  RingGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

let controller1;
let controller2;
let controllerGrip1;
let controllerGrip2;

class VrControls {
  constructor (renderer, scene) {
    // this class is based on this example:
    // https://threejs.org/examples/?q=webxr#webxr_vr_ballshooter

    controller1 = renderer.xr.getController( 0 );
    controller1.addEventListener('selectstart', this.onSelectStart);
    controller1.addEventListener('selectend', this.onSelectEnd);
    controller1.addEventListener('connected', event => controller1.add(this.buildController(event.data)));
    controller1.addEventListener('disconnected', () => controller1.remove(controller1.children[ 0 ]));
    scene.add(controller1);

    controller2 = renderer.xr.getController( 1 );
    controller2.addEventListener( 'selectstart', this.onSelectStart );
    controller2.addEventListener( 'selectend', this.onSelectEnd );
    controller2.addEventListener('connected', event => controller2.add(this.buildController(event.data)));
    controller2.addEventListener('disconnected', () => controller2.remove(controller2.children[ 0 ]));
    scene.add(controller2);

    const controllerModelFactory = new XRControllerModelFactory();

    controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );
    
    controllerGrip2 = renderer.xr.getControllerGrip( 1 );
    controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
    scene.add( controllerGrip2 );
  }

  buildController(data) {
    let geometry, material;
    switch ( data.targetRayMode ) {
      case 'tracked-pointer':
        geometry = new BufferGeometry();
        geometry.setAttribute( 'position', new Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
        geometry.setAttribute( 'color', new Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );
        material = new LineBasicMaterial( { vertexColors: true, blending: AdditiveBlending } );
        return new Line( geometry, material );
      case 'gaze':
        geometry = new RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
        material = new MeshBasicMaterial( { opacity: 0.5, transparent: true } );
        return new Mesh( geometry, material );
      default:
        break;
    }
  }

  onSelectStart() {
    this.userData.isSelecting = true;
  }

  onSelectEnd() {
    this.userData.isSelecting = false;
  }

  tick(delta) {
    this.handleController(controller1);
    this.handleController(controller2);
  }

  handleController(controller) {
    if ( controller.userData.isSelecting ) {
      // here goes the code for isSelectiong event
    }
  }
}

export { VrControls };