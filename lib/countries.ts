export interface Spot {
  name: string;
  description: string;
}

export interface Country {
  slug: string;
  name: string;
  capital: string;
  flag: string;
  description: string;
  spots: Spot[];
  bestSeason: string;
}

export const countries: Country[] = [
  {
    slug: 'thailand',
    name: 'タイ',
    capital: 'バンコク',
    flag: '🇹🇭',
    description: '微笑みの国。仏教文化と豊かな食文化、美しいビーチが共存する人気観光地。',
    spots: [
      { name: 'ワット・ポー', description: '全長46mの巨大な涅槃仏で有名なバンコク最古の寺院。タイ伝統医学の聖地でもある。' },
      { name: 'アユタヤ遺跡', description: '1350年に建都された古都の歴史公園。首のない仏像など独特の景観が世界遺産に登録されている。' },
      { name: 'クラビのライレイビーチ', description: '石灰岩の断崖に囲まれた陸路では行けない秘境のビーチ。透き通った海とカルスト地形が絶景。' },
    ],
    bestSeason: '11月〜2月（乾季・涼季）',
  },
  {
    slug: 'vietnam',
    name: 'ベトナム',
    capital: 'ハノイ',
    flag: '🇻🇳',
    description: 'フォーやバインミーなど絶品グルメと世界遺産が点在する細長い国。',
    spots: [
      { name: 'ハロン湾', description: '約1,600の奇岩・島々が浮かぶ世界自然遺産。クルーズ船でのんびり巡るのが定番。' },
      { name: 'ホイアン旧市街', description: '15〜19世紀の港町の面影が残るユネスコ世界遺産。ランタン祭りの夜景は幻想的。' },
      { name: 'フエ王宮', description: '阮朝の皇帝が暮らした宮殿群。ベトナム最後の王朝の遺産が城壁の中に広がる。' },
    ],
    bestSeason: '2月〜4月（中部・南部）/ 9月〜11月（北部）',
  },
  {
    slug: 'singapore',
    name: 'シンガポール',
    capital: 'シンガポール',
    flag: '🇸🇬',
    description: 'クリーンな都市国家。多民族文化が融合し、グルメ・ショッピングの聖地。',
    spots: [
      { name: 'マリーナ・ベイ・サンズ', description: '3棟のタワーを船型のスカイパークがつなぐ建築の傑作。屋上プールからの夜景は圧巻。' },
      { name: 'ガーデンズ・バイ・ザ・ベイ', description: '巨大なスーパーツリーが立ち並ぶ未来的な植物園。夜のライトアップショーが人気。' },
      { name: 'チャイナタウン & リトルインディア', description: '異なる文化が隣り合うシンガポールの縮図。本格的な屋台グルメも堪能できる。' },
    ],
    bestSeason: '2月〜4月（比較的雨が少ない時期）',
  },
  {
    slug: 'malaysia',
    name: 'マレーシア',
    capital: 'クアラルンプール',
    flag: '🇲🇾',
    description: '熱帯雨林と近代都市が共存。ペトロナスツインタワーが象徴的なマルチカルチャー国家。',
    spots: [
      { name: 'ペトロナスツインタワー', description: '高さ452mの双子タワー。スカイブリッジからクアラルンプールの全景を見渡せる。' },
      { name: 'キナバル山', description: '東南アジア最高峰（4,095m）。多様な固有種が棲む国立公園はユネスコ世界遺産。' },
      { name: 'ジョージタウン', description: 'ペナン島の旧市街はスパイストレードの歴史を残す多文化都市。ストリートアートが名物。' },
    ],
    bestSeason: '3月〜9月（西海岸側）/ 11月〜3月（東海岸側）',
  },
  {
    slug: 'indonesia',
    name: 'インドネシア',
    capital: 'ジャカルタ（移転中：ヌサンタラ）',
    flag: '🇮🇩',
    description: '世界最多の島嶼数を誇る群島国家。バリ島をはじめ多様な文化と自然が魅力。',
    spots: [
      { name: 'バリ島ウブド', description: '棚田と緑が広がるバリの芸術・文化の中心地。ケチャダンスや伝統工芸が体験できる。' },
      { name: 'ボロブドゥール', description: '世界最大の仏教寺院遺跡。500以上の仏像が並ぶ石造りのストゥーパは圧倒的な迫力。' },
      { name: 'コモド島', description: '世界最大のトカゲ「コモドドラゴン」の聖域。透明度の高い海はダイビングの名所でもある。' },
    ],
    bestSeason: '4月〜10月（乾季）',
  },
  {
    slug: 'philippines',
    name: 'フィリピン',
    capital: 'マニラ',
    flag: '🇵🇭',
    description: '7,000以上の島々からなる国。エメラルドグリーンの海と陽気な国民性が特徴。',
    spots: [
      { name: 'エルニドの海岸（パラワン島）', description: '石灰岩の崖と青い海が作り出す絶景ラグーン。「世界で最も美しいビーチ」にも選ばれた。' },
      { name: 'チョコレートヒルズ', description: 'ボホール島に広がる1,000以上の円錐形の丘。乾季に茶色くなる光景がチョコレートのよう。' },
      { name: 'イントラムロス', description: 'マニラに残るスペイン統治時代の城壁都市。石畳の街並みと歴史的な教会が見どころ。' },
    ],
    bestSeason: '11月〜5月（乾季）',
  },
  {
    slug: 'cambodia',
    name: 'カンボジア',
    capital: 'プノンペン',
    flag: '🇰🇭',
    description: '世界最大の宗教建築アンコール・ワットを擁する歴史と文化の宝庫。',
    spots: [
      { name: 'アンコール・ワット', description: '12世紀に建てられた世界最大の宗教建築。朝日に染まる五塔の姿は一生忘れられない絶景。' },
      { name: 'タ・プローム', description: '巨木の根が遺跡を飲み込む幻想的な寺院。映画「トゥームレイダー」のロケ地としても有名。' },
      { name: 'トンレサップ湖', description: '東南アジア最大の淡水湖。水上集落の生活と豊かな生態系が共存する独特の場所。' },
    ],
    bestSeason: '11月〜3月（乾季・涼季）',
  },
  {
    slug: 'laos',
    name: 'ラオス',
    capital: 'ビエンチャン',
    flag: '🇱🇦',
    description: 'メコン川に沿う内陸国。穏やかな時間が流れる「インドシナの宝石」と称される秘境。',
    spots: [
      { name: 'ルアンパバーン旧市街', description: '仏教寺院と仏領インドシナ時代の建築が共存する世界遺産の古都。早朝の托鉢は必見。' },
      { name: 'クワンシーの滝', description: 'ルアンパバーン近郊にある美しい多段式の滝。エメラルドグリーンの水と白い滝が神秘的。' },
      { name: 'パークウー洞窟', description: 'メコン川沿いの断崖にある洞窟寺院。数千体の仏像が安置された聖地で舟で向かう旅が格別。' },
    ],
    bestSeason: '10月〜2月（乾季・涼季）',
  },
  {
    slug: 'myanmar',
    name: 'ミャンマー',
    capital: 'ネーピードー',
    flag: '🇲🇲',
    description: '黄金の仏塔シュエダゴン・パゴダで名高い、豊かな仏教文化が息づく国。',
    spots: [
      { name: 'シュエダゴン・パゴダ', description: '高さ98mの黄金の仏塔。数千のダイヤモンドと宝石で飾られたヤンゴンのシンボル。' },
      { name: 'バガン', description: '11〜13世紀に建立された2,000以上の仏塔が平原に広がる絶景。気球から眺めるのが幻想的。' },
      { name: 'インレー湖', description: '片足漕ぎの漁師と水上集落が有名な高原の湖。独特の農法や伝統工芸が今も息づく。' },
    ],
    bestSeason: '10月〜2月（乾季・涼季）',
  },
  {
    slug: 'brunei',
    name: 'ブルネイ',
    capital: 'バンダルスリブガワン',
    flag: '🇧🇳',
    description: 'ボルネオ島北部の小国。石油資源で栄え、イスラム文化と壮麗なモスクが見どころ。',
    spots: [
      { name: 'オマール・アリ・サイフディン・モスク', description: '首都の中心部に建つ大理石と金ドームの壮麗なモスク。人工湖に映る姿が美しい。' },
      { name: 'イスタナ・ヌルル・イマン宮殿', description: '世界最大規模を誇るスルタンの宮殿。ハリラヤ祭期間中は一般公開される。' },
      { name: 'ウルテンブロン国立公園', description: 'ボルネオの熱帯雨林が広がる原生自然の宝庫。テングザルやオランウータンに出会える。' },
    ],
    bestSeason: '3月〜9月（比較的乾燥した時期）',
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}
