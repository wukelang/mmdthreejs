import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

let stats;
let mesh, camera, scene, renderer, effect;
let helper, ikHelper, physicsHelper;
const clock = new THREE.Clock();

Ammo().then( function ( AmmoLib ) {
	Ammo = AmmoLib;
	// init();
	animate();
} );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );
stats = new Stats()
document.body.appendChild(stats.dom)

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 10;
controls.maxDistance = 1000;

const gridHelper = new THREE.GridHelper( 100, 10 );
scene.add( gridHelper );
effect = new OutlineEffect( renderer );

const ambient = new THREE.AmbientLight( 0xaaaaaa, 2 );
scene.add( ambient );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
directionalLight.position.set( -20, 30, 20 );
directionalLight.castShadow = true;
scene.add( directionalLight );
const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionLightHelper)

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
camera.position.y = 30;
camera.position.z = 50;

window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

const loader = new MMDLoader();
helper = new MMDAnimationHelper( {
	afterglow: 2.0
} );
helper.enable( 'ik', false );

loader.loadAnimation(
	'NewlyEdgyIdols/MainCamera.vmd',
	camera,
	function ( cameraAnimation ) {
		helper.add( camera, {
			animation: cameraAnimation
		} );
	}
)

loader.loadWithAnimation( 
	'MMJModels/MMJ Miku/SEKAI Bones Set.pmx',
	// 'MMJModels/MMJ Miku/MMJMikuNoIK.pmx',
	// 'MMJModels/MMJ Miku/miku.pmx',
	// 'MMJModels/Hatsoone Meeku/Miku.pmx',
	'NewlyEdgyIdols/Mot_Miku.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	null,
	function ( error ) {
		console.log( error );
	}
)

loader.loadWithAnimation( 
	'MMJModels/Hanasato Minori/SEKAI Bones Set.pmx',
	'NewlyEdgyIdols/Mot_Minori.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	null,
	function ( error ) {
		console.log( error );
	}
)

loader.loadWithAnimation( 
	'MMJModels/Hinomori Shizuku/SEKAI Bones Set.pmx',
	'NewlyEdgyIdols/Mot_Shizuku.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	null,
	function ( error ) {
		console.log( error );
	}
)

loader.loadWithAnimation( 
	'MMJModels/Kiritani Haruka/SEKAI Bones Set.pmx',
	'NewlyEdgyIdols/Mot_Haruka.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	null,
	function ( error ) {
		console.log( error );
	}
)

loader.loadWithAnimation( 
	'MMJModels/Momoi Airi/SEKAI Bones Set.pmx',
	'NewlyEdgyIdols/Mot_Airi.vmd',
	function ( mmd ) {
		mesh = mmd.mesh;
		scene.add(mesh);

		helper.add( mesh, {
			animation: mmd.animation,
			physics: true
		} );

	},
	null,
	function ( error ) {
		console.log( error );
	}
)

const api = {
	'playAnimation': false,
};
function initGui() {
	const gui = new GUI();
	gui.add( api, 'playAnimation' ).onChange( function () {
		console.log(api['playAnimation']);
	} );
}
initGui();

function animate() {


	setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 30 );

	if (api['playAnimation']) {
		helper.update( clock.getDelta() );
	}
	
	camera.y += 200

	controls.update();
	stats.update()
	renderer.render( scene, camera );
	effect.render( scene, camera );
}
animate();