$(function() {

  var currentUrl = location.pathname;
  var currentQuery = currentUrl.split('/');
  var currentName_1 = currentQuery[1];
  var currentName_2 = currentQuery[2];
  var currentName_3 = currentQuery[3];
  // console.log('currentName_1:'+currentName_1);
  // console.log('currentName_2:'+currentName_2);
  // console.log('currentName_3:'+currentName_3);

  if(currentName_1 == 'en'){
    $('body').attr('data-lang', 'en');

    if(currentName_2 == 'distilleries' && currentName_3 == 'yoichi'){
      $('body').attr('data-name', 'yoichi');
    }else if(currentName_2 == 'distilleries' && currentName_3 == 'miyagikyo'){
      $('body').attr('data-name', 'miyagikyo');
    }

    $('header a:not([target="_blank"])').each(function() {
      if(!$(this).hasClass('language-switcher')){
        let href = $(this).attr('href');
        if (href && !href.startsWith('/en')) {
          $(this).attr('href', '/en' + href);
        }
      }
    });
  
  }else{
    $('body').attr('data-lang', 'ja');

    if(currentName_1 == 'distilleries' && currentName_2 == 'yoichi'){
      $('body').attr('data-name', 'yoichi');
    }else if(currentName_1 == 'distilleries' && currentName_2 == 'miyagikyo'){
      $('body').attr('data-name', 'miyagikyo');
    }
  }


  var header = $('header');
  var headerHeight = header.outerHeight() - 1;
  var fixAnchor = $('.js_fix_anchor');
  var fixAnchorHeight = fixAnchor.outerHeight();
  var totalHeight = '';
  var fixYearHeight = '';
  var anchorHeight = '';
  var bfCntHeight = '';

  var startPos = 0;
  var isAnchorScrolling = false;


  // ヘッダー固定
  $(window).on('load scroll', function() {
    if (isAnchorScrolling) return;

    var scrollPos = $(this).scrollTop();
    // console.log('scrollPos:' + scrollPos);
    if (scrollPos > startPos && scrollPos > headerHeight) {
      if ($('header').hasClass('is-top')) {
        $('header').removeClass('is-top');
      }
      // header.css('top', '-' + headerHeight + 'px');
      header.removeClass('is-inview');
      if ($('.js_fix_anchor').length) {
        $('.js_fix_anchor').css('transform', 'translate(0px, 0px)');
      }
      if ($('.year_status').length) {
        // $('.year_status').fadeIn();
        $('.year_status').css('transform', 'translate(0px, ' + fixAnchorHeight + 'px)');
      }
      if ($('.js_anchor_list').length && $('.js_anchor_list').hasClass('is-fixed')) {
        $('.js_anchor_list').css('transform', 'translate(0px, ' + fixAnchorHeight + 'px)');
      }
    } else {
      // header.css('top', '0');
      header.addClass('is-inview');
      header.css('transform', '');
      if ($('.js_fix_anchor').length) {
        if ($('.js_fix_anchor').hasClass('is-fixed')) {
          $('.js_fix_anchor').css('transform', 'translate(0px, ' + headerHeight + 'px)');
        } else {
          $('.js_fix_anchor').css('transform', 'translate(0px, 0px)');
        }
      }
      if ($('.year_status').length) {
        if (header.hasClass('is-inview')) {
          $('.year_status').addClass('is-hidden');
        }
/*
        if ($('.js_fix_anchor').hasClass('is-fixed')) {
          totalHeight = headerHeight + fixAnchorHeight;
          $('.year_status').css('transform', 'translate(0px, ' + fixAnchorHeight + 'px)');
        } else {
          $('.year_status').css('transform', 'translate(0px, 0px)');
        }
*/
      }
      if ($('.js_anchor_list[data-fix="true"]').length) {
        if ($('.js_anchor_list').hasClass('is-fixed')) {
          totalHeight = headerHeight + fixAnchorHeight;
          $('.js_anchor_list').css('transform', 'translate(0px, ' + totalHeight + 'px)');
        } else {
          $('.js_anchor_list').css('transform', 'translate(0px, 0px)');
        }
      }
    }
    startPos = scrollPos;
  });


  // ページ内アンカーリンク
  $('a[data-type="anchorlink"]').on("click", function() {
    isAnchorScrolling = true;
    // console.log('isAnchorScrolling:'+isAnchorScrolling);
    var $e = $($(this).attr("href"));
    // header.css('top', '-' + headerHeight + 'px');

    $('.js_fix_anchor').css('transform', 'translate(0px, 0px)');


    if ($('.year_status').length) {
      fixYearHeight = $('.year_status').innerHeight();
      if(window.matchMedia('(max-width: 767px)').matches){
        if($(this).attr("href") == '#year_1934_corp' || $(this).attr("href") == '#year_1934_prod') {
          fnInnerScroll($e, fixYearHeight + fixAnchorHeight*1.5);
        }else{
          fnInnerScroll($e, fixYearHeight + fixAnchorHeight*2);
        }

      }else{
        if($(this).attr("href") == '#year_1934'){
          fnInnerScroll($e, fixYearHeight + fixAnchorHeight - 30);
        }else{
          fnInnerScroll($e, fixYearHeight + fixAnchorHeight);
        }

      }

    }else if ($('.anchor_map').length) {
      fnInnerScroll($e, fixAnchorHeight*2);
  
    }else if ($('.js_fix_anchor').length && $('.js_anchor_list[data-fix="true"]').length) {
      anchorHeight = $('.js_anchor_list').innerHeight();
      console.log('anchorHeight:' + anchorHeight);

      if ($(window).scrollTop() > $('.js_anchor_list').offset().top) {
        fixAnchorHeight = fixAnchor.outerHeight();
      } else {
        fixAnchorHeight = 0;
      }


      if(header.hasClass('is-inview')){
        fnInnerScroll($e, anchorHeight + fixAnchorHeight);
        $('.js_anchor_list').css('transform', 'translate(0px, ' + fixAnchorHeight + 'px)');
      }else{
        fnInnerScroll($e, anchorHeight + fixAnchorHeight);
      }

    }else if ($('.js_fix_anchor').length) {

      if($('.js_fix_anchor[data-type="sp-scroll"]').length && window.matchMedia('(max-width: 767px)').matches){
        fnInnerScroll($e, fixAnchorHeight*0.83);
      }else{
        fnInnerScroll($e, fixAnchorHeight);
      }

    }else{
      fnInnerScroll($e, 0);
    }
    header.removeClass('is-inview');

    setTimeout(function() {
      isAnchorScrolling = false;
    }, 500); // Adjust timeout as needed
    return false;
  });

  //inner navigation
  var flg_innerscrolling = false;
  var fnInnerScroll      = function($e, mgn){
    if(flg_innerscrolling){
      return;
    }
    flg_innerscrolling = true;
    
    var pos = $e.offset().top-mgn;
    console.log('pos:' + pos);


    var c = 0;
    $("html,body").animate({scrollTop:pos}, 200, "swing", function(){
      c++;
      if(c > 1){
        flg_innerscrolling = false;
      }
    });
  };




  // 追従固定関連
  if($('.js_fix_anchor').length){
    $('.js_fix_anchor li .btn').click(function(){
      $('.js_fix_anchor li').removeClass('is-active');
      $(this).parent().addClass('is-active');
    });

    if($('.js_fix_anchor').find('a[data-type="anchorlink"]').length){
      // Scroll position tracking for active navigation button
      const sections = $('.js_fix_anchor li a').map(function() {
        return $($(this).attr('href'));
      });

      $(window).on('scroll', function() {
        const scrollPos = $(this).scrollTop() + $('header').outerHeight() + 10;
        let isActiveSet = false;

        sections.each(function() {
          if($('body[data-page="recruit"]').length){
            var sectionTop = $(this).offset().top - $('.js_anchor_list').outerHeight();
          }else{
            var sectionTop = $(this).offset().top;
          }
 
          const sectionBottom = sectionTop + $(this).outerHeight();

          if (scrollPos >= sectionTop && scrollPos <= sectionBottom && !isActiveSet) {
            const id = $(this).attr('id');
            let activeItem = $('.js_fix_anchor li a[href="#' + id + '"]').parent();
            $('.js_fix_anchor li').removeClass('is-active');
            activeItem.addClass('is-active');

            isActiveSet = true;
          }
        });

        if (!isActiveSet) {
          $('.js_fix_anchor li').removeClass('is-active');
        }
      });

      if($('.js_fix_anchor[data-type="sp-scroll"]').length){
        sections.each(function(index) {
          const section = $(this);

          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            // markers: true,
            onEnter: () => {
              let scrollAmount;
              if (index === sections.length - 1 || index === sections.length - 2 || index === sections.length - 3) {
                scrollAmount = $('.js_fix_anchor ul')[0].scrollWidth / 2; // Scroll to the very right
              } else {
                scrollAmount = 0; // Scroll to the very left
              }
              $('.js_fix_anchor ul').animate({ scrollLeft: scrollAmount }, 300);
            },
            onEnterBack: () => {
              let scrollAmount;
              if (index === sections.length - 1 || index === sections.length - 2 || index === sections.length - 3) {
                scrollAmount = $('.js_fix_anchor ul')[0].scrollWidth / 2; // Scroll to the very right
              } else {
                scrollAmount = 0; // Scroll to the very left
              }
              $('.js_fix_anchor ul').animate({ scrollLeft: scrollAmount }, 300);
            }
          });
        });
      }

    }

    $(window).scroll(function(e) {
      fixAnchorHeight = $('.js_fix_anchor').innerHeight();
      bfCntHeight = $('.headline').next().get(0).offsetTop - fixAnchorHeight;
    
      if ($(this).scrollTop() > bfCntHeight) {
        $('.js_fix_anchor').addClass('is-fixed');
        $('main').css('padding-top', fixAnchorHeight + 'px');
      }else{
        $('.js_fix_anchor').removeClass('is-fixed');
        $('main').css('padding-top', 0);
      }
    });

  }


  if($('.faq_anchor_btn').length){
    $('.faq_anchor_btn li').click(function(){
      $('.faq_anchor_btn li').removeClass('is-active');
      $(this).addClass('is-active');
    });

    if($('.faq_anchor_btn').find('a[data-type="anchorlink"]').length){
      // Scroll position tracking for active navigation button
      const sections = $('.faq_anchor_btn li a').map(function() {
        return $($(this).attr('href'));
      });

      $(window).on('scroll', function() {
        const scrollPos = $(this).scrollTop() + $('header').outerHeight() + 10;
        let isActiveSet = false;

        sections.each(function() {
        const sectionTop = $(this).offset().top - $('.faq_anchor_btn').outerHeight();
        const sectionBottom = sectionTop + $(this).outerHeight();

        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
          const id = $(this).attr('id');
          $('.faq_anchor_btn li').removeClass('is-active');
          const activeItem = $('.faq_anchor_btn li a[href="#' + id + '"]').parent();
          activeItem.addClass('is-active');

          isActiveSet = true;
        }
        });

        if (!isActiveSet) {
          $('.faq_anchor_btn li').removeClass('is-active');
        }
      });
    }

  }


  if($('.year_status').length){
    $('.year_status li .btn').click(function(){
      $('.year_status li').removeClass('is-active');
      $(this).parent().addClass('is-active');
    });

    $(window).scroll(function(e) {
      fixYearHeight = $('.year_status').innerHeight();
      bfCntHeight = $('.headline').next().get(0).offsetTop - fixYearHeight;
    
      if ($(this).scrollTop() > bfCntHeight) {
        $('.year_status').addClass('is-fixed');
        $('main').css('margin-top', fixYearHeight + 'px');
      }else{
        $('.year_status').removeClass('is-fixed');
        $('main').css('margin-top', 0);
      }
    });

  }

  if($('.js_anchor_list[data-fix="true"]').length){
    anchorHeight = $('.js_anchor_list').innerHeight();

    $(window).scroll(function(e) {
      bfCntHeight = $('.js_anchor_list').next().get(0).offsetTop - anchorHeight*2;
      // console.log('bfCntHeight:' + bfCntHeight);
    
      if ($(this).scrollTop() > bfCntHeight) {
        $('.js_anchor_list').addClass('is-fixed');
        $('main').css('margin-top', anchorHeight + 'px');
      }else{
        $('.js_anchor_list').removeClass('is-fixed');
        $('main').css('margin-top', 0);
      }
    });

  }

  // ロゴ帯のアニメーション
  if($('.js_parallax_trigger').length){

    const items = gsap.utils.toArray(".js_parallax_trigger");

    // 各要素に対してアニメーションを設定
    items.forEach((item) => {
      gsap.fromTo(
      item.querySelector(".label_emblem_inner"), // アニメーションを適用する画像要素を取得
      {
        yPercent: 40, // パララックス前の要素の位置
      },
      {
        yPercent: -40, // 上に要素の幅の1/5分移動
        ease: "none", // イージングなし
        scrollTrigger: {
        trigger: item, // アニメーションのトリガー要素
        start: "top bottom", // アニメーション開始位置
        end: "bottom top", // アニメーション終了位置
        scrub: 1, // 動作を遅らせる
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (progress >= 10 && progress < 40) {
          item.classList.add('step-1');
          item.classList.remove('step-2', 'step-3');
          } else if (progress >= 40 && progress < 70) {
          item.classList.add('step-2');
          item.classList.remove('step-1', 'step-3');
          } else if (progress >= 70) {
          item.classList.add('step-3');
          item.classList.remove('step-1', 'step-2');
          } else {
          item.classList.remove('step-1', 'step-2', 'step-3');
          }

        }
        },
      }
      );
    });
  }



  /* 文字列を分割しタグで囲む */
  const jsText = document.querySelectorAll('.js_split_text span:nth-child(1), .headline_ttl span:nth-child(1),  .headline_ttl span[data-type="main"]');
  jsText.forEach(target => {
      let newText = '';
      const text = target.textContent;
      const result = text.split('');
      for (let i = 0; i < result.length; i++) {
          if (result[i] === ' ') {
              result[i] = '&nbsp;';
          }
          newText += '<i style="transition-delay: ' + (i * 0.025).toFixed(3) + 's;">' + result[i] + '</i>';
          // newText += '<i>' + result[i] + '</i>';
      }
      const jpText = target.parentElement.querySelectorAll('span:nth-child(2)');
      jpText.forEach(jp => {
          jp.style.transitionDelay = (result.length * 0.025).toFixed(3) + 's';
      });
      target.innerHTML = newText;
  });


	document.querySelectorAll('.js_split_text:not([data-type="no-anime"])').forEach((el, index) => {
    ScrollTrigger.create({
        trigger: el,
        id: index+1,
        start: 'top 65%',
        toggleClass: {targets: el, className: "is-active"},
        once: true,
        // markers: true,
    });
  });




  if(window.matchMedia('(max-width: 767px)').matches){
    // ハンバーガーメニュー開閉（SP）
    $(".menu_btn").click(function(e) {
      e.stopPropagation();
      $('nav').addClass('is-active');
    });
    $("nav .nav_close").click(function(e) {
      e.stopPropagation();
      $('nav').removeClass('is-active');
    });


  }else{
    // 検索メニュー開閉（PC）
    $(document).click(function(e) {
      if(!$(e.target).closest('.search_area').length) {
        $('.search_area').removeClass('is-active');
      } 
    });
    
    $(".search_btn").click(function(e) {
      e.stopPropagation();
      $('.search_area').addClass('is-active');
    });
    $(".search_close").click(function(e) {
      e.stopPropagation();
      $('.search_area').removeClass('is-active');
    });
  
  }

  // 検索欄のplaceholderを設定
  $('.mf_finder_searchBox_query_wrap input').prop('placeholder', 'SEARCH');


  // ページトップへ戻る
  if($('body[data-pagetop="custom"]').length){
    $(".backToTop").remove();

  }else{
    $(window).scroll(function () {
      var scrollHeight = $(window).scrollTop();
      // var documentHeight = $(document).height();
      var windowHeight = $(window).height();
      // var footerHeight = $("footer").innerHeight();

      if (scrollHeight >= windowHeight / 2) {
          $('.backToTop').fadeIn();
      } else {
          $('.backToTop').fadeOut();
      }

      $('.js_fadein').each(function () {
        var elemPos = $(this).offset().top;
        if (scrollHeight > elemPos - windowHeight + 100) {
            $(this).addClass('is-inview');
        }
      });
      $('.js_figure_anim').each(function () {
        var elemPos = $(this).offset().top;
        if (scrollHeight > elemPos - windowHeight + 100) {
            $(this).addClass('is-inview');
        }
      });

      if($('body[data-page="top"]').length){
        if (scrollHeight > $('.kv').outerHeight()){
          $('header').removeClass('is-top-kv');
        } else {
          $('header').addClass('is-top-kv');
        }
      }

    });

    $(".backToTop").hide();
    $(window).on("scroll", function () {
        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop();
        footHeight = $("footer").innerHeight();
        if (scrollHeight - scrollPosition <= footHeight) {
            $(".backToTop").css({
                position: "absolute",
                bottom: footHeight,
            });
            if($('.js_anchor_list[data-fix="true"]').length){
              $('.js_anchor_list[data-fix="true"]').fadeOut();
            }

        } else {
            $(".backToTop").css({
                position: "fixed",
                bottom: "0",
            });
            if($('.js_anchor_list[data-fix="true"]').length){
              $('.js_anchor_list[data-fix="true"]').fadeIn();
            }
        }

    });

    $('.backToTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
  }


  $(window).on('load', function () {
    $('body').addClass('is-loaded');

    if(window.matchMedia('(max-width: 767px)').matches){
        $('nav').insertAfter('header');
    }

    if($('.headline').length){
      $('.headline .headline_ttl').addClass('is-active');
    }

    // RN対象外+パンくずが無いページの場合、ヘッダーの高さ分padding-topを設定
    if(!$('.breadcrumbs').length && !$('body[data-type="RN2024"]').length){
      headerHeight = $('header').outerHeight() - 1;
      $('body').css('padding-top', headerHeight + 'px');
    }

    if($('.news_list').length){
      $(".news_list").mCustomScrollbar();

      $('.news_list').each(function() {
        if ($(this).find('li').length === 1) {
          $(this).attr('data-count','1');
        }
      });
    }

    // Scroll to the element if URL has a hash
    if (window.location.hash) {
      var target = $(window.location.hash);
      if (target.length) {
        if(fixAnchor.length){
          fnInnerScroll(target, fixAnchorHeight + headerHeight);
        }else{
          fnInnerScroll(target, headerHeight);
        }
      }
    }

  });


});