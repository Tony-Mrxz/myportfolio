document.addEventListener('DOMContentLoaded', () => {
    showSection('introduction');
    loadLikeCount();
    setupAudio();
    loadDesigns();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const designs = document.querySelectorAll('.design-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            designs.forEach(design => {
                if (filter === 'all' || design.classList.contains(filter)) {
                    design.style.display = 'block';
                } else {
                    design.style.display = 'none';
                }
            });
        });
    });
});
const images = [
    { src: "designs/auxin .png", title: "Auxin Design", category: "logos" },
    { src: "designs/BMW.png", title: "BMW Design", category: "portraits" },
    { src: "designs/namaha.png", title: "Namaha Design", category: "logos" },
    { src: "designs/porsche .png", title: "Porsche Design", category: "portraits" },
    { src: "designs/porsche 2.png", title: "Porsche 2 Design", category: "landscapes" },
    { src: "designs/Soul Devs.png", title: "Soul Devs Design", category: "logos" },
    { src: "designs/thumbnail 1.png", title: "Thumbnail 1", category: "landscapes" },
    { src: "designs/thumbnail 2.png", title: "Thumbnail 2", category: "landscapes" },
    { src: "designs/thumbnail 3.png", title: "Thumbnail 3", category: "landscapes" },
    { src: "designs/thumbnail 4.png", title: "Thumbnail 4", category: "landscapes" }
];
  
let currentIndex = 0;
  
const gallery = document.getElementById('galleryContainer');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
  
  // Render images
function renderImages(filter) {
    gallery.innerHTML = '';
    const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);
  
    filtered.forEach((imgData, index) => {
      const container = document.createElement('div');
      container.classList.add('design-container');
  
      const img = document.createElement('img');
      img.src = imgData.src;
      img.alt = imgData.title;
  
      const title = document.createElement('div');
      title.classList.add('design-title');
      title.innerText = imgData.title;
  
      container.appendChild(img);
      container.appendChild(title);
      gallery.appendChild(container);
  
      container.addEventListener('click', () => {
        currentIndex = images.indexOf(imgData);
        showModal(currentIndex);
      });
    });
}
  
  // Modal
function showModal(index) {
    const imgData = images[index];
    modal.style.display = "block";
    modalImg.src = imgData.src;
    modalTitle.innerText = imgData.title;
}
  
closeBtn.onclick = () => modal.style.display = "none";
  
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showModal(currentIndex);
};
  
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showModal(currentIndex);
};
  
  // Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderImages(btn.dataset.filter);
    });
});
  
  // Initial
