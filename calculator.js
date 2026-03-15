"use strict";

function Calculator(){
    const calc = {};
    calc.queue =[];
    calc.hist;
    calc.lastNum=null;
    calc.lastOp=null;
    calc.numBtnsContainer = document.querySelector(".numBtnsContainer");
    calc.opBtnsContainer = document.querySelector(".operationBtnsContainer");
    calc.paper = document.querySelector(".paper");
    calc.lastNumEl = document.querySelector("#lastNum");
    calc.resultNumEl = document.querySelector("#resultNum");

    calc.calculate = function (clicked){
         //preventing calculating without parameters
        if(this.queue.at(-1)===".") this.queue.push(0,0); //adds 2 zeroes if last digit is .
        let num = +this.queue.join("");
        if(clicked==="C"){
            this.queue = String(num).split("");
            this.queue.splice(-1,1);
            num = +this.queue.join("")
            //preventing doing the last operation again on the cleared number
            this.lastNum=num;
            this.lastOp="C";
            this.displayNums(num);
            return;
        }



        //resets the queue to enable the user from doing operations on two numbers
        this.queue.splice(0, this.queue.length);
        this.lastNum= this.lastNum===null? num: this.lastNum;
        if(this.lastOp ===null){
            this.lastOp= clicked;
            this.resultNumEl.textContent = num ;
            return;
        }
        let result=0;


        switch (this.lastOp){
            case '+':
                result = this.lastNum + num;
                this.addToPaper(this.lastNum, num, this.lastOp, result);
                break;
            case '-':
                result = this.lastNum - num;
                this.addToPaper(this.lastNum, num, this.lastOp, result);
                break;
            case '*':
                result = this.lastNum * num;
                this.addToPaper(this.lastNum, num, this.lastOp, result);
                break;
            case '/':
                result = this.lastNum / num;
                this.addToPaper(this.lastNum, num, this.lastOp, result);
                break;
            case '=':
                result = num!==this.lastNum? num: this.lastNum;
                break;
            case "C":
                result = num;
        }

        switch(clicked){
            case '=':
                this.displayNums(result?? this.lastNum);
                this.lastNum= result?? this.lastNum;
                this.lastOp = null;
                this.queue = String(this.lastNum).split();
                break;
                return;
            case 'AC':
                this.queue.splice(0,this.queue.length);
                this.lastNum=null;
                this.lastOp=null;
                this.displayNums(0);
                return;
                break;

            default:
                this.lastOp = clicked;
        }

        this.lastNum = result;
        this.displayNums(result);
        this.lastOp = clicked;
    };

    calc.pressNum = function(num){
        switch (num){
            case ".":
                if(this.queue.includes(".")){
                    return;
                }
                break;
            case "+-":
                if(this.queue[0]=== "-"){
                    this.queue.shift()
                }else this.queue.unshift("-");
                this.displayNums();
                return;
                break;
        }
        this.queue.push(num);
        this.displayNums(this.queue.join(""));
    }

    calc.displayNums = function(result= this.queue.join("")){
        if(result === "") result=0;
        this.lastNumEl.textContent = this.lastNum?? 0;
        this.resultNumEl.textContent = result;
    };

    calc.displayNumBtns = function (){
        for(let i=0;i<3;i++){
            const numBtnsRow = document.createElement("div");
            for(let j=1; j<=3;j++){
                calc.createBtn(i,j,numBtnsRow);
            }
            this.numBtnsContainer.insertAdjacentElement("afterbegin", numBtnsRow);
        }
        let numBtnsRow = document.createElement("div");
        calc.createBtn(0,0,numBtnsRow,0);
        calc.createBtn(0,0,numBtnsRow,".");
        calc.createBtn(0,0,numBtnsRow,"+-");
        numBtnsRow.classList.add("lastNumRow");
        this.numBtnsContainer.insertAdjacentElement("beforeend",numBtnsRow);
    };

    calc.createBtn = function(i, j, numBtnsRow, num=null){
        const numBtn = document.createElement("button");
        //enabling inserting values without depening on loops
        num = num?? j+(i*3);
        numBtn.setAttribute("data-num",num);
        numBtn.classList.add("numBtn")
        numBtn.textContent= num;
        numBtnsRow.insertAdjacentElement("beforeend", numBtn);
        numBtnsRow.classList.add("numBtnRow");
    }

    calc.displayOpBtns = function(){
        const operators =["+","-","*","/","=","C","AC"];
        operators.forEach((op)=>{
            const opBtn = document.createElement('button');
            opBtn.classList.add("opBtn");
            if(op==="C" || op==="AC") opBtn.classList.add("bigBtn");
            opBtn.textContent=op;
            opBtn.setAttribute("data-op", op);
            this.opBtnsContainer.append(opBtn);
        });
    };

    calc.displayBtns = function (){
        this.displayNumBtns();
        this.displayOpBtns();

    };
    calc.addToPaper = function(num1, num2, op, result){
        let expression = `${num1} ${op} ${num2} = ${result}`;
        //add string to hist array
        this.hist.push(expression);
        //reset the hist paper
        this.createPaperRow(expression, this.hist.length-1);
        //add string to localstrorage
        localStorage.setItem("hist",JSON.stringify(this.hist));

    };

    calc.createPaperRow = function(expression,i){
            const element = document.createElement("div");
            element.setAttribute("data-id",i);
            element.textContent = expression
            element.classList.add("expression");
            const delBtn = document.createElement("div");
            delBtn.classList.add("eraser");
            const img = document.createElement("img");
            img.classList.add("eraserImg");
            img.setAttribute("src", "./media/eraser.svg");
            delBtn.appendChild(img);
            element.appendChild(delBtn);
            this.paper.querySelector(".paperContents").insertAdjacentElement("afterbegin",element);

    }

    calc.displaySavedPaper = function (){
        this.hist = JSON.parse(localStorage.getItem("hist")) || [];
        this.hist?.forEach((exp, i)=>{
            this.createPaperRow(exp,i)
        });      
    };

    calc.removeFromPaper = function(id){
        //remove all if id is "all"
        if(id==="all"){
            localStorage.removeItem("hist");
            this.hist.splice(0, this.hist.length);
            //removing all rows from the paper in this current session
            this.paper.querySelector(".paperContents").textContent ="";
            return;
        }
        //remove row from history array
        this.hist.splice(id,1);
        localStorage.setItem("hist",JSON.stringify(this.hist));
        this.paper.querySelector(".paperContents").textContent ="";
        this.displaySavedPaper();

    };

    return calc;
};

const calculator = new Calculator();
calculator.displaySavedPaper();
calculator.displayBtns();
calculator.opBtnsContainer.addEventListener("click",e =>{
    if(e.target.tagName === "BUTTON") calculator.calculate(e.target.dataset.op);
});
    
calculator.numBtnsContainer.addEventListener("click", e =>{
    if(e.target.tagName === "BUTTON") calculator.pressNum(e.target.dataset.num);
});

calculator.paper.addEventListener("click", e=>{
    if(e.target.classList.contains("eraserImg")) calculator.removeFromPaper(e.target.closest("[data-id]").dataset.id);
});







