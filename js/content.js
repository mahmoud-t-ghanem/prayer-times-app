export const IMPORTANCE = [
  {
    icon: "fa-kaaba",
    title: { ar: "ركن من أركان الإسلام", en: "A pillar of Islam" },
    text: {
      ar: "الصلاة الركن الثاني من أركان الإسلام، وأول ما يُحاسَب عليه العبد يوم القيامة من عمله.",
      en: "Prayer is the second pillar of Islam, and the first deed a person is held accountable for on the Day of Judgment.",
    },
    ref: {
      ar: "رواه الترمذي والنسائي",
      en: "Narrated by at-Tirmidhi and an-Nasa'i",
    },
  },
  {
    icon: "fa-heart",
    title: { ar: "طمأنينة القلب", en: "Peace of heart" },
    text: {
      ar: "خمس مرات في اليوم تقف بين يدي الله فتتخفف من هموم الدنيا: ﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾.",
      en: "Five times a day you stand before Allah and unload the worries of life: “Verily, in the remembrance of Allah do hearts find rest.”",
    },
    ref: { ar: "سورة الرعد: 28", en: "Surah Ar-Ra'd: 28" },
  },
  {
    icon: "fa-droplet",
    title: { ar: "تكفير الخطايا", en: "Cleansing of sins" },
    text: {
      ar: "شبّه النبي ﷺ الصلوات الخمس بنهر جارٍ على باب أحدنا يغتسل فيه كل يوم خمس مرات، فلا يبقى من درنه شيء.",
      en: "The Prophet ﷺ likened the five prayers to a flowing river at one's door in which one bathes five times a day, leaving no trace of dirt.",
    },
    ref: { ar: "متفق عليه", en: "Agreed upon (Bukhari & Muslim)" },
  },
  {
    icon: "fa-shield-halved",
    title: { ar: "حماية من الفحشاء والمنكر", en: "Protection from wrongdoing" },
    text: {
      ar: "﴿وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ﴾.",
      en: "“Establish prayer. Indeed, prayer prohibits immorality and wrongdoing.”",
    },
    ref: { ar: "سورة العنكبوت: 45", en: "Surah Al-Ankabut: 45" },
  },
  {
    icon: "fa-clock",
    title: { ar: "انضباط وتنظيم لليوم", en: "Discipline and structure" },
    text: {
      ar: "﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾، فيوم المسلم مقسّم على مواعيد ثابتة تعلّمه الالتزام.",
      en: "“Indeed, prayer has been decreed upon the believers at specified times.” It gives the day a steady rhythm and teaches commitment.",
    },
    ref: { ar: "سورة النساء: 103", en: "Surah An-Nisa: 103" },
  },
  {
    icon: "fa-people-group",
    title: { ar: "قوة الجماعة", en: "Strength of community" },
    text: {
      ar: "صلاة الجماعة تفضل صلاة المنفرد بسبع وعشرين درجة، وفيها تعارف وتآلف بين المسلمين.",
      en: "Congregational prayer is twenty-seven degrees more rewarding than praying alone, and it brings believers together.",
    },
    ref: { ar: "متفق عليه", en: "Agreed upon (Bukhari & Muslim)" },
  },
];

export const PRAYERS_OVERVIEW = [
  {
    key: "Fajr",
    icon: "fa-cloud-moon",
    rakat: { ar: "ركعتان", en: "2 rak'ahs" },
    hint: { ar: "قبل شروق الشمس", en: "Before sunrise" },
  },
  {
    key: "Dhuhr",
    icon: "fa-sun",
    rakat: { ar: "4 ركعات", en: "4 rak'ahs" },
    hint: { ar: "بعد زوال الشمس", en: "After the sun passes its zenith" },
  },
  {
    key: "Asr",
    icon: "fa-cloud-sun",
    rakat: { ar: "4 ركعات", en: "4 rak'ahs" },
    hint: {
      ar: "بعد الظهر حتى قبيل الغروب",
      en: "Afternoon until before sunset",
    },
  },
  {
    key: "Maghrib",
    icon: "fa-moon",
    rakat: { ar: "3 ركعات", en: "3 rak'ahs" },
    hint: { ar: "عند غروب الشمس", en: "At sunset" },
  },
  {
    key: "Isha",
    icon: "fa-star",
    rakat: { ar: "4 ركعات", en: "4 rak'ahs" },
    hint: { ar: "بعد مغيب الشفق", en: "After twilight fades" },
  },
];

