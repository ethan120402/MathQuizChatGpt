console.log('start content.js ...');

// 1. questions
var questions = [
    'give me 10 quadratic problems',
    'give me 10 trig problems',
    'give me 10 area problems'
];



function setMainContent() {  

    var template = '';
    for (var i = 0; i < questions.length; i++) {
        template = template + `<li><button  class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900" onclick="document.getElementsByTagName('textarea')[0].value='${ questions[i] } in list form';" >${questions[i].substring(11)} </a></li>`;
    }        
   
    var sidebarHtml=
        `<div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
        <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>
        Math quiz
        </h2>
        <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                ${template}
        </ul></div>`    
       
    var rootElt = document.getElementsByTagName('h1')[0].parentElement ;
    var c = rootElt.innerHTML;
    rootElt.innerHTML =  c+sidebarHtml;  

}



function refreshPanel() {

    var sect = document.getElementsByClassName( 'text-token-text-primary' ) ;
    var cli = 0 ;
    var cp = 0 ;
    var cdiv = 0;
    var ca = 0 ;
    if( sect != undefined && sect.length>1){
        cli = sect[1].getElementsByTagName('li' ).length;
        cp = sect[1].getElementsByTagName('p' ).length;
        ca = sect[1].getElementsByTagName('a' ).length;
        cdiv = sect[1].getElementsByTagName('div' ).length;
    }
    var ds=[cli,cp,cdiv,ca] ;

    // get data
    var old_item_str = document.getElementsByTagName( 'textarea' )[0].dataset.my_data ;
    var old_diff_str = document.getElementsByTagName( 'textarea' )[0].dataset.my_data_diff ;
    var my_button = document.getElementsByTagName( 'textarea' )[0].dataset.my_button;
    var old_items = "";
    if( old_item_str!=null ){
        old_items = JSON.parse( old_item_str ) ;
    }    
    var now_item_str = JSON.stringify(ds) ;
    //var old_items =
    console.log( new Date().toString()+" ==> [old] :"+ old_item_str ) ;
    console.log( new Date().toString()+" ==> "+ now_item_str) ;

    // set data    
    document.getElementsByTagName( 'textarea' )[0].dataset.my_data=now_item_str ;
    if( stable==true){        
        document.getElementsByTagName( 'textarea' )[0].dataset.my_data_diff = now_item_str ;
    }
    // check data ==> stable ?
    var stable = false ;
    if( old_item_str != undefined && old_item_str.length > 0 ){
        if( old_item_str == now_item_str ){
            stable = true ;
        }
    }
    console.log( new Date().toString()+" ==> [stable] :"+ stable ) ;
   

    if( stable==true && my_button!='done'){
        var diff = [0,0,0,0] ;
        var old_diff_items = [0,0,0,0] ;
        if( old_diff_str !=null) old_diff_items= JSON.parse(old_diff_str) ;
        for( let i=0 ; i<4 ; i++){
            diff[i] = ds[i]-old_diff_items[i] ;
        }        
        if( diff[0] >0 ){ // <li> items > 0
            // update <li> items ==> add "solve" button
            var li_items = sect[1].getElementsByTagName('li' );
            for( let i=0 ; i<li_items.length ; i++){
                let li_item = li_items[i] ;
                li_item.innerHTML = `<button style="margin-top: 0px;cursor: pointer;outline: 0;
                display: inline-block;
                font-weight: 400;
                line-height: 1.5;
                text-align: center;
                background-color: transparent;
                border: 1px solid transparent;
                padding: 2px 5px;
                font-size: 0.5rem;
                border-radius: .25rem;
                transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                color: #0d6efd;
                border-color: #0d6efd;
                                :
                hover {
                                    color: #fff;
                background-color: #0d6efd;
                border-color: #0d6efd;
                                };


             " onclick="document.getElementsByTagName('textarea')[0].value='solve Problem ${ (i+1) }'" >Solve</button> `+li_item.innerHTML ;
            
        }

            // buttons have set
            document.getElementsByTagName( 'textarea' )[0].dataset.my_button = 'done' ;
        }
    }
   

    setTimeout(refreshPanel, 3000);
}






console.log('end content.js !');
setTimeout(setMainContent, 3000); // run setTags() after 3 secs
setTimeout(refreshPanel, 3000); 
// setTimeout(refreshPanel,3000);