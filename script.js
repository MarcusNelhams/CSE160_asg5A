import * as THREE from "three";
// Call main function when DOM content is loaded
document.addEventListener('DOMContentLoaded', main);

function main() {
    // canvas and renderer
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    // camera
    const fov = 75;
    const aspect = 2; // canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2; // move camera back

    // scene and box 
    const scene = new THREE.Scene();
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    // cube
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // render
    renderer.render(scene, camera);

    function render(time) {
        time *= 0.001;  // convert time to seconds
       
        cube.rotation.x = time;
        cube.rotation.y = time;
       
        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }
    requestAnimationFrame(render);

    // lighting
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}