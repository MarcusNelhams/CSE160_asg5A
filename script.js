import * as THREE from "three";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js"
// Call main function when DOM content is loaded
document.addEventListener('DOMContentLoaded', main);

function main() {
    // canvas and renderer
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    // camera
    const fov = 45;
    const aspect = 1; // canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;
    camera.position.y = 5

    // scene
    const scene = new THREE.Scene();

    // load in windmill
    const objLoader = new OBJLoader();
	objLoader.load( 'windmill_001.obj', ( root ) => {
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
		makeInstance( geometry, 0x8844aa, - 5 ),
		makeInstance( geometry, 0xaa8844, 5 ),
    ]

    // textured cube
    const material = new THREE.MeshPhongMaterial( {
		map: texture
	} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = -5
    cube.position.y = 2
	scene.add( cube );
	cubes.push( cube ); // add to our list of cubes to rotate
    

    function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

    // render
    function render() {
       
        if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

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