class Logger {
    private static instance:Logger;

    constructor() {

    }

    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    
}