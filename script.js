import * as THREE from "three";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js"; // object loader
import {MTLLoader} from "three/addons/loaders/MTLLoader.js";
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
    const mtlLoader = new MTLLoader();
    mtlLoader.load('textures/windmill_001.mtl', (mtl) => {
        mtl.preload();
        mtl.materials.Material.side = THREE.DoubleSide;
        objLoader.setMaterials(mtl);
	    objLoader.load('textures/windmill_001.obj', ( root ) => {
		    scene.add( root );
	    } );
    } );

    // define box geometry
    const boxWidth = 2;
    const boxHeight = 2;
    const boxDepth = 2;
    const box_geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // define cone geometry
    const coneRadius = 2;
    const coneHeight = 3;
    const cone_geometry = new THREE.ConeGeometry(coneRadius, coneHeight);

    // define cylinder geometry
    const cylinderRadTop = 2;
    const cylinderRadBot = 2;
    const cylinderHeight = 2;
    const cylinder_geometry = new THREE.CylinderGeometry(cylinderRadTop, cylinderRadBot, cylinderHeight);

    // texture loader
    const loader = new THREE.TextureLoader();
    const texture = loader.load("wall.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;

    // simple shape generator
    function makeInstance( geometry, color, pos ) {

		const material = new THREE.MeshPhongMaterial( { color } );

		const shape = new THREE.Mesh( geometry, material );
		scene.add( shape );

		shape.position.x = pos[0];
        shape.position.y = pos[1];
        shape.position.z = pos[2];

		return shape;

	}

    // shapes to be rendered
    const shapes = []

    // textured cube
    const material = new THREE.MeshPhongMaterial( {
		map: texture
	} );
    const cube = new THREE.Mesh( box_geometry, material );
    cube.position.x = -5;
    cube.position.y = 10;
	scene.add( cube );
	shapes.push( cube ); // add to our list of cubes to rotate

    // cone
    const cone_position = [5, 10, 0];
    const cone = makeInstance(cone_geometry, 0xff5555, cone_position);
    shapes.push(cone);

    // cylinder
    const cylinder_position = [-6, 0, 0];
    const cylinder = makeInstance(cylinder_geometry, 0x55ff55, cylinder_position);
    shapes.push(cylinder);
    

    // resize renderer to size of canvas
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
    function render(time) {
       
        time *= 0.001;
        if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

        shapes.forEach( ( shape, ndx ) => {
            const speed = 1 + ndx * .1;
			const rot = time * speed;
			shape.rotation.x = rot;
			shape.rotation.y = rot;
        });

        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }
    requestAnimationFrame(render);

    // lighting
    const color = 0xFFFFFF;
    const intensity = 5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
}