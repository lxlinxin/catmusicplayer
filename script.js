//const:声明变量
const music=document.getElementById("music");//在html文件中，music我们给了id这个元素，所以就是从getelementfromid，注意每个单词开头要大写
const playButton=document.getElementById("playButton");
const dropzone=document.querySelector(".drop-zone");//在html文件中，dropzone的属性名是class，不是id，就要用queryselector这个来查找
const musicTime=document.getElementById("musicTime");
const currentMusicT=document.getElementById("currentMusicT");
const progressFill=document.getElementById("progressFill");
const progressBar=document.getElementById("progressBar");
const songs=[];//建立空数组，用来放歌
let currentIndex=0;//let和const是一回事，但是let的变量后面可以在赋值
const nextButton=document.getElementById("next");
const lastButton=document.getElementById("last");
const songName=document.getElementById("songName");
const songList=document.getElementById("songList");
const catOne=document.querySelector(".catOne");

//播放音乐与小猫左右摇头晃脑
music.addEventListener("play",function(){//addeventlistener前面的东西才是被监听的东西！
    catOne.classList.add("playing");//我没有在html声明playing这个class，但是我直接在css写好了playing是什么动画，这样就可以实现play和playing的联动了
   
});//这里playing是字符串要记得加引号

music.addEventListener("pause",function(){
    catOne.classList.remove("playing");
    
})

//文件拖入拽入筐上方
dropzone.addEventListener("dragover",function(event){ //dragover：有东西拖到上面触发   
    event.preventDefault();//组织浏览器对当前事件的默认处理行为
});
//放手
dropzone.addEventListener("drop",function(event){//drop:放下
    event.preventDefault();
    //获取拖入的第一个文件
    const file=event.dataTransfer.files[0];//datatransfer:拖拽时带着的文件,[0]是取第一个文件;等号就是在赋值，把拖进来的文件赋值给file
    songs.push(file);//把新加入的file放进数组里
    //统一给每次创建的div都搞一个class
    const songItem=document.createElement("div");
    songItem.className="song-item";
    songItem.textContent=file.name;

    songList.appendChild(songItem);
    //点击左侧列表播放歌曲
    songItem.addEventListener("click",function(){
        currentIndex=songs.indexOf(file);//indexOf就是查找file在songs这个数组里的位置，结果是一个数字
        const musicURL=URL.createObjectURL(file);
        //把这个地址交给播放器（html里面的audio就是播放器的意思，在html里面我们已经把audio这个元素的名字设置成music了（第22行）
        music.src=musicURL;
        songName.textContent="正在播放："+songs[currentIndex].name;
        music.play();
        playButton.textContent="暂停播放";

    });
});


//显示歌曲总时长
music.addEventListener("loadedmetadata",function(){
    const totalSeconds=Math.floor(music.duration);
    
    const minutes=Math.floor(totalSeconds/60);//math.floor向下取整
    const showMinutes=String(minutes).padStart(2,"0");//把minutes强制变成两位小数；0是说不足两位就往左边补0的意思
    
    const seconds=(totalSeconds%60);
    const showSeconds=String(seconds).padStart(2,"0");
    musicTime.textContent=showMinutes+":"+showSeconds;
});
//更新播放进度
music.addEventListener("timeupdate",function(){
    const currentSeconds=Math.floor(music.currentTime);
    
    const currentMinutes=Math.floor(currentSeconds/60);
    const remainSeconds=currentSeconds%60;//remain表示剩下的
    
    const csSeconds=String(remainSeconds).padStart(2,"0");
    const csMinutes=String(currentMinutes).padStart(2,"0");
    currentMusicT.textContent=csMinutes+":"+csSeconds;
    const progress=(music.currentTime/music.duration)*100;
    progressFill.style.width=progress+"%";
})
//点击播放按钮的时候开始播放音乐
playButton.addEventListener("click",function(){
    if(music.paused){
        music.play();
        playButton.textContent="暂停播放";
    }
    else{
        music.pause();
        playButton.textContent="播放音乐";
    }
});
//下一首
nextButton.addEventListener("click",function(){
    currentIndex++;
    if(currentIndex>=songs.length){//songslength是实际的歌曲数量，index是索引数，两者最大值差一
        currentIndex=0;
    }
    const musicURL=URL.createObjectURL(songs[currentIndex]);//URL是浏览器提供的内置对象;括号里要写文件名字，原来只写了索引数是错的
    music.src=musicURL;
    music.play();
    playButton.textContent="暂停播放";
    songName.textContent="正在播放："+songs[currentIndex].name;
    
})
//上一首
lastButton.addEventListener("click",function(){
    currentIndex--;
    if(currentIndex<0){
        currentIndex=songs.length-1;
    }
    const musicURL=URL.createObjectURL(songs[currentIndex]);
    music.src=musicURL;
    music.play();
    playButton.textContent="暂停播放";
    songName.textContent="正在播放："+songs[currentIndex].name;

})
//点击播放按钮之后,进度条
progressBar.addEventListener("click",function(event){//click是单纯的动作，event是这个动作传输的信息
    const barleft=progressBar.getBoundingClientRect().left;//bar的最左端到网页边界的距离
    const clientX=event.clientX-barleft;//计算点击的位置距离灰条最左边的距离,x就是横坐标，y同理是纵坐标，client后面也可以接别的东西比如下面的width
    const clickPercent=clientX/progressBar.clientWidth;
    music.currentTime=clickPercent*music.duration;

    
});
//结束播放后
music.addEventListener("ended",function(){
    music.currentTime=0;
    progressFill.style.width="0%";
    currentMusicT.textContent="00:00";
    playButton.textContent="播放音乐";
});
const coords = document.getElementById("coords");
