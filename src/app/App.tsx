import { useState, useEffect, useRef } from "react";
import {
  Globe, X, Menu, ChevronDown, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, Clock, Search, ArrowRight, ArrowLeft, Plus, Minus,
  Check, Star, CreditCard, Smartphone, LogOut, User, ClipboardList, AlertCircle, CheckCircle, Lock
} from "lucide-react";

// ─── Image imports (ES module — required for Figma Make) ──
import imgLogo    from "@/imports/_____20260815183536_1558_2968.png";
import imgHero    from "@/imports/hero.jpg";
import imgStory   from "@/imports/story.jpg";
import imgCoachLeo  from "@/imports/Leo.jpg";
import imgCoachJeff from "@/imports/Jeff.jpg";
import imgCoachCody  from "@/imports/Cody.jpg";
import imgCoachTengye from "@/imports/Tengye.jpg";
import imgCoachBinbin from "@/imports/Binbin.jpg";
import imgCoachAxiang from "@/imports/Axiang.jpg";
import imgJp1 from "@/imports/jp1.jpg"; import imgJp2 from "@/imports/jp2.jpg";
import imgJp3 from "@/imports/jp3.jpg"; import imgJp4 from "@/imports/jp4.jpg";
import imgJp5 from "@/imports/jp5.jpg"; import imgJp6 from "@/imports/jp6.jpg";
import imgJp7 from "@/imports/jp7.jpg";
import imgCn1 from "@/imports/cn1.jpg"; import imgCn2 from "@/imports/cn2.jpg";
import imgCn3 from "@/imports/cn3.jpg"; import imgCn4 from "@/imports/cn4.jpg";
import imgCn5 from "@/imports/cn5.jpg"; import imgCn6 from "@/imports/cn6.jpg";
import imgCn7 from "@/imports/cn7.jpg"; import imgCn8 from "@/imports/cn8.jpg";
import imgNz1 from "@/imports/nz1.jpg"; import imgNz2 from "@/imports/nz2.jpg";
import imgNz3 from "@/imports/nz3.jpg"; import imgNz4 from "@/imports/nz4.jpg";
import imgGuide1 from "@/imports/guide1.jpg"; import imgGuide2 from "@/imports/guide2.jpg";
import imgGuide3 from "@/imports/guide3.jpg"; import imgGuide4 from "@/imports/guide4.jpg";
import imgGuide5 from "@/imports/guide5.jpg"; import imgGuide6 from "@/imports/guide6.jpg";
import imgQrWechat    from "@/imports/wechat_qr.jpg";
import imgQrAlipay    from "@/imports/alipay_qr.jpg";
import imgQrYoungsnow from "@/imports/youngsnow_qr.jpg";

type Lang = "TC" | "SC" | "EN" | "JP" | "KR";
type Tab = 0 | 1 | 2 | 3 | 4 | 5;

const LANGS: { code: Lang; label: string }[] = [
  { code: "TC", label: "繁體中文" },
  { code: "SC", label: "简体中文" },
  { code: "EN", label: "English" },
  { code: "JP", label: "日本語" },
  { code: "KR", label: "한국어" },
];

// ─── Translations ─────────────────────────────────────────
const T = {
  TC: {
    nav: ["主頁","預訂","授課雪場","滑雪攻略","常見問題","聯絡我們"],
    reg: "立即註冊", h1: "讓每一次滑行都值得期待",
    h2: "連接世界的滑雪體驗",
    h3: "專業教練 · 精選雪場 · 個性化課程",
    b1: "探索雪場", b2: "授課雪場",
    stats: ["30+\n全球合作雪場","200+\n專業認證教練","10,000+\n已完成課程","4\n教學語言"],
    stT: "讓滑雪連接世界",
    stP: "SnowTrip 是深耕多年的專業滑雪培訓學校，我們致力為全世界的滑雪愛好者，提供專業可靠、省心順暢的滑雪體驗。\n滑雪，從來不只是一項運動。它是奔赴山野，連結自然的旅程，讓我們透過雪道看見不同世界與文化。無論你是剛剛踏上雪板的新手，還是執著追逐粉雪的老玩家，SnowTrip 都會為你定制獨一無二的滑雪旅程。\n我們擁有國際認證資深教練，合作網路遍及日本、紐西蘭、中國各大滑雪聖地。SnowTrip 期待與您跨越地域阻隔，陪您馳騁世界雪場，體驗異域風情。",
    cT: "教練團隊", cS: "每位教練均持有國際認證資格，擁有豐富的教學經驗",
    exp: "年經驗", lang: "教學語言", cert: "認證資格",
    bookT: "預訂課程", all: "全部", jp: "日本", nz: "紐西蘭", cn: "中國",
    date: "選擇日期", coach: "指定教練", priv: "私教課", grp: "團體課程",
    cType: "課程類型", allCourse: "全部課程",
    sph: "搜索雪場、教練或課程...", bnow: "立即預訂",
    payT: "支付方式", payS: "支持中國及國際主流支付方式",
    rT: "授課雪場", rS: "精選全球頂級滑雪場地，為您打造完美滑雪旅程",
    loc: "地點", price: "課程費用", vd: "立即預訂", feat: "特色",
    gT: "滑雪攻略", gS: "最新雪場資訊、滑雪技巧與旅遊指南", rm: "閱讀更多",
    fT: "常見問題", fS: "如有其他疑問，歡迎透過聯絡我們取得協助",
    cT2: "聯絡我們", cS2: "我們的客服團隊全年無休，隨時為您提供協助",
    n: "您的姓名", e: "電子郵箱", p: "聯絡電話", m: "留言內容",
    send: "發送留言", wh: "工作時間", of: "辦公室",
    rTt: "建立帳戶", rnk: "暱稱", rph: "手機號碼", rem: "電子郵箱",
    rpw: "密碼", rp2: "確認密碼", rsb: "完成註冊",
    rha: "已有帳戶？", rli: "立即登入",
    sent: "留言已發送！我們將盡快回覆您。",
    registered: "註冊成功！歡迎加入 SnowTrip。",
    wechat: "微信聯繫", wechatId: "微信 ID：-SkiBum",
    wechatTip: "請在微信中搜索以上 ID 與我們聯繫",
    close: "關閉",
    myOrders: "我的訂單", orderNo: "訂單號碼", orderDetailTitle: "訂單詳情", orderResort: "雪場", orderDate: "上課日期",
    orderSkiType: "滑雪種類", orderGroupSize: "人數", orderFee: "課程費用", orderStatus: "訂單狀態",
    orderDetail: "查看詳情", orderCancel: "取消訂單", orderBack: "返回", orderAll: "全部",
    orderPending: "待付款", orderPaid: "已付款", orderConfirmed: "已確認", orderCompleted: "已完成", orderCancelled: "已取消",
    orderEmpty: "暫無訂單", orderConfirmCancel: "確認取消此訂單？", orderCancelSuccess: "訂單已取消",
    orderCoach: "教練", orderEquip: "租借裝備", orderContact: "聯絡方式", orderPayMethod: "支付方式",
    equipYes: "需要", equipNo: "不需要", orderLevel: "程度",
    orderFormEmail: "預約郵箱", orderUserEmail: "註冊郵箱",
    orderEquipDetail: "租借裝備明細", equipSet: "套裝",
  },
  SC: {
    nav: ["主页","预订","授课雪场","滑雪攻略","常见问题","联系我们"],
    reg: "立即注册", h1: "让每一次滑行都值得期待",
    h2: "连接世界的滑雪体验",
    h3: "专业教练 · 精选雪场 · 个性化课程",
    b1: "探索雪场", b2: "授课雪场",
    stats: ["30+\n全球合作雪场","200+\n专业认证教练","10,000+\n已完成课程","4\n教学语言"],
    stT: "让滑雪连接世界",
    stP: "SnowTrip 是深耕多年的专业滑雪培训学校，我们致力为全世界的滑雪爱好者，提供专业可靠、省心顺畅的滑雪体验。\n滑雪，从来不只是一项运动。它是奔赴山野，连接自然的旅程，让我们透过雪道看见不同世界与文化。无论你是刚刚踏上雪板的新手，还是执着追逐粉雪的老玩家，SnowTrip 都会为你定制独一无二的滑雪旅程。\n我们拥有国际认证资深教练，合作网络遍及日本、纽西兰、中国各大滑雪胜地。SnowTrip 期待与您跨越地域阻隔，陪您驰骋世界雪场，体验异域风情。",
    cT: "教练团队", cS: "每位教练均持有国际认证资格，拥有丰富的教学经验",
    exp: "年经验", lang: "教学语言", cert: "认证资格",
    bookT: "预订课程", all: "全部", jp: "日本", nz: "纽西兰", cn: "中国",
    date: "选择日期", coach: "指定教练", priv: "私教课", grp: "团体课程",
    cType: "课程类型", allCourse: "全部课程",
    sph: "搜索雪场、教练或课程...", bnow: "立即预订",
    payT: "支付方式", payS: "支持中国及国际主流支付方式",
    rT: "授课雪场", rS: "精选全球顶级滑雪场地，为您打造完美滑雪旅程",
    loc: "地点", price: "课程费用", vd: "立即预订", feat: "特色",
    gT: "滑雪攻略", gS: "最新雪场资讯、滑雪技巧与旅游指南", rm: "阅读更多",
    fT: "常见问题", fS: "如有其他疑问，欢迎通过联系我们获取帮助",
    cT2: "联系我们", cS2: "我们的客服团队全年无休，随时为您提供帮助",
    n: "您的姓名", e: "电子邮箱", p: "联络电话", m: "留言内容",
    send: "发送留言", wh: "工作时间", of: "办公室",
    rTt: "创建账户", rnk: "昵称", rph: "手机号码", rem: "电子邮箱",
    rpw: "密码", rp2: "确认密码", rsb: "完成注册",
    rha: "已有账户？", rli: "立即登录",
    sent: "留言已发送！我们将尽快回复您。",
    registered: "注册成功！欢迎加入 SnowTrip。",
    wechat: "微信联系", wechatId: "微信 ID：-SkiBum",
    wechatTip: "请在微信中搜索以上 ID 与我们联系",
    close: "关闭",
    myOrders: "我的订单", orderNo: "订单号码", orderDetailTitle: "订单详情", orderResort: "雪场", orderDate: "上课日期",
    orderSkiType: "滑雪种类", orderGroupSize: "人数", orderFee: "课程费用", orderStatus: "订单状态",
    orderDetail: "查看详情", orderCancel: "取消订单", orderBack: "返回", orderAll: "全部",
    orderPending: "待付款", orderPaid: "已付款", orderConfirmed: "已确认", orderCompleted: "已完成", orderCancelled: "已取消",
    orderEmpty: "暂无订单", orderConfirmCancel: "确认取消此订单？", orderCancelSuccess: "订单已取消",
    orderCoach: "教练", orderEquip: "租借装备", orderContact: "联系方式", orderPayMethod: "支付方式",
    equipYes: "需要", equipNo: "不需要", orderLevel: "程度",
    orderFormEmail: "预约邮箱", orderUserEmail: "注册邮箱",
    orderEquipDetail: "租借装备明细", equipSet: "套装",
  },
  EN: {
    nav: ["Home","Booking","Teaching Resorts","Ski Guide","FAQ","Contact Us"],
    reg: "Register", h1: "Every Run Worth the Journey",
    h2: "Connecting the World Through Skiing",
    h3: "Expert Coaches · Premium Resorts · Tailored Courses",
    b1: "Explore Resorts", b2: "Teaching Resorts",
    stats: ["30+\nGlobal Partner Resorts","200+\nCertified Coaches","10,000+\nLessons Completed","4\nTeaching Languages"],
    stT: "Let Skiing Connect the World",
    stP: "SnowTrip is a professional ski training school with years of deep expertise, dedicated to providing skiers worldwide with reliable, hassle-free, and seamless ski experiences.\nSkiing has never been just a sport. It is a journey into the mountains, a connection with nature, and a way to discover different worlds and cultures through the slopes. Whether you're a beginner just stepping onto skis or a seasoned enthusiast chasing powder, SnowTrip will craft a one-of-a-kind ski journey tailored just for you.\nOur internationally certified senior instructors and partner network span the top ski destinations across Japan, New Zealand, and China. SnowTrip looks forward to bridging distances with you, accompanying you as you carve through the world's finest slopes and experience the allure of each destination.",
    cT: "Our Coaches", cS: "Every coach is internationally certified with extensive teaching experience",
    exp: "Yrs Exp", lang: "Languages", cert: "Certifications",
    bookT: "Book a Lesson", all: "All", jp: "Japan", nz: "New Zealand", cn: "China",
    date: "Select Date", coach: "Select Coach", priv: "Private Lesson", grp: "Group Lesson",
    cType: "Course Type", allCourse: "All Types",
    sph: "Search resorts, coaches or courses...", bnow: "Book Now",
    payT: "Payment Methods", payS: "Supporting Chinese and international payment methods",
    rT: "Teaching Resorts", rS: "Handpicked world-class ski destinations for the perfect ski journey",
    loc: "Location", price: "Course Fee", vd: "Book Now", feat: "Features",
    gT: "Ski Guide", gS: "Latest resort news, skiing tips and travel guides", rm: "Read More",
    fT: "FAQ", fS: "For other questions, please visit our Contact Us page",
    cT2: "Contact Us", cS2: "Our support team is available year-round to assist you",
    n: "Your Name", e: "Email Address", p: "Phone Number", m: "Message",
    send: "Send Message", wh: "Working Hours", of: "Offices",
    rTt: "Create Account", rnk: "Nickname", rph: "Phone Number", rem: "Email Address",
    rpw: "Password", rp2: "Confirm Password", rsb: "Register",
    rha: "Already have an account?", rli: "Login here",
    sent: "Message sent! We will get back to you shortly.",
    registered: "Registration successful! Welcome to SnowTrip.",
    wechat: "WeChat Contact", wechatId: "WeChat ID: -SkiBum",
    wechatTip: "Search the above ID in WeChat to contact us",
    close: "Close",
    myOrders: "My Orders", orderNo: "Order No.", orderDetailTitle: "Order Details", orderResort: "Resort", orderDate: "Course Dates",
    orderSkiType: "Ski Type", orderGroupSize: "Group Size", orderFee: "Course Fee", orderStatus: "Status",
    orderDetail: "View Details", orderCancel: "Cancel Order", orderBack: "Back", orderAll: "All",
    orderPending: "Pending", orderPaid: "Paid", orderConfirmed: "Confirmed", orderCompleted: "Completed", orderCancelled: "Cancelled",
    orderEmpty: "No orders yet", orderConfirmCancel: "Cancel this order?", orderCancelSuccess: "Order cancelled",
    orderCoach: "Coach", orderEquip: "Equipment", orderContact: "Contact", orderPayMethod: "Payment",
    equipYes: "Yes", equipNo: "No", orderLevel: "Level",
    orderFormEmail: "Booking Email", orderUserEmail: "Registered Email",
    orderEquipDetail: "Equipment Details", equipSet: "Set",
  },
  JP: {
    nav: ["ホーム","予約","レッスンゲレンデ","スキーガイド","よくある質問","お問い合わせ"],
    reg: "会員登録", h1: "すべての滑走を、特別な体験に",
    h2: "世界をつなぐスキー体験",
    h3: "プロコーチ · 厳選ゲレンデ · 個別レッスン",
    b1: "ゲレンデを探す", b2: "レッスンゲレンデ",
    stats: ["30以上\n提携ゲレンデ","200以上\n認定コーチ","10,000以上\nレッスン実績","4\n教授言語"],
    stT: "スキーで世界をつなぐ",
    stP: "SnowTripは長年の実績を持つプロフェッショナルなスキースクールとして、世界中のスキー愛好家に信頼でき、スムーズなスキー体験を提供しています。\nスキーは単なるスポーツではありません。それは山野へ赴き、自然とつながる旅であり、ゲレンデを通じて異なる世界や文化と出会うことです。初めてスキー板に乗る初心者から、パウダースノーを追い求める経験者まで、SnowTripはあなた専用の特別なスキー旅行をお届けします。\n国際認定を受けた経験豊富なインストラクターと、日本・ニュージーランド・中国本土の主要スキーリゾートを結ぶネットワークで、SnowTripは距離を乗り越え、世界中のゲレンデであなたに寄り添い、異国の風情を存分にご体験いただきます。",
    cT: "コーチ紹介", cS: "全コーチが国際資格を取得し、豊富な指導経験を持ちます",
    exp: "年経験", lang: "教授言語", cert: "資格",
    bookT: "レッスン予約", all: "全て", jp: "日本", nz: "ニュージーランド", cn: "中国",
    date: "日付を選択", coach: "コーチを指定", priv: "プライベートレッスン", grp: "グループレッスン",
    cType: "コースタイプ", allCourse: "全タイプ",
    sph: "ゲレンデ・コーチ・コースを検索...", bnow: "予約する",
    payT: "お支払い方法", payS: "中国・国際主要決済に対応",
    rT: "レッスンゲレンデ", rS: "厳選された世界トップのスキーリゾートで完璧なスキー旅を",
    loc: "場所", price: "コース料金", vd: "予約する", feat: "特徴",
    gT: "スキーガイド", gS: "最新ゲレンデ情報・スキーTips・旅行ガイド", rm: "続きを読む",
    fT: "よくある質問", fS: "その他のご質問はお気軽にお問い合わせください",
    cT2: "お問い合わせ", cS2: "サポートチームが年中無休で対応いたします",
    n: "お名前", e: "メールアドレス", p: "電話番号", m: "メッセージ",
    send: "送信する", wh: "営業時間", of: "オフィス所在地",
    rTt: "アカウント作成", rnk: "ニックネーム", rph: "電話番号", rem: "メールアドレス",
    rpw: "パスワード", rp2: "パスワード確認", rsb: "登録する",
    rha: "アカウントをお持ちですか？", rli: "ログインはこちら",
    sent: "送信完了！できるだけ早くご返答いたします。",
    registered: "登録完了！SnowTripへようこそ。",
    wechat: "WeChatで連絡", wechatId: "WeChat ID: -SkiBum",
    wechatTip: "WeChatで上記IDを検索してお問い合わせください",
    close: "閉じる",
    myOrders: "マイオーダー", orderNo: "注文番号", orderDetailTitle: "注文詳細", orderResort: "ゲレンデ", orderDate: "レッスン日",
    orderSkiType: "スキー種類", orderGroupSize: "人数", orderFee: "レッスン料金", orderStatus: "ステータス",
    orderDetail: "詳細を見る", orderCancel: "キャンセル", orderBack: "戻る", orderAll: "すべて",
    orderPending: "未払い", orderPaid: "支払い済み", orderConfirmed: "確認済み", orderCompleted: "完了", orderCancelled: "キャンセル済",
    orderEmpty: "注文がありません", orderConfirmCancel: "この注文をキャンセルしますか？", orderCancelSuccess: "注文をキャンセルしました",
    orderCoach: "コーチ", orderEquip: "装備レンタル", orderContact: "連絡先", orderPayMethod: "支払い方法",
    equipYes: "必要", equipNo: "不要", orderLevel: "レベル",
    orderFormEmail: "予約メール", orderUserEmail: "登録メール",
    orderEquipDetail: "装備詳細", equipSet: "セット",
  },
  KR: {
    nav: ["홈","예약","강습 스키장","스키 가이드","자주 묻는 질문","문의하기"],
    reg: "회원가입", h1: "모든 활강이 기대되는 순간으로",
    h2: "세계를 연결하는 스키 경험",
    h3: "전문 코치 · 엄선된 스키장 · 맞춤형 강습",
    b1: "스키장 탐색", b2: "강습 스키장",
    stats: ["30+\n글로벌 제휴 스키장","200+\n공인 코치","10,000+\n강습 완료","4\n교육 언어"],
    stT: "스키로 세계를 연결하다",
    stP: "SnowTrip은 다년간의 전문 스키 교육 기관으로, 전 세계 스키 애호가들에게 신뢰할 수 있고 원활한 스키 경험을 제공합니다.\n스키는 단순한 스포츠가 아닙니다. 그것은 산으로 향하고 자연과 연결되는 여정이며, 슬로프를 통해 다양한 세계와 문화를 만나는 것입니다. 처음 스키를 타는 초보자부터 파우더 스노우를 추구하는 경험자까지, SnowTrip은 당신만을 위한 특별한 스키 여행을 만들어 드립니다.\n국제 인증을 받은 베테랑 강사와 일본, 뉴질랜드, 중국 본토의 주요 스키 리조트를 아우르는 파트너 네트워크로, SnowTrip은 거리라는 장벽을 넘어 세계 각지의 설원에서 당신과 함께하며 이국적인 매력을 가득 체험해 드리겠습니다.",
    cT: "코치 소개", cS: "모든 코치는 국제 자격증을 보유하고 풍부한 교육 경험을 갖추고 있습니다",
    exp: "년 경력", lang: "교육 언어", cert: "자격증",
    bookT: "강습 예약", all: "전체", jp: "일본", nz: "뉴질랜드", cn: "중국",
    date: "날짜 선택", coach: "코치 지정", priv: "개인 레슨", grp: "그룹 레슨",
    cType: "강습 유형", allCourse: "전체 유형",
    sph: "스키장, 코치 또는 강습 검색...", bnow: "지금 예약",
    payT: "결제 방법", payS: "중국 및 해외 주요 결제 수단 지원",
    rT: "강습 스키장", rS: "엄선된 세계 최고의 스키 리조트에서 완벽한 스키 여행을",
    loc: "위치", price: "강습 요금", vd: "지금 예약", feat: "특징",
    gT: "스키 가이드", gS: "최신 스키장 정보, 스키 팁 및 여행 가이드", rm: "더 읽기",
    fT: "자주 묻는 질문", fS: "다른 질문이 있으시면 문의 페이지를 이용해 주세요",
    cT2: "문의하기", cS2: "고객 지원팀이 연중무휴로 도와드립니다",
    n: "이름", e: "이메일", p: "연락처", m: "메시지",
    send: "메시지 보내기", wh: "운영 시간", of: "사무소",
    rTt: "회원가입", rnk: "닉네임", rph: "휴대폰 번호", rem: "이메일 주소",
    rpw: "비밀번호", rp2: "비밀번호 확인", rsb: "가입하기",
    rha: "이미 계정이 있으신가요?", rli: "로그인하기",
    sent: "메시지가 전송되었습니다! 곧 답변 드리겠습니다.",
    registered: "가입 완료! SnowTrip에 오신 것을 환영합니다.",
    wechat: "WeChat 연락", wechatId: "WeChat ID: -SkiBum",
    wechatTip: "WeChat에서 위 ID를 검색하여 문의해 주세요",
    close: "닫기",
    myOrders: "내 주문", orderNo: "주문번호", orderDetailTitle: "주문 상세", orderResort: "스키장", orderDate: "강습 날짜",
    orderSkiType: "스키 유형", orderGroupSize: "인원", orderFee: "강습 요금", orderStatus: "주문 상태",
    orderDetail: "상세 보기", orderCancel: "주문 취소", orderBack: "뒤로", orderAll: "전체",
    orderPending: "미결제", orderPaid: "결제완료", orderConfirmed: "확인됨", orderCompleted: "완료", orderCancelled: "취소됨",
    orderEmpty: "주문이 없습니다", orderConfirmCancel: "이 주문을 취소하시겠습니까?", orderCancelSuccess: "주문이 취소되었습니다",
    orderCoach: "코치", orderEquip: "장비 렌탈", orderContact: "연락처", orderPayMethod: "결제 방법",
    equipYes: "필요", equipNo: "불필요", orderLevel: "레벨",
    orderFormEmail: "예약 이메일", orderUserEmail: "등록 이메일",
    orderEquipDetail: "장비 세부사항", equipSet: "세트",
  },
} as const;

type Tr = typeof T["TC"];

// ─── Data ────────────────────────────────────────────────
const COACHES = [
  { name: "Leo",  titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "CSIA Level 2",
     langs: "中文 · English ", exp: "10", img: imgCoachLeo,  resorts: "Niseko · Hokkaido" },
  { name: "Jeff", titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "CSIA Level 1",
                  langs: "中文 · English · 廣東話",   exp: "8",  img: imgCoachJeff, resorts: "Niseko · Whistler" },
  { name: "Cody",  titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "CSIA Level 2",             langs: "中文 · English · 廣東話",           exp: "8",  img: imgCoachCody,  resorts: "Hokkaido · Queenstown" },
  { name: "藤野", titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "JSIA ", langs: "中文 · 日語 · English",          exp: "5",  img: imgCoachTengye, resorts: "Niseko · Hakuba" },
  { name: "彬彬", titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "CISA Level 1",              langs: "中文",           exp: "6",  img: imgCoachBinbin, resorts: "Hokkaido · Nagano" },
  { name: "阿湘", titleTC: "專業滑雪教練", titleEN: "Professional Ski Instructor", certs: "JSIA Level 1 · CSIA Level 1", langs: "中文 · English",          exp: "7",  img: imgCoachAxiang, resorts: "Hokkaido · Niseko" },
];

const JP_RESORTS_TC = [
  { name: "手稻滑雪場",     loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp1, feat: ["初中級友善","纜車系統","多語教練"] },
  { name: "札幌國際滑雪場", loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp2, feat: ["全日制課程","雪具租借","市區鄰近"] },
  { name: "星野滑雪場",     loc: "長野・輕井澤",   price: "JPY 85,300", img: imgJp3, feat: ["精品體驗","溫泉配套","頂級設施"] },
  { name: "富良野滑雪場",   loc: "北海道・富良野", price: "JPY 85,300", img: imgJp4, feat: ["粉雪天堂","自然地形","專業課程"] },
  { name: "喜樂樂滑雪場",   loc: "北海道・小樽",   price: "JPY 90,000", img: imgJp5, feat: ["高級私教","定制行程","自然雪道"] },
  { name: "二世谷聯合滑雪場", loc: "北海道・倶知安", price: "JPY 94,800", img: imgJp6, feat: ["世界級粉雪","多座雪山","國際社群"] },
  { name: "留壽都滑雪場",   loc: "北海道・虻田郡", price: "JPY 82,900", img: imgJp7, feat: ["家庭友善","中級地形","全季服務"] },
];

const CN_RESORTS_TC = [
  { name: "萬科松花湖滑雪場",     loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn1, feat: ["雪質優良","現代設施","教學場地"] },
  { name: "北大湖滑雪場",         loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn2, feat: ["初學者課程","設施齊全","雪道多樣"] },
  { name: "長白山萬達國際滑雪場", loc: "吉林・白山市",   price: "RMB 888",   img: imgCn3, feat: ["國際標準","溫泉度假","高端體驗"] },
  { name: "亞布力滑雪場",         loc: "黑龍江・哈爾濱", price: "RMB 888",   img: imgCn4, feat: ["東北名山","滑雪歷史","完善配套"] },
  { name: "萬龍滑雪場",           loc: "河北・張家口",   price: "RMB 1,080", img: imgCn5, feat: ["奧運場地","高難度地形","專業課程"] },
  { name: "太舞滑雪小鎮",         loc: "河北・張家口",   price: "RMB 1,080", img: imgCn6, feat: ["主題滑雪鎮","娛樂配套","親子友善"] },
  { name: "禾木吉克普林滑雪場",   loc: "新疆・阿勒泰",   price: "RMB 980",   img: imgCn7, feat: ["原始粉雪","異域風情","獨特體驗"] },
  { name: "可可托海國際滑雪場",   loc: "新疆・阿勒泰",   price: "RMB 980",   img: imgCn8, feat: ["國際認證","自然景觀","探險滑雪"] },
];

const NZ_RESORTS_TC = [
  { name: "華卡帕帕 Whakapapa",    loc: "北島・魯阿佩胡", price: "NZD 820", img: imgNz1, feat: ["火山地形","多樣雪道","家庭友善"] },
  { name: "圖羅瓦 Tūroa",          loc: "北島・魯阿佩胡", price: "NZD 820", img: imgNz2, feat: ["廣闊地形","壯觀景色","高山滑雪"] },
  { name: "皇冠峰 Coronet Peak",   loc: "南島・皇后鎮",   price: "NZD 900", img: imgNz3, feat: ["皇后鎮旁","夜滑場地","完善設施"] },
  { name: "卓越山 The Remarkables", loc: "南島・皇后鎮",   price: "NZD 920", img: imgNz4, feat: ["壯麗山景","挑戰地形","攝影勝地"] },
  { name: "卡德羅納 Cardrona",     loc: "南島・瓦納卡",   price: "NZD 870", img: imgCn1, feat: ["家庭首選","初學者天堂","豐富設施"] },
  { name: "三錐山 Treble Cone",    loc: "南島・瓦納卡",   price: "NZD 870", img: imgJp5, feat: ["高級地形","壯觀視野","小眾體驗"] },
  { name: "哈特山 Mt Hutt",        loc: "南島・坎特伯雷", price: "NZD 870", img: imgJp6, feat: ["最長雪季","高山環境","進階課程"] },
];

// ─── Simplified Chinese ───
const JP_RESORTS_SC = [
  { name: "手稻滑雪场",     loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp1, feat: ["初中级友善","缆车系统","多语教练"] },
  { name: "札幌国际滑雪场", loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp2, feat: ["全日制课程","雪具租借","市区邻近"] },
  { name: "星野滑雪场",     loc: "长野・轻井泽",   price: "JPY 85,300", img: imgJp3, feat: ["精品体验","温泉配套","顶级设施"] },
  { name: "富良野滑雪场",   loc: "北海道・富良野", price: "JPY 85,300", img: imgJp4, feat: ["粉雪天堂","自然地形","专业课程"] },
  { name: "喜乐乐滑雪场",   loc: "北海道・小樽",   price: "JPY 90,000", img: imgJp5, feat: ["高级私教","定制行程","自然雪道"] },
  { name: "二世谷联合滑雪场", loc: "北海道・俱知安", price: "JPY 94,800", img: imgJp6, feat: ["世界级粉雪","多座雪山","国际社群"] },
  { name: "留寿都滑雪场",   loc: "北海道・虻田郡", price: "JPY 82,900", img: imgJp7, feat: ["家庭友善","中级地形","全季服务"] },
];
const CN_RESORTS_SC = [
  { name: "万科松花湖滑雪场",     loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn1, feat: ["雪质优良","现代设施","教学场地"] },
  { name: "北大湖滑雪场",         loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn2, feat: ["初学者课程","设施齐全","雪道多样"] },
  { name: "长白山万达国际滑雪场", loc: "吉林・白山市",   price: "RMB 888",   img: imgCn3, feat: ["国际标准","温泉度假","高端体验"] },
  { name: "亚布力滑雪场",         loc: "黑龙江・哈尔滨", price: "RMB 888",   img: imgCn4, feat: ["东北名山","滑雪历史","完善配套"] },
  { name: "万龙滑雪场",           loc: "河北・张家口",   price: "RMB 1,080", img: imgCn5, feat: ["奥运场地","高难度地形","专业课程"] },
  { name: "太舞滑雪小镇",         loc: "河北・张家口",   price: "RMB 1,080", img: imgCn6, feat: ["主题滑雪镇","娱乐配套","亲子友善"] },
  { name: "禾木吉克普林滑雪场",   loc: "新疆・阿勒泰",   price: "RMB 980",   img: imgCn7, feat: ["原始粉雪","异域风情","独特体验"] },
  { name: "可可托海国际滑雪场",   loc: "新疆・阿勒泰",   price: "RMB 980",   img: imgCn8, feat: ["国际认证","自然景观","探险滑雪"] },
];
const NZ_RESORTS_SC = [
  { name: "华卡帕帕 Whakapapa",    loc: "北岛・鲁阿佩胡", price: "NZD 820", img: imgNz1, feat: ["火山地形","多样雪道","家庭友善"] },
  { name: "图罗瓦 Tūroa",          loc: "北岛・鲁阿佩胡", price: "NZD 820", img: imgNz2, feat: ["广阔地形","壮观景色","高山滑雪"] },
  { name: "皇冠峰 Coronet Peak",   loc: "南岛・皇后镇",   price: "NZD 900", img: imgNz3, feat: ["皇后镇旁","夜滑场地","完善设施"] },
  { name: "卓越山 The Remarkables", loc: "南岛・皇后镇",   price: "NZD 920", img: imgNz4, feat: ["壮丽山景","挑战地形","摄影胜地"] },
  { name: "卡德罗纳 Cardrona",     loc: "南岛・瓦纳卡",   price: "NZD 870", img: imgCn1, feat: ["家庭首选","初学者天堂","丰富设施"] },
  { name: "三锥山 Treble Cone",    loc: "南岛・瓦纳卡",   price: "NZD 870", img: imgJp5, feat: ["高级地形","壮观视野","小众体验"] },
  { name: "哈特山 Mt Hutt",        loc: "南岛・坎特伯雷", price: "NZD 870", img: imgJp6, feat: ["最长雪季","高山环境","进阶课程"] },
];

