import * as THREE from 'three';

export class Box {

  constructor(width, depth, height) {
    this.geometry = new THREE.BoxGeometry(width, depth, height);
    this.material = new THREE.MeshBasicMaterial({ color: 0xa3e3ff });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.edges = new THREE.EdgesGeometry(this.geometry); 
    this.lines = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x000000 })); 

    this.rotationSpeed = {
      x: Math.random() / 1000,
      y: Math.random() / 1000,
      z: Math.random() / 1000
    };

    this.floatSpeed = Math.random() / 300;
    this.floatingLimit = Math.random() * (1 - .5) + .5;
    this.moveDirection = Math.random() < .5 ? 'D' : 'U';
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
    this.initialPosition = vector3;
  }

  setRotation(vector3) {
    for (const mesh of this.getMeshes()) {
      mesh.rotation.x = vector3.x;
      mesh.rotation.y = vector3.y;
      mesh.rotation.z = vector3.z;
    }
  }

  update() {
    let index = 0, directionChanged = false, meshIndexToCopy = 0;
    
    for (const mesh of this.getMeshes()) {
      mesh.rotation.x += this.rotationSpeed.x;
      mesh.rotation.y += this.rotationSpeed.y;
      mesh.rotation.z += this.rotationSpeed.z;

      if (this.moveDirection === 'U') {
        mesh.position.y += this.floatSpeed;
      } else {
        mesh.position.y -= this.floatSpeed;
      }

      if (mesh.position.y >= this.initialPosition.y + this.floatingLimit
        || mesh.position.y <= this.initialPosition.y - this.floatingLimit
      ) {
        this.changeMoveDirection();
        directionChanged = true;
        meshIndexToCopy = index;
      }

      index++;
    }

    let meshes = this.getMeshes();
    if (directionChanged && meshes.length > 1) {
      for (let i = 1; i < meshes.length; i++) {
        meshes[i].position.y = meshes[0].position.y;
      }
    }
  }

  changeMoveDirection() {
    this.moveDirection = this.moveDirection === 'D' ? 'U' : 'D';
  }

}