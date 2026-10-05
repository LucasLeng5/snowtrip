-- ============================================================
-- SnowTrip Seed Data
-- ============================================================
USE snowtrip1005;

-- ─── 教练数据 ────────────────────────────────────────────────
INSERT INTO coaches (name, title_tc, title_en, certifications, languages, experience, photo_url, resorts) VALUES
('Aster Zhang',  '高級滑雪教練',  'Senior Ski Instructor',  'CSIA Level 4 · CASI Level 3', '中文 · English · 日本語', 12, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'Niseko · Whistler'),
('Lucas Leng',   '滑雪技術總監',  'Technical Director',     'BASI Level 4 · NZSIA Level 4','English · 廣東話',         15, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', 'Queenstown · Cardrona'),
('井上 健',       '日本雪道專家',  'Japan Terrain Expert',   'SAJ Level 1 · JSIA 公認',     '日本語 · English · 中文',   18, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 'Hokkaido · Nagano'),
('Kenneth Lau',  '粉雪課程主任',  'Powder Course Director', 'CSIA Level 4 · CAA Avalanche','廣東話 · English · 普通話', 10, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', 'Niseko · Hakuba'),
('高橋 翔',       '兒童課程教練',  'Kids Program Coach',     'SAJ Level 2 · PSIA Level 3',  '日本語 · 普通話',           8,  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'Furano · Teine'),
('Olivia',       '競技滑雪教練',  'Competitive Ski Coach',  'NZSIA Level 4 · FIS Certified','English · 中文',            11, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', 'Coronet Peak · The Remarkables');

-- ─── 中国雪场 ────────────────────────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features) VALUES
('萬科松花湖滑雪場', 'Vanke Songhua Lake',     '吉林・吉林市',   'CN', '吉林', 888,  'CNY', 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?w=600&h=380&fit=crop', '["雪質優良","現代設施","教學場地"]'),
('北大湖滑雪場', 'Beidahu Ski Resort',         '吉林・吉林市',   'CN', '吉林', 888,  'CNY', 'https://images.unsplash.com/photo-1680114015093-b1975c470331?w=600&h=380&fit=crop', '["初學者課程","設施齊全","雪道多樣"]'),
('長白山萬達國際滑雪場', 'Changbaishan Wanda', '吉林・白山市',   'CN', '吉林', 888,  'CNY', 'https://images.unsplash.com/photo-1516352267226-f5f3e4c53781?w=600&h=380&fit=crop', '["國際標準","溫泉度假","高端體驗"]'),
('亞布力滑雪場', 'Yabuli Ski Resort',         '黑龍江・哈爾濱', 'CN', '黑龙江', 888,  'CNY', 'https://images.unsplash.com/photo-1611279607611-d6dd93331c6e?w=600&h=380&fit=crop', '["東北名山","滑雪歷史","完善配套"]'),
('萬龍滑雪場', 'Wanlong Ski Resort',           '河北・張家口',   'CN', '河北', 1080, 'CNY', 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d?w=600&h=380&fit=crop', '["奧運場地","高難度地形","專業課程"]'),
('太舞滑雪小鎮', 'Thaiwoo Ski Resort',         '河北・張家口',   'CN', '河北', 1080, 'CNY', 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133?w=600&h=380&fit=crop', '["主題滑雪鎮","娛樂配套","親子友善"]'),
('禾木吉克普林滑雪場', 'Hemu Jikepulin',   '新疆・阿勒泰',   'CN', '新疆', 980,  'CNY', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["原始粉雪","異域風情","獨特體驗"]'),
('可可托海國際滑雪場', 'Koktokay International',   '新疆・阿勒泰',   'CN', '新疆', 980,  'CNY', 'https://images.unsplash.com/photo-1711066444012-f918e6b448d8?w=600&h=380&fit=crop', '["國際認證","自然景觀","探險滑雪"]');

-- ─── 纽西兰雪场 ──────────────────────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features) VALUES
('華卡帕帕', 'Whakapapa',    '北島・魯阿佩胡', 'NZ', '北岛', 820, 'NZD', 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03?w=600&h=380&fit=crop', '["火山地形","多樣雪道","家庭友善"]'),
('圖羅瓦',   'Tūroa',        '北島・魯阿佩胡', 'NZ', '北岛', 820, 'NZD', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=380&fit=crop', '["廣闊地形","壯觀景色","高山滑雪"]'),
('皇冠峰',   'Coronet Peak', '南島・皇后鎮',   'NZ', '南岛', 900, 'NZD', 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53?w=600&h=380&fit=crop', '["皇后鎮旁","夜滑場地","完善設施"]'),
('卓越山',   'The Remarkables','南島・皇后鎮', 'NZ', '南岛', 920, 'NZD', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["壯麗山景","挑戰地形","攝影勝地"]'),
('卡德羅納', 'Cardrona',     '南島・瓦納卡',   'NZ', '南岛', 870, 'NZD', 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?w=600&h=380&fit=crop', '["家庭首選","初學者天堂","豐富設施"]'),
('三錐山',   'Treble Cone',  '南島・瓦納卡',   'NZ', '南岛', 870, 'NZD', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["高級地形","壯觀視野","小眾體驗"]'),
('哈特山',   'Mt Hutt',      '南島・坎特伯雷', 'NZ', '南岛', 870, 'NZD', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["最長雪季","高山環境","進階課程"]');



-- ─── 北海道地区 (15个雪场) ──────────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features, is_active) VALUES
('ONZE', 'ONZE Ski Resort', '北海道・札幌', 'JP', '北海道', 75800, 'JPY', 'https://images.unsplash.com/photo-1517918558653-3a2c5ab393a2?w=600&h=380&fit=crop', '["家庭友善","市區鄰近","初學者天堂"]', 1),
('朝里川', 'Asarigawa Onsen Ski Area', '北海道・小樽', 'JP', '北海道', 72000, 'JPY', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["溫泉滑雪","自然雪道","寧靜環境"]', 1),
('二世谷・Moiwa', 'Niseko Moiwa', '北海道・倶知安', 'JP', '北海道', 92000, 'JPY', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["粉雪天堂","親子友善","國際社群"]', 1),
('二世谷・Annupuri', 'Niseko Annupuri', '北海道・倶知安', 'JP', '北海道', 94800, 'JPY', 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac?w=600&h=380&fit=crop', '["世界級粉雪","多樣地形","多語教練"]', 1),
('二世谷・Grand Hirafu', 'Niseko Grand Hirafu', '北海道・倶知安', 'JP', '北海道', 96000, 'JPY', 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4?w=600&h=380&fit=crop', '["高級私教","定制行程","夜滑場地"]', 1),
('二世谷・HANAZONO', 'Niseko Hanazono', '北海道・倶知安', 'JP', '北海道', 95000, 'JPY', 'https://images.unsplash.com/photo-1610957386668-dd266c45734d?w=600&h=380&fit=crop', '["頂級設施","精品體驗","專屬雪道"]', 1),
('二世谷・Niseko Village', 'Niseko Village', '北海道・倶知安', 'JP', '北海道', 93000, 'JPY', 'https://images.unsplash.com/photo-1703080138499-f1f0dbc7da42?w=600&h=380&fit=crop', '["度假村配套","家庭首選","完善設施"]', 1),
('留壽都', 'Rusutsu Resort', '北海道・虻田郡', 'JP', '北海道', 82900, 'JPY', 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03?w=600&h=380&fit=crop', '["中級地形","全季服務","壯觀景色"]', 1),
('手稻', 'Sapporo Teine', '北海道・札幌', 'JP', '北海道', 75800, 'JPY', 'https://images.unsplash.com/photo-1517918558653-3a2c5ab393a2?w=600&h=380&fit=crop', '["初中級友善","纜車系統","奧運場地"]', 1),
('天狗山', 'Tengu Mountain', '北海道・小樽', 'JP', '北海道', 70000, 'JPY', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=380&fit=crop', '["市區鄰近","夜景滑雪","初學者課程"]', 1),
('喜樂樂 Kiroro', 'Kiroro Snow World', '北海道・小樽', 'JP', '北海道', 90000, 'JPY', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["高級私教","自然雪道","定制行程"]', 1),
('札幌國際', 'Sapporo Kokusai', '北海道・札幌', 'JP', '北海道', 75800, 'JPY', 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4?w=600&h=380&fit=crop', '["全日制課程","雪具租借","市區鄰近"]', 1),
('札幌盤溪', 'Sapporo Bankei', '北海道・札幌', 'JP', '北海道', 68000, 'JPY', 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53?w=600&h=380&fit=crop', '["夜滑首選","經濟實惠","交通便利"]', 1),
('星野', 'Hoshino Resorts Tomamu', '北海道・勇拂郡', 'JP', '北海道', 85300, 'JPY', 'https://images.unsplash.com/photo-1610957386668-dd266c45734d?w=600&h=380&fit=crop', '["精品體驗","溫泉配套","頂級設施"]', 1),
('富良野', 'Furano Ski Resort', '北海道・富良野', 'JP', '北海道', 85300, 'JPY', 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac?w=600&h=380&fit=crop', '["粉雪天堂","自然地形","專業課程"]', 1);

-- ─── 藏王地区 (1个雪场) ─────────────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features, is_active) VALUES
('藏王温泉', 'Zao Onsen Ski Resort', '山形・山形市', 'JP', '藏王', 78000, 'JPY', 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d?w=600&h=380&fit=crop', '["樹冰奇觀","溫泉滑雪","獨特體驗"]', 1);

-- ─── 關西・岐阜地区 (6个雪场) ───────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features, is_active) VALUES
('Dynaland', 'Dynaland Ski Resort', '滋賀・大津市', 'JP', '關西・岐阜', 72000, 'JPY', 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133?w=600&h=380&fit=crop', '["關西鄰近","家庭友善","夜滑場地"]', 1),
('Grand Snow', 'Grand Snow Okuibuki', '岐阜・揖斐郡', 'JP', '關西・岐阜', 70000, 'JPY', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["中部地區","自然雪質","初學者天堂"]', 1),
('奧伊吹', 'Okuibuki Ski Resort', '滋賀・米原市', 'JP', '關西・岐阜', 71000, 'JPY', 'https://images.unsplash.com/photo-1711066444012-f918e6b448d8?w=600&h=380&fit=crop', '["關西首選","多樣雪道","溫泉配套"]', 1),
('六甲山 Snow Park', 'Rokkosan Snow Park', '兵庫・神戶市', 'JP', '關西・岐阜', 68000, 'JPY', 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?w=600&h=380&fit=crop', '["神戶市區","都市滑雪","親子活動"]', 1),
('琵琶湖 Valley', 'Biwako Valley Ski Park', '滋賀・大津市', 'JP', '關西・岐阜', 69000, 'JPY', 'https://images.unsplash.com/photo-1680114015093-b1975c470331?w=600&h=380&fit=crop', '["湖畔滑雪","風景優美","初學者課程"]', 1),
('琵琶湖箱館山', 'Biwako Hakkenzan', '滋賀・東近江市', 'JP', '關西・岐阜', 70000, 'JPY', 'https://images.unsplash.com/photo-1516352267226-f5f3e4c53781?w=600&h=380&fit=crop', '["關西最大","多樣地形","完善設施"]', 1);

-- ─── 長野・湯澤地区 (17个雪场) ──────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features, is_active) VALUES
('GALA 湯澤', 'GALA Yuzawa', '新潟・南魚沼郡', 'JP', '長野・湯澤', 82000, 'JPY', 'https://images.unsplash.com/photo-1611279607611-d6dd93331c6e?w=600&h=380&fit=crop', '["新幹線直達","溫泉滑雪","便捷交通"]', 1),
('NASPA Ski Garden', 'NASPA Ski Garden', '新潟・南魚沼郡', 'JP', '長野・湯澤', 80000, 'JPY', 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133?w=600&h=380&fit=crop', '["家庭友善","夜滑首選","溫泉配套"]', 1),
('Yomase 溫泉', 'Yomase Onsen Ski Area', '長野・上高井郡', 'JP', '長野・湯澤', 75000, 'JPY', 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53?w=600&h=380&fit=crop', '["溫泉滑雪","寧靜環境","自然雪質"]', 1),
('斑尾高原', 'Madrao Kogen', '新潟・十日町市', 'JP', '長野・湯澤', 76000, 'JPY', 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03?w=600&h=380&fit=crop', '["高原滑雪","壯觀景色","中級地形"]', 1),
('志賀高原', 'Shiga Kogen', '長野・下高井郡', 'JP', '長野・湯澤', 88000, 'JPY', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["日本最大","奧運場地","多樣雪道"]', 1),
('龍王 Ski Park', 'Ryuoo Ski Park', '長野・須坂市', 'JP', '長野・湯澤', 79000, 'JPY', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=380&fit=crop', '["高空纜車","壯麗視野","進階課程"]', 1),
('苗場', 'Naeba Ski Resort', '新潟・南魚沼郡', 'JP', '長野・湯澤', 83000, 'JPY', 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac?w=600&h=380&fit=crop', '["廣闊地形","連接滑雪","完善設施"]', 1),
('妙高杉之原', 'Myoko Suginohara', '新潟・妙高市', 'JP', '長野・湯澤', 77000, 'JPY', 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4?w=600&h=380&fit=crop', '["粉雪天堂","自然地形","專業課程"]', 1),
('LOTTE ARAI Resort', 'Lotte Arai Resort', '新潟・上越市', 'JP', '長野・湯澤', 90000, 'JPY', 'https://images.unsplash.com/photo-1610957386668-dd266c45734d?w=600&h=380&fit=crop', '["頂級度假村","豪華設施","精品體驗"]', 1),
('輕井澤 Prince Hotel', 'Karuizawa Prince Hotel Ski Area', '長野・北佐久郡', 'JP', '長野・湯澤', 85300, 'JPY', 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d?w=600&h=380&fit=crop', '["度假勝地","溫泉配套","高端體驗"]', 1),
('輕井澤 Snow Park', 'Karuizawa Snow Park', '長野・北佐久郡', 'JP', '長野・湯澤', 73000, 'JPY', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["初學者天堂","親子友善","輕鬆滑雪"]', 1),
('上越國際', 'Jyetsu Kokusai', '新潟・南魚沼郡', 'JP', '長野・湯澤', 81000, 'JPY', 'https://images.unsplash.com/photo-1703080138499-f1f0dbc7da42?w=600&h=380&fit=crop', '["國際標準","多樣雪道","完善配套"]', 1),
('神樂', 'Kagura Ski Resort', '新潟・南魚沼郡', 'JP', '長野・湯澤', 82000, 'JPY', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["長雪季","優質粉雪","專業設施"]', 1),
('神立 Snow Resort', 'Kandatsu Snow Resort', '新潟・南魚沼郡', 'JP', '長野・湯澤', 80000, 'JPY', 'https://images.unsplash.com/photo-1680114015093-b1975c470331?w=600&h=380&fit=crop', '["溫泉滑雪","家庭首選","夜滑場地"]', 1),
('石打丸山', 'Ishiuchi Maruyama', '新潟・南魚沼郡', 'JP', '長野・湯澤', 79000, 'JPY', 'https://images.unsplash.com/photo-1516352267226-f5f3e4c53781?w=600&h=380&fit=crop', '["高速纜車","壯觀景色","進階地形"]', 1),
('湯澤高原', 'Yuzawa Kogen', '新潟・南魚沼郡', 'JP', '長野・湯澤', 78000, 'JPY', 'https://images.unsplash.com/photo-1611279607611-d6dd93331c6e?w=600&h=380&fit=crop', '["溫泉鄉","多樣選擇","便捷交通"]', 1),
('湯澤中里', 'Yuzawa Nakazato', '新潟・南魚沼郡', 'JP', '長野・湯澤', 77000, 'JPY', 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133?w=600&h=380&fit=crop', '["當地特色","經濟實惠","初學者友善"]', 1),
('岩原', 'Iwahara Ski Area', '新潟・南魚沼郡', 'JP', '長野・湯澤', 76000, 'JPY', 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53?w=600&h=380&fit=crop', '["寧靜環境","自然雪質","悠閒滑雪"]', 1),
('野澤溫泉', 'Nozawa Onsen', '長野・下高井郡', 'JP', '長野・湯澤', 84000, 'JPY', 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03?w=600&h=380&fit=crop', '["傳統溫泉村","歷史悠久","國際知名"]', 1);

-- ─── 白马地区 (8个雪场) ─────────────────────────────────────
INSERT INTO resorts (name, name_en, location, nation, region, price, currency, photo_url, features, is_active) VALUES
('八方尾根', 'Hakuba Happo-one', '長野・北安曇郡', 'JP', '白马', 88000, 'JPY', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["奧運場地","國際知名","高級地形"]', 1),
('乘鞍', 'Norikura Highland', '長野・北安曇郡', 'JP', '白马', 79000, 'JPY', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=380&fit=crop', '["高原滑雪","壯麗景色","中級首選"]', 1),
('鹿島槍', 'Kashimayari', '長野・北安曇郡', 'JP', '白马', 82000, 'JPY', 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac?w=600&h=380&fit=crop', '["挑戰地形","專業課程","自然雪質"]', 1),
('栂池高原', 'Tsugaike Kogen', '長野・北安曇郡', 'JP', '白马', 85000, 'JPY', 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4?w=600&h=380&fit=crop', '["高速纜車","連接滑雪","完善設施"]', 1),
('五龍', 'Goryu', '長野・北安曇郡', 'JP', '白马', 80000, 'JPY', 'https://images.unsplash.com/photo-1610957386668-dd266c45734d?w=600&h=380&fit=crop', '["家庭友善","多樣雪道","夜滑場地"]', 1),
('岩岳', 'Iwatake', '長野・北安曇郡', 'JP', '白马', 83000, 'JPY', 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d?w=600&h=380&fit=crop', '["俯瞰全景","進階地形","國際社群"]', 1),
('爺岳', 'Hakuba Sanosaka', '長野・北安曇郡', 'JP', '白马', 78000, 'JPY', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["初學者天堂","悠閒氛圍","經濟實惠"]', 1),
('佐野坂', 'Hakuba Sakanoue', '長野・北安曇郡', 'JP', '白马', 77000, 'JPY', 'https://images.unsplash.com/photo-1703080138499-f1f0dbc7da42?w=600&h=380&fit=crop', '["本地特色","寧靜環境","自然體驗"]', 1);
