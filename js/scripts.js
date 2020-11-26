function toggleNav(id){
    let element = document.getElementById(id);
    
    if(element.classList.contains('mob-nav')){
        element.classList.remove('mob-nav')
    }
    else {
        element.classList.add('mob-nav')
    }
}