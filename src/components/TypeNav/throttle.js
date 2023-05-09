export default function throttle(fn,t){
    let timer=null ;
    return function(){
        if(!timer){
            timer = setTimeout(() => {
                // 要注意改变this的指向问题
                fn.apply(this,arguments);
                timer=null;
            }, t);  
        }
    }
    
}
function debounce(fn,t){
    let timer;
    return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(this,arguments);
        }, t);
    }
}