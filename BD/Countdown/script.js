document.addEventListener('DOMContentLoaded', () => {
    const countdownEls = document.querySelectorAll(".countdown-namespace .countdown");
    countdownEls.forEach(countdownEl => createCountdown(countdownEl));
});

function createCountdown(countdownEl) {
    const targetDate = new Date(countdownEl.dataset.targetDate);
    const parts = createCountdownParts();
    appendPartsToCountdown(countdownEl, parts);
    updateCountdown(targetDate, parts);

    setInterval(() => updateCountdown(targetDate, parts), 1000);
}

function createCountdownParts() {
    return {
        days: { text: ["days", "day"], dots: 30 },
        hours: { text: ["hours", "hour"], dots: 24 },
        minutes: { text: ["minutes", "minute"], dots: 60 },
        seconds: { text: ["seconds", "second"], dots: 60 }
    };
}

function appendPartsToCountdown(countdownEl, parts) {
    Object.entries(parts).forEach(([key, value]) => {
        const partEl = document.createElement("div");
        partEl.classList.add("part", key);
        partEl.style.setProperty("--dots", value.dots);

        const remainingEl = document.createElement("div");
        remainingEl.classList.add("remaining");
        remainingEl.innerHTML = `
        <span class="number"></span>
        <span class="text"></span>
      `;
        partEl.append(remainingEl);

        for (let i = 0; i < value.dots; i++) {
            const dotContainerEl = document.createElement("div");
            dotContainerEl.style.setProperty("--dot-idx", i);
            dotContainerEl.classList.add("dot-container");

            const dotEl = document.createElement("div");
            dotEl.classList.add("dot");
            dotContainerEl.append(dotEl);

            partEl.append(dotContainerEl);
        }
        countdownEl.append(partEl);
        value.element = partEl;
    });
}

function updateCountdown(target, parts) {
    const now = new Date();
    const timeDiff = Math.max(0, target - now);

    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor(timeDiff / 60000) % 60;
    const hours = Math.floor(timeDiff / 3600000) % 24;
    const days = Math.floor(timeDiff / 86400000);

    const remainingTimes = { days, hours, minutes, seconds };

    Object.entries(remainingTimes).forEach(([key, value]) => {
        const partEl = parts[key].element;
        partEl.querySelector(".number").innerText = value;
        partEl.querySelector(".text").innerText = parts[key].text[value === 1 ? 1 : 0];

        const dots = partEl.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            dot.dataset.active = idx < value;
            dot.dataset.lastactive = idx === value;
        });
    });
}