import * as THREE from "three";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js"
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
    camera.position.z = 2; // move camera back to look at origin

    // scene
    const scene = new THREE.Scene();

    // load in windmill
    const objLoader = new OBJLoader();
	objLoader.load( 'windmill.obj', ( root ) => {
		scene.add( root );
	} );

    // defining box geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // texture loader
    const loader = new THREE.TextureLoader();
    const texture = loader.load("wall.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;

    // simple cube generator
    function makeInstance( geometry, color, x ) {

		const material = new THREE.MeshPhongMaterial( { color } );

		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		cube.position.x = x;

		return cube;

	}

    // push middle, left, and right cube
    const cubes = [
        // makeInstance( geometry, 0x44aa88, 0 ), middle cube now textured below
		makeInstance( geometry, 0x8844aa, - 2 ),
		makeInstance( geometry, 0xaa8844, 2 ),
    ]

    // textured cube
    const material = new THREE.MeshPhongMaterial( {
		map: texture
	} );
    const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cubes.push( cube ); // add to our list of cubes to rotate

    // render
    function render(time) {
        time *= 0.001;  // convert time to seconds
       
        cubes.forEach( ( cube, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		} );
       
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