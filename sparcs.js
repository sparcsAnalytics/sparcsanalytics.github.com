console.log('sparcs.js loaded ...');

sparcs=(function(){
    var sprc={}
    // root URI for https://health.data.ny.gov/resource/s8d9-z734.json etc 
    sprc.uri = 'health.data.ny.gov'
    sprc.yrs = [2009,2010,2011,2012,2013,2014]

    // data resources
    sprc.res={}
    sprc.res[2009]="s8d9-z734"
    sprc.res[2010]="dpew-wqcg"
    sprc.res[2011]="n5y9-zanf"
    sprc.res[2012]="rv8x-4fm3"
    sprc.res[2013]="tdf6-7fpk"
    sprc.res[2014]="pzzw-8zdv"


    // data sources
    sprc.dt={}
    sprc.yrs.forEach(function(yr){
        sprc.dt['url'+yr]='https://'+sprc.uri+'/resource/'+sprc.res[yr]+'.json'
    })
    /*
    sprc.dt.url2009="https://health.data.ny.gov/resource/s8d9-z734.json"
    sprc.dt.url2010="https://health.data.ny.gov/resource/dpew-wqcg.json"
    sprc.dt.url2011="https://health.data.ny.gov/resource/n5y9-zanf.json"
    sprc.dt.url2012="https://health.data.ny.gov/resource/rv8x-4fm3.json"
    sprc.dt.url2013="https://health.data.ny.gov/resource/tdf6-7fpk.json"
    sprc.dt.url2014="https://health.data.ny.gov/resource/pzzw-8zdv.json"
    */

    // SODA readers

    sprc.sodaRead= new soda.Consumer(sprc.uri)

    4

    // get 
    sprc.get=function(q,yr){
        if(!yr){
            yr=Object.getOwnPropertyNames(sprc.dt)
        }
        if(!Array.isArray(yr)){
            yr=[yr]
        }
        // handle year provided as number
        yr=yr.map(function(yi){
            if(typeof(yi)=="number"){yi="url"+yi}
            return yi
        })

        4

    }

    
    // ref SODA API
    // https://dev.socrata.com/docs/queries/
    // 


    return sprc
})()



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