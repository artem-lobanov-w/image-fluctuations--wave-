let scene;
let camera;
let renderer;

function scene_setup() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}
scene_setup();

const shaderCode = document.getElementById("fragShader").innerHTML;
console.log(shaderCode);

const textureURL = "image1.png";
THREE.ImageUtils.crossOrigin = '';

const texture = THREE.ImageUtils.loadTexture(textureURL);

let varX = 0.1;
let varY = 0.1;
let uniforms = {
	mouse: {type:'v3', value: new THREE.Vector3()},
	tex: { type:'t', value:texture },
	res: { type:'v2', value:new THREE.Vector2(window.innerWidth,window.innerHeight)},
	variable: {type:'v2', value: new THREE.Vector3(varX,varY)}
};




let material = new THREE.ShaderMaterial({uniforms:uniforms, fragmentShader:shaderCode});
let geometry = new THREE.PlaneGeometry(10,10);
let sprite = new THREE.Mesh(geometry, material);

scene.add(sprite);
camera.position.z = 2;

uniforms.mouse.value.z = 0.5;

function render() {
	uniforms.variable.value.x += 0.008;
	uniforms.variable.value.y += 0.00000005;
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

document.onmousemove = function(event) {
	uniforms.mouse.value.x = event.clientX;
	uniforms.mouse.value.y = -event.clientY + window.innerHeight;
}