<?php

$intalled_dir = '';
 
//このスクリプトを実行しているページのホームディレクトリからのパス（ファイル名を含む）
$file_path = $_SERVER['SCRIPT_NAME']; 
 
// パスをスラッシュで区切った値（ディレクトリ名）の配列
$dirs = explode("/", $file_path); 
// 配列の空の要素を削除（先頭は常に空）
$dirs = array_values(array_filter($dirs,"strlen")); 


// $dirsの内容をコンソールに出力(デバッグ用)
// echo '<script>console.log(' . json_encode($dirs) . ');</script>';

// 英語ページかどうかの判定用変数
$is_en = isset($dirs[0]) && $dirs[0] === 'en' ? true: false;

//ディレクトリ名の代わりに表示する文字列を指定した配列
//日本語ページ用
$dir_titles = [
  'template' => 'テンプレート',

  // distilleries配下
  'distilleries' => '蒸溜所',
  'yoichi' => '余市蒸溜所',
  'miyagikyo' => '宮城峡蒸溜所',
  'visit' => '楽しみ方',
  'guide' => '見学スポット',
  'access' => 'アクセス',
  'faq' => 'よくあるご質問',

  // brands・products配下
  'products' => '商品紹介',
  'brands' => '商品紹介',

  // story配下 
  'story' => 'ストーリー',
  'founder' => '創業者 竹鶴政孝',
  'history' => 'ニッカウヰスキーの歴史',
  'awards' => '受賞歴',
  'br2025' => 'ドリンクス・インターナショナル　ブランドレポート 2025',

  // その他
  'contact' => 'お問い合わせ',
  'recruit' => 'RECRUIT',
  'about' => '会社案内'
];

//英語ページ用
if($is_en) {
  $dir_titles = [
    'template' => 'TEMPLATE',

    // distilleries配下
    'distilleries' => 'DISTILLERIES',
    'yoichi' => 'YOICHI DISTILLERY',
    'miyagikyo' => 'MIYAGIKYO DISTILLERY',
    'visit' => 'HOW TO ENJOY',
    'guide' => 'OUR FACILITIES',
    'access' => 'HOW TO VISIT',
    'faq' => 'FAQ',

    // brands・products配下
    'products' => 'OUR BRANDS',
    'brands' => 'OUR BRANDS',

    // story配下 
    'story' => 'STORY',
    'founder' => 'THE FOUNDER',
    'history' => 'HISTORY',
    'awards' => 'AWARDS',
    'br2025' => 'DRINKS INTERNATIONAL BRANDS REPORT 2025',

    // その他
    'contact' => 'CONTACT US',
    'about' => 'ABOUT US',
    'en' => 'TOP'
  ];
}

// $dir_titlesで定義された以外のディレクトリが含まれている場合の判定用変数
$has_undefined_dir = false;
foreach ($dirs as $dir) {
  if ($dir !== 'index.php' && $dir !== 'index.html' && $dir !== 'index.psp.html' && $dir !== 'sitemap.html' && $dir !== 'di') {
    if (array_key_exists($dir, $dir_titles)) {
      // ディレクトリ名が$dir_titlesに含まれている場合
    }else{
      // ディレクトリ名が$dir_titlesに含まれていない場合
      $has_undefined_dir = true;
      break;
    }
  }
}


