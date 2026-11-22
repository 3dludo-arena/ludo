// ==========================================
// 100% GOOGLE ADMOB MANAGER (TEST MODE ON)
// ==========================================
const ADMOB_UNITS = {
    bannerId: 'ca-app-pub-8792473302147407/1351957061',       // Gameplay_Bottom_Banner
    interstitialId: 'ca-app-pub-8792473302147407/4652762037', // GameOver_Interstitial
    rewardedId: 'ca-app-pub-8792473302147407/6272452114'      // Rewarded_Free_Coins
};

// ABHI TESTING KE LIYE true HAI — UPLOAD SE PEHLE false KARNA HAI!
const USE_TEST_ADS = false;

let admobInitialized = false;
let isBannerShowing = false;
let isInterstitialLoaded = false;
let isRewardedLoaded = false;

function getAdMobPlugin() {
    return window.Capacitor && window.Capacitor.Plugins ? window.Capacitor.Plugins.AdMob : null;
}

async function initAdMobEngine() {
    const AdMob = getAdMobPlugin();
    if (!AdMob) return;

    try {
        if (!admobInitialized) {
            await AdMob.initialize({
                requestTrackingAuthorization: true,
                testingDevices: [],
                initializeForTesting: USE_TEST_ADS
            });
            admobInitialized = true;
        }

        await showAdMobBottomBanner();
        preloadAdMobInterstitial();
        preloadAdMobRewarded();
    } catch (err) {
        console.warn('AdMob Init Error:', err);
    }
}

async function showAdMobBottomBanner() {
    const AdMob = getAdMobPlugin();
    if (!AdMob || isBannerShowing) return;

    try {
        await AdMob.showBanner({
            adId: ADMOB_UNITS.bannerId,
            adSize: 'ADAPTIVE_BANNER', // Full screen width banner
            position: 'BOTTOM_CENTER',
            margin: 0,
            isTesting: USE_TEST_ADS
        });
        isBannerShowing = true;
    } catch (err) {
        console.warn('AdMob Banner Error:', err);
    }
}

async function preloadAdMobInterstitial() {
    const AdMob = getAdMobPlugin();
    if (!AdMob || isInterstitialLoaded) return;

    try {
        await AdMob.prepareInterstitial({
            adId: ADMOB_UNITS.interstitialId,
            isTesting: USE_TEST_ADS
        });
        isInterstitialLoaded = true;
    } catch (err) {
        isInterstitialLoaded = false;
    }
}

async function preloadAdMobRewarded() {
    const AdMob = getAdMobPlugin();
    if (!AdMob || isRewardedLoaded) return;

    try {
        await AdMob.prepareRewardVideoAd({
            adId: ADMOB_UNITS.rewardedId,
            isTesting: USE_TEST_ADS
        });
        isRewardedLoaded = true;
    } catch (err) {
        isRewardedLoaded = false;
    }
}

window.showAdMobInterstitial = async function () {
    const AdMob = getAdMobPlugin();
    if (!AdMob) return false;

    try {
        if (!isInterstitialLoaded) {
            await preloadAdMobInterstitial();
        }
        if (isInterstitialLoaded) {
            await AdMob.showInterstitial();
            isInterstitialLoaded = false;
            setTimeout(preloadAdMobInterstitial, 2000);
            return true;
        }
    } catch (err) {
        isInterstitialLoaded = false;
    }
    return false;
};

window.showPostMatchSocialAd = function () {
    window.showAdMobInterstitial();
};

window.showAdMobRewarded = async function (onRewardEarned) {
    const AdMob = getAdMobPlugin();
    if (!AdMob) {
        if (typeof onRewardEarned === 'function') onRewardEarned();
        return;
    }

    try {
        if (!isRewardedLoaded) {
            await preloadAdMobRewarded();
        }
        const rewardItem = await AdMob.showRewardVideoAd();
        isRewardedLoaded = false;
        setTimeout(preloadAdMobRewarded, 2000);

        if (rewardItem && typeof onRewardEarned === 'function') {
            onRewardEarned();
        }
    } catch (err) {
        isRewardedLoaded = false;
        await window.showAdMobInterstitial();
        if (typeof onRewardEarned === 'function') onRewardEarned();
    }
};

document.addEventListener('deviceready', initAdMobEngine);
window.addEventListener('load', () => {
    setTimeout(initAdMobEngine, 800);
});