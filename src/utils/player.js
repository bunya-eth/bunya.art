const player = () => {
    var player = document.getElementById("player");
    let progress = document.getElementById("progress");
    let playbtn = document.getElementById("playbtn");
    const volumeIcon = document.querySelector(".volume-control i");
    const volumebar = document.getElementById("volumebar");

    let lastVolume = 0.05;
    player.volume = lastVolume;
    volumebar.value = player.volume;

    var playpause = function() {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    };
    playbtn.addEventListener("click", playpause);

    player.onplay = function() {
        playbtn.classList.remove("fa-play");
        playbtn.classList.add("fa-pause");
    };

    player.onpause = function() {
        playbtn.classList.add("fa-play");
        playbtn.classList.remove("fa-pause");
    };

    player.ontimeupdate = function() {
        let ct = player.currentTime;
        let current = document.getElementById("current");
        current.innerHTML = timeFormat(ct);
        let duration = player.duration;
        let prog = Math.floor((ct * 100) / duration);
        progress.style.setProperty("--progress", prog + "%");
    };

    volumebar.addEventListener("input", function() {
        player.volume = volumebar.value;
        lastVolume = player.volume; // Update lastVolume whenever the user changes the volume
        player.muted = false;
        updateVolumeIcon(player.volume, volumeIcon);
    });

    volumeIcon.addEventListener("click", function() {
        if (player.muted || player.volume === 0) {
            player.muted = false;
            player.volume = lastVolume; // Restore to last volume level
            volumebar.value = lastVolume;
            updateVolumeIcon(player.volume, volumeIcon);
        } else {
            lastVolume = player.volume; // Save current volume before muting
            player.muted = true;
            volumebar.value = 0;
            updateVolumeIcon(0, volumeIcon); // Pass 0 to indicate mute
        }
    });

    function updateVolumeIcon(volume, icon) {
        if (volume === 0 || player.muted) {
            icon.classList.remove("fa-volume-high");
            icon.classList.add("fa-volume-xmark");
        } else {
            icon.classList.add("fa-volume-high");
            icon.classList.remove("fa-volume-xmark");
        }
    }

    function timeFormat(ct) {
        let minutes = Math.floor(ct / 60);
        let seconds = Math.floor(ct % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    player.addEventListener('ended', function() {
        player.currentTime = 0;
        player.play();
    });
};

export default player;