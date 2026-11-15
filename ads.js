// --- GLOBAL ADSTERRA BANNER & POST-MATCH SOCIAL BAR ENGINE ---
const isGamePage = window.location.pathname.includes('game.html') || window.location.href.includes('game.html');

if (isGamePage) {
    function createBannerFrame() {
        const iframe = document.createElement('iframe');
        iframe.srcdoc = `<!DOCTYPE html><html><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;"><script type="text/javascript">atOptions={'key':'22fbc927b270735d5340af7fbb42a9d0','format':'iframe','height':50,'width':320,'params':{}};</script><script type="text/javascript" src="https://bauval.org/22/22fbc927b270735d5340af7fbb42a9d0"></script></body></html>`;
        iframe.width = "320";
        iframe.height = "50";
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";
        iframe.scrolling = "no";
        return iframe;
    }

    function initAdsterraUI() {
        const oldBonus = document.getElementById('game-bottom-banner');
        if (oldBonus) oldBonus.remove();

        const style = document.createElement('style');
        style.innerHTML = `
            #game-bottom-banner, .bonus-reward-bar {
                display: none !important; opacity: 0 !important; pointer-events: none !important;
            }
            #global-top-ad {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 52px !important;
                background: rgba(10, 15, 30, 0.95) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                z-index: 99999 !important;
            }
            #global-bottom-ad {
                position: fixed !important; bottom: 0 !important; left: 0 !important;
                width: 100vw !important; height: 54px !important;
                background: rgba(10, 15, 30, 0.95) !important;
                border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                z-index: 99999 !important;
            }
            #exit-home-btn, .home-btn, a[href*="index"], a[href*="home"] {
                position: fixed !important; bottom: 66px !important; left: 16px !important;
                z-index: 100000 !important; display: flex !important; visibility: visible !important;
            }
        `;
        document.head.appendChild(style);

        if (!document.getElementById('global-top-ad') && !document.getElementById('top-ad-header')) {
            const topBar = document.createElement('div');
            topBar.id = 'global-top-ad';
            topBar.appendChild(createBannerFrame());
            document.body.appendChild(topBar);
        }

        if (!document.getElementById('global-bottom-ad') && !document.getElementById('bottom-ad-footer')) {
            const botBar = document.createElement('div');
            botBar.id = 'global-bottom-ad';
            botBar.appendChild(createBannerFrame());
            document.body.appendChild(botBar);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdsterraUI);
    } else {
        initAdsterraUI();
    }
}

// Match jeetne ke baad call hone wala Adsterra Social Bar Full-Screen Engine
window.showPostMatchSocialAd = function() {
    if (window._socialAdInjected) return;
    window._socialAdInjected = true;

    const s = document.createElement('script');
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://bauval.org/14/63d9d3f5a205abf1ec43607647d12b6a';
    document.body.appendChild(s);
};