// 내장 HS 코드 사전 (HS 2022 기준 6자리 + 한/영 키워드).
// AI 키 없을 때 폴백 검색용. 절대적이지 않으며 대략적 분류 보조.

export type HsEntry = {
  hs6: string;
  title: string;
  titleKo: string;
  section: string;
  chapter: string;
  keywords: string[];      // 영문 (소문자)
  keywordsKo: string[];    // 한글
};

export const HS_DB: HsEntry[] = [
  // ── 식품 (Section I-IV, Chapter 02-22) ────────────────────────
  {
    hs6: "020110", titleKo: "쇠고기 (신선·냉장, 도체·반도체)", title: "Bovine carcasses, fresh or chilled",
    section: "Section I", chapter: "02",
    keywords: ["beef", "bovine", "fresh beef", "chilled beef", "carcass"],
    keywordsKo: ["쇠고기", "소고기", "신선육", "한우"],
  },
  {
    hs6: "030214", titleKo: "연어 (신선·냉장, 대서양·다뉴브)", title: "Atlantic & Danube salmon, fresh or chilled",
    section: "Section I", chapter: "03",
    keywords: ["salmon", "atlantic salmon", "fresh fish"],
    keywordsKo: ["연어", "생연어", "노르웨이연어"],
  },
  {
    hs6: "040120", titleKo: "우유 (지방함량 1~6%, 농축·당 미첨가)", title: "Milk, fat 1-6%, not concentrated",
    section: "Section I", chapter: "04",
    keywords: ["milk", "dairy", "fresh milk"],
    keywordsKo: ["우유", "유유", "신선우유", "저지방우유"],
  },
  {
    hs6: "070960", titleKo: "고추 (생것 또는 냉장)", title: "Peppers (Capsicum), fresh or chilled",
    section: "Section II", chapter: "07",
    keywords: ["pepper", "capsicum", "chili", "bell pepper"],
    keywordsKo: ["고추", "피망", "파프리카", "청양고추"],
  },
  {
    hs6: "080390", titleKo: "바나나 (플랜테인 외, 신선·건조)", title: "Bananas, fresh or dried (excl. plantains)",
    section: "Section II", chapter: "08",
    keywords: ["banana", "fresh banana"],
    keywordsKo: ["바나나"],
  },
  {
    hs6: "090111", titleKo: "원두 커피 (볶지 않은 것, 카페인 함유)", title: "Coffee, not roasted, not decaffeinated",
    section: "Section II", chapter: "09",
    keywords: ["coffee", "green coffee", "coffee bean", "raw coffee"],
    keywordsKo: ["커피", "원두", "생두", "커피생두"],
  },
  {
    hs6: "090121", titleKo: "원두 커피 (볶은 것, 카페인 함유)", title: "Coffee, roasted, not decaffeinated",
    section: "Section II", chapter: "09",
    keywords: ["roasted coffee", "coffee bean", "espresso"],
    keywordsKo: ["볶은커피", "로스팅원두", "에스프레소", "원두커피"],
  },
  {
    hs6: "090122", titleKo: "원두 커피 (볶은 것, 카페인 제거)", title: "Coffee, roasted, decaffeinated",
    section: "Section II", chapter: "09",
    keywords: ["decaf coffee", "decaffeinated", "roasted coffee"],
    keywordsKo: ["디카페인", "카페인제거", "디카페인커피"],
  },
  {
    hs6: "090230", titleKo: "홍차 (3kg 이하 포장, 발효차)", title: "Black tea, fermented, packings ≤ 3 kg",
    section: "Section II", chapter: "09",
    keywords: ["black tea", "tea", "fermented tea"],
    keywordsKo: ["홍차", "차", "티백"],
  },
  {
    hs6: "100630", titleKo: "쌀 (정미)", title: "Semi-milled or wholly milled rice",
    section: "Section II", chapter: "10",
    keywords: ["rice", "milled rice", "white rice"],
    keywordsKo: ["쌀", "백미", "정미", "찹쌀"],
  },
  {
    hs6: "180690", titleKo: "초콜릿 및 코코아 함유 식품 (기타)", title: "Other chocolate & cocoa preparations",
    section: "Section IV", chapter: "18",
    keywords: ["chocolate", "cocoa", "candy"],
    keywordsKo: ["초콜릿", "초코", "코코아", "쵸콜릿"],
  },
  {
    hs6: "190230", titleKo: "조리 또는 가공된 면류 (즉석면 포함)", title: "Pasta, cooked or otherwise prepared (incl. instant noodles)",
    section: "Section IV", chapter: "19",
    keywords: ["instant noodle", "ramen", "noodle", "pasta cooked"],
    keywordsKo: ["라면", "즉석면", "컵라면", "면", "라멘"],
  },
  {
    hs6: "200599", titleKo: "기타 채소 절임·가공 (식초 외, 김치 포함)", title: "Other prepared vegetables (incl. kimchi)",
    section: "Section IV", chapter: "20",
    keywords: ["kimchi", "pickled vegetable", "fermented vegetable"],
    keywordsKo: ["김치", "포기김치", "절임채소", "발효채소"],
  },
  {
    hs6: "220210", titleKo: "탄산음료 (당·향료 함유)", title: "Carbonated waters, with sugar/flavoring",
    section: "Section IV", chapter: "22",
    keywords: ["soda", "soft drink", "carbonated drink", "cola"],
    keywordsKo: ["탄산음료", "콜라", "사이다", "음료수"],
  },

  // ── 화장품·세제 (Chapter 33-34) ──────────────────────────────
  {
    hs6: "330499", titleKo: "기초 화장품 (스킨케어, 기타)", title: "Beauty preparations, skincare (other)",
    section: "Section VI", chapter: "33",
    keywords: ["cream", "skincare", "lotion", "serum", "moisturizer", "cosmetic"],
    keywordsKo: ["크림", "로션", "스킨", "에센스", "세럼", "기초화장품", "스킨케어"],
  },
  {
    hs6: "330510", titleKo: "샴푸", title: "Shampoos",
    section: "Section VI", chapter: "33",
    keywords: ["shampoo", "hair wash"],
    keywordsKo: ["샴푸", "헤어샴푸"],
  },
  {
    hs6: "330741", titleKo: "향초·실내 향수", title: "Agarbatti, scented room preparations",
    section: "Section VI", chapter: "33",
    keywords: ["candle", "incense", "scented", "fragrance"],
    keywordsKo: ["향초", "캔들", "방향제", "디퓨저"],
  },

  // ── 의약품 (Chapter 30) ──────────────────────────────────────
  {
    hs6: "300490", titleKo: "기타 의약품 (소매용 포장)", title: "Other medicaments, retail packing",
    section: "Section VI", chapter: "30",
    keywords: ["medicine", "drug", "tablet", "pharmaceutical"],
    keywordsKo: ["의약품", "약", "정제", "의약"],
  },

  // ── 플라스틱·고무 (Chapter 39-40) ────────────────────────────
  {
    hs6: "392329", titleKo: "플라스틱 포장용 봉투·자루", title: "Plastic sacks & bags (other plastics)",
    section: "Section VII", chapter: "39",
    keywords: ["plastic bag", "plastic pouch", "packaging bag"],
    keywordsKo: ["비닐봉지", "플라스틱백", "지퍼백", "포장봉지"],
  },
  {
    hs6: "401110", titleKo: "승용차용 신품 공기 타이어", title: "New pneumatic tyres for passenger cars",
    section: "Section VII", chapter: "40",
    keywords: ["car tire", "passenger tire", "pneumatic tyre"],
    keywordsKo: ["타이어", "승용차타이어", "자동차타이어"],
  },

  // ── 가죽·가방 (Chapter 42) ───────────────────────────────────
  {
    hs6: "420221", titleKo: "핸드백 (외피 가죽)", title: "Handbags with outer surface of leather",
    section: "Section VIII", chapter: "42",
    keywords: ["handbag", "leather bag", "purse"],
    keywordsKo: ["핸드백", "가죽가방", "여성가방", "백"],
  },
  {
    hs6: "420292", titleKo: "트래블백·배낭 (외피 플라스틱·섬유)", title: "Travel bags, backpacks (plastic/textile)",
    section: "Section VIII", chapter: "42",
    keywords: ["backpack", "travel bag", "rucksack"],
    keywordsKo: ["백팩", "배낭", "여행가방", "캐리어"],
  },

  // ── 종이·인쇄 (Chapter 48-49) ────────────────────────────────
  {
    hs6: "490199", titleKo: "도서·서적 (기타)", title: "Printed books, other",
    section: "Section X", chapter: "49",
    keywords: ["book", "printed book", "novel", "textbook"],
    keywordsKo: ["책", "도서", "서적", "단행본", "교과서"],
  },

  // ── 섬유·의류 (Chapter 50-63) ────────────────────────────────
  {
    hs6: "610910", titleKo: "면제 티셔츠 (메리야스·뜨개)", title: "T-shirts of cotton, knitted",
    section: "Section XI", chapter: "61",
    keywords: ["t-shirt", "cotton shirt", "tee", "tshirt"],
    keywordsKo: ["티셔츠", "면티", "반팔", "티"],
  },
  {
    hs6: "620342", titleKo: "남성용 면바지 (직물제)", title: "Men's cotton trousers, woven",
    section: "Section XI", chapter: "62",
    keywords: ["jeans", "trousers", "men pants", "denim"],
    keywordsKo: ["청바지", "남성바지", "데님", "면바지"],
  },
  {
    hs6: "640299", titleKo: "기타 신발 (외피 고무·플라스틱)", title: "Other footwear, rubber/plastic uppers",
    section: "Section XII", chapter: "64",
    keywords: ["shoes", "sneakers", "footwear", "trainers"],
    keywordsKo: ["신발", "운동화", "스니커즈", "슈즈"],
  },

  // ── 유리·세라믹 (Chapter 70) ─────────────────────────────────
  {
    hs6: "701090", titleKo: "유리병·항아리 (운반·포장용)", title: "Glass bottles & jars for packaging",
    section: "Section XIII", chapter: "70",
    keywords: ["glass bottle", "glass jar"],
    keywordsKo: ["유리병", "유리용기", "유리항아리"],
  },

  // ── 금속 제품 (Chapter 73-83) ────────────────────────────────
  {
    hs6: "732393", titleKo: "스테인리스강 식기·주방용품", title: "Stainless steel kitchen/table articles",
    section: "Section XV", chapter: "73",
    keywords: ["stainless tumbler", "stainless cup", "stainless steel cup", "kitchenware steel"],
    keywordsKo: ["스테인리스", "스텐", "텀블러", "스테인레스컵", "스텐주방용품"],
  },

  // ── 기계·전기 (Chapter 84-85) ────────────────────────────────
  {
    hs6: "847130", titleKo: "휴대용 자동자료처리기계 (≤10kg, 노트북)", title: "Portable digital ADP machines, ≤10 kg (laptops)",
    section: "Section XVI", chapter: "84",
    keywords: ["laptop", "notebook computer", "portable computer"],
    keywordsKo: ["노트북", "랩탑", "휴대용컴퓨터"],
  },
  {
    hs6: "850440", titleKo: "정지형 변환기 (전원공급장치·어댑터·인버터)", title: "Static converters (power adapters, inverters)",
    section: "Section XVI", chapter: "85",
    keywords: ["adapter", "power supply", "charger", "inverter"],
    keywordsKo: ["어댑터", "전원공급장치", "충전기", "인버터", "아답터"],
  },
  {
    hs6: "850760", titleKo: "리튬이온 축전지", title: "Lithium-ion accumulators",
    section: "Section XVI", chapter: "85",
    keywords: ["lithium ion battery", "li-ion", "ev battery", "battery cell"],
    keywordsKo: ["리튬이온배터리", "리튬이온", "전기차배터리", "배터리셀"],
  },
  {
    hs6: "851712", titleKo: "스마트폰·셀룰러 휴대전화", title: "Smartphones, cellular telephones",
    section: "Section XVI", chapter: "85",
    keywords: ["smartphone", "mobile phone", "cellphone", "iphone", "android phone"],
    keywordsKo: ["스마트폰", "휴대폰", "핸드폰", "아이폰", "갤럭시"],
  },
  {
    hs6: "851830", titleKo: "헤드폰·이어폰 (마이크 결합 포함)", title: "Headphones & earphones, with or without mic",
    section: "Section XVI", chapter: "85",
    keywords: ["headphone", "earphone", "earbuds", "bluetooth headphone", "wireless earphones", "airpods"],
    keywordsKo: ["헤드폰", "이어폰", "이어버드", "블루투스이어폰", "무선이어폰", "에어팟"],
  },
  {
    hs6: "852580", titleKo: "TV·디지털 카메라·비디오 카메라", title: "Television cameras, digital cameras, video camera recorders",
    section: "Section XVI", chapter: "85",
    keywords: ["camera", "digital camera", "video camera", "camcorder"],
    keywordsKo: ["카메라", "디카", "캠코더", "비디오카메라"],
  },
  {
    hs6: "852872", titleKo: "컬러 TV 수신기", title: "Reception apparatus for television, color",
    section: "Section XVI", chapter: "85",
    keywords: ["tv", "television", "smart tv", "led tv"],
    keywordsKo: ["티비", "텔레비전", "TV", "스마트티비"],
  },

  // ── 자동차·운송 (Chapter 87) ────────────────────────────────
  {
    hs6: "870321", titleKo: "승용차 (실린더 ≤1000cc, 가솔린)", title: "Motor cars, gasoline, ≤1000 cc",
    section: "Section XVII", chapter: "87",
    keywords: ["car", "passenger car", "automobile", "sedan"],
    keywordsKo: ["자동차", "승용차", "차량", "세단"],
  },
  {
    hs6: "871200", titleKo: "자전거 및 기타 인력 사이클", title: "Bicycles and other cycles, non-motorised",
    section: "Section XVII", chapter: "87",
    keywords: ["bicycle", "bike", "cycle"],
    keywordsKo: ["자전거", "사이클", "MTB"],
  },

  // ── 광학·의료기기 (Chapter 90) ──────────────────────────────
  {
    hs6: "900410", titleKo: "선글라스", title: "Sunglasses",
    section: "Section XVIII", chapter: "90",
    keywords: ["sunglasses", "shades"],
    keywordsKo: ["선글라스", "썬글라스"],
  },
  {
    hs6: "901890", titleKo: "기타 의료·외과용 기기", title: "Other medical/surgical instruments",
    section: "Section XVIII", chapter: "90",
    keywords: ["medical device", "surgical", "diagnostic"],
    keywordsKo: ["의료기기", "수술기구", "진단기기"],
  },

  // ── 시계·악기 (Chapter 91-92) ────────────────────────────────
  {
    hs6: "910219", titleKo: "전기식 손목시계 (스마트워치 포함)", title: "Wrist-watches, electrically operated (incl. smartwatches)",
    section: "Section XVIII", chapter: "91",
    keywords: ["smartwatch", "wristwatch", "apple watch", "watch"],
    keywordsKo: ["스마트워치", "손목시계", "애플워치", "갤럭시워치"],
  },

  // ── 가구·완구 (Chapter 94-95) ────────────────────────────────
  {
    hs6: "940360", titleKo: "기타 목재 가구", title: "Other wooden furniture",
    section: "Section XX", chapter: "94",
    keywords: ["wooden furniture", "table", "chair wood", "wood desk"],
    keywordsKo: ["목재가구", "원목가구", "나무책상", "원목테이블"],
  },
  {
    hs6: "950300", titleKo: "세발자전거·인형·완구·퍼즐 (기타)", title: "Tricycles, dolls, puzzles, other toys",
    section: "Section XX", chapter: "95",
    keywords: ["toy", "doll", "puzzle", "kids toy", "stuffed animal"],
    keywordsKo: ["장난감", "완구", "인형", "퍼즐", "유아용품"],
  },
  {
    hs6: "950450", titleKo: "비디오 게임 콘솔 및 기기", title: "Video game consoles and machines",
    section: "Section XX", chapter: "95",
    keywords: ["game console", "playstation", "xbox", "nintendo switch", "gaming"],
    keywordsKo: ["게임기", "콘솔", "플스", "엑박", "닌텐도", "스위치"],
  },

  // ── 보호필름·문구 ───────────────────────────────────────────
  {
    hs6: "700721", titleKo: "강화유리 (자동차·항공기·선박용 외)", title: "Toughened (tempered) safety glass, other",
    section: "Section XIII", chapter: "70",
    keywords: ["tempered glass", "screen protector glass", "safety glass"],
    keywordsKo: ["강화유리", "강화유리필름", "스크린보호필름유리"],
  },
  {
    hs6: "392690", titleKo: "기타 플라스틱 제품 (스크린 보호필름 등)", title: "Other plastic articles (incl. screen protectors)",
    section: "Section VII", chapter: "39",
    keywords: ["screen protector", "phone case plastic", "plastic film"],
    keywordsKo: ["보호필름", "휴대폰필름", "스크린필름"],
  },
];
