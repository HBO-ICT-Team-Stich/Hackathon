AFRAME.registerComponent("hologram", {
    init: function () {
        var el = this.el;
        el.addEventListener('model-loaded', () => {
            var obj = el.getObject3D('mesh');
            if (!obj) return;

            // Traverse the model to find all meshes
            obj.traverse(function (node) {
                if (node.isMesh) {
                    // Remove the texture map
                    node.material.map = null;
                    // Optionally remove other maps
                    node.material.normalMap = null;
                    node.material.roughnessMap = null;
                    node.material.metalnessMap = null;

                    node.material.transparent = true;
                    node.material.opacity = 0.7;

                    node.material.color.set("white"); // Set a cyan color for the hologram effect

                    // Force material to update
                    node.material.needsUpdate = true;
                }
            });
        });
    }
});