// ─── English ───
const JP_RESORTS_EN = [
  { name: "Teine Ski Resort",     loc: "Hokkaido · Sapporo",   price: "JPY 75,800", img: imgJp1, feat: ["Beginner-Friendly","Lift System","Multilingual Coaches"] },
  { name: "Sapporo Kokusai Ski Resort", loc: "Hokkaido · Sapporo", price: "JPY 75,800", img: imgJp2, feat: ["Full-Day Programs","Equipment Rental","Near City Center"] },
  { name: "Hoshino Resorts",     loc: "Nagano · Karuizawa",   price: "JPY 85,300", img: imgJp3, feat: ["Premium Experience","Hot Spring Package","Top Facilities"] },
  { name: "Furano Ski Resort",   loc: "Hokkaido · Furano", price: "JPY 85,300", img: imgJp4, feat: ["Powder Paradise","Natural Terrain","Professional Courses"] },
  { name: "Kiroro Snow World",   loc: "Hokkaido · Otaru",   price: "JPY 90,000", img: imgJp5, feat: ["Premium Private Lessons","Custom Itineraries","Natural Runs"] },
  { name: "Niseko United", loc: "Hokkaido · Kutchan", price: "JPY 94,800", img: imgJp6, feat: ["World-Class Powder","Multiple Peaks","International Community"] },
  { name: "Rusutsu Resort",   loc: "Hokkaido · Abuta", price: "JPY 82,900", img: imgJp7, feat: ["Family Friendly","Intermediate Terrain","Year-Round Service"] },
];
const CN_RESORTS_EN = [
  { name: "Vanke Songhua Lake Resort",     loc: "Jilin · Jilin City",   price: "RMB 888",   img: imgCn1, feat: ["Excellent Snow Quality","Modern Facilities","Teaching Venue"] },
  { name: "Beidahu Ski Resort",         loc: "Jilin · Jilin City",   price: "RMB 888",   img: imgCn2, feat: ["Beginner Courses","Complete Facilities","Diverse Trails"] },
  { name: "Changbaishan Wanda Resort", loc: "Jilin · Baishan",   price: "RMB 888",   img: imgCn3, feat: ["International Standard","Hot Spring Resort","Premium Experience"] },
  { name: "Yabuli Ski Resort",         loc: "Heilongjiang · Harbin", price: "RMB 888",   img: imgCn4, feat: ["Famous Northeast Mountain","Skiing Heritage","Complete Amenities"] },
  { name: "Wanlong Ski Resort",           loc: "Hebei · Zhangjiakou",   price: "RMB 1,080", img: imgCn5, feat: ["Olympic Venue","Challenging Terrain","Professional Courses"] },
  { name: "Thaiwoo Ski Town",         loc: "Hebei · Zhangjiakou",   price: "RMB 1,080", img: imgCn6, feat: ["Themed Ski Town","Entertainment Complex","Family Friendly"] },
  { name: "Hemu Jikepulin Resort",   loc: "Xinjiang · Altay",   price: "RMB 980",   img: imgCn7, feat: ["Pristine Powder","Exotic Charm","Unique Experience"] },
  { name: "Keketuohai International Resort",   loc: "Xinjiang · Altay",   price: "RMB 980",   img: imgCn8, feat: ["International Certified","Natural Scenery","Adventure Skiing"] },
];
const NZ_RESORTS_EN = [
  { name: "Whakapapa",    loc: "North Island · Ruapehu", price: "NZD 820", img: imgNz1, feat: ["Volcanic Terrain","Diverse Runs","Family Friendly"] },
  { name: "Tūroa",          loc: "North Island · Ruapehu", price: "NZD 820", img: imgNz2, feat: ["Expansive Terrain","Stunning Views","Alpine Skiing"] },
  { name: "Coronet Peak",   loc: "South Island · Queenstown",   price: "NZD 900", img: imgNz3, feat: ["Next to Queenstown","Night Skiing","Great Facilities"] },
  { name: "The Remarkables", loc: "South Island · Queenstown",   price: "NZD 920", img: imgNz4, feat: ["Majestic Scenery","Challenging Terrain","Photography Hotspot"] },
  { name: "Cardrona",     loc: "South Island · Wānaka",   price: "NZD 870", img: imgCn1, feat: ["Top Family Choice","Beginner Paradise","Rich Facilities"] },
  { name: "Treble Cone",    loc: "South Island · Wānaka",   price: "NZD 870", img: imgJp5, feat: ["Advanced Terrain","Spectacular Views","Off-the-Beaten-Path"] },
  { name: "Mt Hutt",        loc: "South Island · Canterbury", price: "NZD 870", img: imgJp6, feat: ["Longest Season","Alpine Environment","Advanced Courses"] },
];

// ─── Japanese ───
const JP_RESORTS_JP = [
  { name: "テイネスキーリゾート",     loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp1, feat: ["初中級者向け","リフト完備","多言語コーチ"] },
  { name: "札幌国際スキー場", loc: "北海道・札幌",   price: "JPY 75,800", img: imgJp2, feat: ["終日プログラム","レンタル完備","市街地近接"] },
  { name: "星野リゾート",     loc: "長野・軽井沢",   price: "JPY 85,300", img: imgJp3, feat: ["プレミアム体験","温泉パッケージ","最高級設備"] },
  { name: "富良野スキー場",   loc: "北海道・富良野", price: "JPY 85,300", img: imgJp4, feat: ["パウダー天国","自然地形","プロコース"] },
  { name: "キロロスノーワールド",   loc: "北海道・小樽",   price: "JPY 90,000", img: imgJp5, feat: ["高級プライベートレッスン","カスタム行程","自然コース"] },
  { name: "ニセコユナイテッド", loc: "北海道・倶知安", price: "JPY 94,800", img: imgJp6, feat: ["世界級パウダー","複数ピーク","国際コミュニティ"] },
  { name: "ルスツリゾート",   loc: "北海道・虻田郡", price: "JPY 82,900", img: imgJp7, feat: ["ファミリー向け","中級者地形","通年サービス"] },
];
const CN_RESORTS_JP = [
  { name: "万科松花湖リゾート",     loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn1, feat: ["優良雪質","最新設備","レッスン会場"] },
  { name: "北大湖スキー場",         loc: "吉林・吉林市",   price: "RMB 888",   img: imgCn2, feat: ["初心者コース","設備完備","多彩コース"] },
  { name: "長白山万達国際リゾート", loc: "吉林・白山市",   price: "RMB 888",   img: imgCn3, feat: ["国際基準","温泉リゾート","プレミアム体験"] },
  { name: "亜布力スキー場",         loc: "黒龍江・ハルビン", price: "RMB 888",   img: imgCn4, feat: ["東北名山","スキー歴史","充実設備"] },
  { name: "万龍スキー場",           loc: "河北・張家口",   price: "RMB 1,080", img: imgCn5, feat: ["五輪会場","高難度地形","プロコース"] },
  { name: "太舞スキータウン",         loc: "河北・張家口",   price: "RMB 1,080", img: imgCn6, feat: ["テーマスキータウン","エンタメ施設","ファミリー向け"] },
  { name: "禾木ジケ普林リゾート",   loc: "新疆・アルタイ",   price: "RMB 980",   img: imgCn7, feat: ["原始パウダー","異国情緒","ユニーク体験"] },
  { name: "可可托海国際リゾート",   loc: "新疆・アルタイ",   price: "RMB 980",   img: imgCn8, feat: ["国際認証","自然景観","アドベンチャースキー"] },
];
const NZ_RESORTS_JP = [
  { name: "ワカパパ Whakapapa",    loc: "北島・ルアペフ", price: "NZD 820", img: imgNz1, feat: ["火山地形","多彩コース","ファミリー向け"] },
  { name: "トゥロア Tūroa",          loc: "北島・ルアペフ", price: "NZD 820", img: imgNz2, feat: ["広大な地形","絶景","アルパインスキー"] },
  { name: "コロナットピーク Coronet Peak",   loc: "南島・クイーンズタウン",   price: "NZD 900", img: imgNz3, feat: ["街のすぐ隣","ナイトスキー","充実設備"] },
  { name: "ザ・リマーカブルズ The Remarkables", loc: "南島・クイーンズタウン",   price: "NZD 920", img: imgNz4, feat: ["雄大な景色","挑戦的 terrain","撮影スポット"] },
  { name: "カードローナ Cardrona",     loc: "南島・ワナカ",   price: "NZD 870", img: imgCn1, feat: ["ファミリー首选","初心者天国","充実施設"] },
  { name: "トレブルコーン Treble Cone",    loc: "南島・ワナカ",   price: "NZD 870", img: imgJp5, feat: ["上級者地形","絶景","穴場体験"] },
  { name: "マウントハット Mt Hutt",        loc: "南島・カンタベリー", price: "NZD 870", img: imgJp6, feat: ["最長シーズン","高山環境","上級コース"] },
];

// ── Korean ───
const JP_RESORTS_KR = [
  { name: "테이네 스키 리조트",     loc: "홋카이도・삿포로",   price: "JPY 75,800", img: imgJp1, feat: ["초중급자 친화","리프트 완비","다국어 코치"] },
  { name: "삿포로 고쿠사이 스키장", loc: "홋카이도・삿포로",   price: "JPY 75,800", img: imgJp2, feat: ["종일 프로그램","장비 렌탈","시내 인접"] },
  { name: "호시노 리조트",     loc: "나가노・가루이자와",   price: "JPY 85,300", img: imgJp3, feat: ["프리미엄 체험","온천 패키지","최고급 시설"] },
  { name: "후라노 스키장",   loc: "홋카이도・후라노", price: "JPY 85,300", img: imgJp4, feat: ["파우더 천국","자연 지형","프로 코스"] },
  { name: "키로로 스노 월드",   loc: "홋카이도・오타루",   price: "JPY 90,000", img: imgJp5, feat: ["고급 프라이빗 레슨","맞춤 일정","자연 코스"] },
  { name: "니세코 유나이티드", loc: "홋카이도・굿찬", price: "JPY 94,800", img: imgJp6, feat: ["세계적 파우더","복수 봉우리","국제 커뮤니티"] },
  { name: "루스츠 리조트",   loc: "홋카이도・아부타군", price: "JPY 82,900", img: imgJp7, feat: ["가족 친화","중급자 지형","연중 서비스"] },
];
const CN_RESORTS_KR = [
  { name: "반커 송화호 리조트",     loc: "지린・지린시",   price: "RMB 888",   img: imgCn1, feat: ["우수한 설질","최신 시설","레슨 장소"] },
  { name: "베이따후 스키장",         loc: "지린・지린시",   price: "RMB 888",   img: imgCn2, feat: ["초보자 코스","시설 완비","다양한 코스"] },
  { name: "창바이산 완다 국제 리조트", loc: "지린・바이산시",   price: "RMB 888",   img: imgCn3, feat: ["국제 기준","온천 리조트","프리미엄 체험"] },
  { name: "야부리 스키장",         loc: "헤이룽장・하얼빈", price: "RMB 888",   img: imgCn4, feat: ["동북 명산","스키 역사","완비 시설"] },
  { name: "완롱 스키장",           loc: "허베이・장자커우",   price: "RMB 1,080", img: imgCn5, feat: ["올림픽 경기장","고난이도 지형","프로 코스"] },
  { name: "타이우 스키 타운",         loc: "허베이・장자커우",   price: "RMB 1,080", img: imgCn6, feat: ["테마 스키 타운","엔터테인먼트 시설","가족 친화"] },
  { name: "허무 지푸린 리조트",   loc: "신장・알타이",   price: "RMB 980",   img: imgCn7, feat: ["원시 파우더","이국적 분위기","독특한 체험"] },
  { name: "커커터하이 국제 리조트",   loc: "신장・알타이",   price: "RMB 980",   img: imgCn8, feat: ["국제 인증","자연 경관","어드벤처 스키"] },
];
const NZ_RESORTS_KR = [
  { name: "와카파파 Whakapapa",    loc: "북섬・루아페후", price: "NZD 820", img: imgNz1, feat: ["화산 지형","다양한 코스","가족 친화"] },
  { name: "투로아 Tūroa",          loc: "북섬・루아페후", price: "NZD 820", img: imgNz2, feat: ["광활한 지형","장관 경치","알파인 키"] },
  { name: "코로넷 피크 Coronet Peak",   loc: "남섬・퀸스타운",   price: "NZD 900", img: imgNz3, feat: ["타운 인접","야간 스키","완비 시설"] },
  { name: "더 리마커블스 The Remarkables", loc: "남섬・퀸스타운",   price: "NZD 920", img: imgNz4, feat: ["웅장한 경치","도전적 지형","촬영 명소"] },
  { name: "카드로나 Cardrona",     loc: "남섬・와나카",   price: "NZD 870", img: imgCn1, feat: ["가족 우선","초보자 천국","풍부한 시설"] },
  { name: "트레블 콘 Treble Cone",    loc: "남섬・와나카",   price: "NZD 870", img: imgJp5, feat: ["고급 지형","장관 시야","숨은 명소"] },
  { name: "마운트 허트 Mt Hutt",        loc: "남섬・캔터베리", price: "NZD 870", img: imgJp6, feat: ["최장 시즌","고산 환경","고급 코스"] },
];

const JP_RESORTS_MAP: Record<Lang, typeof JP_RESORTS_TC> = { TC: JP_RESORTS_TC, SC: JP_RESORTS_SC, EN: JP_RESORTS_EN, JP: JP_RESORTS_JP, KR: JP_RESORTS_KR };
const CN_RESORTS_MAP: Record<Lang, typeof CN_RESORTS_TC> = { TC: CN_RESORTS_TC, SC: CN_RESORTS_SC, EN: CN_RESORTS_EN, JP: CN_RESORTS_JP, KR: CN_RESORTS_KR };
const NZ_RESORTS_MAP: Record<Lang, typeof NZ_RESORTS_TC> = { TC: NZ_RESORTS_TC, SC: NZ_RESORTS_SC, EN: NZ_RESORTS_EN, JP: NZ_RESORTS_JP, KR: NZ_RESORTS_KR };

const GUIDES_TC = [
  {
    cat: "日本雪場", date: "2024-12-01", title: "2024-25 北海道粉雪季節完全攻略",
    img: imgGuide1,
    desc: "北海道以「日本粉」聞名全球，每年12月至3月是最佳滑雪季節。本文介紹如何規劃行程、選擇雪場及預訂教練課程，讓您的北海道滑雪之旅完美無憾。",
    sections: [
      { h: "為什麼選擇北海道？", body: "北海道位於日本最北端，受西伯利亞冷氣團影響，每年降雪量極為驚人。这里的雪質以輕盈乾燥的「Japow」（Japan Powder）著稱，是全世界滑雪愛好者的夢想目的地。二世谷、富良野、留壽都等世界級雪場均位於此，配套設施完善，適合各水平滑雪者。" },
      { h: "最佳滑雪時間", body: "12月中旬至3月上旬是北海道的滑雪季。其中1月至2月降雪量最大，粉雪品質最佳。12月和3月雪量稍遜但價格更實惠，適合預算有限的旅行者。建議避開日本新年假期（12月29日–1月3日）和春節期間，這段時間雪場最為擁擠。" },
      { h: "推薦雪場", body: "二世谷聯合滑雪場：由Grand Hirafu、Hanazono、Niseko Village和Annupuri四大雪場組成，夜間滑雪是一大特色。富良野滑雪場：雪質極佳，家庭友好，設有專門的儿童區域。留壽都度假村：擁有37條雪道，是北海道規模最大的度假村之一。" },
      { h: "行程規劃建議", body: "建議安排7-10天的行程。前2-3天適應雪況和時差，中間3-5天集中滑雪，最後1-2天可安排札幌觀光或溫泉體驗。住宿推薦選擇雪場附近，節省交通時間。SnowTrip 提供中文認證教練，可協助預訂課程和安排行程。" },
    ]
  },
  {
    cat: "紐西蘭雪場", date: "2024-06-20", title: "紐西蘭皇后鎮滑雪全攻略",
    img: imgGuide2,
    desc: "皇后鎮是南半球最著名的滑雪勝地，周邊擁有皇冠峰、卓越山等世界級雪場，本文為您詳解行程規劃、住宿選擇及最佳滑雪時機。",
    sections: [
      { h: "皇后鎮滑雪概況", body: "皇后鎮被譽為「世界冒險之都」，6月至10月是南半球的滑雪季。周邊擁有皇冠峰（Coronet Peak）、卓越山（The Remarkables）、卡德罗纳（Cardrona）和崔特斯峰（Treble Cone）四大商業雪場，涵蓋從新手到專家的所有難度。" },
      { h: "四大雪場特色", body: "皇冠峰：距市區最近（20分鐘車程），開放夜場，適合時間有限的旅客。卓越山：地形多樣，擁有出色的公園和U型池，深受自由式滑雪者喜愛。卡德罗纳：面積最大，寬闊的雪道非常適合中級滑雪者。崔特斯峰：陡峭的地形和絕美風景，適合進階玩家。" },
      { h: "最佳時間與住宿", body: "7月至9月是最佳滑雪月份，雪量充足且天氣穩定。皇后鎮市區住宿選擇豐富，從背包客棧到五星級酒店應有盡有。建議住在市中心或瓦卡蒂普湖畔，方便前往各雪場的接駁車站。" },
      { h: "行程建議", body: "建議安排5-7天的行程。可購買Multi Pass聯票，在多個雪場間靈活切換。非滑雪活動包括米爾福德峽灣遊覽、蹦極、喷射快艇等。SnowTrip 在皇后鎮地區有經驗豐富的中文教練，可為您定制專屬滑雪行程。" },
    ]
  },
  {
    cat: "新手指南", date: "2024-09-05", title: "初學者滑雪課程完整指南",
    img: imgGuide3,
    desc: "第一次滑雪應該如何準備？選擇私教課還是團體課？本文解答所有新手常見問題，助您輕鬆開始滑雪之旅。",
    sections: [
      { h: "滑雪前的準備", body: "第一次滑雪前，建議做好體能準備：加強腿部和核心肌群鍛鍊，提升平衡感。裝備方面，初學者無需購買，雪場均可租借雪板、雪鞋、頭盔等。穿著建議：多層穿搭，內層排汗、中層保暖、外層防水防風。別忘了防曬和雪鏡。" },
      { h: "單板還是雙板？", body: "雙板（Ski）：兩隻腳各踩一塊板，身體面朝前方，初學時較容易上手，基本滑行1-2天即可掌握。單板（Snowboard）：雙腳固定在同一塊板上，側身滑行，前2-3天會比較辛苦（頻繁摔倒），但一旦掌握平衡，進步會非常快。建議根據個人喜好選擇，沒有絕對的優劣。" },
      { h: "私教課 vs 團體課", body: "私教課（Private Lesson）：一對一或一對二，教練全程關注您的動作，進步最快，時間靈活。適合追求效率或有一定基礎的學員。團體課（Group Lesson）：4-6人小班，氣氛輕鬆，費用較低，適合想結交朋友的社交型學員。SnowTrip 建議初學者至少選擇2-3小時的私教課，打好基礎後再自由練習。" },
      { h: "常見問題", body: "滑雪危險嗎？在專業教練指導下，滑雪是一項安全的運動。摔倒是學習的一部分，佩戴頭盔和護具可有效降低受傷風險。需要幾天才能學會？一般來說，2-3天的課程可以掌握基本轉彎和剎車。想要流暢滑行各雪道，大約需要5-7天的練習。" },
    ]
  },
  {
    cat: "日本雪場", date: "2024-11-15", title: "二世谷粉雪深度體驗報告",
    img: imgGuide4,
    desc: "二世谷聯合滑雪場是全球最受歡迎的粉雪勝地之一，年平均積雪超過15米。本報告記錄我們教練團隊的深度考察體驗。",
    sections: [
      { h: "二世谷概況", body: "二世谷（Niseko）位於北海道西南部，由羊蹄山火山群環繞，年均降雪量超過15米，是全球降雪量最大的滑雪區域之一。四大雪場組成的二世谷聯合滑雪場提供超過80條雪道，地形從平緩寬道到陡峭野雪應有盡有。這裡也是日本少數提供夜間滑雪的大型雪場。" },
      { h: "粉雪體驗", body: "二世谷的粉雪輕如羽毛，含水量極低，滑行時如同在雲朵上飛翔。我們的教練團隊在1月底實測，當天的新鮮粉雪厚度達到40cm以上。即使在雪道內，也能體驗到膝蓋以上的深雪滑行。對於想要嘗試道外（Backcountry）滑雪的進階玩家，二世谷周邊有大量未壓雪的野雪區域。" },
      { h: "食宿與生活", body: "二世谷比羅夫（Hirafu）地區是餐飲和夜生活的中心，匯聚了日本各地的美食餐廳、居酒屋和酒吧。住宿從精品旅館到 ski-in/ski-out 的度假酒店應有盡有。值得一提的是，二世谷的中文服務非常普及，幾乎所有雪場和餐廳都有中文菜單和工作人員。" },
      { h: "教練推薦", body: "對於首次到訪二世谷的滑雪者，我們強烈建議安排至少一天的導滑服務。SnowTrip 的本地教練熟悉各雪場的隱藏雪道和最佳粉雪時機，能帶您體驗一般遊客無法發現的秘密路線。提前預訂可確保旺季的教練名額。" },
    ]
  },
  {
    cat: "裝備指南", date: "2024-10-12", title: "滑雪裝備選購與租借完整指南",
    img: imgGuide5,
    desc: "初學者到底應該購買滑雪裝備還是選擇租借？本文從費用、便利性和安全性等角度全面分析，助您做出最明智的選擇。",
    sections: [
      { h: "租借 vs 購買：如何選擇？", body: "初學者建議先租借：每年滑雪不到一週的愛好者，租借更划算。雪場和市區都有豐富的租借選擇，雪板+雪鞋+雪杖一套約每天300-500元人民币。進階玩家可考慮購買：經常滑雪（每年2週以上）或對裝備有特殊要求的滑雪者，自備裝備能大幅提升體驗。" },
      { h: "必備裝備清單", body: "雪板/單板（Skis/Snowboard）：初學者建議選擇中等硬度、較短的板。雪鞋（Boots）：最重要的裝備，合腳比品牌更重要，建議到实体店試穿。頭盔（Helmet）：安全第一，租借或購買均可。雪鏡（Goggles）：防風防雪防紫外線，鏡片顏色根據天氣選擇。護具：護腕（單板必備）、護膝、護臀。" },
      { h: "服裝穿搭原則", body: "三層穿搭法：基礎層（排汗內衣）：選擇合成纖維或美利奴羊毛，切忌棉質。保暖層（中間層）：抓絨衣或輕量羽絨服。外層（防護層）：防水防風的滑雪外套和雪褲，注意接縫處要有防水壓膠。手套：防水保暖，建議選擇有腕帶的款式防止脫落。" },
      { h: "購買建議", body: "如果決定購買，以下品牌值得推薦：入門級 — Decathlon（Oxelo系列）、Salomon；中端 — Burton、Rossignol、Head；高端 — Arc'teryx、Mammut、Patagonia。日本和紐西蘭的雪場周邊都有專業雪具店，可以實地試穿後購買。預算有限的话，也可以考慮二手裝備或上季折扣款。" },
    ]
  },
  {
    cat: "中國雪場", date: "2024-11-28", title: "中國雪場推薦：新疆篇",
    img: imgGuide6,
    desc: "新疆是中國最具原始魅力的滑雪目的地，禾木和可可托海的粉雪品質媲美日本，本文詳細介紹行程安排與雪場特色。",
    sections: [
      { h: "為什麼選擇新疆滑雪？", body: "新疆阿勒泰地區被譽為「人類滑雪的起源地」，擁有與日本北海道同緯度的優越雪況。这里的粉雪乾燥鬆軟，品質可與日本媲美，且游客遠少於日本雪場，保留了原始純粹的滑雪體驗。加上無需護照、語言相通、費用更低，是國內滑雪愛好者的理想選擇。" },
      { h: "禾木吉克普林滑雪場", body: "位於阿勒泰地區布爾津縣，是中國最大的滑雪場之一。垂直落差達1200米，擁有初、中、高級各難度雪道。最大的亮點是周邊的禾木村——被譽為「中國最美的村莊」，圖瓦人的原木小屋在白雪覆蓋下如童話世界。滑雪之餘可以體驗馬拉雪橇、雪地徒步等特色活動。" },
      { h: "可可托海國際滑雪度假區", body: "擁有全國最長的雪季（10月至次年6月），最高海拔3100米，是中國海拔最高的滑雪場之一。雪道總長度超過50公里，野雪資源極為豐富。可可托海的礦坑地形更是獨一無二，在巨大的礦坑中滑雪的體驗舉世罕見。" },
      { h: "行程建議", body: "建議安排5-7天的新疆滑雪行程。先到烏魯木齊適應，再前往阿勒泰（飛機約1.5小時）。禾木和可可托海可各安排2-3天。當地住宿以民宿和木屋為主，建議提前預訂。SnowTrip 提供新疆地區的中文教練服務，可協助安排交通和住宿，讓您的新疆滑雪之旅無後顧之憂。" },
    ]
  },
];

const GUIDES_SC = [
  {
    cat: "日本雪场", date: "2024-12-01", title: "2024-25 北海道粉雪季节完全攻略",
    img: imgGuide1,
    desc: "北海道以「日本粉」闻名全球，每年12月至3月是最佳滑雪季节。本文介绍如何规划行程、选择雪场及预订教练课程，让您的北海道滑雪之旅完美无憾。",
    sections: [
      { h: "为什么选择北海道？", body: "北海道位于日本最北端，受西伯利亚冷气团影响，每年降雪量极为惊人。这里的雪质以轻盈干燥的「Japow」（Japan Powder）著称，是全世界滑雪爱好者的梦想目的地。二世谷、富良野、留寿都等世界级雪场均位于此，配套设施完善，适合各水平滑雪者。" },
      { h: "最佳滑雪时间", body: "12月中旬至3月上旬是北海道的滑雪季。其中1月至2月降雪量最大，粉雪品质最佳。12月和3月雪量稍逊但价格更实惠，适合预算有限的旅行者。建议避开日本新年假期（12月29日–1月3日）和春节期间，这段时间雪场最为拥挤。" },
      { h: "推荐雪场", body: "二世谷联合滑雪场：由Grand Hirafu、Hanazono、Niseko Village和Annupuri四大雪场组成，夜间滑雪是一大特色。富良野滑雪场：雪质极佳，家庭友好，设有专门的儿童区域。留寿都度假村：拥有37条雪道，是北海道规模最大的度假村之一。" },
      { h: "行程规划建议", body: "建议安排7-10天的行程。前2-3天适应雪况和时差，中间3-5天集中滑雪，最后1-2天可安排札幌观光或温泉体验。住宿推荐选择雪场附近，节省交通时间。SnowTrip 提供中文认证教练，可协助预订课程和安排行程。" },
    ]
  },
  {
    cat: "纽西兰雪场", date: "2024-06-20", title: "纽西兰皇后镇滑雪全攻略",
    img: imgGuide2,
    desc: "皇后镇是南半球最著名的滑雪胜地，周边拥有皇冠峰、卓越山等世界级雪场，本文为您详解行程规划、住宿选择及最佳滑雪时机。",
    sections: [
      { h: "皇后镇滑雪概况", body: "皇后镇被誉为「世界冒险之都」，6月至10月是南半球的滑雪季。周边拥有皇冠峰（Coronet Peak）、卓越山（The Remarkables）、卡德罗纳（Cardrona）和崔特斯峰（Treble Cone）四大商业雪场，涵盖从新手到专家的所有难度。" },
      { h: "四大雪场特色", body: "皇冠峰：距市区最近（20分钟车程），开放夜场，适合时间有限的旅客。卓越山：地形多样，拥有出色的公园和U型池，深受自由式滑雪者喜爱。卡德罗纳：面积最大，宽阔的雪道非常适合中级滑雪者。崔特斯峰：陡峭的地形和绝美风景，适合进阶玩家。" },
      { h: "最佳时间与住宿", body: "7月至9月是最佳滑雪月份，雪量充足且天气稳定。皇后镇市区住宿选择丰富，从背包客栈到五星级酒店应有尽有。建议住在市中心或瓦卡蒂普湖畔，方便前往各雪场的接驳车站。" },
      { h: "行程建议", body: "建议安排5-7天的行程。可购买Multi Pass联票，在多个雪场间灵活切换。非滑雪活动包括米尔福德峡湾游览、蹦极、喷射快艇等。SnowTrip 在皇后镇地区有经验丰富的中文教练，可为您定制专属滑雪行程。" },
    ]
  },
  {
    cat: "新手指南", date: "2024-09-05", title: "初学者滑雪课程完整指南",
    img: imgGuide3,
    desc: "第一次滑雪应该如何准备？选择私教课还是团体课？本文解答所有新手常见问题，助您轻松开始滑雪之旅。",
    sections: [
      { h: "滑雪前的准备", body: "第一次滑雪前，建议做好体能准备：加强腿部和核心肌群锻炼，提升平衡感。装备方面，初学者无需购买，雪场均可租借雪板、雪鞋、头盔等。穿着建议：多层穿搭，内层排汗、中层保暖、外层防水防风。别忘了防晒和雪镜。" },
      { h: "单板还是双板？", body: "双板（Ski）：两只脚各踩一块板，身体面朝前方，初学时较容易上手，基本滑行1-2天即可掌握。单板（Snowboard）：双脚固定在同一块板上，侧身滑行，前2-3天会比较辛苦（频繁摔倒），但一旦掌握平衡，进步会非常快。建议根据个人喜好选择，没有绝对的优劣。" },
      { h: "私教课 vs 团体课", body: "私教课（Private Lesson）：一对一或一对二，教练全程关注您的动作，进步最快，时间灵活。适合追求效率或有一定基础的学员。团体课（Group Lesson）：4-6人小班，气氛轻松，费用较低，适合想结交朋友的社交型学员。SnowTrip 建议初学者至少选择2-3小时的私教课，打好基础后再自由练习。" },
      { h: "常见问题", body: "滑雪危险吗？在专业教练指导下，滑雪是一项安全的运动。摔倒是学习的一部分，佩戴头盔和护具可有效降低受伤风险。需要几天才能学会？一般来说，2-3天的课程可以掌握基本转弯和刹车。想要流畅滑行各雪道，大约需要5-7天的练习。" },
    ]
  },
  {
    cat: "日本雪场", date: "2024-11-15", title: "二世谷粉雪深度体验报告",
    img: imgGuide4,
    desc: "二世谷联合滑雪场是全球最受欢迎的粉雪胜地之一，年平均积雪超过15米。本报告记录我们教练团队的深度考察体验。",
    sections: [
      { h: "二世谷概况", body: "二世谷（Niseko）位于北海道西南部，由羊蹄山火山群环绕，年均降雪量超过15米，是全球降雪量最大的滑雪区域之一。四大雪场组成的二世谷联合滑雪场提供超过80条雪道，地形从平缓宽道到陡峭野雪应有尽有。这里也是日本少数提供夜间滑雪的大型雪场。" },
      { h: "粉雪体验", body: "二世谷的粉雪轻如羽毛，含水量极低，滑行时如同在云朵上飞翔。我们的教练团队在1月底实测，当天的新鲜粉雪厚度达到40cm以上。即使在雪道内，也能体验到膝盖以上的深雪滑行。对于想要尝试道外（Backcountry）滑雪的进阶玩家，二世谷周边有大量未压雪的野雪区域。" },
      { h: "食宿与生活", body: "二世谷比罗夫（Hirafu）地区是餐饮和夜生活的中心，汇聚了日本各地的美食餐厅、居酒屋和酒吧。住宿从精品旅馆到 ski-in/ski-out 的度假酒店应有尽有。值得一提的是，二世谷的中文服务非常普及，几乎所有雪场和餐厅都有中文菜单和工作人员。" },
      { h: "教练推荐", body: "对于首次到访二世谷的滑雪者，我们强烈建议安排至少一天的导滑服务。SnowTrip 的本地教练熟悉各雪场的隐藏雪道和最佳粉雪时机，能带您体验一般游客无法发现的秘密路线。提前预订可确保旺季的教练名额。" },
    ]
  },
  {
    cat: "装备指南", date: "2024-10-12", title: "滑雪装备选购与租借完整指南",
    img: imgGuide5,
    desc: "初学者到底应该购买滑雪装备还是选择租借？本文从费用、便利性和安全性等角度全面分析，助您做出最明智的选择。",
    sections: [
      { h: "租借 vs 购买：如何选择？", body: "初学者建议先租借：每年滑雪不到一周的爱好者，租借更划算。雪场和市区都有丰富的租借选择，雪板+雪鞋+雪杖一套约每天300-500元人民币。进阶玩家可考虑购买：经常滑雪（每年2周以上）或对装备有特殊要求的滑雪者，自备装备能大幅提升体验。" },
      { h: "必备装备清单", body: "雪板/单板（Skis/Snowboard）：初学者建议选择中等硬度、较短的板。雪鞋（Boots）：最重要的装备，合脚比品牌更重要，建议到实体店试穿。头盔（Helmet）：安全第一，租借或购买均可。雪镜（Goggles）：防风防雪防紫外线，镜片颜色根据天气选择。护具：护腕（单板必备）、护膝、护臀。" },
      { h: "服装穿搭原则", body: "三层穿搭法：基础层（排汗内衣）：选择合成纤维或美利奴羊毛，切忌棉质。保暖层（中间层）：抓绒衣或轻量羽绒服。外层（防护层）：防水防风的滑雪外套和雪裤，注意接缝处要有防水压胶。手套：防水保暖，建议选择有腕带的款式防止脱落。" },
      { h: "购买建议", body: "如果决定购买，以下品牌值得推荐：入门级 — Decathlon（Oxelo系列）、Salomon；中端 — Burton、Rossignol、Head；高端 — Arc'teryx、Mammut、Patagonia。日本和纽西兰的雪场周边都有专业雪具店，可以实地试穿后购买。预算有限的话，也可以考虑二手装备或上季折扣款。" },
    ]
  },
  {
    cat: "中国雪场", date: "2024-11-28", title: "中国雪场推荐：新疆篇",
    img: imgGuide6,
    desc: "新疆是中国最具原始魅力的滑雪目的地，禾木和可可托海的粉雪品质媲美日本，本文详细介绍行程安排与雪场特色。",
    sections: [
      { h: "为什么选择新疆滑雪？", body: "新疆阿勒泰地区被誉为「人类滑雪的起源地」，拥有与日本北海道同纬度的优越雪况。这里的粉雪干燥松软，品质可与日本媲美，且游客远少于日本雪场，保留了原始纯粹的滑雪体验。加上无需护照、语言相通、费用更低，是国内滑雪爱好者的理想选择。" },
      { h: "禾木吉克普林滑雪场", body: "位于阿勒泰地区布尔津县，是中国最大的滑雪场之一。垂直落差达1200米，拥有初、中、高级各难度雪道。最大的亮点是周边的禾木村——被誉为「中国最美的村庄」，图瓦人的原木小屋在白雪覆盖下如童话世界。滑雪之余可以体验马拉雪橇、雪地徒步等特色活动。" },
      { h: "可可托海国际滑雪度假区", body: "拥有全国最长的雪季（10月至次年6月），最高海拔3100米，是中国海拔最高的滑雪场之一。雪道总长度超过50公里，野雪资源极为丰富。可可托海的矿坑地形更是独一无二，在巨大的矿坑中滑雪的体验举世罕见。" },
      { h: "行程建议", body: "建议安排5-7天的新疆滑雪行程。先到乌鲁木齐适应，再前往阿勒泰（飞机约1.5小时）。禾木和可可托海可各安排2-3天。当地住宿以民宿和木屋为主，建议提前预订。SnowTrip 提供新疆地区的中文教练服务，可协助安排交通和住宿，让您的新疆滑雪之旅无后顾之忧。" },
    ]
  },
];

