const menuButton = document.querySelectorAll(".menu-button");
const screenOverlay = document.querySelector(".screen-overlay");
const themeBtn = document.querySelector(".theme-button i");

if (localStorage.getItem("darkMode") == "true") {
    document.body.classList.add("dark-mode");
    themeBtn.classList.add("uil-sun");
    localStorage.setItem("darkMode", true);
}
themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    themeBtn.classList.toggle("uil-sun", isDark);
    localStorage.setItem("darkMode", isDark);
});

if (window.innerWidth <= 768) {
    if (localStorage.getItem("sidebarHidden") == "true") {
        document.body.classList.add("sidebar-hidden");
        localStorage.setItem("sidebarHidden", true);
        screenOverlay.style.display = "block";
    }
}
menuButton.forEach(btns => {
    btns.addEventListener("click", () => {
        const istrue = document.body.classList.toggle("sidebar-hidden");
        localStorage.setItem("sidebarHidden", istrue);
    });
});

screenOverlay.addEventListener("click", () => {
    const istrue = document.body.classList.toggle("sidebar-hidden");
    localStorage.setItem("sidebarHidden", istrue);
});

// Add your code here to fetch data from API and populate the dropdown menu

const videoList = document.querySelector(".video-list");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");

const api_key = "AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE";
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const search_http = "https://www.googleapis.com/youtube/v3/search?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// HOME PAGE VIDEO LIST FETCH API
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: "snippet",
    chart: "mostPopular",
    maxResults: 6,
    // regionCode: "IN"
}))
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    })
    .catch((err) => {
        console.log(err);
    })

// SEARCH VIDEO LIST FETCH API
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    fetch(search_http + new URLSearchParams({
        key: api_key,
        part: "snippet",
        q: searchQuery,
        maxResults: 6
    }))
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            videoList.innerHTML = "";
            data.items.forEach(item => {
                getChannelIcon(item);
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

// CHANNEL DETAILS API
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId
    }))
        .then((res) => res.json())
        .then((data) => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            console.log(video_data);
            makeVideoCard(video_data);
        })
}

// VIDEO CARD MAKEUP
const makeVideoCard = (data) => {
    videoList.innerHTML += `
        <a href="#" class="video-card" onclick='location.href = "https://www.youtube.com/watch?v=${data.id}"'>
            <div class="thumbnail-container">
                <img src="${data.snippet.thumbnails.medium.url}" alt="Video Thumbnail"
                class="thumbnail">
                <p class="duration">10:03</p>
            </div>
            <div class="video-info">
                <img src="${data.channelThumbnail}" alt="Channel Logo" class="icon">
                <div class="video-details">
                    <h2 class="title">${data.snippet.title}</h2>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                    <p class="views">27K Views • 4 months ago</p>
                </div>
            </div>
        </a>
    `
}