
const audioPlay = document.querySelector(".audio__play"),
 audioIcon = document.querySelector(".fa-play"),
 audioDownload = document.querySelector(".audio__download"),
 audio = document.querySelector(".audio__src"),
 audioEnd = document.querySelector(".audio__endtime"),
 fill = document.getElementById('fill'),
 audioCurrentTime = document.querySelector(".audio__time"),
 bar = document.querySelector(".audio__bar"),
 volumeBtn = document.getElementById('volumeIcon'),
 InputRange = document.querySelector(".audio__volumeRange")

//Мьют трека 
volumeBtn.addEventListener("click", function() {
  const isMuted = volumeBtn.classList.contains('fa-volume-xmark');
  if (isMuted) {
    const lastVolume = localStorage.getItem('last') || 1; // По умолчанию громкость 1, если не найдено в localStorage
    audio.volume = lastVolume;
    InputRange.value = lastVolume * 100;
    localStorage.removeItem('last'); 
  } else {
    localStorage.setItem('last', audio.volume);
    audio.volume = 0;
    InputRange.value = 0;
  }
  volumeBtn.classList.toggle('fa-volume-xmark'); // Используем toggle для переключения класса
});

//Длинна трека
const show = audio.addEventListener('canplaythrough', function() {
  let duration = audio.duration; 
  let min = Math.floor(duration/60);
  let sec = Math.floor(duration%60);
  if (min < 10) { min = '0' + min; }
  if (sec < 10) { sec = '0' + sec; }
  audioEnd.textContent = `${min}:${sec}`;
});


//Пауза и включение трека
  audioPlay.addEventListener("click",function()
  {
    if(audioIcon.classList.contains("fa-play") )
    {
        audio.play()
        audioIcon.classList.replace("fa-play", "fa-pause");
    }
    else{
        audio.pause()
        audioIcon.classList.replace("fa-pause", "fa-play");
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
      audioCurrentTime.textContent= `${min}:${sec}`;
    })                 

    let isDragging = false; //Проверка на перетаскивание 

    //Заполнение прогресс бара     
    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      fill.style.width = `${percent}%`;
    
      if (percent === 100) {
        audio.pause();
        audioIcon.classList.add("fa-play");
      }
    });
    //Перетаскивание бара на ПК
    bar.addEventListener('click', (e) => {
      const rect = bar.getBoundingClientRect();
      const offsetX = (e.type === 'click') ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const percent = Math.min(1, Math.max(0, offsetX / rect.width));
      fill.style.width = `${percent * 100}%`;
      audio.currentTime = audio.duration * percent;
    });
    //Перетаскивание на Телефоне 
    fill.addEventListener('touchstart', (e) => {
      const rect = bar.getBoundingClientRect();
      const offsetX = e.touches[0].clientX - rect.left;
      const percent = Math.min(1, Math.max(0, offsetX / rect.width));
      fill.style.width = `${percent * 100}%`;
      audio.currentTime = audio.duration * percent;
      isDragging = true;
      e.preventDefault();
    });
    //Перетаскивание на Телефоне 
    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const rect = bar.getBoundingClientRect();
        const offsetX = e.touches[0].clientX - rect.left;
        const percent = Math.min(1, Math.max(0, offsetX / rect.width));
        fill.style.width = `${percent * 100}%`;
        audio.currentTime = audio.duration * percent;
      }
    });
     //isDragging false если нажато
    document.addEventListener('touchend', () => {
      isDragging = false;
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

  volumeRange.addEventListener("input", function() {
    let volume = Number(this.value);
    audio.volume = volume / 100;
    if (volume > 0) {
      volumeBtn.classList.remove('fa-volume-xmark');
    } else {
      volumeBtn.classList.add('fa-volume-xmark');
    }
  });
  document.addEventListener("DOMContentLoaded",show)