import { DhikrType } from './Dhikrs';

const Dhikr: {
  [index: number]: Record<
    string,
    { arabic: string; translationlocale: string }
  >;
} = {
  [DhikrType.MORNING]: {
    'dhikr.morningdua': {
      arabic:
        'أَصْبَحْتُ أُثْنِيْ عَلَيْكَ حَمْدًا ، وَأَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللهُ',
      translationlocale: 'dhikr.morningduatranslation'
    },
    'dhikr.goodday': {
      arabic:
        'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ وَالْحَمْدُ لِلّٰهِ ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      translationlocale: 'dhikr.gooddaytranslation'
    },
    'dhikr.blessedday': {
      arabic:
        'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذَا الْيَوْمِ ، فَتْحَهُ وَنَصْرَهُ وَنُوْرَهُ وَبَرَكَتَهُ وَهُدَاهُ ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهِ وَشَرِّ مَا بَعْدَهُ',
      translationlocale: 'dhikr.blesseddaytranslation'
    },
    'dhikr.enteringmorning': {
      arabic:
        'اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ',
      translationlocale: 'dhikr.enteringmorningtranslation'
    }
  },
  [DhikrType.EVENING]: {
    'dhikr.renewingtawhid': {
      arabic:
        'أَمْسَيْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ ، وَعَلَىٰ دِيْنِ نَبِيِّنَا مُحَمَّدٍ ، وَعَلَىٰ مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُّسْلِمًا وَّمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
      translationlocale: 'dhikr.renewingtawhidtranslation'
    },
    'dhikr.enteringevening': {
      arabic:
        'اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ الْمَصِيْرُ',
      translationlocale: 'dhikr.enteringeveningtranslation'
    },
    'dhikr.goodevening': {
      arabic:
        'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ وَالْحَمْدُ لِلّٰهِ ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      translationlocale: 'dhikr.goodeveningtranslation'
    },
    'dhikr.blessedevening': {
      arabic:
        'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هـٰذِهِ اللَّيْلَةِ ، فَتْحَهَا وَنَصْرَهَا وَنُوْرَهَا وَبَرَكَتَهَا وَهُدَاهَا ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهَا وَشَرِّ مَا بَعْدَهَا',
      translationlocale: 'dhikr.blessedeveningtranslation'
    }
  },
  [DhikrType.EATING]: {
    'dhikr.afterbreakingfast': {
      arabic: 'اَللّٰهُمَّ لَكَ صُمْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ',
      translationlocale: 'dhikr.afterbreakingfasttranslation'
    },
    'dhikr.afterbreakingfast1': {
      arabic:
        'ذَهَبَ الظَّمَأُ ، وَابْتَلَّتِ الْعُرُوْقُ ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللّٰهُ',
      translationlocale: 'dhikr.afterbreakingfast1translation'
    },
    'dhikr.foronewhogivesfood': {
      arabic:
        ' ْاللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِيْ وَاسْقِ مَنْ سَقَانِي',
      translationlocale: 'dhikr.foronewhogivesfoodtranslation'
    },
    'dhikr.beforeeating': {
      arabic: 'بِسْمِ اللّٰهِ',
      translationlocale: 'dhikr.beforeeatingtranslation'
    },
    'dhikr.beforeeating1': {
      arabic:
        'اَللّٰهُمَّ بَارِكْ لَنَا فِيْهِ وَأَطْعِمْنَا خَيْراً مِنْهُ',
      translationlocale: 'dhikr.beforeeating1translation'
    },
    'dhikr.aftereating': {
      arabic:
        'اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنِيْ هٰذَا ، وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّيْ وَلَا قُوَّةٍ',
      translationlocale: 'dhikr.aftereatingtranslation'
    },
    'dhikr.aftereating1': {
      arabic:
        'اَلْحَمْدُ لِلّٰهِ حَمْدًا كَثِيْرًا طَيِّبًا مُبَارَكًا فِيْهِ ، غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ ، وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا',
      translationlocale: 'dhikr.aftereating1translation'
    }
  },
  [DhikrType.POSTPRAYER]: {
    'dhikr.postprayer1': {
      arabic: 'أَسْتَغْفِرُ اللهَ',
      translationlocale: 'dhikr.postprayer1translation'
    },
    'dhikr.postprayer2': {
      arabic:
        'اَللّٰهُمَّ أَنْتَ السَّلَامُ ، وَمِنْكَ السَّلَامُ ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
      translationlocale: 'dhikr.postprayer2translation'
    },
    'dhikr.postprayer3': {
      arabic:
        ' لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، اَللّٰهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ ، وَلَا يَنْفَعُ ذَا الْجَـدِّ مِنْكَ الْجَـدُّ',
      translationlocale: 'dhikr.postprayer3translation'
    },
    'dhikr.postprayer4': {
      arabic:
        'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ ، لَا إِلٰهَ إِلَّا اللّٰهُ ، وَلَا نَعْبُدُ إِلَّا إيَّاهُ ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ ، لَا إِلٰهَ إِلَّا اللّٰهُ مُخْلِصِيْنَ لَهُ الدِّيْنَ ، وَلَوْ كَرِهَ الْكَافِرُوْنَ',
      translationlocale: 'dhikr.postprayer4translation'
    },
    'dhikr.afterfajrandmaghrib': {
      arabic:
        'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ',
      translationlocale: 'dhikr.afterfajrandmaghribtranslation'
    },
    'dhikr.afterfajrandmaghrib1': {
      arabic: 'اَللّٰهُمَّ أَجِرْنِيْ مِنَ النَّارِ',
      translationlocale: 'dhikr.afterfajrandmaghrib1translation'
    },
    'dhikr.afterfajr': {
      arabic:
        'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا ، وَرِزْقًا طَيِّبًا ، وَعَمَلًا مُتَقَبَّلًا',
      translationlocale: 'dhikr.afterfajrtranslation'
    },
    'dhikr.afterwitr': {
      arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوْسِ',
      translationlocale: 'dhikr.afterwitrtranslation'
    }
  }
};

export default Dhikr;
