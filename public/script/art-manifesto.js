document.addEventListener('DOMContentLoaded', () => {
    // Section hover effect
    document.querySelectorAll('.manifesto-section').forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'rotate(0.8deg) scale(1.02)';
            section.style.boxShadow = '0 0 40px rgba(255, 26, 26, 0.3)';
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'none';
            section.style.boxShadow = '0 0 30px rgba(255, 26, 26, 0.1)';
        });
    });

    // Crowbar text interaction
    document.querySelector('.crowbar-text').addEventListener('click', () => {
        const crack = document.createElement('div');
        crack.style.position = 'fixed';
        crack.style.width = '100vw';
        crack.style.height = '100vh';
        crack.style.background = `linear-gradient(45deg, 
            transparent 45%,
            rgba(255, 26, 26, 0.3) 50%,
            transparent 55%
        )`;
        crack.style.pointerEvents = 'none';
        document.body.appendChild(crack);
        setTimeout(() => crack.remove(), 1000);
    });
});