document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ハンバーガーメニュー & レスポンシブナビ制御 ---
    const menuTrigger = document.getElementById('menu-trigger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (menuTrigger && navMenu) {
        // ボタンクリックで開閉（スマホ時のみCSSで有効化される）
        menuTrigger.addEventListener('click', () => {
            menuTrigger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });

        // リンクをクリックしたら閉じる（スマホ時のみの挙動を想定）
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991) {
                    menuTrigger.classList.remove('is-active');
                    navMenu.classList.remove('is-active');
                }
            });
        });
    }

    // --- 2. FAQのアコーディオン ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // 他を閉じる
            document.querySelectorAll('.faq-answer').forEach(el => el.style.maxHeight = '0px');
            document.querySelectorAll('.faq-question').forEach(el => el.classList.remove('active'));

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                button.classList.add('active');
            } else {
                answer.style.maxHeight = '0px';
                button.classList.remove('active');
            }
        });
    });

    // --- 3. スムーススクロール（ヘッダーの高さを考慮） ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "#top") return; 

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 4. 出現アニメーション (Intersection Observer) ---
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        fadeObserver.observe(section);
    });

    // --- 5. 背景テキストのスクロール同期（パララックス） ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.body.style.backgroundPosition = `${scrolled * 0.1}px ${scrolled * 0.1}px`;
        
        // プログレスバー（もしHTMLにあれば）
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercent = (scrolled / height) * 100;
            progressBar.style.width = scrolledPercent + "%";
        }
    });

    // --- 6. 微細なシステムノイズ（更新時の震えを防止） ---
    function randomGlitch() {
        const body = document.body;
        // 発生確率を低く設定（3%）
        if (Math.random() > 0.97) {
            body.style.transform = `translateX(${Math.random() * 2 - 1}px)`;
            body.style.filter = `hue-rotate(${Math.random() * 10}deg)`;
            
            setTimeout(() => {
                body.style.transform = 'none';
                body.style.filter = 'none';
            }, 40);
        }
        setTimeout(randomGlitch, 2000);
    }
    // 読み込み完了から3秒後に開始することで、初期のガタつきを防止
    setTimeout(randomGlitch, 3000);

    // --- 7. リカバリーオーバーレイの実行管理 ---
    // 最初のバグ発生を5分後（300000ms）に設定
    setTimeout(evolveGlitch, 300000);
});

// --- システム修復演出（evolveGlitch） ---
function evolveGlitch() {
    const body = document.body;
    const recoveryOverlay = document.getElementById('recovery-overlay');
    const barFill = document.getElementById('recovery-bar-fill');
    const percentText = document.getElementById('recovery-percent');
    const statusMessage = document.getElementById('status-message');

    if (!recoveryOverlay) return;

    body.classList.add("critical-glitch");
    recoveryOverlay.style.display = 'flex';
    recoveryOverlay.style.opacity = '1';

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 3) + 1;
        if (progress > 100) progress = 100;
        
        if (barFill) barFill.style.width = progress + '%';
        if (percentText) percentText.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(progressInterval);
            if (statusMessage) {
                statusMessage.textContent = "SYSTEM RECOVERED";
                statusMessage.style.color = "#00FF41"; 
            }

            setTimeout(() => {
                body.classList.remove("critical-glitch");
                recoveryOverlay.style.opacity = '0';
                setTimeout(() => {
                    recoveryOverlay.style.display = 'none';
                    // 再セット（5分後）
                    setTimeout(evolveGlitch, 300000); 
                }, 500);
            }, 1500);
        }
    }, 50);
}

// メニュー内のリンクをクリックしたら閉じる（スマホ時のみ有効にする）
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 画面幅がスマホサイズ（991px以下）の時だけ実行
        if (window.innerWidth <= 991) {
            menuTrigger.classList.remove('is-active');
            navMenu.classList.remove('is-active');
        }
    });
});