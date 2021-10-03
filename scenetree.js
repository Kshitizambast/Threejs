
import * as THREE from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

function main(){

const scene = new THREE.Scene()

//Renderer Setup
const renderer = new THREE.WebGL1Renderer({
canvas: document.querySelector('#scene')
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//An array of objects whose rotation to update
const objects = []

//One geomatery for everything
const radius = 1
const widthSegment = 6
const heightSegment = 6
const sphereGeomatery = new THREE.SphereGeometry(radius, widthSegment, heightSegment)


//Solar System
const solarSystem = new THREE.Object3D();
scene.add(solarSystem)
objects.push(solarSystem)


//Sun material
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
const sunMesh = new THREE.Mesh(sphereGeomatery, sunMaterial)

//Scale up the sun
sunMesh.scale.set(5, 5, 5);
//scene.add(sunMesh), Make the sun a child of solar system
solarSystem.add(sunMesh)
objects.push(sunMesh)

//Earth Orbit
const earthOrbit = new THREE.Object3D()
earthOrbit.position.x = 10
solarSystem.add(earthOrbit)
objects.push(earthOrbit)


//Earth Material
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244})
const earthMesh =  new THREE.Mesh(sphereGeomatery, earthMaterial)
//earthMesh.position.x = 10
//scene.add(earthMesh), Make the earth a child of solarSystem
earthOrbit.add(earthMesh)
objects.push(earthMesh)


//Moon Orbit
const moonOrbit = new THREE.Object3D()
moonOrbit.position.x = 2
earthOrbit.add(moonOrbit)



//Moon Materail
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222})
const moonMesh = new THREE.Mesh(sphereGeomatery, moonMaterial)
moonMesh.scale.set(0.5, 0.5, 0.5)
moonOrbit.add(moonMesh)
objects.push(moonMesh)




//Light
{
	const color = 0xFFFFFF
	const intensity = 3
	const light = new THREE.PointLight(color, intensity)
	scene.add(light)
}

//Camera Settings
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
camera.position.set(0, 50, 0)
camera.up.set(0, 0, 1)
camera.lookAt(0, 0, 0)


// // An AxesHelper to each node
// objects.forEach((node) => {
//     const axes = new THREE.AxesHelper();
//     axes.material.depthTest = false;
//     axes.renderOrder = 1;
//     node.add(axes);
//   });

//Let's write a function that checks if the renderer's canvas is not already the size it is being displayed as and if so set its size.

  function resizeRendererToDisplaySize(renderer) {
    const canvas = rederer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== width || canvas.height !== heightSegments
    if(needResize)
      renderer.setSize(width, height, false)
    return needResize
  }

  function render(time){
    time *= 0.001
    if (resizeRendererToDisplaySize){
      const canvas = document.querySelector('#scene')
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    
    objects.forEach((obj) => {
    	obj.rotation.y = time;
    })
  
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)


}

main()