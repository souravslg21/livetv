import CHANNELS from './channels.js';

document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('main-iframe');
    const serversList = document.querySelector('.servers-list');
    const playerTitle = document.querySelector('.player-info h2');

    // Render Channels
    function renderChannels() {
        serversList.innerHTML = '';
        CHANNELS.forEach((channel, index) => {
            const btn = document.createElement('button');
            btn.className = `server-btn ${index === 0 ? 'active' : ''}`;
            btn.setAttribute('data-src', channel.url);
            btn.innerHTML = `
                <div class="icon"><i class="${channel.icon}"></i></div>
                <span class="server-name">${channel.name}</span>
            `;

            btn.addEventListener('click', () => {
                // Update Player
                player.src = channel.url;
                
                // Update Active State
                document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Title
                playerTitle.textContent = channel.name + " - Live Streaming";
                
                // Scroll Player into view on mobile
                if (window.innerWidth < 768) {
                    player.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });

            serversList.appendChild(btn);
        });
    }

    renderChannels();

    // Share Functionality
    window.shareSite = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Clarity TV - Premium Live Streaming',
                text: 'Watch live sports and the T20 World Cup in HD on Clarity TV!',
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!');
        }
    };

    function showNotification(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: #0072ef;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,114,239,0.3);
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass, .hero, .main-player').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});
