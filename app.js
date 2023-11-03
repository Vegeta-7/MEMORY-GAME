document.querySelector(".control-buttons span").onclick=function(){
    let yourName=prompt("What is Your Name?")
    if(yourName===null || yourName===""){
        document.querySelector(".name span").innerHTML="Unknown";
    }else{
        document.querySelector(".name span").innerHTML=yourName;
    }

    document.querySelector(".control-buttons").remove();
}



let duration=1000;
let blocksContainer=document.querySelector('.memory-game-blocks');

let blocks=Array.from(blocksContainer.children);   //Array of all divs in memory-blocks-container

// let orderRange=[...Array(blocks.length).keys()];  //create range of keys check without spread
//or
let orderRange=Array.from(Array(blocks.length).keys())



shuffle(orderRange)

//Add order css prop to game blocks
blocks.forEach((block,index)=>{    
    block.style.order=orderRange[index];
  
    //Add click event
    block.addEventListener('click',function(){
        flipBlock(block);
    })
})



// flipping block func
function flipBlock(selectedBlock){
    //add class is-flipped
    selectedBlock.classList.add('is-flipped')

    //collect all flipped cards using filter in blocks(all divs array)
    let allFlippedBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-flipped'));

    //if there are 2 selected blocks
    if(allFlippedBlocks.length===2){
        // console.log('2 blocks are selected')
        // stop clicking function if same cards
        stopClicking();
    }

    //if 2 blocks match
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
}

// stop clicking function after 2 selections
function stopClicking(){
    blocksContainer.classList.add('no-clicking')
    setTimeout(()=>{
        //remove class no clicking 
        blocksContainer.classList.remove('no-clicking')
    },duration);
}

//if 2 blocks match
function checkMatchedBlocks(firstBlock,secondBlock){
    let triesElement=document.querySelector('.tries span')
    if(firstBlock.dataset.technology===secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        
        firstBlock.classList.add('is-matched')
        secondBlock.classList.add('is-matched')        
    }
    else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;        
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        },duration)
    }
}

//shuffle func
function shuffle(arr){
    //Setting Var
    let current=arr.length,temp,random;
    while(current>0){
        //get random number
        random=Math.floor(Math.random()*current);
        //dec len by 1
        current--;
        // console.log(random)
        // console.log(arr)

        //swapping for removing duplicates
        // [1]  Save curr ele to stash
        temp=arr[current];        

        // [2]  curr ele=random ele
        arr[current]=arr[random];
        
        // [3]  random ele=curr in stash
        arr[random]=temp;
        // console.log(arr)
    }return arr;
}
//current Array [1,2,3,...,9,10]
//New Array [1,2,3,...,6,4]
/*
    [1]  Save curr ele to stash
    [2]  curr ele=random ele
    [3]  random ele=curr in stash
*/