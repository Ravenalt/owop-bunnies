(function () {
    if (OWOP.bunnyButtons) return;

    OWOP.bunnyButtons = {
        buttons: [],
        createButton() {
            const btn = document.createElement("div");
            btn.style.position = "absolute";
            btn.style.left = Math.random() * (window.innerWidth - 64) + "px";
            btn.style.top = Math.random() * (window.innerHeight - 64) + "px";
            btn.style.width = "64px";
            btn.style.height = "64px";
            btn.style.backgroundImage = "url('https://imgur.com/bH2vwiv')";
            btn.style.backgroundSize = "contain";
            btn.style.backgroundRepeat = "no-repeat";
            btn.style.zIndex = "9999";
            btn.style.cursor = "pointer";

            btn._hopping = false;

            btn.addEventListener("mouseenter", () => {
                if (!btn._hopping) {
                    btn._hopping = true;
                    this.hopLoop(btn);
                }
            });

            document.body.appendChild(btn);
            this.buttons.push(btn);
        },
        hopLoop(btn) {
            if (!btn._hopping) return;
            const x = parseFloat(btn.style.left);
            const y = parseFloat(btn.style.top);
            const dx = (Math.random() - 0.5) * 100;
            const dy = (Math.random() - 0.5) * 100;
            const newX = Math.max(0, Math.min(window.innerWidth - 64, x + dx));
            const newY = Math.max(0, Math.min(window.innerHeight - 64, y + dy));

            btn.style.transition = "all 0.2s ease";
            btn.style.left = newX + "px";
            btn.style.top = newY + "px";

            setTimeout(() => this.hopLoop(btn), 800);
        },
        spawn(count = 2) {
            for (let i = 0; i < count; i++) {
                this.createButton();
            }
        }
    };

    OWOP.bunnyButtons.spawn(2);
})();
