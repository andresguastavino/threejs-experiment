import * as THREE from 'three';

export class Scene {

  constructor() {
    this.scene = new THREE.Scene();
  }

  get instance() {
    return this.scene;
  }

  add(obj) {
    for (const mesh of obj.getMeshes()) {
      this.scene.add(mesh);
    }
  }

}