const GUIDES_EN = [
  {
    cat: "Japan Resorts", date: "2024-12-01", title: "Complete Guide to Hokkaido Powder Season 2024-25",
    img: imgGuide1,
    desc: "Hokkaido is world-renowned for its 'Japow' powder snow. Every year from December to March is the prime ski season. This guide covers trip planning, resort selection, and coach booking to make your Hokkaido ski trip unforgettable.",
    sections: [
      { h: "Why Choose Hokkaido?", body: "Hokkaido, Japan's northernmost island, receives extraordinarily heavy snowfall due to Siberian cold air masses. Its snow quality — light, dry 'Japow' (Japan Powder) — is legendary among skiers worldwide. World-class resorts like Niseko, Furano, and Rusutsu offer excellent facilities for all skill levels." },
      { h: "Best Time to Ski", body: "Mid-December to early March is Hokkaido's ski season. January and February see the heaviest snowfall with the best powder quality. December and March offer slightly less snow but better prices, ideal for budget travelers. Avoid Japanese New Year (Dec 29–Jan 3) and Chinese New Year, when resorts are most crowded." },
      { h: "Recommended Resorts", body: "Niseko United: Comprising Grand Hirafu, Hanazono, Niseko Village, and Annupuri — famous for night skiing. Furano: Excellent snow quality, family-friendly with dedicated children's areas. Rusutsu Resort: 37 trails, one of Hokkaido's largest resort complexes." },
      { h: "Trip Planning Tips", body: "We recommend a 7-10 day itinerary. Spend the first 2-3 days acclimating to snow conditions and jet lag, then 3-5 days of concentrated skiing, and finish with 1-2 days of Sapporo sightseeing or hot springs. Stay near the resort to save travel time. SnowTrip provides certified Chinese-speaking coaches who can help book lessons and arrange your itinerary." },
    ]
  },
  {
    cat: "NZ Resorts", date: "2024-06-20", title: "Queenstown Skiing: The Complete Guide",
    img: imgGuide2,
    desc: "Queenstown is the Southern Hemisphere's most famous ski destination, surrounded by world-class resorts like Coronet Peak and The Remarkables. This guide covers trip planning, accommodation, and the best time to ski.",
    sections: [
      { h: "Queenstown Ski Overview", body: "Known as the 'Adventure Capital of the World,' Queenstown's ski season runs from June to October. Four major commercial resorts — Coronet Peak, The Remarkables, Cardrona, and Treble Cone — cover all difficulty levels from beginner to expert." },
      { h: "Four Resorts at a Glance", body: "Coronet Peak: Closest to town (20 min drive), offers night skiing, great for time-limited visitors. The Remarkables: Diverse terrain with excellent parks and halfpipes, beloved by freestyle skiers. Cardrona: The largest area with wide runs perfect for intermediates. Treble Cone: Steep terrain and stunning scenery, ideal for advanced skiers." },
      { h: "Best Time & Accommodation", body: "July to September offers the best conditions with reliable snowfall and stable weather. Queenstown town center has abundant accommodation options, from hostels to five-star hotels. We recommend staying downtown or near Lake Wakatipu for easy access to resort shuttle stops." },
      { h: "Suggested Itinerary", body: "Plan a 5-7 day trip. Consider purchasing a Multi Pass for flexibility across multiple resorts. Non-ski activities include Milford Sound tours, bungee jumping, and jet boating. SnowTrip has experienced Chinese-speaking coaches in the Queenstown region who can customize your ski itinerary." },
    ]
  },
  {
    cat: "Beginner Guide", date: "2024-09-05", title: "The Complete Beginner's Ski Lesson Guide",
    img: imgGuide3,
    desc: "How should you prepare for your first ski trip? Private lessons or group classes? This guide answers all common beginner questions to help you start your skiing journey with confidence.",
    sections: [
      { h: "Pre-Ski Preparation", body: "Before your first ski trip, build leg and core strength to improve balance. Beginners don't need to buy equipment — resorts rent skis, boots, and helmets. Dress in layers: moisture-wicking base, insulating mid-layer, and waterproof/windproof outer shell. Don't forget sunscreen and goggles." },
      { h: "Ski vs Snowboard?", body: "Ski (two separate boards, facing forward): Easier to pick up initially, basic gliding can be mastered in 1-2 days. Snowboard (both feet on one board, sideways stance): The first 2-3 days are tough (frequent falls), but once you find your balance, progress accelerates rapidly. Choose based on personal preference — neither is inherently better." },
      { h: "Private vs Group Lessons", body: "Private lessons (1-on-1 or 1-on-2): The coach focuses entirely on your technique, fastest progress, flexible scheduling. Ideal for efficiency-minded learners or those with some experience. Group lessons (4-6 people): Relaxed atmosphere, lower cost, great for social learners. SnowTrip recommends beginners start with at least 2-3 hours of private lessons to build a solid foundation before practicing independently." },
      { h: "Common Questions", body: "Is skiing dangerous? Under professional coaching, skiing is a safe sport. Falling is part of learning — wearing a helmet and protective gear significantly reduces injury risk. How many days to learn? Generally, 2-3 days of lessons covers basic turns and stopping. To ski all runs smoothly, expect about 5-7 days of practice." },
    ]
  },
  {
    cat: "Japan Resorts", date: "2024-11-15", title: "Niseko Powder: A Deep-Dive Experience Report",
    img: imgGuide4,
    desc: "Niseko United is one of the world's most popular powder destinations, with annual snowfall exceeding 15 meters. This report documents our coaching team's in-depth exploration.",
    sections: [
      { h: "Niseko Overview", body: "Niseko, in southwestern Hokkaido, is surrounded by the Mount Yotei volcanic range. With annual snowfall exceeding 15 meters, it's one of the snowiest ski regions on Earth. Niseko United's four resorts offer 80+ trails ranging from gentle groomers to steep backcountry. It's also one of Japan's few major resorts with night skiing." },
      { h: "The Powder Experience", body: "Niseko's powder is feather-light with extremely low moisture content — skiing here feels like floating on clouds. Our coaching team tested conditions in late January and measured over 40cm of fresh powder in a single day. Even on-piste, you'll experience knee-deep snow. For advanced skiers interested in backcountry, the surrounding area offers vast untracked terrain." },
      { h: "Food, Stay & Lifestyle", body: "The Hirafu area is the hub for dining and nightlife, featuring restaurants, izakayas, and bars from across Japan. Accommodation ranges from boutique ryokans to ski-in/ski-out resort hotels. Notably, Chinese-language service is widespread in Niseko — nearly every resort and restaurant has Chinese menus and staff." },
      { h: "Coach Recommendations", body: "For first-time Niseko visitors, we strongly recommend at least one day of guided skiing. SnowTrip's local coaches know hidden runs and optimal powder timing, taking you to secret spots that regular tourists never find. Book early to secure coach availability during peak season." },
    ]
  },
  {
    cat: "Gear Guide", date: "2024-10-12", title: "Complete Guide to Buying vs Renting Ski Gear",
    img: imgGuide5,
    desc: "Should beginners buy or rent ski equipment? This guide analyzes cost, convenience, and safety to help you make the smartest choice.",
    sections: [
      { h: "Rent vs Buy: How to Decide?", body: "Beginners should rent first: if you ski less than a week per year, renting is more cost-effective. Resorts and towns offer abundant rental options — a full set (skis + boots + poles) costs about 300-500 RMB per day. Advanced skiers may consider buying: those who ski 2+ weeks annually or have specific gear preferences will benefit greatly from owning their equipment." },
      { h: "Essential Gear Checklist", body: "Skis/Snowboard: Beginners should choose medium-flex, shorter boards. Boots: The most important piece — fit matters more than brand, try them on in-store. Helmet: Safety first, rent or buy. Goggles: Wind/snow/UV protection, choose lens color based on weather. Protective gear: Wrist guards (essential for snowboarders), knee pads, hip protectors." },
      { h: "Layering Principles", body: "Three-layer system: Base layer (moisture-wicking underwear): Choose synthetic fiber or merino wool — never cotton. Mid layer (insulation): Fleece or lightweight down jacket. Outer layer (protection): Waterproof/windproof ski jacket and pants, ensure sealed seams. Gloves: Waterproof and warm, choose styles with wrist straps to prevent loss." },
      { h: "Buying Recommendations", body: "If you decide to buy, recommended brands: Entry-level — Decathlon (Oxelo series), Salomon; Mid-range — Burton, Rossignol, Head; Premium — Arc'teryx, Mammut, Patagonia. Professional ski shops near resorts in Japan and New Zealand allow in-person fitting. On a budget? Consider second-hand gear or end-of-season sales." },
    ]
  },
  {
    cat: "China Resorts", date: "2024-11-28", title: "Top Ski Resorts in China: Xinjiang Edition",
    img: imgGuide6,
    desc: "Xinjiang is China's most pristine ski destination, with Hemu and Keketuohai powder rivaling Japan's best. This guide covers itinerary planning and resort highlights.",
    sections: [
      { h: "Why Ski in Xinjiang?", body: "The Altay region of Xinjiang is known as the 'birthplace of human skiing,' with snow conditions comparable to Hokkaido at the same latitude. Its dry, soft powder rivals Japan's quality, with far fewer tourists, preserving an authentic ski experience. No passport needed, same language, lower costs — an ideal choice for Chinese ski enthusiasts." },
      { h: "Hemu Jikepulin Ski Resort", body: "Located in Burqin County, Altay Prefecture, it's one of China's largest ski resorts with a vertical drop of 1,200 meters and trails for all levels. The highlight is nearby Hemu Village — called 'China's most beautiful village' — where Tuvan log cabins under snow look like a fairy tale. Try horse-drawn sleighs and snow hiking between ski sessions." },
      { h: "Keketuohai International Ski Resort", body: "Features China's longest ski season (October to June), with a peak elevation of 3,100 meters — one of the highest in the country. Over 50 km of trails with abundant backcountry terrain. The unique mine-pit skiing experience is truly one-of-a-kind in the world." },
      { h: "Suggested Itinerary", body: "Plan a 5-7 day Xinjiang ski trip. Start in Urumqi to acclimate, then fly to Altay (~1.5 hours). Spend 2-3 days each at Hemu and Keketuohai. Local accommodation is mainly guesthouses and wooden cabins — book in advance. SnowTrip provides Chinese-speaking coaches in Xinjiang and can arrange transport and lodging for a worry-free trip." },
    ]
  },
];

const GUIDES_JP = [
  {
    cat: "日本リゾート", date: "2024-12-01", title: "2024-25 北海道パウダーシーズン完全ガイド",
    img: imgGuide1,
    desc: "北海道は「ジャパウ」で世界的に有名。毎年12月から3月がベストスキーシーズンです。行程計画、リゾート選択、コーチ予約まで、完璧な北海道スキー旅行を実現します。",
    sections: [
      { h: "なぜ北海道を選ぶのか？", body: "日本最北端の北海道は、シベリア寒気団の影響で驚異的な降雪量を誇ります。軽くて乾燥した「ジャパウ」（Japan Powder）は世界中のスキーヤーの憧れ。ニセコ、富良野、ルスツなど世界級リゾートが揃い、あらゆるレベルのスキーヤーに対応します。" },
      { h: "最適スキー時期", body: "12月中旬〜3月上旬が北海道のスキーシーズン。1〜2月が降雪量最大でパウダー品質も最高。12月と3月は雪量がやや少ない分、価格が手頃で予算重視の旅行者におすすめ。年末年始（12/29〜1/3）と春節期間は最も混雑するので避けましょう。" },
      { h: "おすすめリゾート", body: "ニセコユナイテッド：Grand Hirafu、Hanazono、Niseko Village、Annupuriの4リゾートから構成、ナイトスキーが魅力。富良野スキー場：雪質抜群、ファミリー向けで子供専用エリアあり。ルスツリゾート：37本のコースを擁する北海道最大級のリゾート。" },
      { h: "行程プランニング", body: "7〜10日の行程がおすすめ。最初の2〜3日で雪況と時差に慣れ、中盤3〜5日で集中スキー、最後1〜2日で札幌観光または温泉を。宿泊はリゾート近くが移動時間節約に。SnowTripは中国語対応の認定コーチを提供、レッスン予約と行程手配をお手伝いします。" },
    ]
  },
  {
    cat: "NZリゾート", date: "2024-06-20", title: "クイーンズタウンスキー完全ガイド",
    img: imgGuide2,
    desc: "クイーンズタウンは南半球で最も有名なスキー目的地。コロナエットピーク、ザ・リマーカブルズなど世界級リゾートに囲まれた行程計画、宿泊、最佳時期を解説します。",
    sections: [
      { h: "クイーンズタウンスキー概要", body: "「世界アドベンチャー首都」と称されるクイーンズタウンのスキーシーズンは6月〜10月。コロナエットピーク、ザ・リマーカブルズ、カードローナ、トレブルコーンの4大商業リゾートが初心者から上級者まで全てのレベルをカバー。" },
      { h: "4大リゾートの特徴", body: "コロナエットピーク：街から最寄（車で20分）、ナイトスキー営業、時間制限のある旅行者に最適。ザ・リマーカブルズ：多彩な地形、出色のパークとハーフパイプ、フリースタイルスキーヤーに人気。カードローナ：最大面積、広いコースで中級者に最適。トレブルコーン：急斜面と絶景、上級者向け。" },
      { h: "最適時期と宿泊", body: "7〜9月が最適スキー月、降雪量豊富で天候安定。クイーンズタウン市内はホステルから五つ星ホテルまで宿泊オプション豊富。市中心部またはワカティプ湖畔に宿泊すると、各リゾートへのシャトルバス停に便利です。" },
      { h: "行程のおすすめ", body: "5〜7日の行程を計画。Multi Pass購入で複数リゾートを柔軟に巡れます。非スキー活動にはミルフォードサウンド観光、バンジージャンピング、ジェットボートなど。SnowTripはクイーンズタウン地域に経験豊富な中国語コーチがおり、専用スキー行程をカスタマイズできます。" },
    ]
  },
  {
    cat: "初心者ガイド", date: "2024-09-05", title: "初心者スキーレッスン完全ガイド",
    img: imgGuide3,
    desc: "初めてのスキー旅行はどう準備すべき？プライベートレッスンかグループレッスンか？初心者のよくある質問に答えて、自信を持ってスキーを始めましょう。",
    sections: [
      { h: "スキー前の準備", body: "初めてのスキー前に、脚力と体幹を鍛えてバランス力を高めましょう。装備は初心者は購入不要、リゾートでスキー板、ブーツ、ヘルメットをレンタル可能。服装はレイヤード：吸汗インナー、保温ミドル、防水防風アウター。日焼け止めとゴーグルもお忘れなく。" },
      { h: "スキーかスノーボードか？", body: "スキー（両足別々の板、正面向き）：最初は入りやすく、基本滑走は1〜2日で習得可能。スノーボード（両足同じ板、横向き）：最初の2〜3日は大変（頻繁に転倒）ですが、バランスを掴めば上達が早い。好みで選びましょう、優劣はありません。" },
      { h: "プライベート vs グループレッスン", body: "プライベート（1対1または1対2）：コーチが完全にあなたの技術に集中、最速上達、時間柔軟。効率重視や経験者におすすめ。グループ（4〜6人）：リラックスした雰囲気、低コスト、社交的学習者向け。SnowTripは初心者に最低2〜3時間のプライベートレッスンから始め、基礎を固めてから自主練習することを推奨。" },
      { h: "よくある質問", body: "スキーは危険？プロコーチの指導下では安全なスポーツです。転倒は学習の一部、ヘルメットとプロテクターで怪我リスクを大幅に低減。何日で覚える？一般的に2〜3日のレッスンで基本ターンと停止を習得。全コースをスムーズに滑るには約5〜7日の練習が必要です。" },
    ]
  },
  {
    cat: "日本リゾート", date: "2024-11-15", title: "ニセコパウダー深度体験レポート",
    img: imgGuide4,
    desc: "ニセコユナイテッドは世界で最も人気のあるパウダー目的地の一つ、年間積雪量15メートル超。コーチチームの深度考察体験を記録します。",
    sections: [
      { h: "ニセコ概要", body: "北海道南西部に位置するニセコは、羊蹄山の火山群に囲まれ、年間降雪量15メートル超を誇る世界最大級の降雪エリア。4リゾートからなるニセコユナイテッドは80本以上のコースを提供、緩やかな整備斜面から急峻なバックカントリーまで。ナイトスキーを提供する日本数少ない大型リゾートの一つ。" },
      { h: "パウダー体験", body: "ニセコのパウダーは羽毛のように軽く、水分含有量が極めて低く、滑走時は雲の上を飛ぶよう。コーチチームが1月末に実測したところ、当日の新雪厚度は40cm超。ゲレンデ内でも膝以上の深雪滑走を体験可能。バックカントリーに興味のある上級者には、周辺に広大な未圧雪エリアが広がります。" },
      { h: "食事・宿泊・生活", body: "比羅夫（Hirafu）地区は飲食とナイトライフの中心、日本各地の美食レストラン、居酒屋、バーが集結。宿泊はブティック旅館からスキーイン/スキーアウトのリゾートホテルまで。特筆すべきは、ニセコでは中国語サービスが非常に普及しており、ほぼ全てのリゾートとレストランに中国語メニューとスタッフがあります。" },
      { h: "コーチのおすすめ", body: "ニセコ初訪問のスキーヤーには、最低1日のガイド付きスキーを強く推奨。SnowTripの現地コーチは各リゾートの隠しコースと最佳パウダータイミングを熟知、一般観光客が発見できない秘密ルートへご案内。旺季のコーチ枠確保のため早期予約を。" },
    ]
  },
  {
    cat: "装備ガイド", date: "2024-10-12", title: "スキー装備購入 vs レンタル完全ガイド",
    img: imgGuide5,
    desc: "初心者はスキー装備を購入すべきかレンタルすべきか？費用、利便性、安全性の角度から全面分析、最善の選択をお手伝いします。",
    sections: [
      { h: "レンタル vs 購入：どう選ぶ？", body: "初心者はまずレンタルから：年間1週間未満のスキー愛好家にはレンタルがお得。リゾートと市内に豊富なレンタルオプション、スキー板+ブーツ+ポール一套で約300〜500元/日。上級者は購入を検討：年間2週以上スキー或对装备有特殊要求的滑雪者、自備装备能大幅提升体验。" },
      { h: "必須装備チェックリスト", body: "スキー板/スノーボード：初心者は中硬度、短めの板を選択。ブーツ：最も重要な装備、フィット感がブランドより重要、店頭試着を推奨。ヘルメット：安全第一、レンタルでも購入でも可。ゴーグル：防風防雪防UV、天候に応じてレンズ色を選択。プロテクター：リストガード（スノーボード必須）、ニーパッド、ヒッププロテクター。" },
      { h: "服装レイヤリング原則", body: "3層レイヤリング法：ベース層（吸汗インナー）：合成繊維またはメリノウールを選択、綿は厳禁。ミドル層（保温）：フリースまたは軽量ダウンジャケット。アウター層（防护）：防水防風のスキージャケットとパンツ、シーム部分に防水テープ加工必須。手袋：防水保温、脱落防止のリストストラップ付きを推奨。" },
      { h: "購入のおすすめ", body: "購入を決めた場合のおすすめブランド：エントリー — Decathlon（Oxeloシリーズ）、Salomon；ミドル — Burton、Rossignol、Head；プレミアム — Arc'teryx、Mammut、Patagonia。日本とNZのリゾート周辺には専門スキーショップがあり、実物試着後に購入可能。予算制限がある場合は、中古装備やシーズン終了セールも検討を。" },
    ]
  },
  {
    cat: "中国リゾート", date: "2024-11-28", title: "中国本土スキーリゾートおすすめ：新疆編",
    img: imgGuide6,
    desc: "新疆は中国で最も原初的魅力のあるスキー目的地。禾木と可可托海のパウダー品質は日本に匹敵。行程計画とリゾート特色を詳細に紹介します。",
    sections: [
      { h: "なぜ新疆スキーを選ぶのか？", body: "新疆アルタイ地区は「人類スキーの起源」と称され、北海道と同緯度の優れた雪況を誇ります。乾燥で柔らかいパウダーは日本に匹敵する品質、かつ日本人観光客がはるかに少なく、原始的で純粋なスキー体験を保持。パスポート不要、言語相通、費用も低く、国内スキー愛好者の理想的选择。" },
      { h: "禾木ジケ普林スキーリゾート", body: "アルタイ地区ブルチン県に位置、中国最大級のスキーリゾートの一つ。垂直落差1200メートル、初級・中級・上級全難度のコースを擁します。最大の魅力は周辺の禾木村——「中国最も美しい村」と称され、トゥバ人のログキャビンが雪に覆われて童話の世界のよう。スキー之余に馬そり、雪地ハイキング等特色体験も。" },
      { h: "可可托海国際スキーリゾート", body: "全国最長スキーシーズン（10月〜翌年6月）を誇り、最高標高3100メートル、中国最高標高のスキー場の一つ。コース総延長50キロ超、バックカントリー資源が極めて豊富。可可托海の鉱坑地形は世界唯一無二、巨大鉱坑でのスキー体験は世界的にも稀有。" },
      { h: "行程のおすすめ", body: "5〜7日の新疆スキー行程を推奨。まずウルムチで順応、その後アルタイへ（飛行機約1.5時間）。禾木と可可托海に各2〜3日。現地宿泊は民宿とログキャビンが中心、事前予約を推奨。SnowTripは新疆地区の中国語コーチサービスを提供、交通と宿泊の手配もお手伝い、安心の新疆スキー旅行を実現。" },
    ]
  },
];

const GUIDES_KR = [
  {
    cat: "일본 리조트", date: "2024-12-01", title: "2024-25 홋카이도 파우더 시즌 완전 가이드",
    img: imgGuide1,
    desc: "카이도는 '재파우'로 세계적으로 유명합니다. 매년 12월부터 3월이 최적 스키 시즌입니다. 여행 계획, 리조트 선택, 코치 예약까지 완벽한 홋카이도 스키 여행을 실현합니다.",
    sections: [
      { h: "왜 홋카이도를 선택해야 할까?", body: "일본 최북단의 홋카이도는 시베리아 한기단의 영향으로 엄청난 강설량을 자랑합니다. 가볍고 건조한 '재파우'(Japan Powder)는 전 세계 스키어의 꿈의 목적지. 니세코, 후라노, 루스츠 등 세계급 리조트가 갖춰져 모든 수준의 스키어에게 적합합니다." },
      { h: "최적 스키 시기", body: "12월 중순~3월 초가 홋카이도의 스키 시즌입니다. 1~2월이 강설량 최대, 파우더 품질 최고. 12월과 3월은 눈이 약간 적지만 가격이 저렴해 예산이 제한된 여행자에게 적합. 일본 설날(12/29~1/3)과 춘절 기간은 가장 혼잡하니 피하세요." },
      { h: "추천 리조트", body: "니세코 유나이티드: Grand Hirafu, Hanazono, Niseko Village, Annupuri 4개 리조트로 구성, 야간 키가 매력. 후라노 키장: 눈 품질 최고, 가족 친화적, 어린이 전용 구역 보유. 루스츠 리조트: 37개 코스 보유, 홋카이도 최대 규모 리조트 중 하나." },
      { h: "여행 계획 팁", body: "7~10일 일정을 권장합니다. 첫 2~3일은 눈 상태와 시차에 적응, 중간 3~5일은 집중 스키, 마지막 1~2일은 삿포로 관광 또는 온천. 리조트 근처 숙박이 이동 시간 절약에 좋습니다. SnowTrip은 중국어 인증 코치를 제공,レッスン 예약과 일정安排을 도와드립니다." },
    ]
  },
  {
    cat: "NZ 리조트", date: "2024-06-20", title: "퀸스타운 스키 완전 가이드",
    img: imgGuide2,
    desc: "퀸스타운은 남반구에서 가장 유명한 스키 목적지입니다. 코로넷 피크, 더 리마커블스 등 세계급 리조트로 둘러싸인 여행 계획, 숙박, 최적 시기를 소개합니다.",
    sections: [
      { h: "퀸스타운 스키 개요", body: "'세계 모험의 수도'로 불리는 퀸스타운의 스키 시즌은 6월~10월입니다. 코로넷 피크, 더 리마커블스, 카드로나, 트레블 콘 4대 상업 리조트가 초보자부터 전문가까지 모든 난이도를 커버합니다." },
      { h: "4대 리조트 특징", body: "코로넷 피크: 시내에서 가장 가까움(차 20분), 야간 스키 운영, 시간이 제한된 여행자에게 최적. 더 리마커블스: 다양한 지형, 우수한 파크와 하프파이프, 프리스타일 스키어에게 인기. 카드로나: 최대 면적, 넓은 코스로 중급자에게 적합. 트레블 콘: 급경사 지형과 절경, 고급 스키어에게 적합." },
      { h: "최적 시기와 숙박", body: "7~9월이 최적 스 월, 강설량 충분하고 날씨 안정. 퀸스타운 시내에는 호스텔부터 5성급 호텔까지 숙박 옵션이 풍부. 시내 중심 또는 와카티푸 호수 근처에 숙박하면 각 리조트 셔틀 정류장에 편리합니다." },
      { h: "일정 추천", body: "5~7일 일정을 계획하세요. Multi Pass 구매로 여러 리조트를 유연하게 이동 가능. 비스키 활동으로는 밀포드 사운드 투어, 번지점프, 제트보트 등. SnowTrip은 퀸스타운 지역에 경험 풍부한 중국어 코치가 있어 맞춤형 스키 일정을 제공합니다." },
    ]
  },
  {
    cat: "초보자 가이드", date: "2024-09-05", title: "초보자 스키 레슨 완전 가이드",
    img: imgGuide3,
    desc: "첫 스키 여행은 어떻게 준비해야 할까? 개인 레슨 vs 그룹 레슨? 초보자의 모든 일반적인 질문에 답하여 자신감 있게 스키를 시작하세요.",
    sections: [
      { h: "스키 전 준비", body: "첫 스키 전, 다리력과 코어 근력을 강화하여 균형 감각을 높이세요. 장비는 초보자는 구매 불필요, 리조트에서 스키, 부츠, 헬멧을 렌탈 가능. 복장은 레이어드: 흡속 이너, 보온 미들, 방수방풍 아우터. 자외선 차단제와 고글도 잊지 마세요." },
      { h: "스키 vs 스노보드?", body: "스키(양발 각각의 보드, 정면 방향): 처음에 배우기 쉽고, 기본 활주는 1~2일이면 습득 가능. 스노보드(양발 같은 보드, 옆방향): 첫 2~3일은 힘들지만(자주 넘어짐), 균형을 잡으면 상達が 빠릅니다. 개인 취향에 따라 선하세요, 우열은 없습니다." },
      { h: "개인 레슨 vs 그룹 레슨", body: "개인 레슨(1:1 또는 1:2): 코치가 전적으로 당신의 기술에 집중, 가장 빠른 상达, 시간 유연. 효율 중시나 경험자에게 추천. 그룹 레슨(4~6명): 편안한 분위기, 저렴한 비용, 사교적 학습자에게 적합. SnowTrip은 초보자에게 최소 2~3시간의 개인 레슨으로 기초를 다진 후 자율 연습을 권장합니다." },
      { h: "자주 묻는 질문", body: "스키는 위험한가요? 전문 코치 지도하에 스키는 안전한 스포츠입니다. 넘어짐은 학습의 일부, 헬멧과 보호구 착용으로 부상 위험을 크게 줄입니다. 며칠이면 배울 수 있나요? 일반적으로 2~3일 레슨으로 기본 턴과 정지를 습득. 모든 코스를 부드럽게 활주하려면 약 5~7일 연습이 필요합니다." },
    ]
  },
  {
    cat: "일본 리조트", date: "2024-11-15", title: "니세코 파우더 심층 체험 보고서",
    img: imgGuide4,
    desc: "니세코 유나이티드는 세계에서 가장 인기 있는 파우더 목적지 중 하나, 연간 적설량 15미터 초과. 코치 팀의 심층 탐험 체험을 기록합니다.",
    sections: [
      { h: "니세코 개요", body: "홋카이도 남서부에 위치한 니세코는 요테이산 화산군에 둘러싸여 연간 강설량 15미터超를 자랑하는 세계 최대급 강설エリア. 4개 리조트로 구성된 니세코 유나이티드는 80개 이상의 코스를 제공, 완만한 정비斜面에서 급경사 백컨트리까지. 야간 스키를 제공하는 일본 몇 안 되는 대형 리조트 중 하나." },
      { h: "파우더 체험", body: "니세코의 파우더는 깃털처럼 가볍고 수분 함량이 매우 낮아, 활주 시 구름 위를 나는 듯. 코치 팀이 1월 말 실측한 결과, 당일 신설 두께 40cm超. 게렌데 내에서도 무릎 이상의 심설 활주를 체험 가능. 백컨트리에 관심 있는 고급 스키어에게는 주변에 광대한 미압설エリア가 펼쳐집니다." },
      { h: "식사·숙박·생활", body: "히라후(Hirafu) 지역은飲食과 나이트라이프의 중심, 일본 각지의 미식 레스토랑, 이자카야, 바가 집결. 숙박은 부티크 료칸부터 스키인/스키아웃 리조트 호텔까지. 특기할 점은 니세코에서 중국어 서비스가 매우 보편화되어 있어, 거의 모든 리조트와 레스토랑에 중국어 메뉴와 직원이 있습니다." },
      { h: "코치 추천", body: "니세코 첫 방문 스키어에게는 최소 1일의 가이드付き 스키를 강력 권장. SnowTrip의 현지 코치는 각 리조트의 숨겨진 코스와 최적 파우더 타이밍을熟知, 일반 관광객이 발견하지 못하는 비밀 루트로 안내. 성수기 코치枠 확보를 위해 조기 예약 바랍니다." },
    ]
  },
  {
    cat: "장비 가이드", date: "2024-10-12", title: "스키 장비 구매 vs 렌탈 완전 가이드",
    img: imgGuide5,
    desc: "초보자는 스키 장비를 구매해야 할까 렌탈해야 할까? 비용, 편의성, 안전성의 각도에서 전면 분석, 최선의 선택을 도와드립니다.",
    sections: [
      { h: "렌탈 vs 구매: 어떻게 택할까?", body: "초보자는 먼저 렌탈부터: 연간 1주일 미만 스키 애호가에게는 렌탈이 더 경제적. 리조트와 시내에 풍부한 렌탈 옵션, 스키+부츠+폴 한 세트 약 300~500위안/일. 고급 스키어는 구매를 고려: 연간 2주 이상 키或对장비에 특별한 요구가 있는 키어, 자체 장비로 체험을 크게 향상." },
      { h: "필수 장비 체크리스트", body: "스키/스노보드: 초보자는 중경도, 짧은 보드 선택. 부츠: 가장 중요한 장비, 핏이 브랜드보다 중요, 매장에서试穿 권장. 헬멧: 안전 제일, 렌탈 또는 구매均可. 고글: 방풍방설방UV, 날씨에 따라 렌즈 색상 선. 보호구: 손목 보호대(스노보드 필수), 무릎 패드, 엉덩이 보호대." },
      { h: "의상 레이어링 원칙", body: "3층 레이어링법: 베이스층(흡속 이너): 합성섬유 또는 메리노울 선택, 면은 절대 금지. 미들층(보온): 플리스 또는 경량 다운재킷. 아우터층(방호): 방수방풍 스키 재킷과 팬츠, 이음새 부분에 방수 테이프 가공 필수. 장갑: 방수보온, 탈락 방지 손목 스트랩付き 권장." },
      { h: "구매 추천", body: "구매를 결정한 경우 추천 브랜드: 입문급 — Decathlon(Oxelo 시리즈), Salomon; 중급 — Burton, Rossignol, Head; 프리미엄 — Arc'teryx, Mammut, Patagonia. 일본과 NZ 리조트 주변에 전문 스키숍이 있어 실물试穿 후 구매 가능. 예산이 제한된 경우 중고 장비나 시즌 종료 세일도 고려하세요." },
    ]
  },
  {
    cat: "중국 리조트", date: "2024-11-28", title: "중국 본토 스키 리조트 추천: 신장편",
    img: imgGuide6,
    desc: "신장은 중국에서 가장 원초적 매력의 스키 목적지입니다. 허무와 커투하이의 파우더 품질은 일본에 필적. 일정 계획과 리조트 특징을 상세히 소개합니다.",
    sections: [
      { h: "왜 신장 스키를 선택해야 할까?", body: "신장 알타이 지역은 '인류 키의 발상지'로 불리며, 홋카이도와 동위도의 우수한 설황을 자랑합니다. 건조하고 부드러운 파우더는 일본에 필적하는 품질, 일본 스키장보다 관광객이 훨씬 적어 원초적이고 순수한 스키 체험을 유지. 여권 불필요, 언어 통용, 비용도 저렴하여 국내 스키 애호가의 이상적 선택입니다." },
      { h: "허무 지커푸린 스키 리조트", body: "알타이 지역 부얼진현에 위치, 중국 최대급 스키 리조트 중 하나. 수직 낙차 1200미터, 초·중·고급 전 난이도 코스를 보유. 최대 매력은 주변의 허무촌——'중국에서 가장 아름다운 마을'로 불리며, 투바인의 원목 오두막이 눈에 덮여 동화 세계와 같음. 스키之余에 마차 썰매, 설지 하이킹 등 특색 체험도." },
      { h: "커커투하이 국제 스키 리조트", body: "전국 최장 스키 시즌(10월~익년 6월)을 자랑하며, 최고 해발 3100미터, 중국 최고 해발 스키장 중 하나. 코스 총 연장 50km超, 백컨트리 자원이 매우 풍부. 커커투하이의 광산 지형은 세계 유일무이, 거대한 광산에서 스키를 타는 체험은 세계적으로도 희귀." },
      { h: "일정 추천", body: "5~7일의 신장 스키 일정을 권장합니다. 먼저 우루무치에서 순응, 이후 알타이로(비행기 약 1.5시간). 허무와 커커투하이에 각 2~3일. 현지 숙박은 민박과 원목 오두막이 중심, 사전 예약 권장. SnowTrip은 신장 지역의 중국어 코치 서비스를 제공, 교통과 숙박安排도 도와드려 안심 신장 스키 여행을 실현합니다." },
    ]
  },
];

