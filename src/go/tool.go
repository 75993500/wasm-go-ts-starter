package main

import (
    "time"
    "fmt"
	"strconv"
	"syscall/js"
	"../../node_modules/golang-wasm-async-loader/gobridge"
)

func start(this js.Value, i []js.Value) (interface{},error) {
    fmt.Println("~fmt start")
    return nil, nil
}

func add(this js.Value, i []js.Value) (interface{},error) {
	ret := 0
	for _, item := range i {
	    // string to int
		val, _ := strconv.Atoi(item.String())
		ret += val
	}

	return ret, nil
}

func fib(this js.Value, inputs []js.Value) (interface{},error) {
    x, err := strconv.Atoi(inputs[0].String())
    if err != nil {
        fmt.Println("~~~err:", err)
        return 0, nil
    }
    t := time.Now().UnixNano() / 1e6
    r := fibCacu(x)
    fmt.Println("~result: ", r, "   go~~time:", time.Now().UnixNano() / 1e6-t, time.Now().UnixNano() / 1e6)
    return js.ValueOf(r), nil
}

// Fibonacci sequence
func fibCacu(x int) int {
    if x == 1 || x == 2 {
        return 1
    }
    return fibCacu(x-1) + fibCacu(x-2)
}

func main() {
	c := make(chan struct{}, 0)
    // Register function
    gobridge.RegisterCallback("start", start)
	gobridge.RegisterCallback("add", add)
	gobridge.RegisterCallback("fib", fib)
	gobridge.RegisterValue("oneValue", "Hello Wasm")

	<-c
}
