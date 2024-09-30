window.addEventListener("load", () => {
    const c = setTimeout(() => {
        document.querySelector('.flowers-container').classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);
});