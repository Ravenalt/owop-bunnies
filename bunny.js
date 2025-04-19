(function () {
    if (OWOP.bunnyAnimator) return;

    const SPRITE_URL = 'https://opengameart.org/sites/default/files/rabbit_3.png';
    const FRAME_WIDTH = 32;
    const FRAME_HEIGHT = 32;
    const TOTAL_FRAMES = 4;
    const SPRITE_DURATION = 100;

    const bunny = document.createElement('div');
    bunny.style.position = 'absolute';
    bunny.style.left = '50%';
    bunny.style.top = '50%';
    bunny.style.width = FRAME_WIDTH + 'px';
    bunny.style.height = FRAME_HEIGHT + 'px';
    bunny.style.backgroundImage = `url(${SPRITE_URL})`;
    bunny.style.backgroundRepeat = 'no-repeat';
    bunny.style.backgroundSize = `${FRAME_WIDTH * TOTAL_FRAMES}px ${FRAME_HEIGHT}px`;
    bunny.style.zIndex = '9999';
    bunny.style.imageRendering = 'pixelated';

    document.body.appendChild(bunny);

    OWOP.bunnyAnimator = {
        el: bunny,
        frame: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: 0,
        dy: 0,
        animateFrame() {
            this.frame = (this.frame + 1) % TOTAL_FRAMES;
            this.el.style.backgroundPosition = `-${this.frame * FRAME_WIDTH}px 0px`;
        },
        hopLoop() {
            this.dx = (Math.random() - 0.5) * 20;
            this.dy = (Math.random() - 0.5) * 20;

            let hopSteps = 10;
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
