// Where we want the cube to live in frontend
var container = document.getElementById('my-cube');

// scene - main object
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// camera - where you are viewing from
var camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientWidth, 1, 2000); // see THREE doc
camera.position.set(5, 5, 5); // location
camera.lookAt(new THREE.Vector3(0, 0, 0)); // look at origin 

// render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientWidth);
renderer.setClearColor(0xffffff, 0);
container.appendChild(renderer.domElement);

// axis - xyz lines
scene.add(new THREE.AxesHelper(3));

// Init a group
var obj = new THREE.Group();

// cube - object
var geometry = new THREE.BoxGeometry(3, 3, 3); // 3x3x3 cube
var material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // color = black
var cube = new THREE.Mesh(geometry, material); // cube instance
obj.add(cube); // add black cube to group

// edge - outline
var edges = new THREE.EdgesGeometry(geometry); // get edges of cube
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xff00ff })); // color = magenta
obj.add(line); // add magenta edges to group

scene.add(obj);

// helper function (degree to radians) bc THREE uses radians (unit circle)
function setAngle(obj, axis, degree) {
  if(axis == 'x') {
    obj.rotation.x = degree * (Math.PI / 180)
  } else if(axis == 'y') {
    obj.rotation.y = degree * (Math.PI / 180)
  } else if(axis == 'z') {
    obj.rotation.z = degree * (Math.PI / 180)
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
    setAngle(obj, 'x', this.value)
  }

  // y-axis
  var sliderY = document.getElementById("accel-y");
  var outputY = document.getElementById("accel-y-val");
  outputY.innerHTML = sliderY.value;
  sliderY.oninput = function () {
    outputY.innerHTML = this.value;
    setAngle(obj, 'y', this.value)
  }

  // z-axis
  var sliderZ = document.getElementById("accel-z");
  var outputZ = document.getElementById("accel-z-val");
  outputZ.innerHTML = sliderZ.value;
  sliderZ.oninput = function () {
    outputZ.innerHTML = this.value;
    setAngle(obj, 'z', this.value)
  }

  renderer.render(scene, camera);
};

animate();