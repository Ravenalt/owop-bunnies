(function () {
    if (OWOP.bunnyFlipHop) return;

    const SPRITE_URL = 'https://raw.githubusercontent.com/Ravenalt/owop-bunnies/main/cat4.png'; // Replace with your upload
    const FRAME_WIDTH = 48;
    const FRAME_HEIGHT = 48;
    const TOTAL_FRAMES = 2;
    const SPRITE_DURATION = 200;

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
    bunny.style.transform = 'translate(-50%, -50%)';
    bunny.style.filter = 'brightness(0) saturate(100%) invert(86%) sepia(13%) saturate(438%) hue-rotate(299deg) brightness(105%) contrast(104%)';

    document.body.appendChild(bunny);

    OWOP.bunnyFlipHop = {
        el: bunny,
        frame: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: 0,
        dy: 0,
        facingLeft: true,
        animateFrame() {
            const xPos = -this.frame * FRAME_WIDTH;
            this.el.style.backgroundPosition = `${xPos}px 0px`;
            this.frame = (this.frame + 1) % TOTAL_FRAMES;
        },
        updateFlip() {
            this.el.style.scale = this.facingLeft ? '1 1' : '-1 1';
        },
        hopLoop() {
            this.dx = (Math.random() - 0.5) * 50;
            this.dy = (Math.random() - 0.5) * 30;
            this.facingLeft = this.dx < 0;
            this.updateFlip();

            let hopSteps = 6;
            const step = () => {
                if (hopSteps-- <= 0) {
                    // Switch to idle frame
                    this.frame = 0;
                    this.animateFrame();
                    setTimeout(() => this.hopLoop(), 1500 + Math.random() * 500);
                    return;
                }

                this.x += this.dx / 6;
                this.y += this.dy / 6;
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

    OWOP.bunnyFlipHop.hopLoop();
})();
