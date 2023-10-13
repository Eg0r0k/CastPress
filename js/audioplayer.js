
const audioPlay = document.querySelector(".audio__play")
const audioIcon = document.querySelector(".fa-play")
const audioDownload = document.querySelector(".audio__download")
const audio = document.querySelector(".audio__src")
const audioEnd = document.querySelector(".audio__endtime")
const fill = document.getElementById('fill')
const audioCurrentTime = document.querySelector(".audio__time")
const bar = document.querySelector(".audio__bar")
const volumeBtn = document.getElementById('volumeIcon')
const InputRange = document.querySelector(".audio__volumeRange")

//Мьют трека 

volumeBtn.addEventListener("click",function()
{
 
  if(volumeBtn.classList.contains('fa-volume-xmark'))
  {
    
    audio.volume = localStorage.getItem('last');
    volumeBtn.classList.remove("fa-volume-xmark")
    InputRange.value=Number(localStorage.getItem('last'))*100;

    localStorage.clear()

  }
  else{
    let lastVolume = audio.volume;
    localStorage.setItem('last',lastVolume)
    audio.volume=0;
    InputRange.value=0;
    volumeBtn.classList.add('fa-volume-xmark')
  }

  
})
//Длинна трека
const show = audio.addEventListener('loadedmetadata', function() {
    let duration = audio.duration; 
    let min = Math.floor(duration/60)
    let sec = Math.floor(duration%60)
    if (min< 10 ) { min = '0'+ min;}
    if (sec < 10) {sec = '0' + sec}
   audioEnd.textContent= min +":" + sec; 

  });

  audioPlay.addEventListener("click",function()
  {
    if(audioIcon.classList.contains("fa-play") )
    {
        audio.play()
        audioIcon.classList.remove("fa-play")
        audioIcon.classList.add("fa-pause")
    }
    else{
        audio.pause()
        audioIcon.classList.remove("fa-pause")
        audioIcon.classList.add("fa-play")
    }
  })
// Отсчет начала трека 
   audio.addEventListener("timeupdate",function()
   {
     let audioCurrent =audio.currentTime
     let sec = Math.floor(audioCurrent % 60) 
     let  min = Math.floor(audioCurrent / 60) ;
      if (sec < 10){ sec = '0' + sec}
      if(min < 10) {min = '0' + min}
      audioCurrentTime.textContent= min + ':' + sec;
    })                 

  // Прогресс бар
  audio.addEventListener("timeupdate",function(){
    
    let percent = (audio.currentTime / audio.duration) * 100;
     fill.style.width = percent + '%';

     if (fill.style.width == 100 + '%')       // Если прогресс бар 100% поставить иконку play 
     {
      audio.pause()
      audioIcon.classList.add("fa-play")
     }
  })


  // Отслежтвагте нажатия на прогресс бар
  bar.addEventListener('click', function(e) {
    let rect = bar.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let percent = offsetX / rect.width;
    audio.currentTime = audio.duration * percent;
  });

// Заргузка файла из источника audio
  audioDownload.addEventListener("click",function()
  {
    let link = document.createElement('a')
    link.href = audio.src
    link.download = audio.src;
    link.click();
  })
  // Громкость звука
  let volumeRange = document.querySelector(".audio__volumeRange")

  volumeRange.addEventListener("input",function(e){
   let volume =  Number(e.target.value);
    audio.volume =volume / 100
    if(volume > 0)
    {
      volumeBtn.classList.remove('fa-volume-xmark')   //Если громкость больше 0 убираем класс mute
    }
    if (volume == 0 )
    {
      volumeBtn.classList.add('fa-volume-xmark')
    }
  })
  document.addEventListener("DOMContentLoaded",show)