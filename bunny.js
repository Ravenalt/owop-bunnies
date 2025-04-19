(function () {
    if (OWOP.bunnyFlipHop) return;

    const SPRITE_URL = 'https://raw.githubusercontent.com/Ravenalt/owop-bunnies/main/flippy-bunny.png';
    const FRAME_WIDTH = 48;
    const FRAME_HEIGHT = 48;
    const TOTAL_FRAMES = 2;
    const SPRITE_DURATION = 200;

    function loadAndCleanSprite(url, callback) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imgData.data;

            // Make exact pink RGB(255, 151, 191) transparent
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                if (r === 255 && g === 151 && b === 191) {
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imgData, 0, 0);
            callback(canvas.toDataURL());
        };
        img.src = url;
    }

    const bunny = document.createElement('div');
    bunny.style.position = 'absolute';
    bunny.style.left = '50%';
    bunny.style.top = '50%';
    bunny.style.width = FRAME_WIDTH + 'px';
    bunny.style.height = FRAME_HEIGHT + 'px';
    bunny.style.backgroundRepeat = 'no-repeat';
    bunny.style.backgroundSize = `${FRAME_WIDTH * TOTAL_FRAMES}px ${FRAME_HEIGHT}px`;
    bunny.style.zIndex = '9999';
    bunny.style.imageRendering = 'pixelated';
    bunny.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(bunny);

    loadAndCleanSprite(SPRITE_URL, (cleanedURL) => {
        bunny.style.backgroundImage = `url(${cleanedURL})`;
    });
