// Mengambil elemen berdasarkan struktur HTML yang ada
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

const textarea = document.querySelector('.input-group textarea');
const diceBtn = document.querySelector('.dice-icon');
const generateBtn = document.querySelector('.generate-btn');
const resultArea = document.getElementById('resultArea');
const modelSelect = document.getElementById('model');
const imageCountSelect = document.getElementById('imageCount');
const aspectRatioSelect = document.getElementById('aspectRatio');

// --- 1. FUNGSI DARK MODE ---
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fa-solid fa-sun';
}

themeBtn.addEventListener('click', () => {
    if (body.hasAttribute('data-theme')) {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fa-solid fa-moon'; // Ikon bulan untuk light mode
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun'; // Ikon matahari untuk dark mode
        localStorage.setItem('theme', 'dark');
    }
});

// --- 2. FUNGSI DADU (RANDOM PROMPT) ---
const randomPrompts = [
    "A futuristic cyberpunk city with neon lights and flying cars, 8k resolution.",
    "A cute astronaut cat floating in deep space, digital art style.",
    "A peaceful Japanese garden with a koi pond during autumn, Ghibli style.",
    "An ancient castle hidden inside a giant glowing mushroom forest.",
    "A majestic dragon made of water rising from a stormy ocean."
];

diceBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    textarea.value = randomPrompts[randomIndex];
    textarea.focus();
});

// --- 3. FUNGSI GENERATE ---
function getAspectDimensions(aspect) {
    if (aspect === '16:9') return { width: 560, height: 315 };
    if (aspect === '9:16') return { width: 315, height: 560 };
    return { width: 500, height: 500 };
}

function renderResults(images, meta) {
    if (!images.length) {
        resultArea.innerHTML = '<p class="no-result">No images generated yet. Use the Generate button.</p>';
        return;
    }

    resultArea.innerHTML = images.map((image) => {
        return `
            <div class="result-card">
                <img src="${image.url}" alt="AI generated image" />
                <div class="result-meta">
                    <span><strong>Model:</strong> ${meta.model}</span>
                    <span><strong>Prompt:</strong> ${meta.promptShort}</span>
                    <span><strong>Aspect:</strong> ${meta.aspect}</span>
                </div>
                <p>${meta.prompt}</p>
            </div>
        `;
    }).join('');
}

generateBtn.addEventListener('click', () => {
    const promptValue = textarea.value.trim();
    if (promptValue === "") {
        alert("Masukkan deskripsi terlebih dahulu sebelum generate.");
        textarea.focus();
        return;
    }

    const modelValue = modelSelect.value || 'Default AI Model';
    const countValue = Number(imageCountSelect.value) || 1;
    const aspectValue = aspectRatioSelect.value || '1:1';
    const { width, height } = getAspectDimensions(aspectValue);

    const originalContent = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;

    resultArea.innerHTML = '<p class="loading">Generating AI images... please wait.</p>';

    setTimeout(() => {
        const images = Array.from({ length: countValue }, (_, index) => {
            const seed = encodeURIComponent(promptValue + modelValue + index);
            return {
                url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
            };
        });

        renderResults(images, {
            model: modelValue,
            aspect: aspectValue,
            prompt: promptValue,
            promptShort: promptValue.length > 45 ? promptValue.slice(0, 45) + '...' : promptValue,
        });

        generateBtn.innerHTML = originalContent;
        generateBtn.disabled = false;
    }, 1800);
});