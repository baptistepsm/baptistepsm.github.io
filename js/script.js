const canvas = document.getElementById('bouncing-gifts');
const ctx = canvas.getContext('2d');

// Redimensionner le canvas pour couvrir l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Liste des images de cadeaux
const gifts = [
    '🎁', '🎄', '🎅', '❄️', '🔔'
];

// Tableau pour stocker les objets cadeaux
const giftObjects = [];

// Fonction pour créer un cadeau aléatoire
function createGift() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        size: Math.random() * 40 + 20, // Taille entre 20px et 60px
        opacity: Math.random() * 0.5 + 0.5, // Opacité entre 0.5 et 1
        emoji: gifts[Math.floor(Math.random() * gifts.length)]
    };
}

// Ajouter des cadeaux au tableau
for (let i = 0; i < 20; i++) {
    giftObjects.push(createGift());
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    giftObjects.forEach(gift => {
        // Dessiner chaque cadeau
        ctx.globalAlpha = gift.opacity;
        ctx.font = `${gift.size}px Arial`;
        ctx.fillText(gift.emoji, gift.x, gift.y);

        // Mise à jour de la position
        gift.x += gift.dx;
        gift.y += gift.dy;

        // Collision avec les bords
        if (gift.x < 0 || gift.x > canvas.width - gift.size) gift.dx *= -1;
        if (gift.y < 0 || gift.y > canvas.height - gift.size) gift.dy *= -1;
    });

    requestAnimationFrame(animate);
}

// Démarrer l'animation
animate();

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');

    const playlist = ['../medias/baptiste-music.mp3', '../medias/lea-music.mp3'];
    let currentTrackIndex = 0;
    audioPlayer.volume = 0.5;

    // Lecture / Pause
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error("Erreur pendant la lecture :", error);
            });
            playPauseBtn.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    // Suivant
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        audioPlayer.src = playlist[currentTrackIndex];

        // Attendre que la source soit prête
        audioPlayer.addEventListener('canplay', () => {
            audioPlayer.play().catch(error => {
                console.error("Erreur pendant la lecture :", error);
            });
        });
        audioPlayer.load();
        playPauseBtn.textContent = '⏸️';
    });

    // Réglage du volume
    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value;
    });

    // Gestion des erreurs de lecture
    audioPlayer.addEventListener('error', () => {
        console.error("Erreur : le fichier audio n'a pas pu être lu.");
    });
});



function playMusic(audioFile) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = audioFile;
    audioPlayer.play();
}



