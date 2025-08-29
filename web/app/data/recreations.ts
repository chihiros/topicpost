export interface Recreation {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  target_age_min?: number;
  target_age_max?: number;
  participant_count_min?: number;
  participant_count_max?: number;
  duration_minutes?: number;
  required_items?: string;
  rules: string;
  tips?: string;
  prefecture?: string;
  category: ('sports' | 'brain' | 'creative' | 'communication')[];
  location_type: 'indoor' | 'outdoor';
  poster_name?: string;
  created_at: string;
  updated_at: string;
}

export const recreationsDummyData: Recreation[] = [
  {
    id: 1,
    title: "だるまさんがころんだ",
    description: "みんなで楽しめる**定番の鬼ごっこゲーム**です。\n\n- 広いスペースが必要\n- みんなでワイワイ楽しめる\n- 運動不足解消にも◎\n\n参考動画: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop",
    target_age_min: 5,
    target_age_max: 12,
    participant_count_min: 3,
    participant_count_max: 20,
    duration_minutes: 15,
    required_items: "特になし",
    rules: `## 基本ルール

1. **鬼を1人決める**
2. 鬼は壁や木に向かって立つ
3. 他の人は鬼から**10-15m離れた位置**からスタート

## 進め方

1. 鬼が「**だるまさんがころんだ**」と言いながら数を数える
2. 言い終わったら**振り返る**
3. 動いている人がいたら**アウト**！
4. アウトになった人は**スタート地点に戻る**
5. 誰かが鬼に**タッチしたら勝利**！

> **ポイント**: 鬼が振り返る直前で止まるのがコツ`,
    tips: `## 安全に楽しむために

⚠️ **注意事項**
- 転んでも大丈夫な**服装**で参加
- **安全な場所**で行う（石や段差がない場所）
- 無理に走らず、**体調に合わせて**参加

💡 **盛り上げるコツ**
- 鬼の声の大きさや速さを**変えてみる**
- 「だるまさんが〇〇した」など**アレンジ**も楽しい
- 年齢差がある場合は**ハンデ**をつける`,
    prefecture: "13",
    category: ["sports"],
    location_type: "outdoor",
    poster_name: "東京のリーダー",
    created_at: "2025-08-29T10:00:00Z",
    updated_at: "2025-08-29T10:00:00Z"
  },
  {
    id: 2,
    title: "なぞなぞリレー",
    description: "**チーム対抗**でなぞなぞを解いていくゲーム。\n\n- 頭をフル回転させよう🧠\n- チームワークが重要\n- 年齢問わず楽しめる\n\n関連ツイート: https://twitter.com/username/status/1234567890123456789",
    image_url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=200&fit=crop",
    target_age_min: 6,
    target_age_max: 15,
    participant_count_min: 6,
    participant_count_max: 30,
    duration_minutes: 20,
    required_items: "なぞなぞ問題集、ホワイトボード、マーカー",
    rules: "チームごとになぞなぞを順番に解答。正解したら次の問題へ。最初にゴールしたチームの勝利！",
    tips: "年齢に応じて問題の難易度を調整しましょう",
    prefecture: "27",
    category: ["brain"],
    location_type: "indoor",
    poster_name: "大阪のリーダー",
    created_at: "2025-08-28T14:30:00Z",
    updated_at: "2025-08-28T14:30:00Z"
  },
  {
    id: 3,
    title: "新聞紙ファッションショー",
    description: "新聞紙でオリジナル衣装を作るクリエイティブゲーム\n\nInstagramで作品紹介: https://www.instagram.com/p/ABC123DEF456/",
    image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop",
    target_age_min: 8,
    target_age_max: 18,
    participant_count_min: 4,
    participant_count_max: 16,
    duration_minutes: 45,
    required_items: "新聞紙、テープ、ハサミ、ホチキス",
    rules: "チームで新聞紙を使って衣装を作成。最後にファッションショーで発表し、投票で優勝チームを決定！",
    tips: "安全にハサミを使い、創造力を大切に。テーマを決めると盛り上がります",
    prefecture: "01",
    category: ["creative"],
    location_type: "indoor",
    poster_name: "北海道のリーダー",
    created_at: "2025-08-27T16:15:00Z",
    updated_at: "2025-08-27T16:15:00Z"
  },
  {
    id: 4,
    title: "人間知恵の輪",
    description: "みんなで手をつないで輪っかを作り、絡まった状態から元に戻すゲーム\n\nFacebookでイベント情報: https://www.facebook.com/events/123456789012345/posts/123456789",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop",
    target_age_min: 10,
    target_age_max: 99,
    participant_count_min: 6,
    participant_count_max: 12,
    duration_minutes: 10,
    required_items: "特になし",
    rules: "円になって隣以外の人と両手でつなぐ。手を離さずに元の円に戻せればクリア！",
    tips: "コミュニケーションが重要。無理に力を入れすぎないよう注意",
    prefecture: "40",
    category: ["communication"],
    location_type: "indoor",
    poster_name: "福岡のリーダー",
    created_at: "2025-08-26T11:20:00Z",
    updated_at: "2025-08-26T11:20:00Z"
  },
  {
    id: 5,
    title: "色おにごっこ",
    description: "指定された色に触れることで逃げられる鬼ごっこ\n\nX（旧Twitter）で遊び方解説: https://x.com/example/status/1234567890123456789",
    image_url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=200&fit=crop",
    target_age_min: 4,
    target_age_max: 10,
    participant_count_min: 5,
    participant_count_max: 25,
    duration_minutes: 10,
    required_items: "特になし（色のあるものがある場所）",
    rules: "鬼が色を指定したら、その色に触れている人は捕まえられない。色に触れていない人を捕まえたら鬼交代！",
    tips: "事前に周りにある色を確認しておきましょう。安全な場所で行うこと",
    prefecture: "23",
    category: ["sports"],
    location_type: "outdoor",
    poster_name: "愛知のリーダー",
    created_at: "2025-08-25T09:45:00Z",
    updated_at: "2025-08-25T09:45:00Z"
  }
];

// 都道府県コードから名前を取得するマップ
export const prefectureMap: { [key: string]: string } = {
  "01": "北海道", "02": "青森県", "03": "岩手県", "04": "宮城県", "05": "秋田県",
  "06": "山形県", "07": "福島県", "08": "茨城県", "09": "栃木県", "10": "群馬県",
  "11": "埼玉県", "12": "千葉県", "13": "東京都", "14": "神奈川県", "15": "新潟県",
  "16": "富山県", "17": "石川県", "18": "福井県", "19": "山梨県", "20": "長野県",
  "21": "岐阜県", "22": "静岡県", "23": "愛知県", "24": "三重県", "25": "滋賀県",
  "26": "京都府", "27": "大阪府", "28": "兵庫県", "29": "奈良県", "30": "和歌山県",
  "31": "鳥取県", "32": "島根県", "33": "岡山県", "34": "広島県", "35": "山口県",
  "36": "徳島県", "37": "香川県", "38": "愛媛県", "39": "高知県", "40": "福岡県",
  "41": "佐賀県", "42": "長崎県", "43": "熊本県", "44": "大分県", "45": "宮崎県",
  "46": "鹿児島県", "47": "沖縄県"
};

// カテゴリの日本語名
export const categoryMap: { [key: string]: string } = {
  "sports": "運動系",
  "brain": "頭脳系", 
  "creative": "創作系",
  "communication": "コミュニケーション"
};

// 場所タイプの日本語名
export const locationTypeMap: { [key: string]: string } = {
  "indoor": "屋内",
  "outdoor": "屋外"
};