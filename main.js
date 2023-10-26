import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

let stats;
let mesh, camera, scene, renderer, effect;
let helper, ikHelper, physicsHelper;
const clock = new THREE.Clock();

Ammo().then( function ( AmmoLib ) {

	Ammo = AmmoLib;

	init();
	animate();

} );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 10;
controls.maxDistance = 100;

const gridHelper = new THREE.GridHelper( 30, 10 );
scene.add( gridHelper );

// const ambient = new THREE.AmbientLight( 0xaaaaaa, 0 );
// scene.add( ambient );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
directionalLight.position.set( -20, 30, 20 );
directionalLight.castShadow = true;
scene.add( directionalLight );
const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionLightHelper)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.y = 10;
camera.position.z = 20;

window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

const loader = new MMDLoader();
// loader.load(
// 	// path to PMD/PMX file
// 	'MMJModels/MMJ Miku/SEKAI Bones Set.pmx',
// 	// called when the resource is loaded
// 	function ( mesh ) {
// 		scene.add( mesh );
// 		// console.log(mesh.material)
// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 	},
// 	// called when loading has errors
// 	function ( error ) {
// 		console.log( 'An error happened' );
// 	}
// );



helper = new MMDAnimationHelper( {
	afterglow: 2.0
} );
helper.enable( 'ik', false );


loader.loadWithAnimation( 
	'MMJModels/MMJ Miku/SEKAI Bones Set.pmx',
	'NewlyEdgyIdols/Mot_Miku.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( error );
	}
)





function animate() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	requestAnimationFrame( animate );
	helper.update( clock.getDelta() );
	controls.update();
	renderer.render( scene, camera );
}
animate();

mmd.txt