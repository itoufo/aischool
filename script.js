// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// アニメーション効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .problem-item, .pricing-card, .instructor-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// CTAボタンのクリック効果
document.querySelectorAll('.cta-button-large, .cta-button-final').forEach(button => {
    button.addEventListener('click', function(e) {
        // ここに実際の申し込みフォームへのリンクや処理を追加
        alert('お申し込みフォームに移動します。（実装時はここに実際のリンクを設定してください）');
    });
});

// カウントダウンタイマー（オプション）
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // 24時間後の日時を設定
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${hours}時間 ${minutes}分 ${seconds}秒`;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "終了しました";
        }
    }, 1000);
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
    // フェードインアニメーション
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // カウントダウン開始（要素が存在する場合）
    startCountdown();
});

// モバイルメニュー（必要に応じて実装）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});