var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;



function stop() {
    if (id !== null) {
        cancelAnimationFrame(id);
        id = null;
    }
}

var stat = null;

function init() {
    // stat
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);

    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0x000000,
        emissive: 0xff0000
    });
    // 渲染器
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#mainCanvas")
    });
    // 清除画面的颜色
    renderer.setClearColor(0x000000);
    // 场景
    let scene = new THREE.Scene();
    // 透视相机， 近大远小
    let camera = new THREE.PerspectiveCamera(60, 4/3, 1, 1000);  // 视角广度、 aspect、 near、 far
    // 正交相机
    // let camera = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);  // left right 
    camera.position.set(0,0,5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // 长方体  参数： 宽，高，深度   宽切分、 高切分、 深度切分
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1,2,2,1,2,3), lambertMaterial);  //  正方体  &  贴图颜色
    
    // 聚光灯
    var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.target = cube;
    scene.add(light);

    function draw() {
        stat.begin();

        cube.position.set(0, 0, 0);
        cube.rotation.y = (cube.rotation.y + 0.01) % (Math.PI * 2);
        scene.add(cube);
        renderer.render(scene, camera);
        id = requestAnimationFrame(draw);

        stat.end();
    }
    draw();
}