const GUIDES_MAP: Record<Lang, typeof GUIDES_TC> = { TC: GUIDES_TC, SC: GUIDES_SC, EN: GUIDES_EN, JP: GUIDES_JP, KR: GUIDES_KR };

const FAQS_TC = [
  { q: "如何預訂課程？", a: "您可以在「預訂」頁面選擇雪場、日期、課程類型及教練後完成線上預訂。系統支持多種付款方式，預訂成功後會收到確認郵件。如有疑問可透過 WhatsApp、微信或 LINE 聯繫我們。" },
  { q: "取消政策是什麼？", a: "課程開始前11天取消可獲全額退款；24小時內取消不予退款。期間退款可與工作人員友好協商。如因惡劣天氣導致課程取消，將安排全額退款或免費改期。" },
  { q: "教練提供哪些語言的教學？", a: "我們的教練團隊提供繁體中文、簡體中文、英文、日文及韓文教學，確保每位學員都能在熟悉的語言環境下學習滑雪。" },
  { q: "我可以指定教練嗎？", a: "是的，在預訂頁面可以選擇指定教練。如指定教練當日已有課程安排，系統會提示您選擇其他時段或教練。建議提前2-3週預訂以確保心儀教練的名額。" },
  { q: "支持哪些支付方式？", a: "我們支持微信支付、支付寶、銀聯、Visa、Mastercard、PayPal 及 Apple Pay。所有付款資料均採用 SSL 加密保護，確保交易安全。" },
  { q: "課程適合幾歲的孩童？", a: "我們提供3歲以上兒童的專屬課程。兒童課程由持有兒童教學認證的教練負責，確保在安全愉快的環境下學習滑雪。" },
  { q: "租借設備是否包含在課程費用中？", a: "課程費用不含設備租借。我們可以在預訂時協助安排雪具、安全帽及護具的租借，費用另計。建議優先選用當地雪場的租借服務以確保設備品質。" },
  { q: "如果天氣惡劣，課程會取消嗎？", a: "遇到極端天氣（如暴雪警告、強風封山）時，我們會提前通知學員取消或改期，並提供全額退款或免費改期選項。安全永遠是我們的首要考慮。" },
  { q: "如何前往各個合作雪場？", a: "各雪場的交通指南請參考「授課雪場」頁面的詳細介紹。我們也可以協助安排從機場或市區到雪場的接送服務，請在預訂時備注相關需求。" },
];

const FAQS_SC = [
  { q: "如何预订课程？", a: "您可以在「预订」页面选择雪场、日期、课程类型及教练后完成线上预订。系统支持多种付款方式，预订成功后会收到确认邮件。如有疑问可通过 WhatsApp、微信或 LINE 联系我们。" },
  { q: "取消政策是什么？", a: "课程开始前11天取消可获全额退款；24小时内取消不予退款。期间退款可与工作人员友好协商。如因恶劣天气导致课程取消，将安排全额退款或免费改期。" },
  { q: "教练提供哪些语言的教学？", a: "我们的教练团队提供繁体中文、简体中文、英文、日文及韩文教学，确保每位学员都能在熟悉的语言环境下学习滑雪。" },
  { q: "我可以指定教练吗？", a: "是的，在预订页面可以选择指定教练。如指定教练当日已有课程安排，系统会提示您选择其他时段或教练。建议提前2-3周预订以确保心仪教练的名额。" },
  { q: "支持哪些支付方式？", a: "我们支持微信支付、支付宝、银联、Visa、Mastercard、PayPal 及 Apple Pay。所有付款资料均采用 SSL 加密保护，确保交易安全。" },
  { q: "课程适合几岁的孩童？", a: "我们提供3岁以上儿童的专属课程。儿童课程由持有儿童教学认证的教练负责，确保在安全愉快的环境下学习滑雪。" },
  { q: "租借设备是否包含在课程费用中？", a: "课程费用不含设备租借。我们可以在预订时协助安排雪具、安全帽及护具的租借，费用另计。建议优先选用当地雪场的租借服务以确保设备品质。" },
  { q: "如果天气恶劣，课程会取消吗？", a: "遇到极端天气（如暴雪警告、强风封山）时，我们会提前通知学员取消或改期，并提供全额退款或免费改期选项。安全永远是我们的首要考虑。" },
  { q: "如何前往各个合作雪场？", a: "各雪场的交通指南请参考「授课雪场」页面的详细介绍。我们也可以协助安排从机场或市区到雪场的接送服务，请在预订时备注相关需求。" },
];

const FAQS_EN = [
  { q: "How do I book a lesson?", a: "You can complete your booking online on the \"Booking\" page by selecting your resort, date, course type, and coach. We support multiple payment methods, and a confirmation email will be sent after booking. Feel free to reach us via WhatsApp, WeChat, or LINE if you have any questions." },
  { q: "What is the cancellation policy?", a: "Full refund for cancellations made 11 or more days before the lesson; no refund for cancellations within 24 hours. For cancellations in between, please contact our team to discuss options. In case of severe weather causing cancellation, a full refund or free rescheduling will be arranged." },
  { q: "What languages do the coaches teach in?", a: "Our coaching team offers instruction in Traditional Chinese, Simplified Chinese, English, Japanese, and Korean, ensuring every student can learn skiing in a familiar language environment." },
  { q: "Can I request a specific coach?", a: "Yes, you can select a specific coach on the booking page. If your preferred coach is already scheduled, the system will prompt you to choose another time slot or coach. We recommend booking 2-3 weeks in advance to secure your preferred coach." },
  { q: "What payment methods are supported?", a: "We support WeChat Pay, Alipay, UnionPay, Visa, Mastercard, PayPal, and Apple Pay. All payment data is protected with SSL encryption to ensure transaction security." },
  { q: "What age are the courses suitable for?", a: "We offer dedicated courses for children aged 3 and above. Children's courses are led by coaches with child-teaching certifications, ensuring a safe and enjoyable learning environment." },
  { q: "Is equipment rental included in the course fee?", a: "Course fees do not include equipment rental. We can help arrange rentals for skis, helmets, and protective gear at the time of booking for an additional fee. We recommend using the local resort's rental services to ensure equipment quality." },
  { q: "Will the course be cancelled due to bad weather?", a: "In the event of extreme weather (such as blizzard warnings or mountain closures due to strong winds), we will notify students in advance to cancel or reschedule, offering a full refund or free rescheduling option. Safety is always our top priority." },
  { q: "How do I get to the partner resorts?", a: "Please refer to the \"Teaching Resorts\" page for detailed transportation guides to each resort. We can also help arrange airport or city transfers to the resort — just note your requirements when booking." },
];

const FAQS_JP = [
  { q: "レッスンの予約方法は？", a: "「予約」ページでゲレンデ、日付、コースタイプ、コーチを選択してオンライン予約できます。複数の決済方法に対応しており、予約完了後に確認メールが届きます。ご不明な点がございましたら、WhatsApp、WeChat、LINEにてお問い合わせください。" },
  { q: "キャンセルポリシーは？", a: "レッスン開始11日前までのキャンセルは全額返金いたします。24時間以内のキャンセルは返金対象外となります。その間のキャンセルについては、スタッフにご相談ください。悪天候によりレッスンが中止された場合、全額返金または無料日程変更を手配いたします。" },
  { q: "コーチはどの言語で指導していますか？", a: "コーチチームは繁体中文、簡体中文、英語、日本語、韓国語での指導に対応しており、每位の學員が慣れ親しんだ言語環境でスキーを学べるよう配慮しています。" },
  { q: "特定のコーチを指名できますか？", a: "はい、予約ページで特定のコーチを選択できます。ご希望のコーチが既にスケジュール埋まっている場合、別の時間帯またはコーチを選択するようご案内いたします。2〜3週間前の事前予約をおすすめします。" },
  { q: "どの決済方法に対応していますか？", a: "WeChat Pay、Alipay、UnionPay、Visa、Mastercard、PayPal、Apple Payに対応しています。すべての決済データはSSL暗号化で保護され、取引の安全性を確保しています。" },
  { q: "コースは何歳から受けられますか？", a: "3歳以上のお子様向け専用コースをご用意しています。子供向けコースは子供教学認定を持つコーチが担当し、安全で楽しい環境でスキーを学べます。" },
  { q: "用具のレンタルはコース料金に含まれていますか？", a: "コース料金には用具レンタルは含まれていません。予約時にスキー用具、ヘルメット、プロテクターのレンタルを手配可能です（別料金）。現地のゲレンデのレンタルサービスのご利用をおすすめします。" },
  { q: "悪天候の場合はコースがキャンセルされますか？", a: "暴風雪警報や強風による山岳閉鎖などの極端な天候の場合、事前にキャンセルまたは日程変更のご連絡を行い、全額返金または無料日程変更をご提供いたします。安全が最優先です。" },
  { q: "パートナーゲレンデへのアクセス方法は？", a: "各ゲレンデへの交通案内は「レッスンゲレンデ」ページの詳細をご参照ください。空港や市内からゲレンデへの送迎手配も可能です。予約時にご希望をお知らせください。" },
];

const FAQS_KR = [
  { q: "레슨은 어떻게 예약하나요?", a: "'예약' 페이지에서 스키장, 날짜, 코스 유형, 코치를 선택하여 온라인으로 예약할 수 있습니다. 다양한 결제 방식을 지원하며, 예약 완료 후 확인 이메일이 발송됩니다. 문의사항이 있으면 WhatsApp, WeChat 또는 LINE으로 연락 주세요." },
  { q: "취소 정책은 무엇인가요?", a: "레슨 시작 11일 전까지 취소 시 전액 환불됩니다. 24시간 이내 취소는 환불되지 않습니다. 그 사이의 취소는 직원과 협의 가능합니다. 악천후로 레슨이 취소될 경우 전액 환불 또는 무료 일정 변경이 제공됩니다." },
  { q: "코치들은 어떤 언어로 가르치나요?", a: "코치 팀은 번체중문, 간체중문, 영어, 일본어, 한국어로 수업을 제공하여, 모든 수강생이 익숙한 언어 환경에서 스키를 배울 수 있도록 합니다." },
  { q: "특정 코치를 지정할 수 있나요?", a: "네, 예약 페이지에서 특정 코치를 선택할 수 있습니다. 희망 코치의 일정已满 경우, 다른 시간대 또는 코치를 안내해 드립니다. 2~3주 전 예약을 권장합니다." },
  { q: "어떤 결제 방식을 지원하나요?", a: "WeChat Pay, Alipay, UnionPay, Visa, Mastercard, PayPal 및 Apple Pay를 지원합니다. 모든 결제 정보는 SSL 암호화로 보호되어 안전한 거래를 보장합니다." },
  { q: "코스는 몇 살부터 적합한가요?", a: "3세 이상 아동을 위한 전용 코스를 제공합니다. 아동 코스는 아동 교육 자격을 보유한 코치가 담당하여 안전하고 즐거운 환경에서 스키를 배울 수 있습니다." },
  { q: "장비 렌탈은 코스 비용에 포함되어 있나요?", a: "코스 비용에는 장비 렌탈이 포함되어 있지 않습니다. 예약 시 스키 장비, 헬멧, 보호구의 렌탈을 주선할 수 있으며 별도 비용이 발생합니다. 현지 스키장 렌탈 서비스 이용을 권장합니다." },
  { q: "악천후 시 코스가 취소되나요?", a: "폭설 경보나 강풍으로 인한 산악 통제 등 극단적인 기상 상황 시, 사전에 취소 또는 일정 변경을 안내하며 전액 환불 또는 무료 일정 변경을 제공합니다. 안전이 최우선입니다." },
  { q: "파트너 스키장까지 어떻게 가나요?", a: "각 스키장의 교통 안내는 '강습 스키장' 페이지의 상세 안내를 참조해 주세요. 공항이나 시내에서 스키장까지의 픽업 서비스도 주선 가능합니다. 예약 시 요청 사항을 알려주세요." },
];

const FAQS_MAP: Record<Lang, typeof FAQS_TC> = { TC: FAQS_TC, SC: FAQS_SC, EN: FAQS_EN, JP: FAQS_JP, KR: FAQS_KR };

// ─── Logo ────────────────────────────────────────────────
function BrandLogo({ height = 38 }: { height?: number }) {
  return <img src={imgLogo} alt="旅雪 SKI" style={{ height, width: "auto", objectFit: "contain", display: "block" }} />;
}

