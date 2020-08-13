// Where we want the cube to live in frontend
var container = document.getElementById('my-cube');

// scene - main object
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// camera - where you are viewing from
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(5, 5, 5); // 
camera.lookAt(new THREE.Vector3(0, 0, 0));

// render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
renderer.setClearColor(0xffffff, 0);
container.appendChild(renderer.domElement);

// axis - xyz lines
scene.add(new THREE.AxesHelper(3));

// cube - object
var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// edge - outline
var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xff00ff }));
scene.add(line);

// helper function (degree to radians) bc THREE uses radians (unit circle)
function setAngle(cube, line, axis, degree) {
  if(axis == 'x') {
    cube.rotation.x = degree * (Math.PI / 180)
    line.rotation.x = degree * (Math.PI / 180)
  } else if(axis == 'y') {
    cube.rotation.y = degree * (Math.PI / 180)
    line.rotation.y = degree * (Math.PI / 180)
  } else if(axis == 'z') {
    cube.rotation.z = degree * (Math.PI / 180)
    line.rotation.z = degree * (Math.PI / 180)
  }
}

var animate = function () {
  requestAnimationFrame(animate);

  // x-axis  
  var sliderX = document.getElementById("accel-x");
  var outputX = document.getElementById("accel-x-val");
  outputX.innerHTML = sliderX.value;
  sliderX.oninput = function () {
    outputX.innerHTML = this.value;
    setAngle(cube, line, 'x', this.value)
  }

  // y-axis
  var sliderY = document.getElementById("accel-y");
  var outputY = document.getElementById("accel-y-val");
  outputY.innerHTML = sliderY.value;
  sliderY.oninput = function () {
    outputY.innerHTML = this.value;
    setAngle(cube, line, 'y', this.value)
  }

  // z-axis
  var sliderZ = document.getElementById("accel-z");
  var outputZ = document.getElementById("accel-z-val");
  outputZ.innerHTML = sliderZ.value;
  sliderZ.oninput = function () {
    outputZ.innerHTML = this.value;
    setAngle(cube, line, 'z', this.value)
  }

  renderer.render(scene, camera);
};

animate();