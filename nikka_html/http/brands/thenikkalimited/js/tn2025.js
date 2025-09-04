// Loading
window.addEventListener("load", function () {
  const loaderBg = document.getElementById("loader-bg");
  const loader = document.getElementById("loader");

  // 読み込み完了後 1秒遅らせて処理開始
  setTimeout(() => {
    // 1. ローダーを縮小
    loader.classList.add("shrink");

    // 2. 少し遅らせて背景をフェードアウト
    setTimeout(() => {
      loaderBg.classList.add("fade-out");
    }, 400); // 縮小が始まってから0.4秒後にフェード開始

    // 3. 完全に消えたらDOMから削除
    setTimeout(() => {
      loaderBg.style.display = "none";
    }, 1200); // CSSのトランジション時間に合わせる
  }, 1000); // ← 1秒待機
});

// スマホのブレンダーテキスト表示
document.addEventListener("DOMContentLoaded", () => {
  // 各 .blender_box ごとに初期値を計測・付与
  document.querySelectorAll(".blender_box").forEach((box) => {
    const btn   = box.querySelector(".button");
    const txBox = box.querySelector(".tx-box");
    const inner = box.querySelector(".tx-box-inner");
    if (!btn || !txBox || !inner) return;

    // 初期の .blender_box 実高さ(A) と .tx-box-inner 実高さ(B) を取得
    const baseH  = box.getBoundingClientRect().height;   // A
    const innerH = inner.scrollHeight;                    // B（親がheight:0でもOK）

    // それぞれに height を付与（tx-boxは0で閉じておく）
    box.style.height  = baseH + "px";
    txBox.style.height = "0px";

    // 後で使うため保存
    box.dataset.baseH   = String(baseH);
    txBox.dataset.innerH = String(innerH);

    // クリックで「初期値」を使って開く
    btn.addEventListener("click", () => {
      // 既に開いていたら何もしない（toggle不要とのことなので）
      if (txBox.dataset.state === "open") return;

      const A = parseFloat(box.dataset.baseH || "0");      // 初期の親高さ
      const B = parseFloat(txBox.dataset.innerH || "0");   // 初期の内側高さ

      // tx-box を B px へ、親は A + B px へ
      txBox.classList.add("open");
      box.classList.add("active");
      btn.classList.add("active");

      txBox.style.height = B + "px";
      box.style.height   = (A + B) + "px";

      txBox.dataset.state = "open";
    });
  });
});








// スクロールでfadein
$(function(){
  // $('.fadein').css('visibility','hidden');
  $(window).scroll(function(){
   var windowHeight = $(window).height(),
       topWindow = $(window).scrollTop();
   $('.fadein').each(function(){
    var targetPosition = $(this).offset().top;
    if(topWindow > targetPosition - windowHeight + 200){
     $(this).addClass("fadein-active");
    }
   });
  });
});
