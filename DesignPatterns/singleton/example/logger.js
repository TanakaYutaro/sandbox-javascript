var Logger = (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "Instance", {
        get: function () {
            if (this.instance === null || this.instance === undefined) {
                this.instance = new Logger();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    return Logger;
})();
//# sourceMappingURL=logger.js.map