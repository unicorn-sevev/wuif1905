window.onload = function () {
    let home = document.getElementById('home');
    let btnList = document.getElementsByClassName('btnList');
    let bannerPointer = btnList[0].getElementsByTagName('li');
    let activeColor = '#046b80',disactiveColor = 'fff';
    home.onmouseenter = function () {
        home.style.color = 'red'
    }
    home.onmouseleave = function () {
        home.style.color = '#fff'
    }
    // for (let i = 1;i < ) {
    //     bannerPointer[i].onmouseenter = function () {
    //         this.style.backgroundColor = activeColor;
    //     };
    //     bannerPointer[i].onmouseleave = function () {
    //         this.style.backgroundColor = disactiveColor;
    //
    //     };
    // }
    let tabList = document.querySelector('.table > li');
    let tabLists = document.querySelectorAll('tabList > li');
    tabLists.forEach(function (elem,index) {
        elem.onmouseenter = function () {
            for (let i = 0;i < tabLists.length;i++) {
                tabLists[i].classList.remove('hot');
            }
            this.classList.add('hot')
        }
    })

    for (let i = 0; i < tabLists.length; i++) {
        tabLists[i].onmouseenter = (function (i) {
            return function () {
                for (let j = 0; j < tabLists.length; j++){
                    tabLists[j].classList.remove('hot');
                }
                tabLists[i].classList.add('hot')
            }
        })(i)


    }
    let current = 0,next = 0;
    let leftBtn = document.querySelector('.leftBtn');
    let rightBtn = document.querySelector('.rightBtn');
    let bannerImg = document.querySelectorAll('.bannerImg > li ');
    let w = bannerImg[0].offsetWidth;
    let flag = true;

    // rightBtn.onclick = function () {
    //     index ++;
    //     if (index == bannerImg.length){
    //         index = 0;
    //     }
    //     bannerImg.forEach(function (ele) {
    //         ele.style.zIndex = 1;
    //     })
    //     bannerImg[index].style.zIndex = 999;
    // }
    // leftBtn.onclick = function () {
    //     index --;
    //     if (index < 0){
    //         index = bannerImg.length - 1;
    //     }
    //     bannerImg.forEach(function (ele) {
    //         ele.style.zIndex = 1;
    //     })
    //     bannerImg[index].style.zIndex = 999;
    // };
    rightBtn.onclick = function (){
        if(!flag){
            return;
        }
        flag = false;
        next++;
        if (next == bannerImg.length) {
            next = 0;
        }
        bannerImg[next].style.left = w + `px`;
        bannerPointer[current].style.backgroundColor = '#fff';
        bannerPointer[next].style.backgroundColor = '#046b80';

        animate(bannerImg[current],{left: - w});
        animate(bannerImg[next],{left: 0},function () {
            flag = true;
        });
        bannerPointer[current].classList.remove('hot');
        bannerPointer[next].classList.add('hot');
        current = next;
    };
    leftBtn.onclick = function (){
        if(!flag){
            return;
        }
        next--;
        if (next < 0) {
            next = bannerImg.length - 1;
        }
        bannerImg[next].style.left = -w + `px`;

        animate(bannerImg[current],{left: w});
        animate(bannerImg[next],{left: 0},function () {
            flag = true;
        });
        bannerPointer[current].classList.remove('hot');
        bannerPointer[next].classList.add('hot');
        current = next;

    };
    let bannerLeft = document.querySelector('.bannerLeft');
    let t = setInterval(rightBtn.onclick,1000);
    bannerLeft.onmouseenter = function(){
         t = setInterval(rightBtn.onclick,1000)
     };
     bannerLeft.onmouseleave = function () {
         clearInterval(t);
     };
    // for (var i=0; i<bannerPointer.length;i++) {
    //     bannerPointer[i].onclick = function () {
    //         Array.prototype.forEach.call(bannerPointer,function(elem){
    //             elem.classList.remove('hot');
    //         });
    //         bannerImg.forEach(function(elem){
    //             ele.style.zIndex = 1;
    //         })
    //         this.classList[index].style.zIndex = 999;
    //     }
    // }
    for(let i = 0; i < bannerPointer.length; i++){
        bannerPointer[i].onclick = function () {
            if (current === i) {
                return;
            }
            next = i;
            if (next > current) {
                bannerImg[next].style.left = w+`px`;
                animate(bannerImg[current],{left:-w});
                animate(bannerImg[next],{left:0});
            }else{
                bannerImg[next].style.left = -w+`px`;
                animate(bannerImg[current],{left:w});
                animate(bannerImg[next],{left:0});
            }
            bannerPointer[current].classList.remove('hot');
            bannerPointer[next].classList.add('hot');

            current = next;
        }
    }
    let viewH = window.innerHeight;
    let imgs = document.querySelectorAll('.lazyload');
    let positionArr = [];
    imgs.forEach(function(ele){
        let parent = ele.offsetParent;
        positionArr.push(parent.offsetTop + ele.offsetTop);
    });
    window.onscroll = function () {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        for (let i=0; i < positionArr.length;i++){
            if (scrolltop + viewH >= positionArr[i] + 50) {
                if (!imgs[i].src) {
                    imgs[i].src = imgs[i].getAttribute('aa');
                }
            }
        }

    }




};








