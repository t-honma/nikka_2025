<?php
// ★グローバル変数の初期化（未定義エラー防止）
if (!isset($GLOBALS['title'])) {
    $GLOBALS['title'] = '';
}

$intalled_dir = '';

$file_path = $_SERVER['SCRIPT_NAME'];
$dirs = explode("/", $file_path);
$dirs = array_values(array_filter($dirs, "strlen"));

$is_en = isset($dirs[0]) && $dirs[0] === 'en' ? true : false;

$dir_titles = [
    'template' => 'テンプレート',
    'distilleries' => '蒸溜所',
    'yoichi' => '余市蒸溜所',
    'miyagikyo' => '宮城峡蒸溜所',
    'visit' => '楽しみ方',
    'guide' => '見学スポット',
    'access' => 'アクセス',
    'faq' => 'よくあるご質問',
    'products' => '商品紹介',
    'brands' => '商品紹介',
    'story' => 'ストーリー',
    'founder' => '創業者 竹鶴政孝',
    'history' => 'ニッカウヰスキーの歴史',
    'awards' => '受賞歴',
    'br2025' => 'ドリンクス・インターナショナル　ブランドレポート 2025',
    'contact' => 'お問い合わせ',
    'recruit' => 'RECRUIT',
    'about' => '会社案内'
];

if ($is_en) {
    $dir_titles = [
        'template' => 'TEMPLATE',
        'distilleries' => 'DISTILLERIES',
        'yoichi' => 'YOICHI DISTILLERY',
        'miyagikyo' => 'MIYAGIKYO DISTILLERY',
        'visit' => 'HOW TO ENJOY',
        'guide' => 'OUR FACILITIES',
        'access' => 'HOW TO VISIT',
        'faq' => 'FAQ',
        'products' => 'OUR BRANDS',
        'brands' => 'OUR BRANDS',
        'story' => 'STORY',
        'founder' => 'THE FOUNDER',
        'history' => 'HISTORY',
        'awards' => 'AWARDS',
        'br2025' => 'DRINKS INTERNATIONAL BRANDS REPORT 2025',
        'contact' => 'CONTACT US',
        'about' => 'ABOUT US',
        'en' => 'TOP'
    ];
}

$has_undefined_dir = false;
foreach ($dirs as $dir) {
    if ($dir !== 'index.php' && $dir !== 'index.html' && $dir !== 'index.psp.html' && $dir !== 'sitemap.html' && $dir !== 'di') {
        if (!array_key_exists($dir, $dir_titles)) {
            $has_undefined_dir = true;
            break;
        }
    }
}

function breadcrumbs($separator = '')
{
    $dirs = $GLOBALS['dirs'];
    $is_en = $GLOBALS['is_en'];
    $li = '<li class="breadcrumb-item">';
    $li_current = '<li class="breadcrumb-item active" aria-current="page">';

    if ($is_en) {
        // 英語TOPリンク（必要なら有効化）
        // $html = $li. '<a href="/en/">TOP</a></li>';
    } else {
        $html = $li . '<a href="/">TOP</a></li>';
    }

    $url = "";
    $dir_titles = $GLOBALS['dir_titles'];

    if ($dirs[0] === 'sitemap.html') {
        $html .= $separator . $li_current . 'サイトマップ</li>';
    } else if ($is_en && (isset($dirs[1]) && $dirs[1] === 'sitemap.html')) {
        $html .= $li . '<a href="/en/">TOP</a></li>' . $separator . $li_current . 'SITE MAP</li>';
    } else {
        for ($i = 0; $i < count($dirs); $i++) {
            $url .= "/" . $dirs[$i];

            if ($i === count($dirs) - 2) {
                if (strtolower($dirs[$i + 1]) === 'index.php' || strtolower($dirs[$i + 1]) === 'index.html') {
                    $html .= $separator . $li_current . ($dir_titles[$dirs[$i]] ?? '') . '</li>';
                    if ($is_en && $i === 0) {
                        $html = $dir_titles[$dirs[$i]] ?? '';
                    }
                    break;
                } else {
                    if ($dirs[$i] !== 'di') {
                        $html .= $separator . $li . '<a href="' . $url . '">' . ($dir_titles[$dirs[$i]] ?? '') . '</a></li>';
                    }
                }
            } else {
                if ($is_en && $i === 0) {
                    $html .= $li . '<a href="' . $url . '">' . ($dir_titles[$dirs[$i]] ?? '') . '</a></li>';
                } else {
                    if ($i === count($dirs) - 1) {
                        $html .= $separator . $li_current . ($GLOBALS['title'] ?? '') . '</li>';
                    } else {
                        if ($dirs[$i] !== 'di') {
                            $html .= $separator . $li . '<a href="' . $url . '">' . ($dir_titles[$dirs[$i]] ?? '') . '</a></li>';
                        }
                    }
                }
            }
        }
    }

    if (!isset($GLOBALS['is_home'])) {
        echo '<ol>' . $html . '</ol>';
    }
}

