import wasm
    from '../go/tool.go';

export class Tool {
    async start() {
        return await wasm.start();
    }

    async add(...args) {
        return await wasm.add(...args);
    }

    async fib(args) {
        return await wasm.fib(args);
    }

    // this compare go
    async fibJS(args) {
        const t = new Date().getTime();
        const r = this.fibCacu(args);
        console.log('~result: ', r, '   js~~time:', new Date().getTime()-t, new Date().getTime());
        return r;
    }

    fibCacu(x) {
        if (x === 1 || x === 2) {
            return 1
        }
        return this.fibCacu(x - 1) + this.fibCacu(x - 2)
    }

    async getValue(name) {
        return await wasm[name]();
    }
}
