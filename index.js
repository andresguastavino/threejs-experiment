import * as THREE from 'three';
import { Scene } from './src/classes/Scene';
import { Box } from './src/classes/Box';
import { Square } from './src/classes/Square';

// // Crear la escena y la cámara
// const scene = new THREE.Scene();


// // Crear un cuadrado 2D
// const geometry = new THREE.PlaneGeometry(5, 5);

// // Crear un shader con el degradado
// const vertexShader = `
//   void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   void main() {
//     // Degradado simple de colores
//     vec3 startColor = vec3(1.0, 0.0, 0.0); // Rojo
//     vec3 endColor = vec3(0.0, 0.0, 1.0); // Azul
//     float grad = gl_FragCoord.y / 500.0; // Controla el degradado dependiendo de la altura
//     gl_FragColor = vec4(mix(startColor, endColor, grad), 1.0);
//   }
// `;

// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   side: THREE.DoubleSide, // Asegura que sea visible por ambos lados
// });

// // Crear el mesh
// const square = new Square(10, 10);
// square.addToScene(scene);

const scene = new Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xdfd6ef, 1);

document.body.appendChild(renderer.domElement);
camera.position.z = 10;

let posXLimit = 20;
let posYLimit = 20;
let posZMin = -20;
let posZMax = 2;

let minRot = 40;
let maxRot = 280;

const boxes = [];
const allPositions = [];
for (let i = 0; i < 500; i++) {
  let randPos = getRandomPosition(posXLimit, posYLimit, posZMin, posZMax);
  if (allPositions.length > 0 && !validRandomPosition(randPos, allPositions)) {
    while (!validRandomPosition(randPos, allPositions)) {
      randPos = getRandomPosition(posXLimit, posYLimit, posZMin, posZMax);
    }
  }
  allPositions.push(randPos);
  let newBox = new Box(1, 1, 1);
  newBox.setPosition(randPos);
  newBox.setRotation({
    x: Math.random() * (maxRot - minRot) + minRot,
    y: Math.random() * (maxRot - minRot) + minRot,
    z: Math.random() * (maxRot - minRot) + minRot
  });
  scene.add(newBox);
  boxes.push(newBox);
}

function validRandomPosition(pos, allPos) {
  let reqDistance = 3;
  for (const aux of allPos) {
    const distanceX = Math.pow(aux.x - pos.x, 2);
    const distanceY = Math.pow(aux.y - pos.y, 2);
    const distanceZ = Math.pow(aux.z - pos.z, 2);
    const realDistance = Math.sqrt(distanceX + distanceY + distanceZ);
    if (realDistance < reqDistance) {
        return false;
    }
  }
  return true;
}

function getRandomPosition(posXLimit, posYLimit, posZMin, posZMax) {
  return {
    x: Math.random() * (posXLimit - (posXLimit * -1)) + (posXLimit * -1),
    y: Math.random() * (posYLimit - (posYLimit * -1)) + (posYLimit * -1),
    z: Math.random() * (posZMax - posZMin) + posZMin
  };
}

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene.instance, camera);
  for (const box of boxes) {
    box.update();
  }
}

// Ejecutar la animación
animate();