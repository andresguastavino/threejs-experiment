import * as THREE from 'three';

export class Box {

  constructor(width, depth, height) {
    this.geometry = new THREE.BoxGeometry(width, depth, height);
    this.material = new THREE.MeshBasicMaterial({ color: 0xa3e3ff });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.edges = new THREE.EdgesGeometry(this.geometry); 
    this.lines = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x000000 })); 

    this.iddle = true;
    this.nextUpdateTime = Date.now() + 5000;
  }

  getMeshes() {
    return [ this.mesh, this.lines ];
  }

  setPosition(vector3) {
    for (const mesh of this.getMeshes()) {
      mesh.position.x = vector3.x;
      mesh.position.y = vector3.y;
      mesh.position.z = vector3.z;
    }
  }

  setRotation(vector3) {
    for (const mesh of this.getMeshes()) {
      mesh.rotation.x = vector3.x;
      mesh.rotation.y = vector3.y;
      mesh.rotation.z = vector3.z;
    }
  }

  update() {
    for (const mesh of this.getMeshes()) {
      
    }
  }

}