function language_switcher()
{
    $current_url = $_SERVER['REQUEST_URI'];
    $dirs = $GLOBALS['dirs'];
    $has_undefined_dir = $GLOBALS['has_undefined_dir'];
    $is_en = $GLOBALS['is_en'];

    if ($is_en) {
        $jp_url = str_replace('/en/', '/', $current_url);
        $en_url = $current_url;
        $jp_li = '<li>';
        $en_li = '<li data-type="current">';
    } else {
        $jp_url = $current_url;
        $en_url = '/en' . $current_url;
        $jp_li = '<li data-type="current">';
        $en_li = '<li>';
    }

    $lang_btn = '';

    if (
        $has_undefined_dir === true ||
        (isset($dirs[0]) && $dirs[0] === 'recruit') ||
        (isset($dirs[0]) && $dirs[0] === 'products') ||
        (isset($dirs[0]) && $dirs[0] === 'error.html') ||
        (isset($dirs[0]) && $dirs[0] === 'agecheck')
    ) {
        $lang_btn .= '<li data-type="current"><a href="#" class="language-switcher"><span>JP</span></a></li>';
        $lang_btn .= '<li><a href="/en/" class="language-switcher"><span>EN</span></a></li>';
    } else {
        $lang_btn .= $jp_li . '<a href="' . $jp_url . '" class="language-switcher"><span>JP</span></a></li>';
        $lang_btn .= $en_li . '<a href="' . $en_url . '" class="language-switcher"><span>EN</span></a></li>';
    }
    echo $lang_btn;
}

if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) and $_SERVER['HTTP_X_FORWARDED_PROTO'] === "https") {
    $_SERVER['HTTPS'] = 'on';
}
$host_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'];

function breadcrumbs_jsonld()
{
    $include_home = true;
    $show_at_home = false;
    $extension = '.html';
    $index_file = 'index' . $extension;
    $home = 'TOP';
    $host_url = 'https://www.nikka.com';
    $dir_titles = $GLOBALS['dir_titles'];
    $file_path = $GLOBALS['file_path'];
    $intalled_dir = $GLOBALS['intalled_dir'];
    $page_title = $GLOBALS['title'] ?? '';
    $is_home = isset($GLOBALS['is_home']) ? true : false;
    $is_en = $GLOBALS['is_en'];

    $str = '{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement":
  [' . "\n";
    $count = 1;

    $dirs = explode("/", $file_path);
    $dirs = array_values(array_filter($dirs));
    $url_path = $intalled_dir;
    $comma = ',';

    if ($include_home && !$is_en) {
        if ($show_at_home && $is_home)  $comma = '';
        $home_str = '{"@type": "ListItem",
    "position": ' . $count . ',
    "item":{
      "@id":"' . $host_url . $url_path . '/",
      "name":"' . $home . '"}}' . $comma . "\n";
        $count++;
        $str .= $home_str;
    }

    if ($dirs[0] === 'sitemap.html') {
        $str .= '{"@type": "ListItem",
    "position": 2,
    "item":{
      "@id":"' . $host_url . '/sitemap.html",
      "name":"サイトマップ"}}' . "\n";
    } else if ($is_en && (isset($dirs[1]) && $dirs[1] === 'sitemap.html')) {
        $str .= '{"@type": "ListItem",
    "position": 1,
    "item":{
      "@id":"' . $host_url . '/en/",
      "name":"TOP"}},' . "\n";
        $str .= '{"@type": "ListItem",
    "position": 2,
    "item":{
      "@id":"' . $host_url . '/en/sitemap.html",
      "name":"SITE MAP"}}' . "\n";
    } else {
        for ($i = 0; $i < count($dirs); $i++) {
            $url_path = $url_path . '/' . $dirs[$i];
            if (strpos($dirs[$i], $index_file) === false) {
                if ($i === count($dirs) - 1) {
                    $str .= '{"@type": "ListItem",
          "position": ' . $count . ',
          "item":{
            "@id":"' . $host_url . $url_path . '",
            "name":"' . $page_title . '"}}' . "\n";
                } else {
                    if ($dirs[$i] !== 'di') {
                        $comma = ',';
                        if ($i === count($dirs) - 2 && (strpos($dirs[$i + 1], 'index.php') !== false)) $comma = '';
                        $str .= '{"@type": "ListItem",
            "position": ' . $count . ',
            "item":{
              "@id":"' . $host_url . $url_path . '/",
              "name":"' . ($dir_titles[$dirs[$i]] ?? '') . '"}}' . ($i === count($dirs) - 2 ? '' : $comma) . "\n";
                    }
                }
                $count++;
            }
        }
    }

    $str .= "\n" . ']' . "\n" . '}' . "\n";

    if ($show_at_home) {
        echo  '<script type="application/ld+json">' . "\n" . $str . '</script>' . "\n";
    } else {
        if (!$is_home) {
            echo  '<script type="application/ld+json">' . "\n" . $str . '</script>' . "\n";
        }
    }
}

?>