function breadcrumbs( $separator='') {
  // パスをスラッシュで区切った値（ディレクトリ名の配列。関数外で定義）
  $dirs = $GLOBALS['dirs'];
  
  // 英語ページかどうかの判定用変数
  $is_en = $GLOBALS['is_en'];

  $li = '<li class="breadcrumb-item">';
  $li_current = '<li class="breadcrumb-item active" aria-current="page">';

  if($is_en) {
    // $html = $li. '<a href="/en/">TOP</a></li>';
  }else{
    $html = $li. '<a href="/">TOP</a></li>';
  }


  $url = "";
  

  //ディレクトリ名の代わりに表示する文字列を指定した配列（関数外で定義）
  $dir_titles = $GLOBALS['dir_titles'];
 
  if ($dirs[0] === 'sitemap.html') {
    $html .= $separator . $li_current . 'サイトマップ</li>';

  }else if ($is_en && ($dirs[1] === 'sitemap.html')) {
    $html .= $li. '<a href="/en/">TOP</a></li>' . $separator . $li_current . 'SITE MAP</li>';

  }else{

    for($i = 0; $i < count($dirs); $i++ ) {
      $url .= "/".$dirs[$i];

      //ファイルが index.php の場合はスキップ（index.php を表示しない）
      if($i === count($dirs) -2) {
        if(strtolower($dirs[$i + 1]) === 'index.php' || strtolower($dirs[$i + 1]) === 'index.html') {
          //それぞれのページに設定してある $title を表示
          $html .= $separator. $li_current .$dir_titles[$dirs[$i]] .'</li>';
          if($is_en && $i === 0 ){
            //英語トップページ
            $html = $dir_titles[$dirs[$i]] ;
          }
          break;
        }else{
            if($dirs[$i] !== 'di') {
            $html .=  $separator . $li. '<a href="' .$url.'">' .$dir_titles[$dirs[$i]].'</a></li>';
          }
        }
      } else {
        //英語ページの先頭ではセパレータを非表示
        if($is_en && $i === 0 ){
          $html .=  $li. '<a href="' .$url.'">' .$dir_titles[$dirs[$i]].'</a></li>';
        }else{
          if($i === count($dirs) -1) {
          //それぞれのページに設定してある $title を表示
          $html .= $separator. $li_current . $GLOBALS['title'] .'</li>';
          } else {
            if($dirs[$i] !== 'di') {
              $html .= $separator . $li. '<a href="' .$url.'">' .$dir_titles[$dirs[$i]].'</a></li>';
            }
          } 
        } 
      } 
    }
  }

  //ol 要素で囲んでマークアップを作成して出力（ホームでは出力しない）
  if(!isset($GLOBALS['is_home'])) {  
    echo '<ol>'. $html .'</ol>'; 
  }
}

function language_switcher() {
  // 現在のURLを取得
  $current_url = $_SERVER['REQUEST_URI'];

  $dirs = $GLOBALS['dirs'];
  $has_undefined_dir = $GLOBALS['has_undefined_dir'];
  
  // 英語ページかどうかの判定用変数
  $is_en = $GLOBALS['is_en'];

  if($is_en) {
    // 日本語ページのURLを生成
    $jp_url = str_replace('/en/', '/', $current_url);
    // 英語ページのURLを生成
    $en_url = $current_url;

    $jp_li = '<li>';
    $en_li = '<li data-type="current">';

  } else {
    // 日本語ページのURLを生成
    $jp_url = $current_url;
    // 英語ページのURLを生成
    $en_url = '/en' . $current_url;

    $jp_li = '<li data-type="current">';
    $en_li = '<li>';

  }
  
  // ボタンを生成して出力
  $lang_btn = '';

  if (
    $has_undefined_dir === true || 
    isset($dirs[0]) && $dirs[0] === 'recruit' || 
    isset($dirs[0]) && $dirs[0] === 'products' || 
    isset($dirs[0]) && $dirs[0] === 'error.html' || 
    isset($dirs[0]) && $dirs[0] === 'agecheck'
  ){
    $lang_btn .= '<li data-type="current"><a href="#" class="language-switcher"><span>JP</span></a></li>';
    $lang_btn .= '<li><a href="/en/" class="language-switcher"><span>EN</span></a></li>';
  }else{
    $lang_btn .= $jp_li . '<a href="' . $jp_url . '" class="language-switcher"><span>JP</span></a></li>';
    $lang_btn .= $en_li . '<a href="' . $en_url . '" class="language-switcher"><span>EN</span></a></li>';
  }
  echo $lang_btn;
}


//SSL化されいる場合は $_SERVER['HTTPS'] に 'on' を設定
if(isset($_SERVER['HTTP_X_FORWARDED_PROTO']) and $_SERVER['HTTP_X_FORWARDED_PROTO'] === "https") {
  $_SERVER['HTTPS'] = 'on';
} 
//Home の URL の組み立て
$host_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://'). $_SERVER['HTTP_HOST'];
 