export const WUDU_STEPS = [
  {
    title: { ar: "النية والتسمية", en: "Intention and Basmala" },
    text: {
      ar: "انوِ الوضوء بقلبك وقل: «بسم الله».",
      en: "Intend wudu in your heart and say: “Bismillah”.",
    },
  },
  {
    title: { ar: "غسل الكفين", en: "Wash the hands" },
    text: { ar: "اغسل كفيك ثلاث مرات.", en: "Wash both hands three times." },
  },
  {
    title: { ar: "المضمضة والاستنشاق", en: "Rinse mouth and nose" },
    text: {
      ar: "تمضمض واستنشق الماء ثم استنثره، ثلاث مرات.",
      en: "Rinse your mouth and sniff water into the nose, then blow it out, three times.",
    },
  },
  {
    title: { ar: "غسل الوجه", en: "Wash the face" },
    text: {
      ar: "اغسل وجهك ثلاث مرات من منبت شعر الرأس إلى أسفل الذقن، ومن الأذن إلى الأذن.",
      en: "Wash your face three times, from the hairline to the chin and from ear to ear.",
    },
  },
  {
    title: { ar: "غسل اليدين إلى المرفقين", en: "Wash the arms" },
    text: {
      ar: "اغسل اليد اليمنى ثم اليسرى إلى المرفقين، ثلاث مرات لكل منهما.",
      en: "Wash the right arm then the left up to the elbows, three times each.",
    },
  },
  {
    title: { ar: "مسح الرأس", en: "Wipe the head" },
    text: {
      ar: "امسح رأسك بيديك المبتلتين مرة واحدة من الأمام إلى الخلف ثم أعدهما.",
      en: "Wipe your head once with wet hands, from front to back and back again.",
    },
  },
  {
    title: { ar: "مسح الأذنين", en: "Wipe the ears" },
    text: {
      ar: "امسح داخل الأذنين بالسبابتين وخارجهما بالإبهامين.",
      en: "Wipe the inside of the ears with the index fingers and the back with the thumbs.",
    },
  },
  {
    title: { ar: "غسل القدمين", en: "Wash the feet" },
    text: {
      ar: "اغسل القدم اليمنى ثم اليسرى مع الكعبين، ثلاث مرات لكل منهما.",
      en: "Wash the right foot then the left, including the ankles, three times each.",
    },
  },
  {
    title: { ar: "الدعاء بعد الوضوء", en: "Du'a after wudu" },
    text: {
      ar: "يُستحب أن تقول بعد الانتهاء:",
      en: "It is recommended to say after finishing:",
    },
    dua: {
      ar: "أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمدًا عبده ورسوله.",
      en: "I bear witness that there is no god but Allah alone, with no partner, and that Muhammad is His servant and Messenger.",
    },
  },
];

