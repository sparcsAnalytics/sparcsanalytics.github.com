console.log('sparcs.js loaded ...')

// CSS
if(document.getElementById('infoMore')){

    infoMore.onmouseover=function(){
        this.style.cursor="pointer"
    }

    infoMore.onclick=function(){
        if(this.textContent=='(-)'){
            this.textContent='(+)'
            this.style.color="green"
        }else{
            this.textContent='(-)'
            this.style.color="blue"
        }
    }



} 


//