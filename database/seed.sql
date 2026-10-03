-- ============================================================
-- SnowTrip Seed Data
-- ============================================================
USE snowtri0817;

-- ─── 教练数据 ────────────────────────────────────────────────
INSERT INTO coaches (name, title_tc, title_en, certifications, languages, experience, photo_url, resorts) VALUES
('Aster Zhang',  '高級滑雪教練',  'Senior Ski Instructor',  'CSIA Level 4 · CASI Level 3', '中文 · English · 日本語', 12, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'Niseko · Whistler'),
('Lucas Leng',   '滑雪技術總監',  'Technical Director',     'BASI Level 4 · NZSIA Level 4','English · 廣東話',         15, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', 'Queenstown · Cardrona'),
('井上 健',       '日本雪道專家',  'Japan Terrain Expert',   'SAJ Level 1 · JSIA 公認',     '日本語 · English · 中文',   18, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 'Hokkaido · Nagano'),
('Kenneth Lau',  '粉雪課程主任',  'Powder Course Director', 'CSIA Level 4 · CAA Avalanche','廣東話 · English · 普通話', 10, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', 'Niseko · Hakuba'),
('高橋 翔',       '兒童課程教練',  'Kids Program Coach',     'SAJ Level 2 · PSIA Level 3',  '日本語 · 普通話',           8,  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'Furano · Teine'),
('Olivia',       '競技滑雪教練',  'Competitive Ski Coach',  'NZSIA Level 4 · FIS Certified','English · 中文',            11, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', 'Coronet Peak · The Remarkables');

-- ─── 日本雪场 ────────────────────────────────────────────────
INSERT INTO resorts (name, location, region, price, currency, photo_url, features) VALUES
('手稻滑雪場',       '北海道・札幌',   'JP', 75800, 'JPY', 'https://images.unsplash.com/photo-1517918558653-3a2c5ab393a2?w=600&h=380&fit=crop', '["初中級友善","纜車系統","多語教練"]'),
('札幌國際滑雪場',   '北海道・札幌',   'JP', 75800, 'JPY', 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4?w=600&h=380&fit=crop', '["全日制課程","雪具租借","市區鄰近"]'),
('星野滑雪場',       '長野・輕井澤',   'JP', 85300, 'JPY', 'https://images.unsplash.com/photo-1610957386668-dd266c45734d?w=600&h=380&fit=crop', '["精品體驗","溫泉配套","頂級設施"]'),
('富良野滑雪場',     '北海道・富良野', 'JP', 85300, 'JPY', 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac?w=600&h=380&fit=crop', '["粉雪天堂","自然地形","專業課程"]'),
('喜樂樂滑雪場',     '北海道・小樽',   'JP', 90000, 'JPY', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["高級私教","定制行程","自然雪道"]'),
('二世谷聯合滑雪場', '北海道・倶知安', 'JP', 94800, 'JPY', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["世界級粉雪","多座雪山","國際社群"]'),
('留壽都滑雪場',     '北海道・虻田郡', 'JP', 82900, 'JPY', 'https://images.unsplash.com/photo-1703080138499-f1f0dbc7da42?w=600&h=380&fit=crop', '["家庭友善","中級地形","全季服務"]');

-- ─── 中国雪场 ────────────────────────────────────────────────
INSERT INTO resorts (name, location, region, price, currency, photo_url, features) VALUES
('萬科松花湖滑雪場',     '吉林・吉林市',   'CN', 888,  'CNY', 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?w=600&h=380&fit=crop', '["雪質優良","現代設施","教學場地"]'),
('北大湖滑雪場',         '吉林・吉林市',   'CN', 888,  'CNY', 'https://images.unsplash.com/photo-1680114015093-b1975c470331?w=600&h=380&fit=crop', '["初學者課程","設施齊全","雪道多樣"]'),
('長白山萬達國際滑雪場', '吉林・白山市',   'CN', 888,  'CNY', 'https://images.unsplash.com/photo-1516352267226-f5f3e4c53781?w=600&h=380&fit=crop', '["國際標準","溫泉度假","高端體驗"]'),
('亞布力滑雪場',         '黑龍江・哈爾濱', 'CN', 888,  'CNY', 'https://images.unsplash.com/photo-1611279607611-d6dd93331c6e?w=600&h=380&fit=crop', '["東北名山","滑雪歷史","完善配套"]'),
('萬龍滑雪場',           '河北・張家口',   'CN', 1080, 'CNY', 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d?w=600&h=380&fit=crop', '["奧運場地","高難度地形","專業課程"]'),
('太舞滑雪小鎮',         '河北・張家口',   'CN', 1080, 'CNY', 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133?w=600&h=380&fit=crop', '["主題滑雪鎮","娛樂配套","親子友善"]'),
('禾木吉克普林滑雪場',   '新疆・阿勒泰',   'CN', 980,  'CNY', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["原始粉雪","異域風情","獨特體驗"]'),
('可可托海國際滑雪場',   '新疆・阿勒泰',   'CN', 980,  'CNY', 'https://images.unsplash.com/photo-1711066444012-f918e6b448d8?w=600&h=380&fit=crop', '["國際認證","自然景觀","探險滑雪"]');

-- ─── 纽西兰雪场 ──────────────────────────────────────────────
INSERT INTO resorts (name, name_en, location, region, price, currency, photo_url, features) VALUES
('華卡帕帕', 'Whakapapa',    '北島・魯阿佩胡', 'NZ', 820, 'NZD', 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03?w=600&h=380&fit=crop', '["火山地形","多樣雪道","家庭友善"]'),
('圖羅瓦',   'Tūroa',        '北島・魯阿佩胡', 'NZ', 820, 'NZD', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=380&fit=crop', '["廣闊地形","壯觀景色","高山滑雪"]'),
('皇冠峰',   'Coronet Peak', '南島・皇后鎮',   'NZ', 900, 'NZD', 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53?w=600&h=380&fit=crop', '["皇后鎮旁","夜滑場地","完善設施"]'),
('卓越山',   'The Remarkables','南島・皇后鎮', 'NZ', 920, 'NZD', 'https://images.unsplash.com/photo-1600476018895-b66342d8592d?w=600&h=380&fit=crop', '["壯麗山景","挑戰地形","攝影勝地"]'),
('卡德羅納', 'Cardrona',     '南島・瓦納卡',   'NZ', 870, 'NZD', 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?w=600&h=380&fit=crop', '["家庭首選","初學者天堂","豐富設施"]'),
('三錐山',   'Treble Cone',  '南島・瓦納卡',   'NZ', 870, 'NZD', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&h=380&fit=crop', '["高級地形","壯觀視野","小眾體驗"]'),
('哈特山',   'Mt Hutt',      '南島・坎特伯雷', 'NZ', 870, 'NZD', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=380&fit=crop', '["最長雪季","高山環境","進階課程"]');