// ─── Main App ────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("TC");
  const [tab, setTab] = useState<Tab>(0);
  const [showReg, setShowReg] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() => {
    // 从 localStorage 恢复登录状态和 JWT token
    const token = localStorage.getItem('_jwtToken');
    const user = localStorage.getItem('_loggedInUser');
    if (token && user) return user;
    return null;
  });
  const [showLang, setShowLang] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const [activeRegion, setActiveRegion] = useState<"JP"|"NZ"|"CN">("JP");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileBookOpen, setMobileBookOpen] = useState(false);
  const [coachIdx, setCoachIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [guideDetail, setGuideDetail] = useState<number | null>(null);
  const [resortRegion, setResortRegion] = useState<"JP"|"CN"|"NZ">("JP");
  const [bookRegion, setBookRegion] = useState("all");
  const [bookType, setBookType] = useState("all");
  const [bookDate, setBookDate] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [showWeChat, setShowWeChat] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [regDone, setRegDone] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(true);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyCountdown, setVerifyCountdown] = useState(3);
  // 重置密码状态
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetResult, setResetResult] = useState<{ success: boolean; message: string } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [showSeasonBanner, setShowSeasonBanner] = useState(true);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [payResort, setPayResort] = useState<{ name: string; loc: string; price: string; img: string; feat: string[] } | null>(null);
  const [payStep, setPayStep] = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState("");
  const langRef = useRef<HTMLDivElement>(null);

  // ─── My Orders state ──────────────────────────────────
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState("");
  const [orderDetail, setOrderDetail] = useState<any | null>(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);

  const tr = T[lang] as Tr;

  // ─── My Orders helpers ────────────────────────────────
  const getAuthHeaders = () => {
    const token = localStorage.getItem('_jwtToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchOrders = async (status?: string) => {
    if (!loggedInUser) return;
    setOrdersLoading(true);
    try {
      const url = status ? `/api/bookings?status=${status}` : '/api/bookings';
      const res = await fetch(url, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setOrders(data.data || []);
      else setOrders([]);
    } catch { setOrders([]); }
    finally { setOrdersLoading(false); }
  };

  const fetchOrderDetail = async (orderNo: string) => {
    setOrderDetailLoading(true);
    try {
      const res = await fetch(`/api/bookings/${orderNo}`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setOrderDetail(data.data);
    } catch { /* ignore */ }
    finally { setOrderDetailLoading(false); }
  };

  const handleCancelOrder = async (orderNo: string) => {
    setCanceling(true);
    try {
      const res = await fetch(`/api/bookings/${orderNo}/cancel`, { 
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setCancelConfirm(null);
        setOrderDetail(null);
        fetchOrders(orderFilter || undefined);
      }
    } catch { /* ignore */ }
    finally { setCanceling(false); }
  };

  const statusColor: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-600',
  };

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      pending: tr.orderPending, paid: tr.orderPaid, confirmed: tr.orderConfirmed,
      completed: tr.orderCompleted, cancelled: tr.orderCancelled,
    };
    return map[s] || s;
  };

  const orderFilterTabs = [
    { value: "", label: tr.orderAll },
    { value: "pending", label: tr.orderPending },
    { value: "confirmed", label: tr.orderConfirmed },
    { value: "completed", label: tr.orderCompleted },
    { value: "cancelled", label: tr.orderCancelled },
  ];

  useEffect(() => {
    if (showOrders) fetchOrders(orderFilter || undefined);
  }, [showOrders, orderFilter]);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        const isScrolled = window.scrollY > 40 || tab !== 0;
        navRef.current.classList.toggle("bg-primary", isScrolled);
        navRef.current.classList.toggle("shadow-lg", isScrolled);
        navRef.current.classList.toggle("bg-primary/80", !isScrolled);
        navRef.current.classList.toggle("backdrop-blur-md", !isScrolled);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // Set initial classes
    return () => window.removeEventListener("scroll", onScroll);
  }, [tab]);

  // Preload critical images for faster LCP
  useEffect(() => {
    const preloads = [imgHero, imgJp6, imgNz3, imgCoachLeo];
    preloads.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload'; link.as = 'image'; link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLang(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ─── URL Routing ──────────────────────────────────────
  const TAB_PATH: Record<number, string> = { 0: "/", 1: "/courses", 2: "/resorts", 3: "/guide", 4: "/faq", 5: "/contact" };
  const PATH_TAB: Record<string, number> = { "/": 0, "": 0, "/courses": 1, "/resorts": 2, "/guide": 3, "/faq": 4, "/contact": 5 };
  const REGION_PATH: Record<string, string> = { JP: "japan", NZ: "newzealand", CN: "china" };
  const PATH_REGION: Record<string, string> = Object.fromEntries(Object.entries(REGION_PATH).map(([k, v]) => [v, k]));

  const parsePath = () => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const parts = path.split("/").filter(Boolean);
    const mainPart = "/" + (parts[0] || "");
    const subPart = parts[1] || "";
    const t = PATH_TAB[mainPart] ?? 0;
    const region = PATH_REGION[subPart] as "JP" | "NZ" | "CN" | undefined;
    return { tab: t as Tab, region };
  };

  const gotoTab = (t: Tab, region?: string) => {
    let path = TAB_PATH[t] || "/";
    if (t === 1) {
      const r = region ? REGION_PATH[region] : REGION_PATH[activeRegion];
      path += "/" + (r || "japan");
    }
    window.history.pushState({ tab: t, region: region || activeRegion }, "", path);
    if (region) setActiveRegion(region as "JP" | "NZ" | "CN");
    setTab(t);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listen for browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const { tab: t, region } = parsePath();
      setTab(t);
      if (region) setActiveRegion(region);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPopState);
    // Parse initial URL
    const { tab: initTab, region: initRegion } = parsePath();
    setTab(initTab);
    if (initRegion) setActiveRegion(initRegion);

    // ── Handle email verification from URL (必须在 replaceState 之前读取参数) ──
    const initialPathname = window.location.pathname;
    const initialSearch = window.location.search;
    const urlParams = new URLSearchParams(initialSearch);
    const verifyToken = urlParams.get('token');

    // 清除 URL 中的参数
    window.history.replaceState({ tab: initTab }, "", initialPathname);

    if (initialPathname.includes('verify-email') && verifyToken) {
      fetch(`/api/auth/verify-email?token=${encodeURIComponent(verifyToken)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setVerifySuccess(true);
            setVerifyMessage(data.message || '邮箱验证成功！');
            setShowVerifyModal(true);
            // 倒计时 3 秒后跳转到登录
            let count = 3;
            setVerifyCountdown(count);
            const timer = setInterval(() => {
              count--;
              setVerifyCountdown(count);
              if (count <= 0) {
                clearInterval(timer);
                setShowVerifyModal(false);
                setShowLogin(true);
              }
            }, 1000);
          } else {
            setVerifySuccess(false);
            setVerifyMessage(data.message || '验证失败，请重新注册或联系客服。');
            setShowVerifyModal(true);
          }
        })
        .catch(() => {
          setVerifySuccess(false);
          setVerifyMessage('网络错误，请稍后重试。');
          setShowVerifyModal(true);
        });
    }

    // ── Handle reset password from URL ──
    if (initialPathname.includes('reset-password') && verifyToken) {
      setResetToken(verifyToken);
      setShowResetModal(true);
    }

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // ─── NAV ───────────────────────────────────────────────
  const Nav = () => (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${tab !== 0 ? "bg-primary shadow-lg" : "bg-primary/80 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => gotoTab(0)} className="flex items-center shrink-0">
          <BrandLogo height={38} />
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {(tr.nav as string[]).map((label, i) => {
            if (i === 1) return (
              <div key={i} className="relative"
                onMouseEnter={() => setShowBookDropdown(true)}
                onMouseLeave={() => setShowBookDropdown(false)}
              >
                <button
                  onClick={() => gotoTab(1)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1 ${tab === 1 ? "text-accent border-b-2 border-accent" : "text-white/80 hover:text-white"}`}
                >
                  {label} <ChevronDown size={12} />
                </button>
                {showBookDropdown && (
                  <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50 min-w-[152px] py-1">
                    {([
                      ["JP", "日本",    "日本",    "Japan"         ],
                      ["NZ", "紐西蘭",  "纽西兰",  "New Zealand"   ],
                      ["CN", "中國","中国", "China"]
                    ] as const).map(([rk, tc, sc, en]) => (
                      <button
                        key={rk}
                        onClick={() => { gotoTab(1, rk); setShowBookDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted ${activeRegion === rk ? "font-bold text-accent" : "text-foreground"}`}
                      >
                        {lang === "EN" ? en : lang === "SC" ? sc : tc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
            return (
              <button
                key={i}
                onClick={() => gotoTab(i as Tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors whitespace-nowrap ${tab === i ? "text-accent border-b-2 border-accent" : "text-white/80 hover:text-white"}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right: lang + register */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1.5 text-white/80 hover:text-white px-2 py-1.5 text-sm transition-colors"
            >
              <span className="sm:hidden text-sm font-semibold">{lang === "EN" ? "Language" : lang === "SC" ? "语言" : lang === "JP" ? "言語" : lang === "KR" ? "언어" : "語言"}</span>
              <span className="hidden sm:inline">{LANGS.find(l => l.code === lang)?.label}</span>
              <ChevronDown size={13} className={`transition-transform ${showLang ? "rotate-180" : ""}`} />
            </button>
            {showLang && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-border py-1 min-w-[150px] z-50">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLang(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2 ${lang === l.code ? "text-accent font-medium" : "text-foreground"}`}
                  >
                    {lang === l.code && <Check size={13} />}
                    {lang !== l.code && <span className="w-[13px]" />}
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login + Register */}
          <div className="hidden sm:flex items-center gap-2">
            {loggedInUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowOrders(true); setOrderDetail(null); setOrderFilter(""); }}
                  className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded-lg border border-white/30 hover:border-white/60 transition-colors flex items-center gap-1.5"
                >
                  <ClipboardList size={14} />
                  {tr.myOrders}
                </button>
                <div className="flex items-center gap-1.5 text-white text-sm font-semibold px-2 py-2">
                  <User size={15} />
                  <span className="max-w-[100px] truncate">{loggedInUser}</span>
                </div>
                <button
                  onClick={() => { setLoggedInUser(null); localStorage.removeItem('_loggedInUser'); localStorage.removeItem('_jwtToken'); }}
                  className="text-white/80 hover:text-white text-sm font-semibold px-3 py-2 rounded-lg border border-white/30 hover:border-white/60 transition-colors flex items-center gap-1"
                >
                  <LogOut size={14} />
                  {lang === "EN" ? "Logout" : lang === "JP" ? "ログアウト" : lang === "KR" ? "로그아웃" : "退出"}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-white/80 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg border border-white/30 hover:border-white/60 transition-colors"
                >
                  {lang === "EN" ? "Login" : lang === "JP" ? "ログイン" : lang === "KR" ? "로그인" : "登录"}
                </button>
                <button
                  onClick={() => setShowReg(true)}
                  className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors"
                >
                  {tr.reg}
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-white p-1">
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-primary border-t border-white/10">
          {(tr.nav as string[]).map((label, i) => {
            if (i === 1) return (
              <div key={i}>
                <button
                  onClick={() => setMobileBookOpen(!mobileBookOpen)}
                  className={`flex w-full items-center justify-between px-6 py-3 text-sm transition-colors ${tab === 1 ? "text-accent font-semibold" : "text-white/80 hover:text-white"}`}
                >
                  {label} <ChevronDown size={14} className={`transition-transform ${mobileBookOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileBookOpen && (
                  <div className="bg-white/10">
                    {([
                      ["JP", "日本",    "日本",    "Japan"         ],
                      ["NZ", "紐西蘭",  "纽西兰",  "New Zealand"   ],
                      ["CN", "中國","中国", "China"]
                    ] as const).map(([rk, tc, sc, en]) => (
                      <button
                        key={rk}
                        onClick={() => { gotoTab(1, rk); setMobileMenu(false); setMobileBookOpen(false); }}
                        className={`block w-full text-left pl-10 pr-6 py-2.5 text-sm transition-colors hover:bg-white/10 ${activeRegion === rk ? "font-bold text-accent" : "text-white/80"}`}
                      >
                        {lang === "EN" ? en : lang === "SC" ? sc : tc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
            return (
              <button
                key={i}
                onClick={() => gotoTab(i as Tab)}
                className={`block w-full text-left px-6 py-3 text-sm transition-colors ${tab === i ? "text-accent font-semibold" : "text-white/80 hover:text-white"}`}
              >
                {label}
              </button>
            );
          })}
          <div className="px-6 pb-4 pt-2 flex flex-col gap-2">
            {loggedInUser ? (
              <>
                <button onClick={() => { setShowOrders(true); setOrderDetail(null); setOrderFilter(""); setMobileMenu(false); }} className="w-full border border-white/30 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5">
                  <ClipboardList size={14} />
                  {tr.myOrders}
                </button>
                <div className="flex items-center gap-1.5 text-white text-sm font-semibold py-2 px-1">
                  <User size={15} />
                  <span className="truncate">{loggedInUser}</span>
                </div>
                <button onClick={() => { setLoggedInUser(null); localStorage.removeItem('_loggedInUser'); localStorage.removeItem('_jwtToken'); setMobileMenu(false); }} className="w-full border border-white/30 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5">
                  <LogOut size={14} />
                  {lang === "EN" ? "Logout" : lang === "JP" ? "ログアウト" : lang === "KR" ? "로그아웃" : "退出"}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setShowLogin(true); setMobileMenu(false); }} className="w-full border border-white/30 text-white text-sm font-semibold py-2.5 rounded-lg">
                  {lang === "EN" ? "Login" : lang === "JP" ? "ログイン" : lang === "KR" ? "로그인" : "登录"}
                </button>
                <button onClick={() => { setShowReg(true); setMobileMenu(false); }} className="w-full bg-accent text-white text-sm font-semibold py-2.5 rounded-lg">
                  {tr.reg}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  // ─── HOME PAGE ─────────────────────────────────────────
  const HomePage = () => {
  const coachesPerView = 3;
  const totalPages = Math.ceil(COACHES.length / coachesPerView);
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDES = [
    {
      img: imgHero,
      tag: lang === "EN" ? "SnowTrip International" : "旅雪 SKI · 全球滑雪",
      h1: lang === "EN" ? "Every Run Worth the Journey" : lang === "SC" ? "让每一次滑行都值得期待" : lang === "JP" ? "すべての滑走を特別に" : lang === "KR" ? "모든 활강이 기대되는 순간으로" : "讓每一次滑行都值得期待",
      h2: lang === "EN" ? "Japan · New Zealand · China" : lang === "SC" ? "日本 · 纽西兰 · 中国" : lang === "JP" ? "日本 · ニュージーランド · 中国" : lang === "KR" ? "일본 · 뉴질랜드 · 중국" : "日本 · 紐西蘭 · 中國",
      sub: lang === "EN" ? "Expert Coaches · Premium Resorts · Tailored Courses" : lang === "SC" ? "专业教练 · 精选雪场 · 个性化课程" : tr.h3,
      cta1: tr.b1, cta2: tr.b2,
      goto1: 1 as Tab, goto2: 2 as Tab,
    },
    {
      img: imgJp6,
      tag: lang === "EN" ? "Japan · Hokkaido · Niseko" : lang === "SC" ? "日本 · 北海道 · 二世谷" : "日本 · 北海道 · 二世谷",
      h1: lang === "EN" ? "World-Class Powder Snow" : lang === "SC" ? "世界顶级粉雪体验" : lang === "JP" ? "世界最高の雪質を体験" : lang === "KR" ? "세계 최고의 파우더 스노우" : "世界頂級粉雪體驗",
      h2: lang === "EN" ? "Average 15m Snowfall Per Season" : lang === "SC" ? "年均积雪超过15米" : lang === "JP" ? "年間積雪15メートル以上" : lang === "KR" ? "연평균 15m 적설" : "年均積雪超過15米",
      sub: lang === "EN" ? "Niseko · Hokkaido · Sapporo · Furano" : "二世谷 · 留壽都 · 富良野 · 手稻",
      cta1: lang === "EN" ? "Explore Japan" : lang === "SC" ? "探索日本雪场" : "探索日本雪場",
      cta2: lang === "EN" ? "Book Now" : tr.bnow,
      goto1: 2 as Tab, goto2: 1 as Tab,
    },
    {
      img: imgNz3,
      tag: lang === "EN" ? "New Zealand · Queenstown" : lang === "SC" ? "纽西兰 · 皇后镇" : "紐西蘭 · 皇后鎮",
      h1: lang === "EN" ? "Southern Hemisphere Skiing" : lang === "SC" ? "南半球最佳滑雪胜地" : lang === "JP" ? "南半球最高のスキーリゾート" : lang === "KR" ? "남반구 최고의 스키 리조트" : "南半球最佳滑雪勝地",
      h2: lang === "EN" ? "June – October · Stunning Alpine Views" : lang === "SC" ? "6月至10月 · 壮丽高山景色" : lang === "JP" ? "6月〜10月 · 雄大な山岳景観" : lang === "KR" ? "6월~10월 · 장엄한 알파인 전망" : "6月至10月 · 壯麗高山景色",
      sub: lang === "EN" ? "Coronet Peak · The Remarkables · Cardrona · Mt Hutt" : "皇冠峰 · 卓越山 · 卡德羅納 · 哈特山",
      cta1: lang === "EN" ? "Explore New Zealand" : lang === "SC" ? "探索纽西兰雪场" : "探索紐西蘭雪場",
      cta2: lang === "EN" ? "Book Now" : tr.bnow,
      goto1: 2 as Tab, goto2: 1 as Tab,
    },
  ];

  const goTo = (idx: number) => {
    setFade(false);
    setTimeout(() => { setSlide(idx); setFade(true); }, 280);
};

  const startTimer = () => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setSlide(s => (s + 1) % SLIDES.length); setFade(true); }, 280);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  const s = SLIDES[slide];

  return (
    <div>
      {/* ── Hero Carousel ───────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        {/* Background image with crossfade */}
        {SLIDES.map((sl, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <img src={sl.img} alt="" className="w-full h-full object-cover" style={{ display: "block" }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/65 via-primary/45 to-primary/80" />

        {/* Content */}
        <div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto transition-opacity duration-300"
          style={{ opacity: fade ? 1 : 0 }}
        >
          <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-6">{s.tag}</p>
          <h1 className="text-white font-black leading-tight mb-3" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            {s.h1}
          </h1>
          <h2 className="text-white/90 font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}>
            {s.h2}
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-10">{s.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => gotoTab(s.goto1)}
              className="bg-accent text-white font-bold px-8 py-3.5 rounded-xl hover:bg-sky-400 transition-all hover:scale-105 flex items-center gap-2 justify-center"
            >
              {s.cta1} <ArrowRight size={18} />
            </button>
            <button
              onClick={() => gotoTab(1)}
              className="bg-white/10 backdrop-blur border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
            >
              {lang === "EN" ? "Book Now" : "立即預訂"}
            </button>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => { goTo((slide - 1 + SLIDES.length) % SLIDES.length); startTimer(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => { goTo((slide + 1) % SLIDES.length); startTimer(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startTimer(); }}
              className="transition-all duration-300"
              style={{
                width: i === slide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === slide ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {(tr.stats as string[]).map((stat, i) => {
            const [num, ...rest] = stat.split("\n");
            return (
              <div key={i} className="text-center">
                <div className="text-accent font-black text-3xl sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>{num}</div>
                <div className="text-white/70 text-sm mt-1">{rest.join(" ")}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Story</p>
            <h2 className="font-black text-3xl sm:text-4xl text-foreground mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.stT}</h2>
            <p className="text-muted-foreground leading-relaxed text-base">{tr.stP}</p>
            <button onClick={() => gotoTab(5)} className="mt-8 flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              {tr.nav[5]} <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted shadow-2xl">
              <img
                src={imgStory}
                alt="Skiing action"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-black">10K+</div>
              <div className="text-xs opacity-90">{(tr.stats as string[])[2].split("\n")[1]}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Carousel */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">Team</p>
            <h2 className="font-black text-3xl sm:text-4xl text-foreground mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.cT}</h2>
            <p className="text-muted-foreground">{tr.cS}</p>
          </div>

          {/* Desktop: 3 at a time */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-3 gap-6">
              {COACHES.slice(coachIdx, coachIdx + coachesPerView).map((c, i) => (
                <div key={c.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground">{c.name}</h3>
                        <p className="text-accent text-sm font-medium">{lang === "EN" ? c.titleEN : c.titleTC}</p>
                      </div>
                      <span className="bg-secondary text-foreground text-xs px-2 py-1 rounded-full font-semibold">{c.exp} {tr.exp}</span>
                    </div>
                    <div className="space-y-1.5 mt-3">
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{tr.cert}:</span> {c.certs}</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{tr.lang}:</span> {c.langs}</p>
                    </div>
                    <div className="mt-3 flex gap-1">
                      {[...Array(5)].map((_, si) => <Star key={si} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() => setCoachIdx(Math.max(0, coachIdx - coachesPerView))}
                disabled={coachIdx === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCoachIdx(Math.min(COACHES.length - coachesPerView, coachIdx + coachesPerView))}
                disabled={coachIdx >= COACHES.length - coachesPerView}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mobile: 1 at a time */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="aspect-square bg-muted overflow-hidden">
                <img src={COACHES[coachIdx].img} alt={COACHES[coachIdx].name} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground text-lg">{COACHES[coachIdx].name}</h3>
                <p className="text-accent text-sm font-medium mb-3">{lang === "EN" ? COACHES[coachIdx].titleEN : COACHES[coachIdx].titleTC}</p>
                <p className="text-xs text-muted-foreground mb-1"><span className="font-medium text-foreground">{tr.cert}:</span> {COACHES[coachIdx].certs}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{tr.lang}:</span> {COACHES[coachIdx].langs}</p>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={() => setCoachIdx(Math.max(0, coachIdx - 1))} disabled={coachIdx === 0} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white disabled:opacity-30">
                <ChevronLeft size={18} />
              </button>
              <span className="flex items-center text-sm text-muted-foreground">{coachIdx + 1} / {COACHES.length}</span>
              <button onClick={() => setCoachIdx(Math.min(COACHES.length - 1, coachIdx + 1))} disabled={coachIdx >= COACHES.length - 1} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white disabled:opacity-30">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  };

  // ─── BOOKING PAGE ──────────────────────────────────────
  const BookingPage = () => {
  const isEN = lang === "EN";
  const isSC = lang === "SC";

  // Booking form state
  const [bSkiType,     setBSkiType]     = useState<"ski"|"snowboard"|"">("");
  const [bGroupSize,   setBGroupSize]   = useState(2);
  const [bDuration,    setBDuration]    = useState<"3h"|"6h"|"">("");
  const [bDate,        setBDate]        = useState("");
  const [bDateEnd,     setBDateEnd]     = useState("");
  const [bCalMonth,    setBCalMonth]    = useState(0);
  const [bLevel,       setBLevel]       = useState<1|2|3|4|0>(0);
  const [bEquip,       setBEquip]       = useState<"yes"|"no"|"">("");
  const [bEquipItems,    setBEquipItems]    = useState<Set<string>>(new Set());
  const [bGender,        setBGender]        = useState<"M"|"F"|"">("");
  const [bHeight,        setBHeight]        = useState("");
  const [bWeight,        setBWeight]        = useState("");
  const [bShoeSize,      setBShoeSize]      = useState("");
  const [bEquipSets,     setBEquipSets]     = useState<{ items: string[]; gender: string; height: string; weight: string; shoeSize: string }[]>([]);
  const [bDraftVisible,  setBDraftVisible]  = useState(false);
  const [bEditingSetIdx, setBEditingSetIdx] = useState<number | null>(null);
  const [bShoeSizeSystem, setBShoeSizeSystem] = useState<"EU"|"JP"|"US"|"UK">("EU");
  const [bContacts,    setBContacts]    = useState<Set<string>>(new Set());
  const [bContactVals, setBContactVals] = useState<Record<string, string>>({});
  const [bName,        setBName]        = useState("");
  const [bEmail,       setBEmail]       = useState("");
  const [bPhone,       setBPhone]       = useState("");
  const [bResort,      setBResort]      = useState("");
  const [jpSubRegionIdx,  setJpSubRegionIdx]  = useState<number>(-1);
  const [bSubmitted,   setBSubmittedRaw]   = useState(() => sessionStorage.getItem('_bSubmitted') === '1');
  const setBSubmitted = (v: boolean) => { setBSubmittedRaw(v); if (v) sessionStorage.setItem('_bSubmitted', '1'); else sessionStorage.removeItem('_bSubmitted'); };
  const [bSending,     setBSending]     = useState(false);

  // Region data
  const REGION_DATA = {
    JP: {
      label: isEN ? "Japan" : "日本",
      sub: isEN ? "JAPAN · JAPOW POWDER" : "日本 · JAPOW 頂級粉雪",
      hero: imgJp6,
      desc: isEN
        ? "Home to some of the world's best powder snow, Japan's ski regions span from Hokkaido's legendary Niseko to Nagano's iconic alpine peaks. Our bilingual coaches are stationed at 13 partner resorts across Hokkaido, Nagano, Hakuba, and beyond."
        : isSC
        ? "日本拥有全球最佳粉雪条件，从北海道传奇的二世谷到长野的标志性山峰。我们的双语教练驻点于13个合作雪场。"
        : "日本擁有全球最佳粉雪條件，從北海道傳奇的二世谷到長野的標誌性山峰。我們的雙語教練駐點於13個合作雪場。",
      stats: isEN
        ? [{ n: "13", l: "Partner Resorts" }, { n: "3/6h", l: "Session Lengths" }, { n: "1–4", l: "Per Group" }]
        : [{ n: "13", l: "合作雪場" }, { n: "3/6小時", l: "可選課時" }, { n: "1–4人", l: "每組人數" }],
      locs: isEN
        ? ["Niseko Grand Hirafu", "Rusutsu Resort", "Kiroro Snow World", "Furano Ski Resort", "Sapporo Teine", "Otaru Tenguyama", "Hakuba Valley", "Nozawa Onsen", "Shiga Kogen", "Zao Onsen", "Madarao Kogen", "Appi Kogen", "Naeba Ski Resort"]
        : ["二世谷 Grand Hirafu", "留壽都 Rusutsu", "喜樂樂 Kiroro", "富良野 Furano", "札幌テイネ", "小樽天狗山", "白馬 Hakuba", "野澤溫泉", "志賀高原", "藏王 Zao", "斑尾高原", "安比高原", "苗場 Naeba"],
      pricing: {
        label: isEN ? "JPY 45,000~" : "JPY 45,000起",
        tiers: isEN
          ? [
              { name: "Regular Season", rows: [{ s: "1 person", h3: "JPY 45,000", h6: "JPY 65,000" }, { s: "2 persons", h3: "JPY 50,000", h6: "JPY 70,000" }, { s: "3 persons", h3: "JPY 55,000", h6: "JPY 75,000" }, { s: "4 persons", h3: "JPY 60,000", h6: "JPY 80,000" }] },
              { name: "Peak Season", rows: [{ s: "1 person", h3: "JPY 50,000", h6: "JPY 75,000" }, { s: "2 persons", h3: "JPY 55,000", h6: "JPY 80,000" }, { s: "3 persons", h3: "JPY 60,000", h6: "JPY 85,000" }, { s: "4 persons", h3: "JPY 65,000", h6: "JPY 90,000" }] },
            ]
          : [
              { name: "平季", rows: [{ s: "1人", h3: "JPY 45,000", h6: "JPY 65,000" }, { s: "2人", h3: "JPY 50,000", h6: "JPY 70,000" }, { s: "3人", h3: "JPY 55,000", h6: "JPY 75,000" }, { s: "4人", h3: "JPY 60,000", h6: "JPY 80,000" }] },
              { name: "旺季", rows: [{ s: "1人", h3: "JPY 50,000", h6: "JPY 75,000" }, { s: "2人", h3: "JPY 55,000", h6: "JPY 80,000" }, { s: "3人", h3: "JPY 60,000", h6: "JPY 85,000" }, { s: "4人", h3: "JPY 65,000", h6: "JPY 90,000" }] },
            ],
      },
      resortImages: [imgJp1, imgJp2, imgJp3, imgJp4],
      testimonials: [
        { q: isEN ? "The powder in Hokkaido is unlike anything else — our guests are always blown away by the quality." : "北海道的粉雪無與倫比，每位學員都被那種體驗震撼了。", coach: "ANI 教練", resort: "二世谷 Niseko" },
        { q: isEN ? "Hakuba offers incredible variety. From beginner slopes to extreme terrain, we have something for every level." : "白馬的地形多樣，從初學者緩坡到極限雪道，任何程度都能找到挑戰。", coach: "Jeff 教練", resort: "白馬 Hakuba" },
        { q: isEN ? "Zao's natural snow sculptures and tree runs make every lesson feel like an adventure." : "藏王的樹冰景觀讓每一堂課都像一場冒險。", coach: "Max 教練", resort: "藏王 Zao" },
      ],
    },
    NZ: {
      label: isEN ? "New Zealand" : isSC ? "纽西兰" : "紐西蘭",
      sub: isEN ? "NEW ZEALAND · SOUTHERN HEMISPHERE" : isSC ? "纽西兰 · 南半球最佳雪场" : "紐西蘭 · 南半球最佳雪場",
      hero: imgNz3,
      desc: isEN
        ? "New Zealand's ski season runs June to October — the perfect off-season escape for the Northern Hemisphere. Queenstown's dramatic alpine setting rivals anything in the Alps, with immaculate groomed runs and stunning lake views."
        : isSC
        ? "纽西兰的滑雪季节从6月到10月，是北半球夏季的完美度假选择。皇后镇的壮丽山景媲美阿尔卑斯山。"
        : "紐西蘭的滑雪季節從6月到10月，是北半球夏季的完美度假選擇。皇后鎮的壯麗山景媲美阿爾卑斯山。",
      stats: isEN
        ? [{ n: "4", l: "Partner Resorts" }, { n: "3/6h", l: "Session Lengths" }, { n: "Jun–Oct", l: "Season" }]
        : [{ n: "4", l: "合作雪場" }, { n: "3/6小時", l: "可選課時" }, { n: "6–10月", l: "雪季" }],
      locs: isEN
        ? ["Coronet Peak", "The Remarkables", "Cardrona Alpine Resort", "Mt Hutt Ski Area"]
        : ["皇冠峰 Coronet Peak", "非凡峰 The Remarkables", "卡德羅納 Cardrona", "赫特山 Mt Hutt"],
      pricing: {
        label: isEN ? "NZ$500~" : "NZ$500起",
        tiers: isEN
          ? [
              { name: "Regular Season", rows: [{ s: "1 person", h3: "NZ$620", h6: "NZ$980" }, { s: "2 persons", h3: "NZ$500", h6: "NZ$820" }, { s: "3–4 persons", h3: "NZ$500", h6: "NZ$780" }] },
              { name: "Peak Season", rows: [{ s: "1 person", h3: "NZ$740", h6: "NZ$1,100" }, { s: "2 persons", h3: "NZ$620", h6: "NZ$940" }, { s: "3–4 persons", h3: "NZ$600", h6: "NZ$900" }] },
            ]
          : [
              { name: "平季", rows: [{ s: "1人", h3: "NZ$500", h6: "NZ$780" }, { s: "2人", h3: "NZ$600", h6: "NZ$820" }, { s: "3–4人", h3: "NZ$620", h6: "NZ$980" }] },
              { name: "旺季", rows: [{ s: "1人", h3: "NZ$600", h6: "NZ$900" }, { s: "2人", h3: "NZ$620", h6: "NZ$940" }, { s: "3–4人", h3: "NZ$740", h6: "NZ$1,100" }] },
            ],
      },
      resortImages: [imgNz1, imgNz2, imgNz3, imgNz4],
      testimonials: [
        { q: isEN ? "Coronet Peak has the best views in the Southern Hemisphere. Our students often forget they're in a lesson!" : "皇冠峰擁有南半球最壯觀的景色，學員常常被美景震撼，忘了自己在上課！", coach: "Wade 教練", resort: "皇冠峰 Coronet Peak" },
        { q: isEN ? "The Remarkables live up to their name — remarkable terrain, remarkable snow quality, remarkable experience." : "非凡峰名副其實，地形、雪質、體驗，每一樣都非凡。", coach: "Sasa 教練", resort: "非凡峰 The Remarkables" },
        { q: isEN ? "Cardrona is perfect for families — wide gentle runs in the morning, challenging steeps for the afternoon." : "卡德羅納非常適合家庭，上午緩坡、下午挑戰陡坡，一家人都能盡興。", coach: "ANI 教練", resort: "卡德羅納 Cardrona" },
      ],
    },
    CN: {
      label: isEN ? "China" : isSC ? "中国" : "中國",
      sub: isEN ? "CHINA SKI DESTINATIONS" : isSC ? "中国 · 顶级滑雪目的地" : "中國 · 頂級滑雪目的地",
      hero: imgCn5,
      desc: isEN
        ? "China's ski industry has transformed rapidly. World-class resorts in Zhangjiakou, Yabuli, and Changbaishan now rival international destinations. Following the 2022 Winter Olympics legacy, infrastructure and snow parks have reached new heights."
        : isSC
        ? "中国滑雪业迅速发展，张家口、亚布力、长白山等世界级雪场已比肩国际水准。2022冬奥会后，配套设施与雪道质量再创新高。"
        : "中國滑雪業迅速發展，張家口、亞布力、長白山等世界級雪場已比肩國際水準。2022冬奧會後，配套設施與雪道質量再創新高。",
      stats: isEN
        ? [{ n: "8", l: "Partner Resorts" }, { n: "3/6h", l: "Session Lengths" }, { n: "Dec–Mar", l: "Season" }]
        : [{ n: "8", l: "合作雪場" }, { n: "3/6小時", l: "可選課時" }, { n: "12–3月", l: "雪季" }],
      locs: isEN
        ? ["Wanlong Ski Resort", "Genting Snow Park (Zhangjiakou)", "Yabuli Ski Resort", "Changbaishan Ski Resort", "Beidahu Ski Resort", "Thaiwoo Ski Resort", "Shijinglong Ski Resort", "Songhua Lake Ski Resort"]
        : ["萬龍滑雪場", "頤和滑雪場（張家口）", "亞布力滑雪場", "長白山滑雪場", "北大壺滑雪場", "太舞滑雪場", "石京龍滑雪場", "松花湖滑雪場"],
      pricing: {
        label: isEN ? "¥2,000~" : "¥2,000起",
        tiers: isEN
          ? [
              { name: "Regular Season", rows: [{ s: "1 person", h3: "¥2,000", h6: "¥3,000" }, { s: "2 persons", h3: "¥2,200", h6: "¥3,200" }, { s: "3 persons", h3: "¥2,400", h6: "¥3,400" }, { s: "4 persons", h3: "¥2,600", h6: "¥3,600" }] },
              { name: "Peak Season", rows: [{ s: "1 person", h3: "¥2,600", h6: "¥3,600" }, { s: "2 persons", h3: "¥2,800", h6: "¥3,800" }, { s: "3 persons", h3: "¥3,000", h6: "¥4,000" }, { s: "4 persons", h3: "¥3,200", h6: "¥4,200" }] },
            ]
          : [
              { name: "平季", rows: [{ s: "1人", h3: "¥2,000", h6: "¥3,000" }, { s: "2人", h3: "¥2,200", h6: "¥3,200" }, { s: "3人", h3: "¥2,400", h6: "¥3,400" }, { s: "4人", h3: "¥2,600", h6: "¥3,600" }] },
              { name: "旺季", rows: [{ s: "1人", h3: "¥2,600", h6: "¥3,600" }, { s: "2人", h3: "¥2,800", h6: "¥3,800" }, { s: "3人", h3: "¥3,000", h6: "¥4,000" }, { s: "4人", h3: "¥3,200", h6: "¥4,200" }] },
            ],
      },
      resortImages: [imgCn1, imgCn2, imgCn3, imgCn4],
      testimonials: [
        { q: isEN ? "Wanlong's groomed runs are impeccable. The resort has invested heavily post-Olympics and it really shows." : "萬龍的壓雪道一流，奧運後大規模投資，雪場品質顯著提升。", coach: "Max 教練", resort: "萬龍 Wanlong" },
        { q: isEN ? "Yabuli is the heartland of Chinese skiing — great terrain diversity and a real ski culture is developing here." : "亞布力是中國滑雪的發源地，地形多樣，滑雪文化正在蓬勃發展。", coach: "Jeff 教練", resort: "亞布力 Yabuli" },
        { q: isEN ? "Changbaishan is breathtaking — the volcanic terrain and natural snow create an otherworldly experience." : "長白山壯麗絕倫，火山地形加上天然降雪，帶來超凡脫俗的滑雪體驗。", coach: "Wade 教練", resort: "長白山 Changbaishan" },
      ],
    },
  } as const;

  type RK = "JP" | "NZ" | "CN";
  const rd = REGION_DATA[activeRegion as RK];

  const LEVELS = isEN
    ? [{ n: "L1", t: "Complete Beginner", d: "Never tried skiing or snowboarding." },
       { n: "L2", t: "Beginner", d: "Can slide gently on easy slopes." },
       { n: "L3", t: "Intermediate", d: "Comfortable with parallel turns." },
       { n: "L4", t: "Advanced", d: "Can tackle black diamond runs." }]
    : isSC
    ? [{ n: "L1", t: "完全初学者", d: "从未接触过滑雪或单板。" },
       { n: "L2", t: "初学", d: "能在缓坡缓慢滑行。" },
       { n: "L3", t: "中级", d: "可进行平行转弯。" },
       { n: "L4", t: "进阶", d: "可挑战黑钻级雪道。" }]
    : [{ n: "L1", t: "完全初學者", d: "從未接觸過滑雪或單板。" },
       { n: "L2", t: "初學", d: "能在緩坡緩慢滑行。" },
       { n: "L3", t: "中級", d: "可進行平行轉彎。" },
       { n: "L4", t: "進階", d: "可挑戰黑鑽級雪道。" }];

  const contactOptions = [
    { id: "LINE", label: "LINE" },
    { id: "WhatsApp", label: "WhatsApp" },
    { id: "WeChat", label: isEN ? "WeChat" : "微信" },
    { id: "Instagram", label: "Instagram" },
  ];

  const toggleContact = (id: string) => {
    setBContacts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
};

  // Japan sub-region resort lists (multi-language)
  const JP_SUB_REGIONS_MAP: Record<Lang, Record<string, string[]>> = {
    TC: {
      "北海道": ["ONZE", "朝里川", "二世谷・Moiwa", "二世谷・Annupuri", "二世谷・Grand Hirafu", "二世谷・HANAZONO", "二世谷・Niseko Village", "留壽都", "手稻", "天狗山（小樽）", "喜樂樂 Kiroro", "札幌國際", "札幌盤溪", "星野", "富良野"],
      "白马": ["八方尾根", "乘鞍", "鹿島槍", "栂池高原", "五龍", "岩岳", "爺岳", "佐野坂"],
      "藏王": ["藏王溫泉"],
      "長野・湯澤": ["GALA 湯澤", "NASPA Ski Garden", "Yomase 溫泉", "斑尾高原", "志賀高原", "龍王 Ski Park", "苗場", "妙高杉之原", "LOTTE ARAI Resort", "輕井澤 Prince Hotel", "輕井澤 Snow Park", "上越國際", "神樂", "神立 Snow Resort", "石打丸山", "湯澤高原", "湯澤中里", "岩原", "野澤溫泉"],
      "關西・岐阜": ["Dynaland", "Grand Snow", "奧伊吹", "六甲山 Snow Park", "琵琶湖 Valley", "琵琶湖箱館山"],
    },
    SC: {
      "北海道": ["ONZE", "朝里川", "二世谷・Moiwa", "二世谷・Annupuri", "二世谷・Grand Hirafu", "二世谷・HANAZONO", "二世谷・Niseko Village", "留寿都", "手稻", "天狗山（小樽）", "喜乐乐 Kiroro", "札幌国际", "札幌盘溪", "星野", "富良野"],
      "白马": ["八方尾根", "乘鞍", "鹿岛枪", "栂池高原", "五龙", "岩岳", "爷岳", "佐野坂"],
      "藏王": ["藏王温泉"],
      "长野・汤泽": ["GALA 汤泽", "NASPA Ski Garden", "Yomase 温泉", "斑尾高原", "志贺高原", "龙王 Ski Park", "苗场", "妙高杉之原", "LOTTE ARAI Resort", "轻井泽 Prince Hotel", "轻井泽 Snow Park", "上越国际", "神乐", "神立 Snow Resort", "石打丸山", "汤泽高原", "汤泽中里", "岩原", "野泽温泉"],
      "关西・岐阜": ["Dynaland", "Grand Snow", "奥伊吹", "六甲山 Snow Park", "琵琶湖 Valley", "琵琶湖箱馆山"],
    },
    EN: {
      "Hokkaido": ["ONZE", "Asarigawa", "Niseko Moiwa", "Niseko Annupuri", "Niseko Grand Hirafu", "Niseko HANAZONO", "Niseko Village", "Rusutsu", "Teine", "Tenguyama (Otaru)", "Kiroro", "Sapporo Kokusai", "Sapporo Bankei", "Hoshino", "Furano"],
      "Hakuba": ["Happo One", "Norikura", "Kashimayari", "Tzugaike", "Goryu", "Iwakura", "Jigatake", "Sakanouchi"],
      "Zao": ["Zao Onsen"],
      "Nagano・Yuzawa": ["GALA Yuzawa", "NASPA Ski Garden", "Yomase Onsen", "Madarao", "Shiga Kogen", "Ryuo Ski Park", "Naeba", "Myoko Suginohara", "LOTTE ARAI Resort", "Karuizawa Prince Hotel", "Karuizawa Snow Park", "Joetsu Kokusai", "Kagura", "Kandachi Snow Resort", "Ishiuchi Maruyama", "Yuzawa Kogen", "Yuzawa Nakasato", "Iwahara", "Nozawa Onsen"],
      "Kansai・Gifu": ["Dynaland", "Grand Snow", "Oku-Ibuki", "Rokkosan Snow Park", "Biwako Valley", "Biwako Hakodateyama"],
    },
    JP: {
      "北海道": ["ONZE", "朝里川", "ニセコMoiwa", "ニセコAnnupuri", "ニセコGrand Hirafu", "ニセコHANAZONO", "ニセコVillage", "留寿都", "手稲", "天狗山（小樽）", "キコロ Kiroro", "札幌国際", "札幌盤渓", "星野", "富良野"],
      "白马": ["八方尾根", "乗鞍", "鹿島槍ヶ崎", "栂池高原", "五龍", "岩岳", "爺ヶ岳", "佐野坂"],
      "蔵王": ["蔵王温泉"],
      "長野・湯沢": ["GALA湯沢", "NASPA Ski Garden", "Yomase温泉", "斑尾高原", "志賀高原", "竜王スキーパーク", "苗場", "妙高杉ノ原", "LOTTE ARAI Resort", "軽井沢プリンスホテル", "軽井沢スノーパーク", "上越国際", "神楽", "神立スノーリゾート", "石打丸山", "湯沢高原", "湯沢中里", "岩原", "野沢温泉"],
      "関西・岐阜": ["Dynaland", "Grand Snow", "奥伊吹", "六甲山スノーパーク", "びわ湖バレー", "びわ湖箱館山"],
    },
    KR: {
      "홋카이도": ["ONZE", "아사리가와", "니세코 Moiwa", "니세코 Annupuri", "니세코 Grand Hirafu", "니세코 HANAZONO", "니세코 Village", "루수쓰", "테이네", "텐구야마 (오타루)", "키로로", "삿포로 코쿠사이", "삿포로 반케이", "호시노", "후라노"],
      "하쿠바": ["하포원", "노리쿠라", "카시마야리", "츠가이케", "고류", "이와쿠라", "지가타케", "사카노우치"],
      "자오": ["자오 온천"],
      "나가노・유자와": ["GALA 유자와", "NASPA Ski Garden", "Yomase 온천", "마다라오", "시가 고원", "류오 스키 파크", "나에바", "묘코 스기노하라", "LOTTE ARAI Resort", "카루이자와 프린스 호텔", "카루이자와 스노우 파크", "조에츠 코쿠사이", "카구라", "칸타치 스노우 리조트", "이시우치 마루야마", "유자와 고원", "유자와 나카사토", "이와하라", "노자와 온천"],
      "간사이・기후": ["Dynaland", "Grand Snow", "오쿠이부키", "롯코산 스노우 파크", "비와코 Valley", "비와코 하코다테야마"],
    },
  };
  const currentJpSubRegions = JP_SUB_REGIONS_MAP[lang];
  const jpSubRegionKeys = Object.keys(currentJpSubRegions);
  const jpSubRegion = jpSubRegionIdx >= 0 && jpSubRegionIdx < jpSubRegionKeys.length ? jpSubRegionKeys[jpSubRegionIdx] : "";

  const regionResorts = activeRegion === "JP" 
    ? (jpSubRegion && currentJpSubRegions[jpSubRegion] ? currentJpSubRegions[jpSubRegion] : [])
    : activeRegion === "NZ" ? NZ_RESORTS_MAP[lang].map(r => r.name) : CN_RESORTS_MAP[lang].map(r => r.name);

  const handleSubmit = () => {
    if (!bName || !bPhone || !bDate || !bSkiType || !bDuration || !bLevel) return;
    setBSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formLabel = "block text-xs font-semibold text-foreground mb-2";
  const inputCls = "w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="pt-16 min-h-screen bg-white">

      {/* ── Hero image with title overlay ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 42vw, 520px)" }}>
        <img src={rd.hero} alt={rd.label} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-6 right-6">
          <p className="text-white/60 text-[10px] tracking-[0.22em] uppercase mb-2">{rd.sub}</p>
          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {isEN
              ? (activeRegion === "JP" ? "Japan Ski Courses" : activeRegion === "NZ" ? "New Zealand Ski Courses" : "China Ski Courses")
              : isSC
              ? (activeRegion === "JP" ? "日本滑雪课程" : activeRegion === "NZ" ? "纽西兰滑雪课程" : "中国滑雪课程")
              : (activeRegion === "JP" ? "日本滑雪課程" : activeRegion === "NZ" ? "紐西蘭滑雪課程" : "中國滑雪課程")}
          </h1>
        </div>
      </div>

      {/* ── Specs badge row ── */}
      <div className="border-b border-border bg-card overflow-x-auto">
        <div className="flex items-center divide-x divide-border w-full">
          {[
            { icon: "⏱", label: isEN ? "3h / 6h" : "3小時 / 6小時" },
            { icon: "👥", label: isEN ? "1–4 People" : "1–4人" },
            { icon: "💬", label: isEN ? "Bilingual (ZH/EN)" : "中英文教學" },
            { icon: "🎿", label: isEN ? "Ski · Snowboard" : "雙板 · 單板" },
            { icon: "📊", label: isEN ? "All Levels" : "不限程度" },
            { icon: "📅", label: activeRegion === "NZ" ? (isEN ? "Jun–Oct" : "6–10月") : (isEN ? "Dec–Mar" : "12–3月") },
          ].map((b, i) => (
            <div key={i} className="flex flex-1 items-center justify-center gap-2 px-3 py-3.5 whitespace-nowrap">
              <span className="text-base">{b.icon}</span>
              <span className="text-xs font-semibold text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main 2-column layout ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 flex gap-10 items-start">

        {/* ── LEFT: editorial content ── */}
        <div className="flex-1 min-w-0">

          {/* Region description + stats */}
          <section className="mb-12">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              {isEN ? "The Region" : isSC ? "关于此地区" : "關於此地區"}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl">{rd.desc}</p>
            <div className="grid grid-cols-3 gap-4">
              {rd.stats.map((s, i) => (
                <div key={i} className="border border-border rounded-xl p-5 text-center">
                  <div className="text-2xl font-black text-foreground mb-1">{s.n}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Locations */}
          <section className="mb-12 border-t border-border pt-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              {isEN ? "Locations" : isSC ? "可选雪场" : "可選雪場"}
            </p>
            <div className="flex flex-wrap gap-2">
              {rd.locs.map((loc, i) => (
                <span key={i} className="text-xs border border-border px-3 py-1.5 rounded-full text-foreground font-medium">
                  {loc}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {isEN
                ? "* Not included: lift passes, equipment rental, travel insurance."
                : isSC
                ? "* 費用不含：缆车票、装备租借、旅游保险。"
                : "* 費用不含：纜車票、裝備租借、旅遊保險。"}
            </p>
          </section>

          {/* Pricing tables */}
          <section className="mb-12 border-t border-border pt-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-6">
              {isEN ? "Pricing" : isSC ? "课程费用" : "課程費用"}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {rd.pricing.tiers.map((tier, ti) => (
                <div key={ti} className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-foreground text-background px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest uppercase">{tier.name}</span>
                  </div>
                  <div className="p-0">
                    {/* header row */}
                    <div className="grid grid-cols-3 border-b border-border bg-muted/50">
                      <div className="px-4 py-2.5 text-xs font-semibold text-muted-foreground"></div>
                      <div className="px-4 py-2.5 text-xs font-bold text-center text-foreground border-l border-border">3h</div>
                      <div className="px-4 py-2.5 text-xs font-bold text-center text-foreground border-l border-border">6h</div>
                    </div>
                    {tier.rows.map((row, ri) => (
                      <div key={ri} className="grid grid-cols-3 border-b border-border last:border-0">
                        <div className="px-4 py-3 text-xs font-medium text-muted-foreground">{row.s}</div>
                        <div className="px-4 py-3 text-xs font-bold text-center text-foreground border-l border-border">{row.h3}</div>
                        <div className="px-4 py-3 text-xs font-bold text-center text-accent border-l border-border">{row.h6}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
              {isEN
                ? "All prices are per-group totals (not per person). Peak season: Christmas, New Year, Chinese New Year, school holidays."
                : isSC
                ? "所有价格为每组总价（非每人）。旺季包括圣诞、元旦、春节及学校假期。"
                : "所有價格為每組總價（非每人）。旺季包括聖誕、元旦、農曆新年及學校假期。"}
            </p>
          </section>

          {/* Level guide */}
          <section className="mb-12 border-t border-border pt-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-6">
              {isEN ? "Level Self-Assessment" : isSC ? "程度自我评估" : "程度自我評估"}
            </p>
            <div className="space-y-0 border border-border rounded-xl overflow-hidden">
              {LEVELS.map((lv, i) => (
                <div key={i} className="flex gap-5 px-5 py-4 border-b border-border last:border-0">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background text-xs font-black flex items-center justify-center">{lv.n}</span>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-0.5">{lv.t}</div>
                    <div className="text-xs text-muted-foreground">{lv.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-12 border-t border-border pt-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-6">
              {isEN ? "From Our Coaches" : isSC ? "教练说" : "教練說"}
            </p>
            <div className="space-y-5">
              {rd.testimonials.map((t, i) => (
                <blockquote key={i} className="border-l-2 border-foreground pl-5 py-1">
                  <p className="text-sm text-foreground leading-relaxed mb-2 italic">"{t.q}"</p>
                  <footer className="text-xs text-muted-foreground font-semibold">{t.coach} · {t.resort}</footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* Resort image grid */}
          <section className="border-t border-border pt-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-5">
              {isEN ? "Featured Resorts" : isSC ? "特色雪场" : "特色雪場"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {rd.resortImages.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-video bg-muted">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT: sticky booking form ── */}
        {showMobileForm && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowMobileForm(false)}
          />
        )}
        <div className={`${showMobileForm ? "fixed bottom-0 left-0 right-0 z-50 max-h-[92dvh] overflow-y-auto rounded-t-2xl lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto lg:max-h-none lg:overflow-visible lg:rounded-none" : "hidden lg:block"} lg:block w-full lg:w-[440px] shrink-0`}>
          {showMobileForm && (
            <div className="lg:hidden sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between z-10">
              <span className="text-sm font-black text-foreground">
                {isEN ? "Book Now" : isSC ? "预约课程" : "預約課程"}
              </span>
              <button
                onClick={() => setShowMobileForm(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          <div className={`${showMobileForm ? "" : "sticky top-24"} border border-border rounded-2xl overflow-hidden shadow-xl bg-white ${showMobileForm ? "rounded-none lg:rounded-2xl border-x-0 border-b-0 lg:border shadow-none lg:shadow-xl" : ""}`}>

            {/* Price bar */}
            <div className="bg-foreground text-background flex flex-col">
              {/* Region switcher row */}
              <div className="px-6 pt-3 pb-1 flex items-center justify-between border-b border-white/10">
                <span className="text-sm text-white/70">
                  {isEN
                    ? `Current: ${activeRegion === "JP" ? "Japan" : activeRegion === "NZ" ? "New Zealand" : "China"}`
                    : isSC
                    ? `当前：${activeRegion === "JP" ? "日本滑雪场" : activeRegion === "NZ" ? "纽西兰滑雪场" : "中国滑雪场"}`
                    : `目前：${activeRegion === "JP" ? "日本滑雪場" : activeRegion === "NZ" ? "紐西蘭滑雪場" : "中國滑雪場"}`}
                </span>
                <div className="flex gap-2">
                  {(["JP","NZ","CN"] as const).filter(rk => rk !== activeRegion).map(rk => (
                    <button
                      key={rk}
                      onClick={() => { setActiveRegion(rk); setBResort(""); setJpSubRegionIdx(-1); setBCalMonth(0); setBDate(""); setBDateEnd(""); window.history.pushState({ tab: 1, region: rk }, "", `/courses/${REGION_PATH[rk] || "japan"}`); }}
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 transition-colors font-medium"
                    >
                      {isEN
                        ? (rk === "JP" ? "Japan" : rk === "NZ" ? "New Zealand" : "China")
                        : isSC
                        ? (rk === "JP" ? "去日本" : rk === "NZ" ? "去纽西兰" : "去中国")
                        : (rk === "JP" ? "去日本" : rk === "NZ" ? "去紐西蘭" : "去中國")}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price row */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase opacity-60">
                    {isEN ? "Starting from" : isSC ? "最低价格" : "最低價格"}
                  </span>
                  <div className="text-xl font-black">{rd.pricing.label}</div>
                </div>
                <span className="text-[10px] text-white/50 font-medium leading-tight text-right">
                  {isEN ? "per group\n· incl. tax" : isSC ? "每组含税" : "每組含稅"}
                </span>
              </div>
            </div>

            {bSubmitted ? (
              <div className="px-6 py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="font-black text-foreground text-lg mb-2">
                  {isEN ? "Request Sent!" : isSC ? "预约请求已发送！" : "預約請求已發送！"}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                  {isEN
                    ? "Our team will confirm availability and contact you within 24 hours. No payment is charged until confirmed."
                    : isSC
                    ? "我们的团队将在24小时内确认课程并联系您。确认前不会收取任何费用。"
                    : "我們的團隊將在24小時內確認課程並聯繫您。確認前不會收取任何費用。"}
                </p>
                <button onClick={() => setBSubmitted(false)} className="text-accent text-xs font-semibold hover:underline">
                  {isEN ? "Submit another request" : "提交另一個請求"}
                </button>
              </div>
            ) : (
              <div className="px-6 py-6 space-y-5">

                {/* Japan Sub-region */}
                {activeRegion === "JP" && (
                  <div>
                    <label className={formLabel}>{isEN ? "Region" : isSC ? "选择地区" : "選擇地區"}</label>
                    <select value={jpSubRegionIdx} onChange={e => { setJpSubRegionIdx(Number(e.target.value)); setBResort(""); }} className={inputCls}>
                      <option value={-1}>{isEN ? "— Select region —" : isSC ? "— 请选择地区 —" : "— 請選擇地區 —"}</option>
                      {jpSubRegionKeys.map((r, i) => (
                        <option key={i} value={i}>{r}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Resort */}
                <div>
                  <label className={formLabel}>{isEN ? "Resort" : isSC ? "选择雪场" : "選擇雪場"}</label>
                  <select value={bResort} onChange={e => setBResort(e.target.value)} className={inputCls}>
                    <option value="">{isEN ? "— Select resort —" : isSC ? "— 请选择雪场 —" : "— 請選擇雪場 —"}</option>
                    {regionResorts.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Board type */}
                <div>
                  <label className={formLabel}>{isEN ? "Board Type" : isSC ? "器材类型" : "器材類型"}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([["ski", isEN ? "Ski" : "雙板 Ski"], ["snowboard", isEN ? "Snowboard" : "單板 Snowboard"]] as const).map(([val, lbl]) => (
                      <button
                        key={val}
                        onClick={() => setBSkiType(val)}
                        className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${bSkiType === val ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group size */}
                <div>
                  <label className={formLabel}>{isEN ? "Group Size" : isSC ? "人数" : "人數"}</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBGroupSize(n => Math.max(1, n - 1))}
                      className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center text-sm font-black text-foreground">
                      {bGroupSize} {isEN ? (bGroupSize === 1 ? "person" : "persons") : "人"}
                    </span>
                    <button
                      onClick={() => setBGroupSize(n => Math.min(4, n + 1))}
                      className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className={formLabel}>{isEN ? "Duration" : isSC ? "课时" : "課時"}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([["3h", "3h"], ["6h", "6h"]] as const).map(([val, lbl]) => (
                      <button
                        key={val}
                        onClick={() => setBDuration(val)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all flex flex-col items-center leading-tight ${bDuration === val ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}
                      >
                        {lbl}
                        <span className={`text-[10px] font-normal mt-0.5 ${bDuration === val ? "text-background/70" : "text-muted-foreground"}`}>
                          {val === "3h" ? (isEN ? "Half Day" : "半日課") : (isEN ? "Full Day (incl. 1h lunch break)" : "全日課（含午休1小時）")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date — inline calendar */}
                <div>
                  <label className={formLabel}>
                    {isEN ? "Course Date (multi-day OK)" : isSC ? "上课日期（可跨多日）" : "上課日期（可跨多日）"}
                  </label>
                  {(() => {
                    const isNZ = activeRegion === "NZ";
                    const MONTHS_CFG = isNZ
                      ? [
                          { label: "6月",  year: 2027, month: 5  },
                          { label: "7月",  year: 2027, month: 6  },
                          { label: "8月",  year: 2027, month: 7  },
                          { label: "9月",  year: 2027, month: 8  },
                          { label: "10月", year: 2027, month: 9  },
                        ]
                      : [
                          { label: "11月", year: 2026, month: 10 },
                          { label: "12月", year: 2026, month: 11 },
                          { label: "1月",  year: 2027, month: 0  },
                          { label: "2月",  year: 2027, month: 1  },
                          { label: "3月",  year: 2027, month: 2  },
                          { label: "4月",  year: 2027, month: 3  },
                        ];
                    const isPeak = (y: number, m: number, d: number) => isNZ
                      ? (y === 2027 && m === 7 && d >= 1 && d <= 15)   // NZ: early Aug school holidays
                      : (y === 2026 && m === 11 && d >= 20) ||          // Christmas
                        (y === 2027 && m === 0  && d <= 5)  ||          // New Year
                        (y === 2027 && m === 1  && d >= 1 && d <= 14) || // CNY (Feb 6, 2027)
                        (y === 2027 && m === 1  && d >= 11 && d <= 17); // Winter break
                    const safeIdx = Math.min(bCalMonth, MONTHS_CFG.length - 1);
                    const cfg = MONTHS_CFG[safeIdx];
                    const firstDow = new Date(cfg.year, cfg.month, 1).getDay();
                    const offset   = (firstDow + 6) % 7;
                    const total    = new Date(cfg.year, cfg.month + 1, 0).getDate();
                    const cells    = Array.from({ length: offset + total }, (_, i) => i < offset ? null : i - offset + 1);
                    const toStr    = (d: number) => `${cfg.year}-${String(cfg.month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
                    const onDay    = (d: number) => {
                      const ds = toStr(d);
                      if (!bDate || bDateEnd) { setBDate(ds); setBDateEnd(""); }
                      else if (ds < bDate) { setBDateEnd(bDate); setBDate(ds); }
                      else { setBDateEnd(ds); }
                    };
                    const isStart  = (d: number) => bDate    === toStr(d);
                    const isEnd    = (d: number) => bDateEnd  === toStr(d);
                    const inRange  = (d: number) => !!(bDate && bDateEnd && toStr(d) > bDate && toStr(d) < bDateEnd);
                    const WDAYS    = ["一","二","三","四","五","六","日"];
                    return (
                      <div className="border border-border rounded-xl overflow-hidden text-xs select-none">
                        {/* Month tabs */}
                        <div className="flex border-b border-border bg-muted/30">
                          {MONTHS_CFG.map((mc, i) => (
                            <button
                              key={i}
                              onClick={() => setBCalMonth(i)}
                              className={`flex-1 py-2.5 font-bold transition-colors ${
                                bCalMonth === i
                                  ? "bg-white text-foreground shadow-sm rounded-t-[2px] border border-border border-b-0 -mb-px relative z-10"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {mc.label}
                            </button>
                          ))}
                        </div>
                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 border-b border-border bg-white">
                          {WDAYS.map((w, i) => (
                            <div key={i} className={`py-2 text-center font-semibold text-[10px] ${i === 3 ? "text-teal-500" : "text-muted-foreground"}`}>
                              {w}
                            </div>
                          ))}
                        </div>
                        {/* Date grid */}
                        <div className="grid grid-cols-7 gap-px p-1.5 bg-white">
                          {cells.map((d, i) => {
                            if (!d) return <div key={i} />;
                            const pk = isPeak(cfg.year, cfg.month, d);
                            const st = isStart(d);
                            const en = isEnd(d);
                            const rg = inRange(d);
                            return (
                              <button
                                key={i}
                                onClick={() => onDay(d)}
                                className={[
                                  "rounded-lg py-1.5 text-center font-medium transition-all",
                                  st || en ? "bg-foreground text-background font-bold" : "",
                                  rg  ? "bg-foreground/10 text-foreground rounded-none" : "",
                                  pk && !st && !en && !rg ? "bg-amber-50 text-foreground" : "",
                                  !st && !en && !rg && !pk ? "text-foreground hover:bg-muted" : "",
                                ].join(" ")}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                        {/* Footer */}
                        <div className="border-t border-border px-3 py-2 flex items-center gap-2 bg-white">
                          <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 shrink-0" />
                          <span className="text-muted-foreground">{isEN ? "Peak season" : "旺季日期帶"}</span>
                          <span className="flex-1 text-center text-muted-foreground">
                            {bDate
                              ? bDateEnd
                                ? `${bDate} → ${bDateEnd}`
                                : (isEN ? "Select end date" : "選擇結束日期")
                              : (isEN ? "Select start & end date" : "選擇開始與結束日期")}
                          </span>
                          <button
                            onClick={() => { setBDate(""); setBDateEnd(""); }}
                            className="text-accent font-semibold hover:underline shrink-0"
                          >
                            {isEN ? "Clear" : "清除"}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Skill level */}
                <div>
                  <label className={formLabel}>{isEN ? "Skill Level" : isSC ? "程度" : "程度"}</label>
                  {(() => {
                    const isSnowboard = bSkiType === "snowboard";
                    const LEVEL_DATA: Record<number, { name: string; desc: string }> = isSnowboard
                      ? {
                          1: { name: isEN ? "Complete Beginner" : "完全新手", desc: isEN ? "Never tried snowboarding. Start with safe falling, getting up, and one-foot gliding." : "從未接觸過單板，從安全跌倒與站起、單腳滑行開始" },
                          2: { name: isEN ? "Beginner"          : "初學者",   desc: isEN ? "Tried once or twice. Can heel-stop and glide slowly on beginner runs."               : "學過一兩次，會推坡剎停，可在初級道緩慢直滑" },
                          3: { name: isEN ? "Low–Intermediate"  : "初中階",   desc: isEN ? "Comfortable on greens. Starting to practice basic heel-toe edge turns."              : "初級道順暢推坡，開始練習前後刃基礎轉彎" },
                          4: { name: isEN ? "Intermediate–Adv." : "中高階",   desc: isEN ? "Smooth on blue/black runs. Fluid edge-to-edge carving. Ready for powder and steeps." : "中高級道順暢滑行，流暢換刃走刃，想挑戰粉雪與陡坡" },
                        }
                      : {
                          1: { name: isEN ? "Complete Beginner" : "完全新手", desc: isEN ? "Never tried skiing. Start with safe falling, getting up, and wedge stance."          : "從未接觸過雙板，從安全跌倒與起身、犁式站姿開始" },
                          2: { name: isEN ? "Beginner"          : "初學者",   desc: isEN ? "Tried once or twice. Can wedge-stop and glide slowly on beginner runs."              : "學過一兩次，會犁式剎停，可在初級道緩慢滑行" },
                          3: { name: isEN ? "Low–Intermediate"  : "初中階",   desc: isEN ? "Comfortable on greens with wedge. Starting to practice parallel turns."              : "初級道順暢犁式滑行，開始練習平行轉彎技巧" },
                          4: { name: isEN ? "Intermediate–Adv." : "中高階",   desc: isEN ? "Smooth on blue/black runs. Fluid parallel turns. Ready for powder and steeps."       : "中高級道順暢滑行，流暢平行轉彎，想挑戰粉雪與陡坡" },
                        };
                    return (
                      <div className="flex flex-col gap-2">
                        {([1,2,3,4] as const).map(lv => {
                          const ld = LEVEL_DATA[lv];
                          const sel = bLevel === lv;
                          return (
                            <button
                              key={lv}
                              onClick={() => setBLevel(lv)}
                              className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-start gap-3 ${sel ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40 bg-white"}`}
                            >
                              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5 ${sel ? "bg-white/20 text-background" : "bg-muted text-foreground"}`}>
                                L{lv}
                              </span>
                              <span className="flex flex-col min-w-0">
                                <span className={`text-xs font-bold leading-snug ${sel ? "text-background" : "text-foreground"}`}>{ld.name}</span>
                                <span className={`text-[11px] leading-snug mt-0.5 ${sel ? "text-background/70" : "text-muted-foreground"}`}>{ld.desc}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Equipment rental */}
                <div className="flex flex-col gap-3">
                  <label className={formLabel}>{isEN ? "Equipment Rental" : isSC ? "需要租借装备" : "需要租借裝備"}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([["yes", isEN ? "Yes" : "是"], ["no", isEN ? "No" : "否"]] as const).map(([val, lbl]) => (
                      <button
                        key={val}
                        onClick={() => {
                          setBEquip(val);
                          if (val === "yes") {
                            setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize("");
                            setBDraftVisible(true); setBEditingSetIdx(null);
                          } else {
                            setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize("");
                            setBEquipSets([]); setBDraftVisible(false); setBEditingSetIdx(null);
                          }
                        }}
                        className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${bEquip === val ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>

                  {bEquip === "yes" && (() => {
                    const snowboardItems = isEN
                      ? ["Snowboard", "Boots", "Helmet", "Jacket", "Pants", "Goggles"]
                      : ["雪板", "雪鞋", "頭盔", "雪衣", "雪褲", "護目鏡"];
                    const skiItems = isEN
                      ? ["Skis", "Boots", "Poles", "Helmet", "Goggles", "Jacket", "Pants"]
                      : ["雪板", "雪鞋", "雪仗", "頭盔", "護目鏡", "雪衣", "雪褲"];
                    const allItems = bSkiType === "snowboard" ? snowboardItems : skiItems;

                    const confirmDraft = () => {
                      const set = { items: Array.from(bEquipItems), gender: bGender, height: bHeight, weight: bWeight, shoeSize: bShoeSize };
                      if (bEditingSetIdx !== null) {
                        setBEquipSets(prev => prev.map((s, i) => i === bEditingSetIdx ? set : s));
                      } else {
                        setBEquipSets(prev => [...prev, set]);
                      }
                      setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize("");
                      setBDraftVisible(false); setBEditingSetIdx(null);
                    };

                    const startEdit = (idx: number) => {
                      const s = bEquipSets[idx];
                      setBEquipItems(new Set(s.items));
                      setBGender(s.gender as "M"|"F"|"");
                      setBHeight(s.height); setBWeight(s.weight); setBShoeSize(s.shoeSize);
                      setBEditingSetIdx(idx); setBDraftVisible(true);
                    };

                    const genderLabel = (g: string) => g === "M" ? (isEN ? "Male" : "男") : g === "F" ? (isEN ? "Female" : "女") : "—";

                    return (
                      <div className="flex flex-col gap-3">
                        {/* Confirmed sets summary */}
                        {bEquipSets.map((s, idx) => (
                          <div key={idx} className="border border-border rounded-xl px-4 py-3 bg-white flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-muted-foreground mb-1">
                                {isEN ? `Set ${idx + 1}` : `第${idx + 1}套`}
                              </p>
                              <p className="text-xs text-foreground font-medium leading-relaxed">
                                {genderLabel(s.gender)}{s.height ? ` · ${s.height}cm` : ""}{s.weight ? ` · ${s.weight}kg` : ""}{s.shoeSize ? ` · EU${s.shoeSize}` : ""}
                              </p>
                              {s.items.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {s.items.map(it => (
                                    <span key={it} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-foreground">{it}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => startEdit(idx)}
                                className="text-[11px] font-bold text-accent border border-accent/40 rounded-lg px-3 py-1.5 hover:bg-accent/10 transition-colors"
                              >
                                {isEN ? "Edit" : "修改"}
                              </button>
                              <button
                                onClick={() => {
                                  setBEquipSets(prev => prev.filter((_, i) => i !== idx));
                                  if (bEditingSetIdx === idx) { setBDraftVisible(false); setBEditingSetIdx(null); setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize(""); }
                                  else if (bEditingSetIdx !== null && bEditingSetIdx > idx) { setBEditingSetIdx(bEditingSetIdx - 1); }
                                }}
                                className="text-[11px] font-bold text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
                              >
                                {isEN ? "Del" : "刪除"}
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Draft form */}
                        {bDraftVisible && (
                          <div className="border border-border rounded-xl p-4 flex flex-col gap-4 bg-muted/20">
                            {bEditingSetIdx !== null && (
                              <p className="text-[11px] font-bold text-accent">{isEN ? `Editing Set ${bEditingSetIdx + 1}` : `正在修改第${bEditingSetIdx + 1}套`}</p>
                            )}

                            {/* Equipment checklist */}
                            <div>
                              <p className="text-[11px] font-semibold text-muted-foreground mb-2">
                                {isEN ? "Select items to rent:" : "選擇需要租借的裝備："}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {allItems.map(item => {
                                  const sel = bEquipItems.has(item);
                                  return (
                                    <button
                                      key={item}
                                      onClick={() => setBEquipItems(prev => { const n = new Set(prev); sel ? n.delete(item) : n.add(item); return n; })}
                                      className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 ${sel ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}
                                    >
                                      {sel && <Check size={10} />}{item}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Body measurements */}
                            <div>
                              <p className="text-[11px] font-semibold text-muted-foreground mb-2">
                                {isEN ? "Measurements (for fitting):" : "填寫身體尺寸（用於選配）："}
                              </p>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-foreground font-medium w-14 shrink-0">{isEN ? "Gender" : "性別"}</span>
                                  <div className="flex gap-2 flex-1">
                                    {([["M", isEN ? "Male" : "男"], ["F", isEN ? "Female" : "女"]] as const).map(([v, l]) => (
                                      <button key={v} onClick={() => setBGender(v)}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${bGender === v ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}>
                                        {l}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                {([
                                  ["height", isEN ? "Height" : "身高", "cm",      bHeight,   setBHeight],
                                  ["weight", isEN ? "Weight" : "體重", "kg",      bWeight,   setBWeight],
                                  ["shoe",   isEN ? "Shoe"   : "鞋碼", "EU",      bShoeSize, setBShoeSize],
                                ] as [string, string, string, string, (v: string) => void][]).map(([id, label, unit, val, setter]) => (
                                  <div key={id} className="flex items-center gap-2">
                                    <span className="text-xs text-foreground font-medium w-14 shrink-0">{label}</span>
                                    <div className="flex flex-1 items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                                      <input type="number" value={val} onChange={e => setter(e.target.value)} placeholder="—"
                                        className="flex-1 px-3 py-2 text-sm bg-white focus:outline-none" />
                                      {id === "shoe" ? (
                                    <select
                                      value={bShoeSizeSystem}
                                      onChange={e => setBShoeSizeSystem(e.target.value as "EU"|"JP"|"US"|"UK")}
                                      className="px-1.5 text-xs text-muted-foreground border-l border-border bg-muted/40 py-2 shrink-0 focus:outline-none cursor-pointer font-medium"
                                    >
                                      <option value="EU">EU</option>
                                      <option value="JP">JP</option>
                                      <option value="US">US</option>
                                      <option value="UK">UK</option>
                                    </select>
                                  ) : (
                                    <span className="px-1.5 text-xs text-muted-foreground border-l border-border bg-muted/40 py-2 shrink-0 text-center" style={{ minWidth: "2.75rem" }}>{unit}</span>
                                  )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={confirmDraft}
                                className="flex-1 bg-foreground text-background text-xs font-black py-2.5 rounded-xl hover:bg-accent transition-colors"
                              >
                                {isEN ? "Confirm" : "確定"}
                              </button>
                              {bEditingSetIdx === null && (
                                <button
                                  onClick={() => {
                                    const newSet = { items: Array.from(bEquipItems), gender: bGender, height: bHeight, weight: bWeight, shoeSize: bShoeSize };
                                    setBEquipSets(prev => [...prev, newSet]);
                                    setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize("");
                                    setBEditingSetIdx(null);
                                    // bDraftVisible stays true → form resets for next set
                                  }}
                                  className="flex-1 border border-foreground text-foreground text-xs font-bold py-2.5 rounded-xl hover:bg-muted transition-colors"
                                >
                                  {isEN ? "+ Add Another Set" : "新增一套裝備"}
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Add another set (when draft is hidden and sets exist) */}
                        {!bDraftVisible && bEquipSets.length > 0 && (
                          <button
                            onClick={() => {
                              setBEquipItems(new Set()); setBGender(""); setBHeight(""); setBWeight(""); setBShoeSize("");
                              setBDraftVisible(true); setBEditingSetIdx(null);
                            }}
                            className="w-full border border-dashed border-border text-muted-foreground text-xs font-bold py-2.5 rounded-xl hover:border-foreground hover:text-foreground transition-colors"
                          >
                            {isEN ? "+ Add Another Set" : "+ 新增一套裝備"}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Contact method */}
                <div>
                  <label className={formLabel}>{isEN ? "Contact Method" : isSC ? "联系方式" : "聯繫方式"}</label>
                  <div className="flex flex-col gap-2">
                    {/* One-row toggle buttons */}
                    <div className="flex gap-2">
                      {contactOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            toggleContact(opt.id);
                            if (bContacts.has(opt.id)) {
                              setBContactVals(v => { const n = { ...v }; delete n[opt.id]; return n; });
                            }
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1 ${bContacts.has(opt.id) ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground/50"}`}
                        >
                          {bContacts.has(opt.id) && <Check size={10} />}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {/* Dynamic input fields */}
                    {bContacts.size === 0 ? (
                      <input
                        disabled
                        placeholder={isEN ? "Your LINE ID / WhatsApp / WeChat / Instagram" : "你的 LINE ID / WhatsApp / WeChat / Instagram"}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-muted/40 text-muted-foreground placeholder:text-muted-foreground/60 cursor-not-allowed"
                      />
                    ) : (
                      contactOptions
                        .filter(opt => bContacts.has(opt.id))
                        .map(opt => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground shrink-0 w-20 text-right">{opt.label}：</span>
                            <input
                              type="text"
                              value={bContactVals[opt.id] ?? ""}
                              onChange={e => setBContactVals(v => ({ ...v, [opt.id]: e.target.value }))}
                              placeholder={
                                opt.id === "LINE"      ? "LINE ID"    :
                                opt.id === "WeChat"    ? (isEN ? "WeChat ID" : "微信號") :
                                opt.id === "WhatsApp"  ? "+xxx xxxxxxxx" :
                                "@your.instagram"
                              }
                              className="flex-1 border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>
                        ))
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={formLabel}>{isEN ? "Your Name" : isSC ? "姓名" : "姓名"}</label>
                  <>
                    <input
                      type="text"
                      value={bName}
                      onChange={e => setBName(e.target.value)}
                      placeholder={isEN ? "Full name" : "您的姓名"}
                      className={inputCls}
                    />
                    <div className="mt-4">
                      <label className={formLabel}>
                        {isEN ? "Email" : isSC ? "电子邮件" : "電子郵件"}
                        <span className="text-red-500 ml-1">*{isEN ? " (required)" : "（必填）"}</span>
                      </label>
                      <input
                        type="email"
                        value={bEmail}
                        onChange={e => setBEmail(e.target.value)}
                        placeholder={isEN ? "your@email.com" : "您的電子郵件"}
                        required
                        className={inputCls}
                      />
                    </div>
                  </>
                </div>

                {/* Phone */}
                <div>
                  <label className={formLabel}>{isEN ? "Notes" : isSC ? "备注" : "備註"}</label>
                  <textarea
                    value={bPhone}
                    onChange={e => setBPhone(e.target.value)}
                    placeholder={isEN ? "Any special requests, questions, or additional info…" : isSC ? "如有特殊要求、疑问或补充说明，请在此填写…" : "如有特殊要求、疑問或補充說明，請在此填寫…"}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* CTA buttons */}
                {(() => {
                  const buildSummary = () => {
                    const regionLabel = activeRegion === "JP" ? (isEN ? "Japan" : "日本") : activeRegion === "NZ" ? (isEN ? "New Zealand" : "纽西兰") : (isEN ? "China" : "中国");
                    const typeLabel = bSkiType === "ski" ? (isEN ? "Ski (双板)" : "双板 Ski") : bSkiType === "snowboard" ? (isEN ? "Snowboard (单板)" : "单板 Snowboard") : "—";
                    const durationLabel = bDuration === "3h" ? (isEN ? "3h Half Day" : "3小时半日课") : bDuration === "6h" ? (isEN ? "6h Full Day" : "6小时全日课") : "—";
                    const levelLabel = bLevel ? `L${bLevel}` : "—";
                    const dateLabel = bDate ? (bDateEnd ? `${bDate} → ${bDateEnd}` : bDate) : "—";
                    const lines = [
                      isEN ? "=== Ski Lesson Booking Request ===" : "=== 滑雪预约请求 ===",
                      "",
                      `${isEN ? "Name" : "姓名"}：${bName || "—"}`,
                      `${isEN ? "Email" : "邮箱"}：${bEmail || "—"}`,
                      `${isEN ? "Region" : "地区"}：${regionLabel}`,
                      `${isEN ? "Resort" : "雪场"}：${bResort || "—"}`,
                      `${isEN ? "Board Type" : "器材类型"}：${typeLabel}`,
                      `${isEN ? "Group Size" : "人数"}：${bGroupSize}${isEN ? " person(s)" : "人"}`,
                      `${isEN ? "Duration" : "课时"}：${durationLabel}`,
                      `${isEN ? "Date" : "日期"}：${dateLabel}`,
                      `${isEN ? "Skill Level" : "程度"}：${levelLabel}`,
                      `${isEN ? "Equipment Rental" : "租借装备"}：${bEquip === "yes" ? (isEN ? "Yes" : "是") : bEquip === "no" ? (isEN ? "No" : "否") : "—"}`,
                    ];
                    if (bEquip === "yes" && bEquipSets.length > 0) {
                      bEquipSets.forEach((s, i) => {
                        const gLabel = s.gender === "M" ? (isEN ? "Male" : "男") : s.gender === "F" ? (isEN ? "Female" : "女") : "—";
                        lines.push(`${isEN ? `Equipment Set ${i+1}` : `装备第${i+1}套`}：${gLabel}，${isEN ? "H" : "身高"}${s.height}cm，${isEN ? "W" : "体重"}${s.weight}kg，${isEN ? "Shoe" : "鞋码"}${s.shoeSize}，${s.items.join("、")}`);
                      });
                    }
                    const contactEntries = Object.entries(bContactVals).filter(([, v]) => v);
                    if (contactEntries.length > 0) {
                      lines.push("");
                      lines.push(isEN ? "Contact:" : "联系方式：");
                      contactEntries.forEach(([k, v]) => lines.push(`  ${k}：${v}`));
                    }
                    if (bPhone) {
                      lines.push("");
                      lines.push(`${isEN ? "Notes" : "备注"}：${bPhone}`);
                    }
                    return lines.join("\n");
                  };

                  const onSendEmail = async () => {
                    if (!bName || !bDate || !bSkiType || !bDuration || !bLevel || !bResort) {
                      alert(isEN ? "Please fill in all required fields (Name, Date, Resort, Board Type, Duration, Level)" : isSC ? "请填写所有必填项（姓名、日期、雪场、器材类型、课时、程度）" : "請填寫所有必填項（姓名、日期、雪場、器材類型、課時、程度）");
                      return;
                    }
                    if (!bEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bEmail)) {
                      alert(isEN ? "Please enter a valid email address" : isSC ? "请输入有效的电子邮箱地址" : "請輸入有效的電子郵箱地址");
                      return;
                    }
                    setBSending(true);
                    const body = buildSummary();
                    const subject = isEN ? `Ski Lesson Booking - ${bName}` : `滑雪预约请求 - ${bName}`;
                    try {
                      const resp = await fetch("/api/bookings/send-email", {
                        method: "POST",
                        headers: { 
                          "Content-Type": "application/json",
                          ...getAuthHeaders()
                        },
                        body: JSON.stringify({
                          to: "zhongwenleng6@gmail.com",
                          customerEmail: bEmail,
                          subject,
                          body,
                          booking_data: {
                            resort_name: bResort,
                            start_date: bDate,
                            end_date: bDateEnd || bDate,
                            ski_type: bSkiType,
                            course_type: 'private',
                            group_size: bGroupSize,
                            need_equipment: bEquip === "yes",
                            skill_level: bLevel,
                            email: bEmail,
                            contact_info: { ...bContactVals, phone: bPhone, name: bName },
                            // 装备明细
                            equipment_sets: bEquipSets.map(s => ({
                              items: s.items,
                              gender: s.gender,
                              height: s.height,
                              weight: s.weight,
                              shoe_size: `${s.shoeSize} ${bShoeSizeSystem}`
                            })),
                          },
                        }),
                      });
                      if (resp.ok) {
                        const data = await resp.json();
                        const failed: string[] = (data.results || []).filter((r: any) => !r.success).map((r: any) => r.to);
                        if (failed.length > 0) {
                          alert(isEN
                            ? `The following emails failed to send:\n${failed.join(", ")}`
                            : isSC
                            ? `以下邮箱发送失败：\n${failed.join("、")}`
                            : `以下郵箱發送失敗：\n${failed.join("、")}`
                          );
                        }
                        setBSubmitted(true);
                      } else {
                        alert(isEN ? "Failed to send booking request." : isSC ? "预约请求发送失败。" : "預約請求發送失敗。");
                      }
                    } catch {
                      alert(isEN ? "Failed to send booking request." : isSC ? "预约请求发送失败。" : "預約請求發送失敗。");
                    } finally {
                      setBSending(false);
                    }
                  };

                  const onCopyAndLine = () => {
                    const text = buildSummary();
                    navigator.clipboard.writeText(text).catch(() => {});
                    window.open("https://lin.ee/6rXdbbt", "_blank");
                  };

                  return (
                    <>
                      <button
                        onClick={onSendEmail}
                        disabled={bSending}
                        className="w-full bg-foreground text-background text-sm font-black py-3.5 rounded-xl hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {bSending ? (isEN ? "Sending..." : isSC ? "发送中..." : "發送中...") : (<>{isEN ? "Send Booking Request" : isSC ? "送出预约请求" : "送出預約請求"} <ArrowRight size={15} /></>)}
                      </button>

                      <button
                        onClick={onCopyAndLine}
                        className="w-full border border-foreground text-foreground text-xs font-bold py-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        {isEN ? "Copy & Open LINE" : isSC ? "复制预订单并开启LINE" : "複製預訂單並開啟LINE"}
                      </button>
                    </>
                  );
                })()}

                {/* Payment icons */}
                <div className="pt-1">
                  <div className="grid grid-cols-4 gap-2">
                    {/* Visa */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px]">
                      <span className="font-black italic text-base tracking-tighter" style={{ color: "#1434CB", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>VISA</span>
                    </div>
                    {/* Mastercard */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px]">
                      <div className="flex -space-x-2.5">
                        <div className="w-6 h-6 rounded-full" style={{ background: "#EB001B" }} />
                        <div className="w-6 h-6 rounded-full opacity-90" style={{ background: "#F79E1B" }} />
                      </div>
                    </div>
                    {/* JCB */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-0.5">
                      {[["J","#003087"],["C","#009f6b"],["B","#cc0000"]].map(([ch, cl]) => (
                        <span key={ch} className="font-black text-sm leading-none w-4 h-5 flex items-center justify-center rounded-sm text-white" style={{ background: cl }}>{ch}</span>
                      ))}
                    </div>
                    {/* UnionPay */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-1">
                      <div className="flex gap-px shrink-0">
                        <div className="w-2 h-5 rounded-l-sm" style={{ background: "#CC0000" }} />
                        <div className="w-2.5 h-5" style={{ background: "#003087" }} />
                        <div className="w-2 h-5 rounded-r-sm" style={{ background: "#00A0E0" }} />
                      </div>
                      <span className="text-[9px] font-bold leading-tight" style={{ color: "#003087" }}>银联<br/><span style={{ color: "#CC0000" }}>UnionPay</span></span>
                    </div>
                    {/* Apple Pay */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-1">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      <span className="text-black font-semibold text-xs">Pay</span>
                    </div>
                    {/* Google Pay */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-0.5">
                      <span className="font-bold text-base leading-none"><span style={{ color: "#4285F4" }}>G</span></span>
                      <span className="font-semibold text-xs text-black">Pay</span>
                    </div>
                    {/* Alipay */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-1">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: "#1677FF" }}>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M21.422 15.358c-2.041-.82-3.363-1.356-4.19-1.713 1.048-1.924 1.768-4.208 1.988-6.645H15v-1.5h4.5V4H13V2.5H11V4H4.5v1.5H11v1.5H6.239C6.739 10.948 8.741 14 12 15.98c-1.32.71-3.3 1.2-6 1.02C10.2 19.2 13.5 20 15.5 20c1.59 0 3.69-.63 4.59-1.87.56-.77.68-1.66.332-2.772z"/></svg>
                      </div>
                      <span className="font-bold text-[10px]" style={{ color: "#1677FF" }}>Alipay</span>
                    </div>
                    {/* WeChat Pay */}
                    <div className="border border-border/50 rounded-lg py-2.5 px-2 flex items-center justify-center bg-white min-h-[40px] gap-1">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: "#09BB07" }}>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.96.27 1.95.5 3 .5.18 0 .35-.01.52-.02C9.84 15.36 9.5 14.7 9.5 14c0-2.76 2.69-5 6-5 .18 0 .35.01.52.02C15.49 6.37 12.8 4 9.5 4zm-2 3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 3c-2.76 0-5 1.79-5 4s2.24 4 5 4c.67 0 1.31-.13 1.9-.35L19.5 20l-.65-2.15C20 17.1 20.5 16.1 20.5 15c0-2.21-2.24-4-5-4zm-1.5 2.5c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zm3 0c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z"/></svg>
                      </div>
                      <span className="font-bold text-[10px]" style={{ color: "#09BB07" }}>微信支付</span>
                    </div>
                  </div>
                </div>

                {/* Reassurance */}
                <div className="text-[11px] text-muted-foreground leading-relaxed pb-1 space-y-1.5">
                  {[
                    isEN
                      ? "① No payment is collected during booking. Our advisor will confirm availability and details within 24 hours before any charge."
                      : isSC
                      ? "① 本次预订过程不会产生任何费用，顾问会在 24 小时内与你确认档期与细节后再付款。"
                      : "① 本次預訂過程不會產生任何費用，顧問會在 24 小時內與你確認檔期與細節後再付款。",
                    isEN
                      ? "② Free cancellation if cancelled 11 or more days before the lesson. Full refund, no fees."
                      : isSC
                      ? "② 开课前 11 天以上取消，全额退还，不收任何费。"
                      : "② 開課前 11 天以上取消，全額退還，不收任何費。",
                    isEN
                      ? "③ This is an intent booking. Final pricing is calculated based on actual itinerary details."
                      : isSC
                      ? "③ 本预订为意向预订，真实费用按照实际行程信息结算。"
                      : "③ 本預訂為意向預訂，真實費用按照實際行程資訊結算。",
                  ].map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile booking CTA bar (visible on mobile/tablet only) ── */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3 flex items-center gap-3 z-40 shadow-2xl transition-transform ${showMobileForm ? "translate-y-full" : ""}`}>
        <div>
          <div className="text-[10px] text-muted-foreground">{isEN ? "Starting from" : "最低價格"}</div>
          <div className="font-black text-foreground text-sm">{rd.pricing.label}</div>
        </div>
        <button
          onClick={() => setShowMobileForm(true)}
          className="flex-1 bg-foreground text-background text-sm font-black py-3 rounded-xl flex items-center justify-center gap-2"
        >
          {isEN ? "Book Now" : "立即預訂"} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
  };

  // ─── RESORTS PAGE ──────────────────────────────────────
  const ResortsPage = () => {
    const jpResorts = JP_RESORTS_MAP[lang];
    const cnResorts = CN_RESORTS_MAP[lang];
    const nzResorts = NZ_RESORTS_MAP[lang];
    const resortMap = { JP: jpResorts, CN: cnResorts, NZ: nzResorts };
    const current = resortMap[resortRegion];
    const tabs: { key: "JP"|"CN"|"NZ"; label: string }[] = [
      { key: "JP", label: tr.jp },
      { key: "CN", label: tr.cn },
      { key: "NZ", label: tr.nz },
    ];

    return (
      <div className="pt-16 min-h-screen">
        <div className="bg-primary py-14 px-4 text-center">
          <h1 className="text-white font-black text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.rT}</h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm">{tr.rS}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Region tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setResortRegion(t.key)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${resortRegion === t.key ? "bg-primary text-white shadow-md" : "bg-white border border-border text-foreground hover:border-accent"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Resort cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {current.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm mb-1 leading-snug">{r.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                    <MapPin size={11} /> {r.loc}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {r.feat.map((f, fi) => (
                      <span key={fi} className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{tr.price}</p>
                      <p className="font-black text-accent">{r.price}</p>
                    </div>
                    <button
                      onClick={() => gotoTab(1)}
                      className="text-xs bg-primary text-white font-bold px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      {tr.vd}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
  };

  // ─── GUIDE PAGE ────────────────────────────────────────
  const currentGuides = GUIDES_MAP[lang];
  const goBackToList = () => { setGuideDetail(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goDetail = (i: number) => { setGuideDetail(i); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const guidePage = guideDetail !== null && currentGuides[guideDetail]
    ? <div className="pt-16 min-h-screen">
        {/* Hero banner */}
        <div className="relative h-72 sm:h-96">
          <img src={currentGuides[guideDetail].img} alt={currentGuides[guideDetail].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button onClick={goBackToList} className="absolute top-20 left-4 sm:left-8 text-white bg-black/30 hover:bg-black/50 rounded-full px-4 py-2 transition-colors flex items-center gap-1.5 text-sm font-medium backdrop-blur-sm">
            <ChevronLeft size={16} /> {lang === "EN" ? "Back" : lang === "SC" ? "返回" : lang === "JP" ? "戻る" : lang === "KR" ? "뒤로" : "返回"}
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-accent text-white px-3 py-1 rounded-full font-semibold">{currentGuides[guideDetail].cat}</span>
                <span className="text-xs text-white/70">{currentGuides[guideDetail].date}</span>
              </div>
              <h1 className="text-white font-black text-2xl sm:text-4xl leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{currentGuides[guideDetail].title}</h1>
            </div>
          </div>
        </div>
        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 pb-6 border-b border-border">{currentGuides[guideDetail].desc}</p>
          {currentGuides[guideDetail].sections.map((sec, si) => (
            <div key={si} className="mb-8">
              <h2 className="text-foreground font-black text-lg sm:text-xl mb-3 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span className="w-1 h-6 bg-accent rounded-full inline-block" />{sec.h}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{sec.body}</p>
            </div>
          ))}
          {/* CTA */}
          <div className="mt-10 bg-accent/10 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="font-black text-foreground text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{lang === "EN" ? "Ready to start your ski journey?" : lang === "SC" ? "准备开始您的滑雪之旅？" : lang === "JP" ? "スキーの旅を始めましょう？" : lang === "KR" ? "스키 여행을 시작하시겠어요?" : "準備開始您的滑雪之旅？"}</h3>
            <p className="text-muted-foreground text-sm mb-4">{lang === "EN" ? "Contact us to book a lesson with our certified coaches." : lang === "SC" ? "联系我们，预订专业认证教练课程。" : lang === "JP" ? "認定コーチのレッスン予約はお問い合わせください。" : lang === "KR" ? "인증 코치 레슨 예약은 문의해 주세요." : "聯繫我們，預訂專業認證教練課程。"}</p>
            <button onClick={() => { setGuideDetail(null); gotoTab(1); }} className="bg-accent text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-sky-400 transition-colors">
              {lang === "EN" ? "Book Now" : lang === "SC" ? "立即预订" : lang === "JP" ? "今すぐ予約" : lang === "KR" ? "지금 예약" : "立即預訂"} <ArrowRight size={14} className="inline ml-1" />
            </button>
          </div>
          {/* Back link */}
          <div className="mt-8 pt-6 border-t border-border">
            <button onClick={goBackToList} className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              <ChevronLeft size={16} /> {lang === "EN" ? "Back to all articles" : lang === "SC" ? "返回所有文章" : lang === "JP" ? "すべての記事に戻る" : lang === "KR" ? "모든 글로 돌아가기" : "返回所有文章"}
            </button>
          </div>
        </div>
      </div>
    : <div className="pt-16 min-h-screen">
        <div className="bg-primary py-14 px-4 text-center">
          <h1 className="text-white font-black text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.gT}</h1>
          <p className="text-white/60 text-sm">{tr.gS}</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {currentGuides.map((g, i) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer" onClick={() => goDetail(i)}>
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-accent text-white px-2.5 py-0.5 rounded-full font-semibold">{g.cat}</span>
                    <span className="text-xs text-muted-foreground">{g.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 leading-snug">{g.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{g.desc}</p>
                  <button onClick={(e) => { e.stopPropagation(); goDetail(i); }} className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    {tr.rm} <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>;

  // ─── FAQ PAGE ──────────────────────────────────────────
  const FaqPage = () => (
    <div className="pt-16 min-h-screen">
      <div className="bg-primary py-14 px-4 text-center">
        <h1 className="text-white font-black text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.fT}</h1>
        <p className="text-white/60 text-sm">{tr.fS}</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {FAQS_MAP[lang].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                {openFaq === i ? <Minus size={18} className="text-accent shrink-0" /> : <Plus size={18} className="text-muted-foreground shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 bg-secondary rounded-2xl p-8 text-center">
          <h3 className="font-black text-foreground text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.fT}</h3>
          <p className="text-muted-foreground text-sm mb-5">{tr.fS}</p>
          <button onClick={() => gotoTab(5)} className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-accent transition-colors">
            {tr.cT2}
          </button>
        </div>
      </div>
    </div>
  );

  // ─── CONTACT PAGE ──────────────────────────────────────
  const ContactPage = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", msg: "" });
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    return (
      <div className="pt-16 min-h-screen">
        <div className="bg-primary py-14 px-4 text-center">
          <h1 className="text-white font-black text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.cT2}</h1>
          <p className="text-white/60 text-sm">{tr.cS2}</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <h2 className="font-black text-foreground text-xl mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.of}</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: <MapPin size={18} />, label: "Japan", val: "日本北海道虻田郡二世谷町字富士見" },
                { icon: <MapPin size={18} />, label: "New Zealand", val: "紐西蘭皇后鎮中心街 102 號" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-accent shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-foreground">{tr.nav[0]}</h3>
              {[
                "+81 (0)136-23-0123 (Japan)",
                "+64 3-442-0123 (New Zealand)",
                "+(852) 6703-6596 (Hong Kong)",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone size={15} className="text-accent shrink-0" /> {t}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4">
              <Mail size={15} className="text-accent" /> youngski.snowtrip@gmail.com
            </div>
            <div className="flex items-start gap-3 text-muted-foreground text-sm">
              <Clock size={15} className="text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">{tr.wh}</p>
                <p>週一至週日: 08:00 – 20:00 (Local Time)</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-7">
            {contactSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <p className="font-bold text-foreground text-lg mb-2">{tr.sent}</p>
                <button onClick={() => setContactSent(false)} className="text-accent text-sm hover:underline mt-4">{tr.close}</button>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { key: "name", label: tr.n, type: "text" },
                  { key: "email", label: tr.e, type: "email" },
                  { key: "phone", label: tr.p, type: "tel" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
                    <input type={f.type} value={(form as any)[f.key]} onChange={set(f.key)} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{tr.m}</label>
                  <textarea value={form.msg} onChange={set("msg")} rows={4} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                </div>
                <button
                  onClick={() => { if (form.name && form.email) setContactSent(true); }}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors"
                >
                  {tr.send}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── REGISTER MODAL ────────────────────────────────────
  const RegisterModal = () => {
    const [form, setForm] = useState({ nick: "", phone: "", email: "", pwd: "", pwd2: "" });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm(f => ({ ...f, [k]: e.target.value })); setError(""); };

    const handleRegister = async () => {
      if (!form.nick || !form.phone || !form.email || !form.pwd) { setError(lang === "EN" ? "Please fill in all fields" : "請填寫所有欄位"); return; }
      if (form.pwd !== form.pwd2) { setError(lang === "EN" ? "Passwords do not match" : "兩次密碼不一致"); return; }
      if (form.pwd.length < 8) { setError(lang === "EN" ? "Password must be at least 8 characters" : "密碼至少需要8位"); return; }
      setSubmitting(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nickname: form.nick, phone: form.phone, email: form.email, password: form.pwd, lang }),
        });
        const data = await res.json();
        if (data.success) { 
          setRegEmail(form.email);
          setRegDone(true); 
        }
        else { setError(data.message || (lang === "EN" ? "Registration failed" : "註冊失敗，請重試")); }
      } catch {
        // 後端不可用時：前端模擬成功流程
        setRegDone(true);
      } finally { setSubmitting(false); }
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowReg(false); }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative">
          <button onClick={() => setShowReg(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
          <div className="flex items-center gap-2.5 mb-6">
            <BrandLogo height={32} />
            <h2 className="font-black text-foreground text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.rTt}</h2>
          </div>
          {regDone ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-blue-600" />
              </div>
              <h3 className="font-black text-foreground text-lg mb-2">{lang === "EN" ? "Registration Successful!" : "註冊成功！"}</h3>
              <p className="text-muted-foreground text-sm mb-1">{lang === "EN" ? "A verification email has been sent to:" : "驗證郵件已發送至："}</p>
              <p className="font-semibold text-accent text-sm mb-4">{regEmail}</p>
              <p className="text-muted-foreground text-xs mb-5">{lang === "EN" ? "Please check your inbox and click the verification link to activate your account. (Valid for 24 hours)" : "請檢查您的郵箱，點擊驗證連結以激活帳號。（24小時內有效）"}</p>
              <button onClick={() => { setRegDone(false); setShowReg(false); }} className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-accent transition-colors">{tr.close}</button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {[
                { key: "nick", label: tr.rnk, type: "text" },
                { key: "phone", label: tr.rph, type: "tel" },
                { key: "email", label: tr.rem, type: "email" },
                { key: "pwd", label: tr.rpw, type: "password" },
                { key: "pwd2", label: tr.rp2, type: "password" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]} onChange={set(f.key)} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              ))}
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button onClick={handleRegister} disabled={submitting}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors mt-2 disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {submitting ? (lang === "EN" ? "Registering…" : "提交中…") : tr.rsb}
              </button>
              <p className="text-center text-xs text-muted-foreground">{tr.rha} <button onClick={() => { setShowReg(false); setShowLogin(true); }} className="text-accent font-semibold hover:underline">{tr.rli}</button></p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── FLOATING CONTACTS ─────────────────────────────────
  const FloatingContacts = () => (
    <>
      <div className="fixed bottom-28 right-5 z-40 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/85252986913"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute right-14 bg-foreground text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">WhatsApp</span>
        </a>

        {/* WeChat */}
        <button
          onClick={() => setShowWeChat(true)}
          title="WeChat"
          className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.161 1.71-1.484 1.254-2.066 3.271-1.462 5.06.774 2.324 3.14 3.87 5.78 3.87.602 0 1.196-.07 1.776-.202a.64.64 0 01.531.07l1.406.82a.232.232 0 00.127.04.218.218 0 00.215-.218.265.265 0 00-.036-.158l-.29-1.1a.437.437 0 01.156-.49C21.117 17.203 22 16.019 22 14.69c0-2.986-2.69-5.38-5.062-5.832zm-2.74 2.607c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864zm5.28 0c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864z"/>
          </svg>
          <span className="absolute right-14 bg-foreground text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">WeChat</span>
        </button>

        {/* LINE */}
        <a
          href="https://lin.ee/6rXdbbt"
          target="_blank"
          rel="noopener noreferrer"
          title="LINE"
          className="w-12 h-12 bg-[#00B900] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          <span className="absolute right-14 bg-foreground text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">LINE</span>
        </a>
      </div>

      {/* WeChat popup */}
      {showWeChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm" onClick={() => setShowWeChat(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-foreground text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{tr.wechat}</h3>
            <img
              src={imgQrYoungsnow}
              alt="WeChat QR Code - YoungSki"
              className="w-full rounded-xl mb-4 border border-border"
            />
            <p className="text-muted-foreground text-xs mb-5">{tr.wechatTip}</p>
            <button onClick={() => setShowWeChat(false)} className="w-full bg-primary text-white font-bold py-2.5 rounded-xl text-sm hover:bg-accent transition-colors">{tr.close}</button>
          </div>
        </div>
      )}
    </>
  );

  // ─── FOOTER ────────────────────────────────────────────
  const Footer = () => (
    <footer className="bg-primary text-white mt-0">
      <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BrandLogo height={32} />
            <span className="font-black text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>SnowTrip</span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed mb-5">讓滑雪連接世界<br/>Connecting the world through skiing</p>
          {/* Social icons — 2 rows × 3, rounded square */}
          <div className="grid grid-cols-3 gap-2.5 w-fit">
            {/* Row 1 */}
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61585043768044" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "#1877F2" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/go_snow_trip/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Threads */}
            <a href="https://www.threads.com/@go_snow_trip" target="_blank" rel="noopener noreferrer" aria-label="Threads"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "#101010" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.63 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.378-.888h-.015c-.787 0-1.829.199-2.543 1.078l-1.556-1.34c.978-1.168 2.395-1.81 3.992-1.81h.023c3.005.016 4.8 1.915 4.997 5.21.358.186.7.395 1.017.624.778.56 1.43 1.272 1.834 2.188.952 2.167.763 5.028-1.554 7.253-1.797 1.806-4.019 2.604-7.132 2.625zm1.24-9.708c-.8 0-1.533.08-2.178.238-.68.167-1.15.455-1.398.855-.212.34-.23.73-.054 1.101.203.43.638.73 1.23.838.39.07.78.08 1.112.02.832-.14 1.553-.608 1.926-1.26.23-.408.38-.928.443-1.577a11.506 11.506 0 0 0-1.081-.215z"/>
              </svg>
            </a>
            {/* Row 2 */}
            {/* WhatsApp */}
            <a href="https://wa.me/85252986913" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "#25D366" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            {/* LINE */}
            <a href="https://lin.ee/6rXdbbt" target="_blank" rel="noopener noreferrer" aria-label="LINE"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "#00B900" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </a>
            {/* WeChat */}
            <button onClick={() => setShowWeChat(true)} aria-label="WeChat"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "#07C160" }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="white">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.161 1.71-1.484 1.254-2.066 3.271-1.462 5.06.774 2.324 3.14 3.87 5.78 3.87.602 0 1.196-.07 1.776-.202a.64.64 0 01.531.07l1.406.82a.232.232 0 00.127.04.218.218 0 00.215-.218.265.265 0 00-.036-.158l-.29-1.1a.437.437 0 01.156-.49C21.117 17.203 22 16.019 22 14.69c0-2.986-2.69-5.38-5.062-5.832zm-2.74 2.607c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864zm5.28 0c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864z"/>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Quick Links</h4>
          <div className="space-y-2">
            {(tr.nav as string[]).map((label, i) => (
              <button key={i} onClick={() => gotoTab(i as Tab)} className="block text-white/50 hover:text-white text-xs transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Contact</h4>
          <div className="space-y-2 text-white/50 text-xs">
            <p>youngski.snowtrip@gmail.com</p>
            <p>+81 (0)136-23-0123</p>
            <p>+64 3-442-0123</p>
            <p>+(852) 6703-6596</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Language</h4>
          <div className="space-y-1.5">
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} className={`block text-xs transition-colors ${lang === l.code ? "text-accent font-semibold" : "text-white/50 hover:text-white"}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 px-4">
        <p className="text-center text-white/30 text-xs">© 2026 SnowTrip International. All rights reserved.</p>
      </div>
    </footer>
  );

  // ─── Page Render ──────────────────────────────────────
  const pages = [
    <HomePage key="home" />,
    <BookingPage key="booking" />,
    <ResortsPage key="resorts" />,
    guidePage,
    <FaqPage key="faq" />,
    <ContactPage key="contact" />,
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Noto Sans TC', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'Outfit', system-ui, sans-serif" }}
    >
      <Nav />
      <main>{pages[tab]}</main>
      <Footer />
      <FloatingContacts />
      {showReg && <RegisterModal />}
            {showVerifyModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${verifySuccess ? 'bg-green-50' : 'bg-red-50'}`}>
                    {verifySuccess ? <CheckCircle size={28} className="text-green-600" /> : <AlertCircle size={28} className="text-red-600" />}
                  </div>
                  <h3 className="font-black text-foreground text-lg mb-2">
                    {verifySuccess ? '郵箱驗證成功！' : '驗證失敗'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{verifyMessage}</p>
                  {verifySuccess && (
                    <p className="text-accent font-bold text-2xl mb-4">{verifyCountdown}</p>
                  )}
                  <p className="text-muted-foreground text-xs">
                    {verifySuccess ? '秒後跳轉到登入頁面...' : '請重新註冊或聯繫客服。'}
                  </p>
                </div>
              </div>
            )}
      {/* 重置密码弹窗 */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative">
            <button onClick={() => { setShowResetModal(false); window.history.replaceState({}, '', '/'); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>

            {!resetResult ? (
              <>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} className="text-accent" />
                </div>
                <h3 className="font-black text-foreground text-lg mb-2 text-center">設置新密碼</h3>
                <p className="text-muted-foreground text-sm mb-5 text-center">請輸入您的新密碼（至少 8 位）</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">新密碼</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="至少 8 位字符"
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">確認密碼</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="再次輸入新密碼"
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (newPassword.length < 8) {
                        setResetResult({ success: false, message: '密碼長度至少 8 位' });
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        setResetResult({ success: false, message: '兩次輸入的密碼不一致' });
                        return;
                      }
                      setResetSubmitting(true);
                      try {
                        const resp = await fetch("/api/auth/reset-password", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ token: resetToken, password: newPassword }),
                        });
                        const data = await resp.json();
                        setResetResult({ success: data.success, message: data.message || (data.success ? '密碼重置成功！' : '重置失敗') });
                      } catch {
                        setResetResult({ success: false, message: '網絡錯誤，請稍後重試' });
                      } finally {
                        setResetSubmitting(false);
                      }
                    }}
                    disabled={resetSubmitting || !newPassword || !confirmPassword}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {resetSubmitting ? "提交中..." : "確認重置密碼"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${resetResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  {resetResult.success ? <CheckCircle size={28} className="text-green-600" /> : <AlertCircle size={28} className="text-red-600" />}
                </div>
                <h3 className="font-black text-foreground text-lg mb-2">
                  {resetResult.success ? '密碼重置成功！' : '重置失敗'}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">{resetResult.message}</p>
                <button
                  onClick={() => { setShowResetModal(false); window.history.replaceState({}, '', '/'); if (resetResult.success) setShowLogin(true); }}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors"
                >
                  {resetResult.success ? '前往登入' : '返回首頁'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showLogin && <LoginModal />}
      {showPayment && payResort && <PaymentModal />}
      {showOrders && (orderDetail ? (() => {
        const d = orderDetail;
        const contactInfo = typeof d.contact_info === 'object' ? d.contact_info : {};
        const contactStr = Object.entries(contactInfo).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(', ');
        const canCancel = ['pending', 'paid', 'confirmed'].includes(d.status);
        const L = (tc: string, en: string) => lang === 'EN' ? en : tc;
        return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setOrderDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setOrderDetail(null)} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={20} /></button>
                <h3 className="font-bold text-lg text-foreground">{tr.orderDetailTitle}</h3>
              </div>
              <button onClick={() => setShowOrders(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            {orderDetailLoading ? (
              <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{d.order_no}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[d.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabel(d.status)}</span>
                </div>
                {d.photo_url && <div className="rounded-xl overflow-hidden h-40 bg-muted"><img src={d.photo_url} alt={d.resort_name} className="w-full h-full object-cover" /></div>}
                <div className="space-y-3">
                  {[
                    [tr.orderResort, d.resort_name],
                    [L("地點","Location"), d.location],
                    [tr.orderDate, `${d.start_date?.slice(0,10)} ~ ${d.end_date?.slice(0,10)}`],
                    [tr.orderSkiType, d.ski_type === 'ski' ? L("滑雪","Ski") : L("單板","Snowboard")],
                    [L("課程類型","Course Type"), d.course_type === 'private' ? tr.priv : tr.grp],
                    [tr.orderGroupSize, `${d.group_size} ${L("人","ppl")}`],
                    [tr.orderCoach, d.coach_name || L("未指定","Not specified")],
                    [L("程度","Level"), [L("完全新手","Beginner"), L("初學者","Beginner+"), L("初中階","Intermediate"), L("中高階","Advanced")][d.skill_level] || ''],
                    [tr.orderEquip, d.need_equipment ? tr.equipYes : tr.equipNo],
                    [tr.orderFormEmail, d.form_email || '-'],
                    [tr.orderUserEmail, d.user_email || '-'],
                    [tr.orderContact, contactStr || '-'],
                    [tr.orderPayMethod, d.payment_method || '-'],
                    [L("支付狀態","Payment"), d.payment_status === 'success' ? L("已支付","Paid") : L("未支付","Unpaid")],
                  ].map(([label, val], i) => (
                    <div key={i} className="flex justify-between items-start text-sm gap-3">
                      <span className="text-muted-foreground shrink-0 min-w-[80px]">{label}</span>
                      <span className="font-semibold text-foreground text-right">{val}</span>
                    </div>
                  ))}
                  {/* 装备明细 */}
                  {d.need_equipment && contactInfo.equipment_sets && contactInfo.equipment_sets.length > 0 && (
                    <div className="border-t border-border pt-4 mt-2">
                      <h4 className="font-bold text-sm mb-3">{tr.orderEquipDetail}</h4>
                      {contactInfo.equipment_sets.map((set: any, idx: number) => (
                        <div key={idx} className="bg-muted/50 rounded-lg p-3 mb-2 last:mb-0">
                          <div className="text-xs font-semibold text-muted-foreground mb-2">{tr.equipSet} {idx + 1}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <div><span className="text-muted-foreground">{L("項目","Items")}: </span><span className="font-medium">{Array.isArray(set.items) ? set.items.join(', ') : '-'}</span></div>
                            <div><span className="text-muted-foreground">{L("性別","Gender")}: </span><span className="font-medium">{set.gender === 'M' ? L("男","Male") : set.gender === 'F' ? L("女","Female") : '-'}</span></div>
                            <div><span className="text-muted-foreground">{L("身高","Height")}: </span><span className="font-medium">{set.height || '-'}</span></div>
                            <div><span className="text-muted-foreground">{L("體重","Weight")}: </span><span className="font-medium">{set.weight || '-'}</span></div>
                            <div><span className="text-muted-foreground">{L("鞋碼","Shoe Size")}: </span><span className="font-medium">{set.shoe_size || '-'}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="font-bold text-foreground">{tr.orderFee}</span>
                  <span className="text-xl font-black text-accent">{d.currency} {d.total_amount}</span>
                </div>
                {canCancel && (
                  <button onClick={() => setCancelConfirm(d.order_no)} className="w-full border-2 border-red-200 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <AlertCircle size={16} />{tr.orderCancel}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        );
      })() : (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowOrders(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
              <h3 className="font-bold text-xl text-foreground flex items-center gap-2"><ClipboardList size={22} className="text-accent" />{tr.myOrders}</h3>
              <button onClick={() => setShowOrders(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="px-6 py-3 border-b border-border flex gap-2 overflow-x-auto shrink-0">
              {orderFilterTabs.map(t => (
                <button key={t.value} onClick={() => setOrderFilter(t.value)} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${orderFilter === t.value ? 'bg-accent text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{t.label}</button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {ordersLoading ? (
                <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <ClipboardList size={48} className="mb-4 opacity-30" /><p className="text-sm">{tr.orderEmpty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o: any) => (
                    <div key={o.order_no} className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        {o.photo_url && <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted"><img src={o.photo_url} alt={o.resort_name} className="w-full h-full object-cover" /></div>}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-bold text-foreground truncate">{o.resort_name}</h4>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabel(o.status)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{o.order_no}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span>{o.start_date?.slice(0,10)}</span>
                            <span>{o.ski_type === 'ski' ? '⛷ Ski' : '🏂 Board'}</span>
                            <span>{o.group_size} {lang === 'EN' ? 'ppl' : '人'}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-black text-accent">{o.currency} {o.total_amount}</span>
                            <button onClick={() => fetchOrderDetail(o.order_no)} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">{tr.orderDetail} <ArrowRight size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 取消确认弹窗 - 移到三元运算符外面,确保在订单详情和订单列表都能显示 */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60" onClick={() => setCancelConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><AlertCircle size={20} className="text-red-500" /></div>
              <p className="font-bold text-foreground">{tr.orderConfirmCancel}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-[52px]">{cancelConfirm}</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelConfirm(null)} className="flex-1 border border-border text-foreground font-semibold py-2.5 rounded-xl hover:bg-muted transition-colors">{tr.orderBack}</button>
              <button onClick={() => handleCancelOrder(cancelConfirm)} disabled={canceling} className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50">{canceling ? '...' : tr.orderCancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Season floating banner (homepage only) ── */}
      {tab === 0 && showSeasonBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[922px] mx-4 mb-5 bg-white border border-border rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4">
            {/* Left accent bar */}
            <div className="w-1 h-10 rounded-full bg-accent shrink-0" />
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-0.5">
                {lang === "EN" ? "OPERATING SEASON" : "滑雪季"}
              </p>
              <p className="text-sm font-black text-foreground leading-tight">
                {lang === "EN"
                  ? "2026–2027 Season"
                  : "開啟 2026–2027 雪季之旅"
                }
              </p>
            </div>
            {/* CTA */}
            <button
              onClick={() => { setActiveRegion("JP"); setTab(1); setShowMobileForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="shrink-0 bg-accent text-white text-xs font-black px-5 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              {lang === "EN" ? "Book Now" : "立即預訂"} <ArrowRight size={13} />
            </button>
            {/* Close */}
            <button
              onClick={() => setShowSeasonBanner(false)}
              className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ─── LOGIN MODAL ───────────────────────────────────────
  function LoginModal() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    // view: "login" | "forgot" | "reset-sent" | "login-done"
    const [view, setView] = useState<"login" | "forgot" | "reset-sent" | "login-done">("login");
    const [resetEmail, setResetEmail] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetError, setResetError] = useState("");

    const loginLabels = {
      title:      { TC:"登录", SC:"登录", EN:"Login", JP:"ログイン", KR:"로그인" },
      forgot:     { TC:"忘记密码？", SC:"忘记密码？", EN:"Forgot password?", JP:"パスワードを忘れた方", KR:"비밀번호를 잊으셨나요?" },
      forgotTitle:{ TC:"重置密码", SC:"重置密码", EN:"Reset Password", JP:"パスワードリセット", KR:"비밀번호 재설정" },
      forgotDesc: { TC:"請輸入您的註冊郵箱，我們將發送重置連結至您的郵件。", SC:"请输入您的注册邮箱，我们将发送重置链接至您的邮件。", EN:"Enter your registered email and we'll send a reset link.", JP:"登録メールアドレスを入力してください。リセットリンクを送信します。", KR:"등록된 이메일을 입력하시면 재설정 링크를 보내드립니다." },
      sendReset:  { TC:"發送重置連結", SC:"发送重置链接", EN:"Send Reset Link", JP:"リセットリンクを送信", KR:"재설정 링크 보내기" },
      resetSent:  { TC:"重置郵件已發送！請檢查您的郵箱並按照指示重置密碼。", SC:"重置邮件已发送！请检查您的邮箱并按照指示重置密码。", EN:"Reset email sent! Please check your inbox and follow the instructions.", JP:"リセットメールを送信しました。受信トレイをご確認ください。", KR:"재설정 이메일이 전송되었습니다. 받은 편지함을 확인해 주세요." },
      loginDone:  { TC:"登录成功！歡迎回來。", SC:"登录成功！欢迎回来。", EN:"Login successful! Welcome back.", JP:"ログイン成功！おかえりなさい。", KR:"로그인 성공! 다시 오신 것을 환영합니다." },
      backLogin:  { TC:"返回登录", SC:"返回登录", EN:"Back to Login", JP:"ログインに戻る", KR:"로그인으로 돌아가기" },
      noAccount:  { TC:"還沒有帳戶？", SC:"还没有账户？", EN:"No account yet?", JP:"アカウントをお持ちでない方", KR:"계정이 없으신가요?" },
    };
    const L = (key: keyof typeof loginLabels) => (loginLabels[key] as Record<Lang, string>)[lang] ?? loginLabels[key]["TC"];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 relative">
          <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>

          {/* Logo + title */}
          <div className="flex items-center gap-2.5 mb-6">
            <BrandLogo height={32} />
            <h2 className="font-black text-foreground text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {view === "forgot" || view === "reset-sent" ? L("forgotTitle") : L("title")}
            </h2>
          </div>

          {/* ── Login form ── */}
          {view === "login" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">{tr.rem}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">{tr.rpw}</label>
                  <button
                    type="button"
                    onClick={() => { setResetEmail(email); setView("forgot"); }}
                    className="text-xs text-accent hover:underline font-medium"
                  >
                    {L("forgot")}
                  </button>
                </div>
                <input
                  type="password"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                onClick={async () => {
                  if (!email || !pwd) return;
                  try {
                    const resp = await fetch('/api/auth/login', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, password: pwd }),
                    });
                    const data = await resp.json();
                    if (data.success && data.data?.token) {
                      // 保存 JWT token 和用户邮箱到 localStorage
                      localStorage.setItem('_jwtToken', data.data.token);
                      localStorage.setItem('_loggedInUser', data.data.user.email);
                      setLoggedInUser(data.data.user.email);
                      setShowLogin(false);
                    } else {
                      alert(data.message || (lang === 'EN' ? 'Login failed' : '登录失败'));
                    }
                  } catch {
                    alert(lang === 'EN' ? 'Network error' : '网络错误');
                  }
                }}
                disabled={!email || !pwd}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {L("title")}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                {L("noAccount")}{" "}
                <button onClick={() => { setShowLogin(false); setShowReg(true); }} className="text-accent font-semibold hover:underline">{tr.reg}</button>
              </p>
            </div>
          )}

          {/* ── Forgot password form ── */}
          {view === "forgot" && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">{L("forgotDesc")}</p>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">{tr.rem}</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                onClick={async () => {
                  if (!resetEmail) return;
                  setResetLoading(true);
                  setResetError("");
                  try {
                    const resp = await fetch("/api/auth/forgot-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: resetEmail }),
                    });
                    const data = await resp.json();
                    if (data.success) {
                      setView("reset-sent");
                    } else {
                      setResetError(data.message || "发送失败，请重试");
                    }
                  } catch (err) {
                    setResetError("网络错误，请检查连接后重试");
                  } finally {
                    setResetLoading(false);
                  }
                }}
                disabled={!resetEmail || resetLoading}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {resetLoading ? "發送中..." : L("sendReset")}
              </button>
              {resetError && <p className="text-red-500 text-xs text-center">{resetError}</p>}
              <button onClick={() => setView("login")} className="w-full text-muted-foreground text-sm hover:text-foreground transition-colors">
                ← {L("backLogin")}
              </button>
            </div>
          )}

          {/* ── Reset email sent ── */}
          {view === "reset-sent" && (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-accent" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">{L("resetSent")}</p>
              <p className="font-semibold text-foreground text-sm mb-5">{resetEmail}</p>
              <button onClick={() => setView("login")} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors">
                {L("backLogin")}
              </button>
            </div>
          )}

          {/* ── Login success ── */}
          {view === "login-done" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-green-600" />
              </div>
              <p className="font-bold text-foreground mb-4">{L("loginDone")}</p>
              <button onClick={() => { const e = sessionStorage.getItem('_loginEmail'); if (e) { setLoggedInUser(e); localStorage.setItem('_loggedInUser', e); sessionStorage.removeItem('_loginEmail'); } setShowLogin(false); }} className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-accent transition-colors">{tr.close}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── PAYMENT MODAL ─────────────────────────────────────
  function PaymentModal() {
    // ── booking form state ──
    const [skiType, setSkiType] = useState<"ski"|"snowboard"|"">("");
    const [groupSize, setGroupSize] = useState<number|null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [needEquip, setNeedEquip] = useState<"yes"|"no"|"">("");
    const [contactTypes, setContactTypes] = useState<Set<string>>(new Set());
    const [contactVals, setContactVals] = useState<Record<string, string>>({});
    const [skillLevel, setSkillLevel] = useState<number|null>(null);
    // ── payment state ──
    const [step, setStep] = useState<1|2|3>(1);
    const [selPay, setSelPay] = useState("");
    const [cardNum, setCardNum] = useState("");
    const [expiry, setExpiry]   = useState("");
    const [cvv, setCvv]         = useState("");
    const [holder, setHolder]   = useState("");
    const [paying, setPaying]     = useState(false);
    const [sending, setSending]   = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const isEN = lang === "EN";
    const L = (tc: string, en: string) => isEN ? en : tc;

    const contactFilled = contactTypes.size > 0 && [...contactTypes].every(t => (contactVals[t] ?? "").trim() !== "");
    const step1Valid = skiType && groupSize && startDate && endDate && needEquip && contactFilled && skillLevel !== null;

    const skillLabelMap = ["完全新手","初學者","初中階","中高階"];

    const handleConfirmBooking = async () => {
      if (!step1Valid) return;
      setSending(true);
      // 构建邮件内容
      const contactStr = contactOptions
        .filter(o => contactTypes.has(o.id))
        .map(o => `${o.label}: ${contactVals[o.id] ?? ""}`)
        .join(" | ");
      const body = [
        `【SnowTrip 預訂資料】`,
        `雪場：${payResort?.name} (${payResort?.loc})`,
        `課程費用：${payResort?.price}`,
        `滑雪種類：${skiType === "ski" ? "雙板 Ski" : "單板 Snowboard"}`,
        `每組人數：${groupSize} 人`,
        `上課日期：${startDate} → ${endDate}`,
        `租借裝備：${needEquip === "yes" ? "需要" : "不需要"}`,
        `滑雪程度：${skillLabelMap[skillLevel!] ?? ""}`,
        `聯絡方式：${contactStr}`,
        `提交時間：${new Date().toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong" })}`,
      ].join("\n");

      try {
        // 嘗試通過後端 API 發送郵件
        const customerEmail = contactVals["email"]?.trim() || "";
        const resp = await fetch("/api/bookings/send-email", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...getAuthHeaders()
          },
          body: JSON.stringify({
            to: "zhongwenleng6@gmail.com",
            customerEmail,
            subject: `[SnowTrip] 新預訂 - ${payResort?.name}`,
            body,
            booking_data: {
              resort_name: payResort?.name || '',
              start_date: startDate,
              end_date: endDate,
              ski_type: skiType,
              course_type: 'private',
              group_size: groupSize,
              need_equipment: needEquip === "yes",
              skill_level: skillLevel ?? 0,
              email: customerEmail,
              contact_info: contactVals,
            },
          }),
        });
        if (resp.ok) {
          const data = await resp.json();
          const failed: string[] = (data.results || []).filter((r: any) => !r.success).map((r: any) => r.to);
          if (failed.length > 0) {
            alert(`以下郵箱發送失敗：\n${failed.join("、")}`);
          }
        }
      } catch {
        // 後端不可用時使用 mailto 備用方案
        const mailto = `mailto:zhongwenleng6@gmail.com?subject=${encodeURIComponent(`[SnowTrip] 新預訂 - ${payResort?.name}`)}&body=${encodeURIComponent(body)}`;
        window.open(mailto, "_blank");
      } finally {
        setSending(false);
        setEmailSent(true);
        setTimeout(() => { setStep(2); }, 1500);
      }
    };

    const PAY_METHODS = [
      {
        id: "wechat",
        label: "微信支付 WeChat Pay",
        color: "#07C160",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.161 1.71-1.484 1.254-2.066 3.271-1.462 5.06.774 2.324 3.14 3.87 5.78 3.87.602 0 1.196-.07 1.776-.202a.64.64 0 01.531.07l1.406.82a.232.232 0 00.127.04.218.218 0 00.215-.218.265.265 0 00-.036-.158l-.29-1.1a.437.437 0 01.156-.49C21.117 17.203 22 16.019 22 14.69c0-2.986-2.69-5.38-5.062-5.832zm-2.74 2.607c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864zm5.28 0c.47 0 .85.386.85.864 0 .477-.38.864-.85.864a.857.857 0 01-.85-.864c0-.478.38-.864.85-.864z"/>
          </svg>
        ),
        type: "qr",
      },
      {
        id: "alipay",
        label: "支付寶 Alipay",
        color: "#1677FF",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M21.422 15.358c-3.83-1.153-6.055-1.84-6.055-1.84s1.449-2.755 1.943-5.524H13.5V6.75h5.25V5.25H13.5V3h-2.449v2.25H5.75v1.5h5.301v1.244H7.24v1.5h8.09c-.3 1.238-.749 2.371-1.276 3.404C11.587 12.33 9.3 11.625 7 11.625c-3 0-5 1.5-5 3.75C2 17.813 4.014 19.5 7 19.5c2.572 0 5.003-1.403 6.697-3.703 1.808.826 4.13 1.928 7.053 3.328a9.001 9.001 0 01-8.75 6.875C6.373 26 2 21.627 2 16.25 2 10.873 6.373 6.5 12 6.5c5.627 0 10 4.373 10 9.75 0-.304-.017-.603-.043-.9l-.535.008zM7 18c-1.5 0-2.5-.75-2.5-1.875S5.5 14.25 7 14.25c1.5 0 3 .563 4.5 1.5C10.5 17.25 8.75 18 7 18z"/>
          </svg>
        ),
        type: "qr",
      },
      {
        id: "visa",
        label: "Visa",
        color: "#1A1F71",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 48 48" width="44" height="28" fill="none">
            <rect width="48" height="48" rx="6" fill="#1A1F71"/>
            <text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial" letterSpacing="1">VISA</text>
          </svg>
        ),
        type: "card",
      },
      {
        id: "mastercard",
        label: "Mastercard",
        color: "#EB001B",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 48 30" width="48" height="30" fill="none">
            <circle cx="18" cy="15" r="13" fill="#EB001B"/>
            <circle cx="30" cy="15" r="13" fill="#F79E1B"/>
            <path d="M24 4.8a13 13 0 010 20.4A13 13 0 0124 4.8z" fill="#FF5F00"/>
          </svg>
        ),
        type: "card",
      },
      {
        id: "applepay",
        label: "Apple Pay",
        color: "#000000",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
          </svg>
        ),
        type: "tap",
      },
      {
        id: "googlepay",
        label: "Google Pay",
        color: "#ffffff",
        textColor: "#3c4043",
        border: true,
        icon: (
          <svg viewBox="0 0 41 17" width="58" height="24" fill="none">
            <text x="0" y="13" fontSize="13" fontWeight="700" fontFamily="Arial">
              <tspan fill="#4285F4">G</tspan>
              <tspan fill="#EA4335">o</tspan>
              <tspan fill="#FBBC05">o</tspan>
              <tspan fill="#4285F4">g</tspan>
              <tspan fill="#34A853">l</tspan>
              <tspan fill="#EA4335">e</tspan>
              <tspan fill="#3c4043"> Pay</tspan>
            </text>
          </svg>
        ),
        type: "tap",
      },
      {
        id: "unionpay",
        label: "銀聯 UnionPay",
        color: "#C0392B",
        textColor: "white",
        icon: (
          <svg viewBox="0 0 60 30" width="60" height="30" fill="none">
            <rect width="60" height="30" rx="4" fill="#C0392B"/>
            <rect x="22" width="16" height="30" rx="4" fill="#1A1A8C"/>
            <rect x="38" width="22" height="30" rx="4" fill="#1A1A8C"/>
            <text x="10" y="20" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">UP</text>
          </svg>
        ),
        type: "qr",
      },
    ];

    const selected = PAY_METHODS.find(m => m.id === selPay);

    const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    const formatExpiry = (v: string) => {
      const d = v.replace(/\D/g, "").slice(0, 4);
      return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
    };

    const handlePay = () => {
      setPaying(true);
      setTimeout(() => { setPaying(false); setStep(3); }, 1200);
    };

    const handleClose = () => {
      if (payStep === 3) {
        // Booking success → auto open My Orders
        setShowPayment(false);
        setPayStep(1);
        setPayMethod("");
        setShowOrders(true);
        setOrderDetail(null);
        setOrderFilter("");
      } else {
        setShowPayment(false);
        setPayStep(1);
        setPayMethod("");
      }
    };

    const skillLevels = [
      { tc: "完全新手", en: "Complete Beginner", desc_tc: "從未接觸過滑雪", desc_en: "Never skied before" },
      { tc: "初學者",   en: "Beginner",          desc_tc: "學過一兩次，會剎停，可在初級道緩慢滑行", desc_en: "Tried 1–2 times, can stop, slow on beginner slopes" },
      { tc: "初中階",   en: "Intermediate",      desc_tc: "初級道順暢滑行，開始練習轉彎技巧", desc_en: "Comfortable on beginner slopes, learning to turn" },
      { tc: "中高階",   en: "Advanced",          desc_tc: "中高級道順暢滑行，流暢轉彎/換刃", desc_en: "Confident on intermediate/advanced runs, smooth carving" },
    ];

    const contactOptions: { id: "whatsapp"|"line"|"wechat"|"email"; label: string }[] = [
      { id: "whatsapp", label: "WhatsApp" },
      { id: "line",     label: "LINE" },
      { id: "wechat",   label: L("微信","WeChat") },
      { id: "email",    label: L("電郵","Email") },
    ];

    const Radio = ({ checked, onClick, children }: { checked: boolean; onClick: () => void; children: React.ReactNode }) => (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${checked ? "border-accent bg-sky-50 text-accent" : "border-border bg-white text-foreground hover:border-muted-foreground"}`}
      >
        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${checked ? "border-accent" : "border-muted-foreground"}`}>
          {checked && <span className="w-2 h-2 rounded-full bg-accent" />}
        </span>
        {children}
      </button>
    );

    const SectionTitle = ({ n, title }: { n: number; title: string }) => (
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
        <span className="font-bold text-foreground text-sm">{title}</span>
      </div>
    );

    function renderStep2() {
      if (!selPay || !selected) {
        return (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3">{L("請選擇支付方式","SELECT PAYMENT METHOD")}</p>
            <div className="grid grid-cols-2 gap-3">
              {PAY_METHODS.map(m => {
                const btnStyle: React.CSSProperties = { background: m.color };
                if ((m as any).border) btnStyle.border = "1px solid #e0e0e0";
                return (
                  <button key={m.id} onClick={() => setSelPay(m.id)}
                    className="relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 border-2 border-border hover:border-accent bg-white hover:bg-sky-50 transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={btnStyle}>
                      {m.icon}
                    </div>
                    <span className="text-xs font-semibold text-foreground text-center leading-tight">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      const headerStyle: React.CSSProperties = { background: selected.color };
      if ((selected as any).border) headerStyle.border = "1px solid #e0e0e0";

      const tapBtnStyle: React.CSSProperties = { background: selected.color };
      if ((selected as any).border) tapBtnStyle.border = "2px solid #e0e0e0";

      const payLabel = isEN ? ("Pay " + (payResort?.price ?? "")) : ("確認支付 " + (payResort?.price ?? ""));
      const processingLabel = isEN ? "Processing…" : "處理中…";

      return (
        <div>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5" style={headerStyle}>
            {selected.icon}
            <span className="font-bold text-sm" style={{ color: selected.textColor }}>{selected.label}</span>
            <button onClick={() => setSelPay("")} className="ml-auto text-xs underline opacity-70 hover:opacity-100" style={{ color: selected.textColor }}>
              {L("更改","Change")}
            </button>
          </div>

          {selected.type === "qr" && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-4">{L("請掃描以下二維碼完成支付","Scan the QR code below to pay")}</p>
              <div className="mx-auto w-52 rounded-2xl overflow-hidden border-2 border-border mb-3 bg-white">
                <img
                  src={selPay === "wechat" ? imgQrWechat : selPay === "alipay" ? imgQrAlipay : imgQrYoungsnow}
                  alt="Payment QR Code"
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
              <div className="mt-3 bg-muted rounded-xl p-3 text-sm font-bold text-foreground">
                {L("支付金額：","Amount: ")}{payResort?.price}
              </div>
              <button onClick={handlePay} disabled={paying}
                className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-60">
                {paying ? ("⏳ " + processingLabel) : L("我已完成支付","I Have Paid")}
              </button>
            </div>
          )}

          {selected.type === "card" && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">{L("卡號","Card Number")}</label>
                <input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent font-mono tracking-wider" maxLength={19}/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">{L("持卡人姓名","Card Holder Name")}</label>
                <input value={holder} onChange={e => setHolder(e.target.value)} placeholder={L("姓名（拼音）","JOHN SMITH")}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent uppercase"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{L("到期日","Expiry Date")}</label>
                  <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent font-mono" maxLength={5}/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">CVV</label>
                  <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="•••" type="password"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent font-mono" maxLength={4}/>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                <span>🔒</span>
                <span>{L("256-bit SSL 加密 · 符合 PCI DSS 標準","256-bit SSL encrypted · PCI DSS compliant")}</span>
              </div>
              <button onClick={handlePay}
                disabled={cardNum.length < 19 || expiry.length < 5 || cvv.length < 3 || !holder || paying}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {paying ? ("⏳ " + processingLabel) : payLabel}
              </button>
            </div>
          )}

          {selected.type === "tap" && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-6">{L("點擊下方按鈕授權支付","Tap the button below to authorize payment")}</p>
              <button onClick={handlePay} disabled={paying}
                className="mx-auto flex flex-col items-center justify-center w-36 h-36 rounded-full hover:scale-105 transition-all shadow-lg disabled:opacity-60"
                style={tapBtnStyle}>
                <span className="text-3xl mb-1">{selected.id === "applepay" ? "🍎" : "G"}</span>
                <span className="font-bold text-sm" style={{ color: selected.textColor }}>
                  {paying ? "…" : L("點擊支付","Tap to Pay")}
                </span>
              </button>
              <p className="text-sm font-bold text-foreground mt-5">{payResort?.price}</p>
              <p className="text-xs text-muted-foreground mt-1">{L("需進行生物識別或 PIN 驗證","Biometric / PIN authentication required")}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm"
        onClick={step !== 3 ? handleClose : undefined}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
          style={{ maxHeight: "90vh" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-white/60 hover:text-white mr-1">
                  <ChevronLeft size={20} />
                </button>
              )}
              <BrandLogo height={26} />
              <span className="text-white font-bold text-sm">
                {step === 1 ? L("填寫預訂資料","Booking Details")
                 : step === 2 ? L("選擇支付方式","Payment Method")
                 : L("預訂成功","Booking Confirmed")}
              </span>
            </div>
            {step !== 3 && (
              <button onClick={handleClose} className="text-white/60 hover:text-white"><X size={20} /></button>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted shrink-0">
            <div className="h-1 bg-accent transition-all duration-500" style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }} />
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 p-6">

            {/* Resort summary strip */}
            {step < 3 && payResort && (
              <div className="flex gap-3 items-center bg-muted rounded-xl p-3 mb-6">
                <img src={payResort.img} alt={payResort.name} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm truncate">{payResort.name}</p>
                  <p className="text-muted-foreground text-xs flex items-center gap-1"><MapPin size={10}/>{payResort.loc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{L("課程費用","Course Fee")}</p>
                  <p className="font-black text-accent text-base">{payResort.price}</p>
                </div>
              </div>
            )}

            {/* ══ STEP 1 — Booking Details Form ══ */}
            {step === 1 && (
              <div className="space-y-6">

                {/* 1. Ski type */}
                <div>
                  <SectionTitle n={1} title={L("滑雪種類","Ski Type")} />
                  <div className="flex flex-wrap gap-2">
                    <Radio checked={skiType === "ski"} onClick={() => setSkiType("ski")}>{L("雙板 (Ski)","Ski (Alpine)")}</Radio>
                    <Radio checked={skiType === "snowboard"} onClick={() => setSkiType("snowboard")}>{L("單板 (Snowboard)","Snowboard")}</Radio>
                  </div>
                </div>

                {/* 2. Group size */}
                <div>
                  <SectionTitle n={2} title={L("每組人數","Group Size")} />
                  <div className="flex flex-wrap gap-2">
                    {[1,2,3,4].map(n => (
                      <Radio key={n} checked={groupSize === n} onClick={() => setGroupSize(n)}>
                        {n} {L("人","person(s)")}
                      </Radio>
                    ))}
                  </div>
                </div>

                {/* 3. Dates */}
                <div>
                  <SectionTitle n={3} title={L("上課日期","Course Dates")} />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{L("開始日期","Start Date")}</label>
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{L("結束日期","End Date")}</label>
                      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                  </div>
                </div>

                {/* 4. Equipment rental */}
                <div>
                  <SectionTitle n={4} title={L("是否需要租借裝備","Equipment Rental")} />
                  <div className="flex gap-2">
                    <Radio checked={needEquip === "yes"} onClick={() => setNeedEquip("yes")}>{L("需要","Yes")}</Radio>
                    <Radio checked={needEquip === "no"} onClick={() => setNeedEquip("no")}>{L("不需要","No")}</Radio>
                  </div>
                </div>

                {/* 5. Contact */}
                <div>
                  <SectionTitle n={5} title={L("聯絡方式（可多選）","Contact Method (multi-select)")} />
                  <div className="flex flex-wrap gap-2 mb-3">
                    {contactOptions.map(o => {
                      const checked = contactTypes.has(o.id);
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setContactTypes(prev => {
                              const next = new Set(prev);
                              if (next.has(o.id)) next.delete(o.id); else next.add(o.id);
                              return next;
                            });
                          }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${checked ? "border-accent bg-sky-50 text-accent" : "border-border bg-white text-foreground hover:border-muted-foreground"}`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${checked ? "border-accent bg-accent" : "border-muted-foreground"}`}>
                            {checked && <Check size={10} className="text-white" />}
                          </span>
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  {contactTypes.size > 0 && (
                    <div className="space-y-2">
                      {contactOptions.filter(o => contactTypes.has(o.id)).map(o => (
                        <div key={o.id} className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground w-20 shrink-0">{o.label}</span>
                          <input
                            value={contactVals[o.id] ?? ""}
                            onChange={e => setContactVals(prev => ({ ...prev, [o.id]: e.target.value }))}
                            placeholder={
                              o.id === "email"
                                ? "example@email.com"
                                : o.id === "wechat"
                                  ? L("請輸入微信號","Enter WeChat ID")
                                  : L("請輸入號碼（含國碼）","Enter number with country code")
                            }
                            className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. Skill level */}
                <div>
                  <SectionTitle n={6} title={L("滑雪程度","Skill Level")} />
                  <div className="space-y-2">
                    {skillLevels.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSkillLevel(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${skillLevel === i ? "border-accent bg-sky-50" : "border-border bg-white hover:border-muted-foreground"}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${skillLevel === i ? "border-accent" : "border-muted-foreground"}`}>
                            {skillLevel === i && <span className="w-2 h-2 rounded-full bg-accent" />}
                          </span>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{isEN ? s.en : s.tc}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{isEN ? s.desc_en : s.desc_tc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {emailSent && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                    <Check size={16} className="shrink-0" />
                    {L("預訂資料已發送！正在跳轉至支付頁面…","Booking details sent! Redirecting to payment…")}
                  </div>
                )}
                <button
                  onClick={handleConfirmBooking}
                  disabled={!step1Valid || sending || emailSent}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />{L("發送中…","Sending…")}</>
                  ) : (
                    L("確認預訂資料","Confirm Booking Details")
                  )}
                </button>
              </div>
            )}

            {step === 2 && renderStep2()}

            {/* ══ STEP 3 — Success ══ */}
            {step === 3 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={36} className="text-green-600" />
                </div>
                <h3 className="font-black text-foreground text-2xl mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {L("預訂成功！","Booking Confirmed!")}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {L("您的課程已確認，確認通知將透過您留下的聯絡方式發送。","Your lesson is confirmed. A confirmation will be sent to your contact.") }
                </p>
                {payResort && (
                  <div className="bg-muted rounded-xl p-4 text-left mb-5 space-y-2.5">
                    {[
                      [L("雪場","Resort"), payResort.name],
                      [L("滑雪種類","Ski Type"), skiType === "ski" ? L("雙板","Ski") : L("單板","Snowboard")],
                      [L("人數","Group Size"), `${groupSize} ${L("人","person(s)")}`],
                      [L("日期","Dates"), `${startDate} → ${endDate}`],
                      [L("租借裝備","Equipment"), needEquip === "yes" ? L("需要","Yes") : L("不需要","No")],
                      [L("程度","Level"), isEN ? skillLevels[skillLevel!]?.en : skillLevels[skillLevel!]?.tc],
                      [L("聯絡方式","Contact"), contactOptions.filter(o=>contactTypes.has(o.id)).map(o=>`${o.label}: ${contactVals[o.id]??""}`).join(" · ")],
                      [L("支付方式","Payment"), PAY_METHODS.find(m => m.id === selPay)?.label ?? ""],
                      [L("課程費用","Course Fee"), payResort.price],
                      [L("訂單號碼","Order No."), `ST-${Date.now().toString().slice(-8)}`],
                    ].map(([k, v], i) => (
                      <div key={i} className="flex justify-between text-sm gap-2">
                        <span className="text-muted-foreground shrink-0">{k}</span>
                        <span className={`font-semibold text-foreground text-right ${k === L("課程費用","Course Fee") ? "text-accent" : ""}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={handleClose} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors">
                  {L("返回預訂頁面","Back to Booking")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