renderImages('logos'); // Show logos by default

  
  

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.introduction, .projects, .connections, .designs').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.section-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }

    // Add active class to the clicked button
    const activeButton = document.querySelector(`.section-button[onclick="showSection('${sectionId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function loadLikeCount() {
    const likeCountElement = document.getElementById('like-count');
    if (!likeCountElement) return;

    const likeCount = localStorage.getItem('likeCount') || 0;
    likeCountElement.textContent = likeCount;
}

function handleLikeClick() {
    const likeButton = document.querySelector('.like-button');
    const likeCountElement = document.getElementById('like-count');

    if (!likeButton || !likeCountElement) return;

    let likeCount = parseInt(likeCountElement.textContent, 10) || 0;
    likeCount += 1;
    likeCountElement.textContent = likeCount;

    // Save like count to localStorage
    localStorage.setItem('likeCount', likeCount);

    // Create heart burst animation
    const heartBurst = document.createElement('div');
    heartBurst.classList.add('heart-burst');
    likeButton.appendChild(heartBurst);

    // Remove heart burst after animation
    heartBurst.addEventListener('animationend', () => {
        heartBurst.remove();
    });

    // Disable further clicks
    likeButton.classList.add('clicked');
}



function setupAudio() {
    const songs = [
        { name: "Sapta Sagaradaache Ello Veena Bit", file: "veena bit.mp3", album: "sapta saagara.jpg", link: "https://open.spotify.com/track/1ITBzhIL6vXv57RPk87RSs?si=437aa1fba06847bd" },
        { name: "Sapta Sagaradaache Ello", file: "sapta saagara.mp3", album: "sapta saagara.jpg", link: "https://open.spotify.com/track/1ITBzhIL6vXv57RPk87RSs?si=437aa1fba06847bd" },
        { name: "Strawberries & Cigarettes", file: "strawberries and cigarettes.mp3", album: "strawberries.png", link: "https://open.spotify.com/track/3afkJSKX0EAMsJXTZnDXXJ?si=5010856bae8f41e1" },
        { name: "Blue ~ Flute Version", file: "Blue ~ Flute Version.wav", album: "profile.png", link: "https://www.instagram.com/reel/DFLTzjYpjhF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
    ];

    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const audioElement = document.getElementById("bg-audio");
    const albumCover = document.getElementById("album-cover");
    const songTitle = document.getElementById("song-title");
    const songLink = document.getElementById("song-link");
    audioElement.volume = 0.2; 

    audioElement.src = randomSong.file;
    albumCover.src = randomSong.album;
    songTitle.textContent = randomSong.name;
    songLink.href = randomSong.link;

    function playMusic() {
        audioElement.play();
        document.removeEventListener("click", playMusic); // Remove event after first interaction
    }

    document.addEventListener("click", playMusic, { once: true });
}

window.addEventListener("DOMContentLoaded", setupAudio);
// Call setupAudio when page loads


function toggleMusicBox() {
    const musicBox = document.getElementById("music-box");
    musicBox.classList.toggle("expanded");
    musicBox.classList.toggle("collapsed");
}

function toggleMute() {
    const audioElement = document.getElementById("bg-audio");
    const muteIcon = document.getElementById("mute-icon");

    audioElement.muted = !audioElement.muted;
    
    if (audioElement.muted) {
        muteIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS12b2x1bWUtb2ZmIj48cGF0aCBkPSJNMTYgOWE1IDUgMCAwIDEgLjk1IDIuMjkzIi8+PHBhdGggZD0iTTE5LjM2NCA1LjYzNmE5IDkgMCAwIDEgMS44ODkgOS45NiIvPjxwYXRoIGQ9Im0yIDIgMjAgMjAiLz48cGF0aCBkPSJtNyA3LS41ODcuNTg3QTEuNCAxLjQgMCAwIDEgNS40MTYgOEgzYTEgMSAwIDAgMC0xIDF2NmExIDEgMCAwIDAgMSAxaDIuNDE2YTEuNCAxLjQgMCAwIDEgLjk5Ny40MTNsMy4zODMgMy4zODRBLjcwNS43MDUgMCAwIDAgMTEgMTkuMjk4VjExIi8+PHBhdGggZD0iTTkuODI4IDQuMTcyQS42ODYuNjg2IDAgMCAxIDExIDQuNjU3di42ODYiLz48L3N2Zz4=";
    } else {
        muteIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS12b2x1bWUtMiI+PHBhdGggZD0iTTExIDQuNzAyYS43MDUuNzA1IDAgMCAwLTEuMjAzLS40OThMNi40MTMgNy41ODdBMS40IDEuNCAwIDAgMSA1LjQxNiA4SDNhMSAxIDAgMCAwLTEgMXY2YTEgMSAwIDAgMCAxIDFoMi40MTZhMS40IDEuNCAwIDAgMSAuOTk3LjQxM2wzLjM4MyAzLjM4NEEuNzA1LjcwNSAwIDAgMCAxMSAxOS4yOTh6Ii8+PHBhdGggZD0iTTYgOWE1IDUgMCAwIDEgMCA2Ii8+PHBhdGggZD0iTTkuNjM2IDE0LjM2NEE5IDkgMCAwIDAgMTkuMzY0IDQuNjM2Ii8+PC9zdmc+";
    }
}

