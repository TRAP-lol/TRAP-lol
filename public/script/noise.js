// noise.js (Enhanced)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.blood-overlay');
    const ctx = canvas.getContext('2d');
    let currentArtwork = null;

    // Schema Validation
    async function validateBloodSchema(artwork) {
        try {
            const response = await fetch('/public/data/schemas/noise-laws.json');
            const schema = await response.json();
            const validator = new ajv();
            const validate = validator.compile(schema);
            if (!validate(artwork)) {
                throw new Error(`Schema violation: ${JSON.stringify(validate.errors)}`);
            }
        } catch (error) {
            console.error('Schema corruption:', error);
        }
    }


    function renderArtifact() {
        const mainImg = document.querySelector('.main-artifact');
        mainImg.src = currentArtwork.process.sketches[0].path;
        mainImg.dataset.fullRes = currentArtwork.process.highResPath;

        // Validation
        document.getElementById('shaHash').textContent = currentArtwork.validation.sha256;
        document.getElementById('vaultId').textContent = currentArtwork.validation.razorSignature.vaultId;
        document.getElementById('bloodDate').textContent = currentArtwork.validation.razorSignature.bloodDate;

        // Documentation
        const sketchesContainer = document.getElementById('sketchesContainer');
        sketchesContainer.innerHTML = currentArtwork.process.sketches
            .map(sketch => `
                <div class="sketch-card" data-sketch-id="${sketch.sketchId}">
                    <img src="${sketch.path}" alt="Process sketch ${sketch.sketchId}">
                    <time>${new Date(sketch.createdAt).toLocaleDateString()}</time>
                </div>
            `).join('');

        document.getElementById('inspirationDetails').innerHTML = `
            EXIF Hash: <code>${currentArtwork.process.inspirationPhoto.exifHash}</code><br>
            Intent: <em>${currentArtwork.process.inspirationPhoto.emotionalIntent}</em>
        `;

        document.getElementById('engravingText').textContent = currentArtwork.certificate.engravingText;
        document.getElementById('materialsList').innerHTML = currentArtwork.certificate.materialsUsed
            .map(m => `<li>${m}</li>`).join('');

        // Poetry
        document.getElementById('poemTitle').textContent = currentArtwork.poem.title;
        document.getElementById('poemText').textContent = currentArtwork.poem.text;
        const audioElement = document.getElementById('poemAudio');
        audioElement.querySelector('source').src = currentArtwork.poem.audioPath;
        audioElement.load();
    }

    function generateBloodQR(url) {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.innerHTML = '';
    
        try {
            new QRCode(qrContainer, {
                text: url,
                width: 256,
                height: 256,
                colorDark: '#333333',
                colorLight: 'rgba(0,0,0,0)',
                errorCorrectionLevel: 'H'
            });
            console.log('QR Blood Pact sealed');
        } catch (error) {
            console.error('QR Ritual failed:', error);
            qrContainer.innerHTML = '<div class="blood-error">QR INVALID</div>';
        }
    }

    async function performBloodSacrifice() {
        const pathSegments = window.location.pathname
            .replace('/index.html', '')
            .split('/')
            .filter(Boolean);

        const [series, edition] = pathSegments.slice(1);

        try {
            const response = await fetch('/public/data/noise.json');
            const artworks = await response.json();

            currentArtwork = artworks.find(a => 
                a.series.toLowerCase() === series.toLowerCase() && 
                a.edition.toLowerCase() === edition.toLowerCase()
            );

            if (!currentArtwork) throw new Error('Artifact not found');

            // Temporarily disable schema validation for testing
            // await validateBloodSchema(currentArtwork);

            renderArtifact();
            generateBloodQR(currentArtwork?.validation?.qrCode?.url || window.location.href);
            resizeCanvas();
            enableBloodResolution();

            document.title = `NOISE :: ${currentArtwork.poem.title}`;
        } catch (error) {
            console.error('Artifact retrieval failed:', error);
            // Only redirect if artifact not found
            if (error.message.includes('not found')) {
                window.location.href = '/';
            }
        }
    }

    // Throttled Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
    });

    // Initialize
    if (window.location.pathname.startsWith('/noise/')) {
        performBloodSacrifice();
    }
});