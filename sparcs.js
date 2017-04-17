console.log('sparcs.js loaded ...');

//sparcs=(function(){
var sparcs={}
// root URI for https://health.data.ny.gov/resource/s8d9-z734.json etc 
sparcs.uri = 'health.data.ny.gov'
sparcs.yrs = [2009,2010,2011,2012,2013,2014]

// data resources
sparcs.res={}
sparcs.res[2009]="s8d9-z734"
sparcs.res[2010]="dpew-wqcg"
sparcs.res[2011]="n5y9-zanf"
sparcs.res[2012]="rv8x-4fm3"
sparcs.res[2013]="tdf6-7fpk"
sparcs.res[2014]="pzzw-8zdv"


// data sources
sparcs.dtSrc={}
sparcs.yrs.forEach(function(yr){
    sparcs.dtSrc['url'+yr]='https://'+sparcs.uri+'/resource/'+sparcs.res[yr]+'.json'
})
/*
sparcs.dt.url2009="https://health.data.ny.gov/resource/s8d9-z734.json"
sparcs.dt.url2010="https://health.data.ny.gov/resource/dpew-wqcg.json"
sparcs.dt.url2011="https://health.data.ny.gov/resource/n5y9-zanf.json"
sparcs.dt.url2012="https://health.data.ny.gov/resource/rv8x-4fm3.json"
sparcs.dt.url2013="https://health.data.ny.gov/resource/tdf6-7fpk.json"
sparcs.dt.url2014="https://health.data.ny.gov/resource/pzzw-8zdv.json"
*/

// SODA readers

sparcs.sodaRead= new soda.Consumer(sparcs.uri)

4

// get 
sparcs.get=function(q,yr){
    if(!yr){
        yr=Object.getOwnPropertyNames(sparcs.dtSrc)
    }
    if(!Array.isArray(yr)){
        yr=[yr]
    }
    // handle year provided as number
    yr=yr.map(function(yi){
        if(typeof(yi)=="number"){yi="url"+yi}
        return yi
    })
}

sparcs.count=function(yrs,fun){
    yrs = yrs || sparcs.yrs
    if(typeof(yrs)=="number"){yrs=[yrs]} // making sure it is an Array
    var count={}
    console.log('number of entries for years ',yrs)
    yrs.forEach(function(yr){
        $.getJSON(sparcs.dtSrc['url'+yr]+'?$query=SELECT%20COUNT(*)')
         .then(function(c){
             c[0].COUNT=parseInt(c[0].COUNT)
                 console.log(yr,c[0].COUNT)
             count[yr]=c[0].COUNT
             // have some fun if done
             if(Object.getOwnPropertyNames(count).length==yrs.length){
                 console.log('done:')
                 fun = fun || function(){console.log(count)}
                 fun()
             }
         })
    })
    return count
    //https://health.data.ny.gov/resource/s8d9-z734.json?$query=SELECT%20COUNT(*)

}

//// command line interpreter///
sparcs.exe = function(){
    sparcs.exe.log = sparcs.exe.log || [' > '] // start log if it doesn't exist

    // compare entries and start evaluating them from last change
    var i = sparcs.exe.i
    sparcs.exe.i++
    if(i<sparcs.exe.log.length){
        console.log(i+') at '+Date())
        if(sparcs.exe.log[i]!==sparcs.exe.newLog[i]){
            sparcs.exe.eval=true
        }
        if(sparcs.exe.eval){
            console.log('EVAL')
        }
        sparcs.exe()
    }else{
        if(sparcs.exe.newLog.slice(-1)[0]==" >  > "){ // middle insertion
            sparcs.exe.newLog.slice(-1)[0]=" > "
            cmd.value=cmd.value.slice(0,-3)
        }
        sparcs.exe.log=sparcs.exe.newLog
    }
}

cmd.onkeyup=function(ev){
    if((ev.keyCode==13)&&(!ev.shiftKey)){ // enter was pressed without shift
        this.value+=' > '
        sparcs.exe.newLog=this.value.split('\n')
        sparcs.exe.i=0 // reset interpretation before starting it
        sparcs.exe.eval=false
        sparcs.exe() // evaluate command
    }
}


// CSS
if(document.getElementById('infoMore')){

    infoMore.onmouseover=function(){
        this.style.cursor="pointer"
    }

    infoMore.onclick=function(){
        //if(this.className=="fa fa-info-circle"){
        if(this.style.color=="green"){
            this.style.color="silver"
            infoShowHide.hidden=true
        }else{
            this.style.color="green"
            infoShowHide.hidden=false
        }
    }
} 
//