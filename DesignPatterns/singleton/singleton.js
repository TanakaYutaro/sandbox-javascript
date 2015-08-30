var Singleton = (function () {
    function Singleton() {
    }
    Object.defineProperty(Singleton, "Instance", {
        get: function () {
            if (this.instance === null || this.instance === undefined) {
                this.instance = new Singleton();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    return Singleton;
})();
//# sourceMappingURL=singleton.js.map