// ==============================
// Loading
// ==============================
window.addEventListener("load", function () {
  const loaderBg = document.getElementById("loader-bg");
  const loader = document.getElementById("loader");

  // 読み込み完了後 1秒遅らせて処理開始
  setTimeout(() => {
    if (loader) loader.classList.add("shrink");

    // 0.4秒後に背景をフェード
    setTimeout(() => {
      if (loaderBg) loaderBg.classList.add("fade-out");
    }, 400);

    // 完全に消えたら非表示
    setTimeout(() => {
      if (loaderBg) loaderBg.style.display = "none";
    }, 1200);
  }, 1000);
});


// ==============================
// スマホのナビゲーション（jQuery）
// - .sp_navbtn で開閉
// - .sp_close で閉じる
// - ページ内リンククリック後に閉じる
// - ラッパーは #spNav / .spNav_wrap どちらでも可
// ==============================
(function($){
  $(function(){

    var $btn   = $('.sp_navbtn');
    // ID/クラス両対応
    var $spNav = $('#spNav, .spNav_wrap');
    var HEADER_HEIGHT = 0; // 固定ヘッダーがある場合は調整

    // 開く（active付与）
    $btn.on('click', function(e){
      e.preventDefault();
      if (!$btn.length || !$spNav.length) return;
      $btn.addClass('active');
      $spNav.addClass('active');
    });

    // 閉じる（active削除）
    $(document).on('click', '.sp_close', function(e){
      e.preventDefault();
      if (!$btn.length || !$spNav.length) return;
      $btn.removeClass('active');
      $spNav.removeClass('active');
    });

    // ページ内リンク + スクロール完了後に閉じる
    $spNav.on('click', 'a[href^="#"]', function(e){
      var hash = $(this).attr('href');
      if (!hash || hash === '#') return;
      var $target = $(hash);
      if (!$target.length) return;

      e.preventDefault();

      var targetTop = $target.offset().top - HEADER_HEIGHT;

      $('html, body').stop(true, true).animate(
        { scrollTop: targetTop },
        500,
        'swing',
        function(){
          if ($btn.length) $btn.removeClass('active');
          if ($spNav.length) $spNav.removeClass('active');
        }
      );
    });

  });
})(jQuery);

// SP .sp_navbtnの制御
(function($){
  $(function () {
    var $btn = $(".sp_navbtn");
    var $profile = $(".profile");
    var $kvBottom = $(".kv_bottom");
    var $footer = $("footer"); // ← footer 追加

    if (!$btn.length) return;

    // 初期状態
    $btn.removeClass("visible absolute");

    // 要素が画面内に見えているかどうか
    function isElementInView($el) {
      if (!$el.length) return false;
      var rect = $el[0].getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // kv_bottom の下辺が画面内に見えているか
    function isKvBottomEdgeVisible() {
      if (!$kvBottom.length) return false;
      var rect = $kvBottom[0].getBoundingClientRect();
      return rect.bottom >= 0 && rect.bottom <= window.innerHeight;
    }

    // footer が画面内に見えているか
    function isFooterInView() {
      if (!$footer.length) return false;
      var rect = $footer[0].getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // スクロールごとに状態を更新
    function updateSpBtnVisibility() {
      // スマホのみ動作
      if (window.innerWidth > 767) {
        $btn.removeClass("visible absolute");
        return;
      }

      // kv_bottom が見えたら非表示
      if (isKvBottomEdgeVisible()) {
        $btn.removeClass("visible");
      } else if (isElementInView($profile)) {
        $btn.addClass("visible");
      }

      // footer が見えている場合は absolute 付与
      if (isFooterInView()) {
        $btn.addClass("absolute");
      } else {
        $btn.removeClass("absolute");
      }
    }

    $(window).on("scroll resize", updateSpBtnVisibility);
    updateSpBtnVisibility(); // 初期判定
  });
})(jQuery);

// PC Movie Popup
Fancybox.bind("[data-fancybox]", {
    video: {
        autoplay: false,
    },
});

// ==============================
// スマホのブレンダーテキスト表示（Vanilla）
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".blender_box").forEach((box) => {
    const btn   = box.querySelector(".button");
    const txBox = box.querySelector(".tx-box");
    const inner = box.querySelector(".tx-box-inner");
    if (!btn || !txBox || !inner) return;

    const baseH  = box.getBoundingClientRect().height;
    const innerH = inner.scrollHeight;

    box.style.height  = baseH + "px";
    txBox.style.height = "0px";

    box.dataset.baseH    = String(baseH);
    txBox.dataset.innerH = String(innerH);

    btn.addEventListener("click", () => {
      if (txBox.dataset.state === "open") return;

      const A = parseFloat(box.dataset.baseH || "0");
      const B = parseFloat(txBox.dataset.innerH || "0");

      txBox.classList.add("open");
      box.classList.add("active");
      btn.classList.add("active");

      txBox.style.height = B + "px";
      box.style.height   = (A + B) + "px";

      txBox.dataset.state = "open";
    });
  });
});


