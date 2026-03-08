
function Calculator(){
    const calc = {};
    calc.queue =[];
    calc.calculate = function (){
        let num =this.queue.shift()
        let operator = this.queue.shift()
    }
}

const calculator = new Calculator();