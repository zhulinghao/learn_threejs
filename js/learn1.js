function init() {
    // 基本材质
    var yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xf6a23c, opacity: 0.7, wireframe: true });
    yellowMaterial.transparent = true;
    // Lambert材质  光照模型
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        emissive: 0xff0000,
        wireframe: true
    });
    // Phong材质 光照模型 金属、镜面
    var pongMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00
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
    let camera = new THREE.PerspectiveCamera(60, 4/3, 1, 1000); // 视角广度、 aspect、 near、 far
    // 正交相机
    // let camera = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);  // left right 
    camera.position.set(2,2,5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // 环境光
    // var light = new THREE.AmbientLight(0xcccccc);
    // scene.add(light);

    // 点光源
    var light = new THREE.PointLight(0xffffff, 2, 100);
    light.position = new THREE.Vector3(1.5, -0.5, 0);
    scene.add(light);

    // 长方体  参数： 宽，高，深度   宽切分、 高切分、 深度切分
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1,2,2,1,2,3), yellowMaterial);  //  正方体  &  贴图颜色
    cube.position.set(0, 0, 0);
    scene.add(cube);
    // 平面  参数： 宽、高
    var plan = new THREE.Mesh(new THREE.PlaneGeometry(2,4), yellowMaterial);
    // scene.add(plan);

    // 圆环  参数： 圆环半径，圆环宽度的1/2，环的密集度，环的密集度
    var torus = new THREE.Mesh(new THREE.TorusGeometry(2,0.5,12,15, Math.PI/2), new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe: true }));
    // scene.add(torus);

    // 文字
    var loader = new THREE.FontLoader();
    loader.load('../lib/helvetiker_regular.typeface.json', function(font) {
        var text = new THREE.Mesh(new THREE.TextGeometry('hell o', {
            font: font,
            size: 1,
            height: 0.5
        }), new THREE.MeshBasicMaterial({ color: 0xfff000 }));
        text.position.set(-1, 0, 0);
        // scene.add(text);

        renderer.render(scene, camera);
    });

}