export const PRAYER_STEPS = [
  {
    title: { ar: "استقبال القبلة والنية", en: "Face the Qibla and intend" },
    text: {
      ar: "توجّه نحو القبلة وانوِ الصلاة التي تريدها بقلبك.",
      en: "Face the Qibla and intend the prayer in your heart.",
    },
  },
  {
    title: { ar: "تكبيرة الإحرام", en: "Opening takbir" },
    text: {
      ar: "ارفع يديك وقل «الله أكبر»، ثم ضع يمناك على يسراك على صدرك.",
      en: "Raise your hands and say “Allahu Akbar”, then place the right hand over the left on your chest.",
    },
  },
  {
    title: { ar: "القراءة", en: "Recitation" },
    text: {
      ar: "اقرأ دعاء الاستفتاح (سنّة) ثم سورة الفاتحة ثم ما تيسّر من القرآن.",
      en: "Recite the opening du'a (sunnah), then Al-Fatihah, then what you can of the Quran.",
    },
  },
  {
    title: { ar: "الركوع", en: "Ruku' (bowing)" },
    text: {
      ar: "كبّر واركع وظهرك مستوٍ، وقل ثلاثًا:",
      en: "Say takbir and bow with a straight back, saying three times:",
    },
    dua: { ar: "سبحان ربي العظيم", en: "Subhana Rabbiyal-Azim" },
  },
  {
    title: { ar: "الرفع من الركوع", en: "Rising from ruku'" },
    text: { ar: "ارفع واقفًا وقل:", en: "Rise to standing and say:" },
    dua: {
      ar: "سمع الله لمن حمده، ربنا ولك الحمد",
      en: "Sami'a Allahu liman hamidah, Rabbana wa lakal-hamd",
    },
  },
  {
    title: { ar: "السجود", en: "Sujud (prostration)" },
    text: {
      ar: "كبّر واسجد على سبعة أعضاء، وقل ثلاثًا:",
      en: "Say takbir and prostrate on seven points, saying three times:",
    },
    dua: { ar: "سبحان ربي الأعلى", en: "Subhana Rabbiyal-A'la" },
  },
  {
    title: { ar: "الجلوس بين السجدتين", en: "Sitting between prostrations" },
    text: { ar: "اجلس مطمئنًا وقل:", en: "Sit calmly and say:" },
    dua: { ar: "رب اغفر لي", en: "Rabbighfir li" },
  },
  {
    title: { ar: "السجدة الثانية والقيام", en: "Second sujud and standing" },
    text: {
      ar: "اسجد سجدة ثانية، ثم قم للركعة التالية وكرّر الخطوات السابقة.",
      en: "Prostrate a second time, then stand for the next rak'ah and repeat the steps.",
    },
  },
  {
    title: { ar: "التشهد", en: "Tashahhud" },
    text: {
      ar: "اجلس للتشهد واقرأه، ثم الصلاة الإبراهيمية في التشهد الأخير.",
      en: "Sit for the tashahhud and recite it, then the Ibrahimic salawat in the final tashahhud.",
    },
  },
  {
    title: { ar: "التسليم", en: "Taslim" },
    text: {
      ar: "سلّم عن يمينك ثم عن يسارك قائلًا:",
      en: "Turn your head to the right then the left, saying:",
    },
    dua: {
      ar: "السلام عليكم ورحمة الله",
      en: "As-salamu 'alaykum wa rahmatullah",
    },
  },
];

export const REMINDERS = [
  {
    text: {
      ar: "﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾",
      en: "“Indeed, prayer has been decreed upon the believers at specified times.”",
    },
    ref: { ar: "سورة النساء: 103", en: "Surah An-Nisa: 103" },
  },
  {
    text: {
      ar: "﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ﴾",
      en: "“Guard strictly the prayers, especially the middle prayer, and stand before Allah devoutly.”",
    },
    ref: { ar: "سورة البقرة: 238", en: "Surah Al-Baqarah: 238" },
  },
  {
    text: {
      ar: "﴿وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ﴾",
      en: "“Establish prayer. Indeed, prayer prohibits immorality and wrongdoing.”",
    },
    ref: { ar: "سورة العنكبوت: 45", en: "Surah Al-Ankabut: 45" },
  },
  {
    text: {
      ar: "﴿وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ﴾",
      en: "“And seek help through patience and prayer.”",
    },
    ref: { ar: "سورة البقرة: 45", en: "Surah Al-Baqarah: 45" },
  },
  {
    text: {
      ar: "«إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ»",
      en: "“The first thing a servant will be held accountable for on the Day of Judgment is his prayer.”",
    },
    ref: {
      ar: "رواه الترمذي والنسائي",
      en: "Narrated by at-Tirmidhi and an-Nasa'i",
    },
  },
  {
    text: {
      ar: "شبّه النبي ﷺ الصلوات الخمس بنهر جارٍ على باب أحدنا يغتسل فيه كل يوم خمس مرات.",
      en: "The Prophet ﷺ likened the five prayers to a flowing river at one's door in which one bathes five times a day.",
    },
    ref: { ar: "متفق عليه", en: "Agreed upon (Bukhari & Muslim)" },
  },
];
