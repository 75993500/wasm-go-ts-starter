import { Tool } from '../../dist/phys-go.js';
export class DemoMain {
    constructor() {
        this.funcTest();
        // this.performanceTest();
    }

    async funcTest() {
        const tool = new Tool();
        let r = await tool.add(1,2,3,4,5);
        console.log('add function:', r);
        r = await tool.getValue('oneValue');
        console.log('get go value:', r);
    }

    // performance test
    // Is WebAssembly faster than JavaScript?
    async performanceTest() {
        const nums = 30;
        const tool = new Tool();
        //
        await tool.start(); // 触发启动
        await tool.fib(nums);
        await tool.fibJS(nums);
    }

}
(window as any).DemoMain = DemoMain;
