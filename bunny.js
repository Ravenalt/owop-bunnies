(function () {
    if (OWOP.bunnyAnimator) return;

    const SPRITE_URL = 'https://raw.githubusercontent.com/Ravenalt/owop-bunnies/refs/heads/main/bunny-sheet.png'; // update to your uploaded bunny image URL
    const FRAME_WIDTH = 96;
    const FRAME_HEIGHT = 36;
    const FRAMES_PER_ROW = 6;
    const TOTAL_FRAMES = 6; // using only top row for now
    const SPRITE_DURATION = 100;

    const bunny = document.createElement('div');
    bunny.style.position = 'absolute';
    bunny.style.left = '50%';
    bunny.style.top = '50%';
    bunny.style.width = FRAME_WIDTH + 'px';
    bunny.style.height = FRAME_HEIGHT + 'px';
    bunny.style.backgroundImage = `url(${SPRITE_URL})`;
    bunny.style.backgroundRepeat = 'no-repeat';
    bunny.style.backgroundSize = `${FRAME_WIDTH * FRAMES_PER_ROW}px ${FRAME_HEIGHT * 8}px`;
    bunny.style.zIndex = '9999';
    bunny.style.imageRendering = 'pixelated';
    bunny.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(bunny);

    OWOP.bunnyAnimator = {
        el: bunny,
        frame: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: 0,
        dy: 0,
        animateFrame() {
            const col = this.frame % FRAMES_PER_ROW;
            const row = 0; // top row only
            const xPos = -col * FRAME_WIDTH;
            const yPos = -row * FRAME_HEIGHT;
            this.el.style.backgroundPosition = `${xPos}px ${yPos}px`;
            this.frame = (this.frame + 1) % TOTAL_FRAMES;
        },
        hopLoop() {
            this.dx = (Math.random() - 0.5) * 30;
            this.dy = (Math.random() - 0.5) * 30;

            let hopSteps = 8;
            const step = () => {
                if (hopSteps-- <= 0) {
                    setTimeout(() => this.hopLoop(), 1000 + Math.random() * 1000);
                    return;
                }
                this.x += this.dx;
                this.y += this.dy;
                this.x = Math.max(0, Math.min(window.innerWidth - FRAME_WIDTH, this.x));
                this.y = Math.max(0, Math.min(window.innerHeight - FRAME_HEIGHT, this.y));
                this.el.style.left = this.x + 'px';
                this.el.style.top = this.y + 'px';
                this.animateFrame();
                setTimeout(step, SPRITE_DURATION);
            };
            step();
        }
    };

    OWOP.bunnyAnimator.hopLoop();
})();
