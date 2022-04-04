// this class is based on this examples:
// https://threejs.org/examples/?q=webxr#webxr_vr_ballshooter
// https://codepen.io/jason-buchheim/details/zYqYGXM
// https://cdpn.io/jason-buchheim/debug/zYqYGXM

import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  AdditiveBlending,
  Line,
  RingGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  Math
} from 'three';

class VrControls {
  constructor (renderer, dolly, camera) {
    this.renderer = renderer;
    this.dolly = dolly;
    this.camera = camera;
    this.cameraVector = new Vector3();

    this.controller1 = this.renderer.xr.getController( 0 );
    this.controller1.addEventListener('selectstart', this.onSelectStart);
    this.controller1.addEventListener('selectend', this.onSelectEnd);
    this.controller1.addEventListener('connected', event => this.controller1.add(this.buildController(event.data)));
    this.controller1.addEventListener('disconnected', () => this.controller1.remove(this.controller1.children[ 0 ]));
    this.dolly.add(this.controller1);

    this.controller2 = this.renderer.xr.getController( 1 );
    this.controller2.addEventListener( 'selectstart', this.onSelectStart );
    this.controller2.addEventListener( 'selectend', this.onSelectEnd );
    this.controller2.addEventListener('connected', event => this.controller2.add(this.buildController(event.data)));
    this.controller2.addEventListener('disconnected', () => this.controller2.remove(this.controller2.children[ 0 ]));
    this.dolly.add(this.controller2);

    const controllerModelFactory = new XRControllerModelFactory();

    this.controllerGrip1 = this.renderer.xr.getControllerGrip( 0 );
    this.controllerGrip1.add( controllerModelFactory.createControllerModel( this.controllerGrip1 ) );
    this.dolly.add( this.controllerGrip1 );
    
    this.controllerGrip2 = this.renderer.xr.getControllerGrip( 1 );
    this.controllerGrip2.add( controllerModelFactory.createControllerModel( this.controllerGrip2 ) );
    this.dolly.add( this.controllerGrip2 );
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
    this.handleController(delta);
  }

  handleController(delta) {
    const session = this.renderer.xr.getSession();
    if (session) {
      this.cameraVector = new Vector3();
      this.camera.getWorldDirection(this.cameraVector);
      let velocityTranslation = 0.1;
      let velocityRotation = 0.4;

      for (const source of session.inputSources) {
        if (source && source.gamepad && source.handedness) {
          if (source.handedness == 'left') {
            // up-down -> translate up or down on Y axis
            this.dolly.position.y -= velocityTranslation * source.gamepad.axes[3];
            if (this.dolly.position.y < 0) this.dolly.position.y = 0;
            
            // left-right -> pan left or right
            // this.dolly.position.x -= this.cameraVector.z * velocityTranslation * source.gamepad.axes[2];
            // this.dolly.position.z += this.cameraVector.x * velocityTranslation * source.gamepad.axes[2];
          } 
          if (source.handedness == 'right') {
            // up-down -> move forward or backward
            this.dolly.position.x -= this.cameraVector.x * velocityTranslation * source.gamepad.axes[3];
            this.dolly.position.z -= this.cameraVector.z * velocityTranslation * source.gamepad.axes[3];
            
            // left-right -> pan left or right
            this.dolly.position.x -= this.cameraVector.z * velocityTranslation * source.gamepad.axes[2];
            this.dolly.position.z += this.cameraVector.x * velocityTranslation * source.gamepad.axes[2];
            
            // left-right alternative -> rotate on Y axis
            // this.dolly.rotateY(-Math.degToRad(velocityRotation * source.gamepad.axes[2]));
          }
        }
      }

      
    }
    // if ( controller.userData.isSelecting ) {
    //   // here goes the code for isSelectiong event
    // }
  }
}

export { VrControls };