import * as THREE from 'three';

export class Square {

    constructor(x, y) {
        // Crear un cuadrado 2D
        this.geometry = new THREE.PlaneGeometry(x, y);
        
        this.material = new THREE.MeshBasicMaterial({ color: 0x305cde });
        
        // Crear el mesh
        this.square = new THREE.Mesh(this.geometry, this.material);

        this.move = 'right';
        this.limit = 3.00;
    }

    addToScene(scene) {
        scene.add(this.square);
    }

    update() {
        if (this.move === 'right') {
            this.square.position.x += 0.01;
          } else {
            this.square.position.x -= 0.01;
          }
          if (this.square.position.x >= this.limit) {
            this.move = 'left';
          } else if (this.square.position.x <= (this.limit * -1)) {
            this.move = 'right';
          }
    }

}