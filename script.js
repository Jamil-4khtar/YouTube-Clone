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