// ==============================
// スクロールでfadein（PCとスマホで発火位置を変更）
// ==============================
(function($){
  function onScrollFadeIn(){
    var windowHeight = $(window).height();
    var topWindow = $(window).scrollTop();
    var offset = (window.innerWidth <= 767) ? 100 : 200;

    $(".fadein").each(function(){
      var $el = $(this);
      var targetPosition = $el.offset().top;
      if (topWindow > targetPosition - windowHeight + offset){
        $el.addClass("fadein-active");
      }
    });
  }
  $(function(){
    $(window).on("scroll", onScrollFadeIn);
    // 初回も判定
    onScrollFadeIn();
  });
})(jQuery);


// ==============================
// ページ内リンク（PC）
// ==============================
document.addEventListener("DOMContentLoaded", function() {
  const nav = document.getElementById("pageNav");
  if (!nav) return; // navが無いページはスキップ

  const navLinks = nav.querySelectorAll("a[href^='#']");
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      const headerHeight = 0; // 固定ヘッダーがある場合は調整
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
});


// ==============================
// PCのnav固定（#pageNav）
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("pageNav");
  if (!nav) return;

  // 文書フロー上の元位置（固定していない状態での位置と高さ）
  let navTopOriginal = nav.offsetTop;
  let navHeight = nav.offsetHeight;

  let lastScroll = window.pageYOffset || document.documentElement.scrollTop || 0;

  // ---- 解除条件（上辺が上から80px）をスクロール量で判定 ----
  function maybeReleaseOnScroll(y) {
    // 固定されていて、元位置の 80px 手前まで戻ったら解除
    if (nav.classList.contains("fixed") && y <= navTopOriginal - 0) {
      nav.classList.remove("fixed", "offset");
      // 解除後に現在のレイアウトで原位置を再取得（リフロー対策）
      navTopOriginal = nav.offsetTop;
      navHeight = nav.offsetHeight;
    }
  }

  // ---- スクロール方向に応じて offset の付け外し ----
  function handleScrollOffset(y) {
    const down = y > lastScroll;
    if (nav.classList.contains("fixed")) {
      if (down) {
        // 下方向は offset を外して上端に吸着
        nav.classList.remove("offset");
      } else {
        // 上方向は offset を付与（CSSで top:80px へ）
        nav.classList.add("offset");
      }
    }
    lastScroll = y;
  }

  // ---- IntersectionObserver：nav が完全に画面外に出た瞬間のみ fixed 付与 ----
  // 条件: isIntersecting=false かつ boundingClientRect.top < 0（上方向に抜けた）
  const io = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;

    // 完全に見切れていない間は何もしない
    if (entry.isIntersecting) {
      // 交差中（= navの一部が見えている）→ 解除判定のみ
      maybeReleaseOnScroll(y);
      return;
    }

    // 交差率0で、要素の上辺がビューポート上端より上（= 上へ抜けた＝完全に隠れた）
    if (entry.boundingClientRect.top < 0) {
      // まだ fixed でなければ付与
      if (!nav.classList.contains("fixed")) {
        nav.classList.add("fixed");
        nav.classList.remove("offset");
      }
    } else {
      // 下方向に完全に画面外へ（通常ここは通らないが保険）
      maybeReleaseOnScroll(y);
    }
  }, {
    // 交差率 0/1 を正確に拾う
    threshold: [0, 1]
  });

  io.observe(nav);

  // スクロールで offset と 80px解除を制御
  function onScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    handleScrollOffset(y);
    maybeReleaseOnScroll(y);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    // 固定していないときだけ原位置を取り直す
    if (!nav.classList.contains("fixed")) {
      navTopOriginal = nav.offsetTop;
      navHeight = nav.offsetHeight;
    }
  }, { passive: true });

  // 初期判定
  onScroll();
});


// Swiper
window.addEventListener("DOMContentLoaded", () => {
                const modal = document.getElementById("modal");
                const openModalBtns = document.querySelectorAll(".modalOpen");
                const closeModalBtns = document.querySelectorAll(".modalClose");
                let swiper = null;

                // Swiper初期化関数（初回のみ）
                const initSwiper = () => {
                    if (swiper) return swiper;
                    swiper = new Swiper("#modal-swiper", {
                        loop: true,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true, // ← クリックで移動可能
                        },
                        spaceBetween: 30,
                        observer: true,
                        observeParents: true,
                    });
                    return swiper;
                };

                // モーダルを開く
                const openModalAt = (index) => {
                    modal.classList.add("is-active");
                    const s = initSwiper();
                    s.slideToLoop(index, 0, false);
                    s.update();
                    document.body.style.overflow = "hidden";
                };

                // モーダルを閉じる
                const closeModal = () => {
                    modal.classList.remove("is-active");
                    document.body.style.overflow = "";
                    if (swiper) swiper.update();
                };

                // ボタンクリック
                openModalBtns.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const modalIndex = parseInt(btn.getAttribute("data-modal"), 10) - 1;
                        openModalAt(modalIndex);
                    });
                });

                // 閉じるボタン・オーバーレイ
                closeModalBtns.forEach((btn) => {
                    btn.addEventListener("click", closeModal);
                });

                // ESCキーでも閉じる
                window.addEventListener("keydown", (e) => {
                    if (e.key === "Escape" && modal.classList.contains("is-active")) {
                        closeModal();
                    }
                });
            });