import FogScene from './fogScene';

function EntryPoint(container) {
    const canvas = createCanvas(container);
    const scene = new FogScene(canvas);

    bindEventListeners();
    render();

    function createCanvas(container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.height = '100%';
        canvas.style.width = '100%';

        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;

        scene.onWindowResize();
    }

    function render() {
        requestAnimationFrame(render);

        scene.render();
    }
}

export default EntryPoint;