function breadcrumbs_jsonld() {
  //構造化マークアップにホームを含めるかどうか（含めない場合は false に変更）
  $include_home = true;
  //ホームで構造化マークアップを出力するかどうか（出力する場合は true に変更）
  $show_at_home = false;
  //ファイルの拡張子（必要に応じて変更）
  $extension = '.html';
  //インデックスファイル名
  $index_file = 'index' . $extension;
  //ホームの文字（必要に応じて変更）
  $home = 'TOP';
  //Top の URL 
  // $host_url = $GLOBALS['host_url'];
  $host_url = 'https://www.nikka.com';
  //ディレクトリ名の代わりに表示する文字列（関数外で定義→ $GLOBALS[] でアクセス）
  $dir_titles = $GLOBALS['dir_titles'];
  //ホームディレクトリからのパス（関数外で定義）
  $file_path = $GLOBALS['file_path'];
  //インストールされたディレクトリまでの文字（関数外で定義）
  $intalled_dir = $GLOBALS['intalled_dir'];
  //そのページのタイトル（各ページで定義）
  $page_title =  $GLOBALS['title'];
  //ホームかどうかの判定用変数（ホームのみで定義）
  $is_home = isset($GLOBALS['is_home']) ? true : false;
  // 英語ページかどうかの判定用変数（★★追加★★）
  $is_en = $GLOBALS['is_en'];
  
  //出力文字列の初期化（構造化マークアップの先頭部分）
  $str ='{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement":
  ['."\n"; 
  //position カウンター
  $count = 1;
  
  // パスをスラッシュで区切った値（ディレクトリ名）の配列
  $dirs = explode("/", $file_path); 
  // 配列の空の要素を削除（先頭は常に空）
  $dirs = array_values(array_filter($dirs)); 
  
  //ホスト（$host_url）以降のパス
  //ルートディレクトリにサイトがインストールされていれば $intalled_dir は空 ''
  $url_path = $intalled_dir;
  
  //カンマ部分に使用する変数
  $comma =',';
  
  // $str.= 'include_home:'.$include_home.', is_en:'.$is_en;

  //$include_home（ホームを含めるかどうか）が true（デフォルト）で、英語ページでない場合
  if($include_home && !$is_en) {
    if($show_at_home && $is_home)  $comma ='';
    $home_str = '{"@type": "ListItem",
    "position": '.$count.',
    "item":{
      "@id":"'. $host_url. $url_path . '/",
      "name":"'.$home. '"}}' .$comma. "\n";
    $count++;
    $str.= $home_str; 
  }

  if ($dirs[0] === 'sitemap.html') {
    $str.= '{"@type": "ListItem",
    "position": 2,
    "item":{
      "@id":"'. $host_url.'/sitemap.html",
      "name":"サイトマップ"}}' . "\n";

  }else if ($is_en && ($dirs[1] === 'sitemap.html')) {

    $str.= '{"@type": "ListItem",
    "position": 1,
    "item":{
      "@id":"'. $host_url.'/en/",
      "name":"TOP"}},' . "\n";

    $str.= '{"@type": "ListItem",
    "position": 2,
    "item":{
      "@id":"'. $host_url.'/en/sitemap.html",
      "name":"SITE MAP"}}' . "\n";

  }else{

    for ( $i = 0; $i < count( $dirs ); $i++ ) {
      //ホスト（$host_url）以降のパス
      $url_path = $url_path . '/' . $dirs[ $i ];
      //"name" に表示する値（ホームの場合は $home に指定した文字）
      $name = '';
      //インデックスファイル以外の場合
      //インデックスファイルの場合はそのディレクトリで出力されるので何も出力しない
      if(strpos($dirs[$i], $index_file) === false) { 
        if($i === count($dirs) - 1) { 
          //ファイルの拡張子を表示しない場合は、以下のコメントアウトを外す
          //$url_path = str_replace( $extension, '' , $url_path );
          $str.= '{"@type": "ListItem",
          "position": '.$count.',
          "item":{
            "@id":"'. $host_url. $url_path. '",
            "name":"'.$page_title. '"}}' ."\n";
            //ファイルの場合はそのページで設定されているタイトル（$page_title）を使用
        }else{
          if($dirs[$i] !== 'di') {
            $comma =',';
            if($i === count($dirs) - 2 && (strpos($dirs[$i + 1], 'index.php') !== false)) $comma ='';
            $str.= '{"@type": "ListItem",
            "position": '.$count.',
            "item":{
              "@id":"'. $host_url. $url_path. '/",
              "name":"'.$dir_titles[$dirs[$i]]. '"}}' . ($i === count($dirs) - 2 ? '' : $comma) . "\n";
              //配列 $dir_titles からディレクトリ名をキーとして表示する文字列を取得
          }
        }
        $count ++;
      }
    }
  }

  $str.= "\n".']'."\n".'}'."\n";
  
  if($show_at_home) {
    echo  '<script type="application/ld+json">' ."\n". $str . '</script>'."\n";
  }else{
    //ホームでは表示しない
    if(!$is_home) {  
      echo  '<script type="application/ld+json">' ."\n". $str . '</script>'."\n";
    }
  }
}

?>