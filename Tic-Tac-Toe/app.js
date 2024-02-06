
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");

let msg = document.querySelector("#msg");
let container = document.querySelector(".msg-container");

const resetGame = ()=>{
    turn0 = false;
    boxes.forEach((box) =>{
        box.innerText="";
        box.disabled = false;
    });
    container.classList.add("hide");
};

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);


let turn0 = false;
const winPatters = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

let count = 0;

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        count++;
        if(count==9){
            msg.innerText = "Match has drawn";
            container.classList.remove("hide");
        }

        if(turn0){
            box.innerText = "O";
        }else{
            box.innerText = "X";
        }
        turn0 = !turn0;
        box.disabled=true;
        checkWinner();
    });
});

//After winner is obtained, buttons can't be clicked 
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    container.classList.remove("hide");
    disableBoxes();
};

//Checking each winning combination 
const checkWinner = () =>{
    for (pattern of winPatters){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                showWinner(pos1);
            }
        }
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        //     );
    };
};



