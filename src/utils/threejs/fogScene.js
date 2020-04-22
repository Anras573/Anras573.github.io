import { Scene, Color, WebGLRenderer, PerspectiveCamera, Clock, DirectionalLight, MeshLambertMaterial, PlaneGeometry, Mesh, TextureLoader } from 'three';

import SmokeTexture from '../../assets/images/Smoke-Texture.png';

function FogScene(canvas) {
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const grayColor = new Color('#939393');

    const clock = new Clock();
    const renderer = buildRenderer(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const smokeParticles = buildSmokeParticles();
    const scene = buildScene();
 
    function buildSmokeParticles() {
        const texture = new TextureLoader().load(SmokeTexture);
        const material = new MeshLambertMaterial({ map: texture, transparent: true });
        const geometry = new PlaneGeometry(300, 300);
        const smokeParticles = [];

        for(let i = 0; i < 150; i++) {
            let x = Math.random() * 500 - 250;
            let y = Math.random() * 500 - 250;
            let z = Math.random() * 1000 - 100;
            let particle = new Mesh(geometry, material);
            particle.position.set(x, y, z);
            particle.rotation.z = Math.random() * 360;
            smokeParticles.push(particle);
        }

        return smokeParticles;
    }

    function buildScene() {
        const scene = new Scene();

        const light = new DirectionalLight(grayColor, 5);
        light.position.set(-1,0,1);
        
        scene.add(light);

        scene.add(...smokeParticles);
        
        return scene;
    }

    function buildRenderer({ width, height }) {
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = 1;
        const farPlane = 10000; 
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 1000;

        return camera;
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    function render() {
        let delta = clock.getDelta();
        var sp = smokeParticles.length;
        while(sp--) {
            smokeParticles[sp].rotation.z += (delta * 0.2);
        }

        renderer.render(scene, camera);
    };

    return {
        render,
        onWindowResize
    }
}

export default FogScene;
