
//user clicks numbers -> until operator pressed -> save num and operator, wait for new num ->

function Calculator(){
    const calc = {};
    calc.queue =[];
    calc.history=[];
    calc.currentNum=0;
    calc.numBtnsContainer = document.querySelector(".numBtnsContainer");
    calc.opBtnsContainer = document.querySelector(".operationBtnsContainer");
    calc.paper = document.querySelector(".paper");
    calc.calculate = function (operator){
        let num = +this.queue.join("");


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
        //add string to history array
        calc.history.push(expression);
        //reset the history paper
        calc.UpdatePaper();
        //add string to localstrorage
        

    };
    calc.UpdatePaper = function (){

        calc.history?.forEach((exp, i)=>{
            const element = document.createElement("p");
            element.setAttribute("data-id",i);
            element.classList.add("expression");
            calc.paper.firstChild.insertAdjacentElement("afterend");
        })
        
    }

    return calc;
};

const calculator = new Calculator();

calculator.displayBtns();





