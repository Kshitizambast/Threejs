import './style.css'

import * as THREE from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

//Setup
function main(){

  //Scene
  const scene = new THREE.Scene()

  //Camera Setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 2

  //Renderer Setup
  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#scene')
  })
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);


  //Gemomatery
  const geomatery = new THREE.BoxGeometry(1, 1, 1)

  //Circle Geomatery
  const circleGeomatery = new THREE.CircleGeometry(7, 26)
  //Material
  //const material = new THREE.MeshBasicMaterial({  color: 0xff6347 })

  //const material = new THREE.MeshPhongMaterial({ color: 0xff6347 })


  //Add Light
  const color = 0xFFFFFF
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)


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



  function makeInstances(geomatery, color, x){
    /*
    Each Mesh references a unique MeshPhongMaterial so that each cube can have a different color.
    */
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geomatery, material)
    scene.add(cube)

    cube.position.x = x
    return cube
  }

  const cubes = [
    makeInstances(geomatery, 0xff6347, 0),
    makeInstances(geomatery, 0x44aa88, -2),
    makeInstances(geomatery, 0x8844aa, 2)

  ]

  //renderer.render(scene, camera)
  function render(time){
    time *= 0.001
    if (resizeRendererToDisplaySize){
      const canvas = document.querySelector('#scene')
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot
      cube.rotation.y = rot

    })
  
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

}

main()