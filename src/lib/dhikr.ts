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
    'dhikr.forgetting_at_the_beginning': {
      arabic: 'بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ',
      translationlocale:
        'dhikr.forgetting_at_the_beginning_translation'
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
  },
  [DhikrType.IMANPROTECTION]: {
    'dhikr.heartfirmness': {
      arabic:
        'يَا مُقَلِّبَ الْقُلُوْبِ ثَبِّتْ قَلْبِيْ عَلَىٰ دِيْنِكَ',
      translationlocale: 'dhikr.heartfirmnesstranslation'
    },
    'dhikr.doubtinfaith1': {
      arabic: 'آمَنْتُ بِاللهِ وَرُسُلِهِ',
      translationlocale: 'dhikr.doubtinfaith1translation'
    },
    'dhikr.doubtinfaith2': {
      arabic:
        'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ ، وَهُوَ بِكُلِّ شَيْءٍ عَلِيْمٌ',
      translationlocale: 'dhikr.doubtinfaith2translation'
    },
    'dhikr.fearofshirkandriya': {
      arabic:
        'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ',
      translationlocale: 'dhikr.fearofshirkandriyatranslation'
    },
    'dhikr.protectionfromdajjal': {
      arabic:
        'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ ، وَمِنْ عَذَابِ الْقَبْرِ ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ',
      translationlocale: 'dhikr.protectionfromdajjaltranslation'
    }
  },
  [DhikrType.BEFORESLEEP]: {
    'dhikr.beforesleep': {
      arabic: 'اَللّٰهُمَّ بِاسْمِكَ أَمُوْتُ وَأَحْيَا',
      translationlocale: 'dhikr.beforesleeptranslation'
    },
    'dhikr.forgivenessbeforesleep': {
      arabic:
        'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ ، سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ',
      translationlocale: 'dhikr.forgivenessbeforesleeptranslation'
    },
    'dhikr.dieuponfitrah': {
      arabic:
        'اَللّٰهُمَّ أَسْلَمْتُ نَفْسِيْ إِلَيْكَ ، وَفَوَّضْتُ أَمْرِيْ إِلَيْكَ ، وَوَجَّهْتُ وَجْهِيْ إِلَيْكَ ، وَأَلْجَاْتُ ظَهْرِيْ إِلَيْكَ ، رَغْبَةً وَرَهْبَةً إِلَيْكَ ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ ، آمَنْتُ بِكِتَابِكَ الَّذِيْ أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِيْ أَرْسَلْتَ',
      translationlocale: 'dhikr.dieuponfitrahtranslation'
    }
  },
  [DhikrType.NIGHTMARES]: {
    'dhikr.afternightmare': {
      arabic:
        'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ ، وَشَرِّ عِبَادِهِ ، وَمِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَنْ يَّحْضُرُوْنِ.',
      translationlocale: 'dhikr.afternightmaretranslation'
    }
  },
  [DhikrType.DEATH]: {
    'dhikr.yearnfordeath': {
      arabic:
        'اَللّٰهُمَّ أَحْيِنِيْ مَا كَانَتِ الْحَيَاةُ خَيْرًا لِيْ ، وَتَوَفَّنِيْ إِذَا كَانَتِ الْوَفَاةُ خَيْرًا لِيْ',
      translationlocale: 'dhikr.yearnfordeathtranslation'
    },
    'dhikr.deadtosayshadadah': {
      arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ',
      translationlocale: 'dhikr.deadtosayshadadahtranslation'
    },
    'dhikr.neardeath1': {
      arabic:
        'اَللَّهُمَّ اغْفِرْ لِيْ ، وارْحَمْنِيْ ، وَأَلْحِقْنِيْ بِالرَّفِيْقِ الأَعْلَى',
      translationlocale: 'dhikr.neardeath1translation'
    },
    'dhikr.neardeath2': {
      arabic:
        'لاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ ، لاَ إِلَهَ إِلاَّ اللَّهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، لاَ إِلَهَ إِلاَّ اللَّهُ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ.',
      translationlocale: 'dhikr.neardeath2translation'
    },
    'dhikr.afterdeath1': {
      arabic:
        'اللَّهُمَّ اغْفِرْ لَهُ ، وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ ، وَافْسَحْ لَهُ فِي قَبْرِهِ ، وَنَوِّرْ لَهُ فِيهِ',
      translationlocale: 'dhikr.afterdeath1translation'
    },
    'dhikr.afterdeath2': {
      arabic:
        'اَللّٰهُمَّ اغْفِرْ لِيْ وَلَهُ وَأَعْقِبْنِي مِنْهُ عُقْبَي حَسَنَةً',
      translationlocale: 'dhikr.afterdeath2translation'
    },
    'dhikr.afterdeath3': {
      arabic:
        'إنَّا لِلَّهِ وَإِنَّا إلَيْهِ رَاجِعُوْنَ ، اللَّهُمَّ أْجُرْنِْي فِيْ مُصِيْبَتِيْ ، وَأَخْلِفْ لِيْ خَيْرًا مِنْهَا',
      translationlocale: 'dhikr.afterdeath3translation'
    },
    'dhikr.supplicationfordeadduringjanazah1': {
      arabic:
        'اللَّهُـمَّ اغْفِـرْ لَهُ ، وَارْحَمْـهُ ، وَعَافِهِ ، وَاعْفُ عَنْـهُ ، وَأَكْـرِمْ نُزُلَـهُ ، وَوَسِّـعْ مُدْخَـلَهُ ، وَاغْسِلْـهُ بِالْمَـاءِ وَالثَّلْجِ وَالْبَرَدِ ، وَنَقِّـهِ مِنَ الْخَطَـايَا كَمَا نَـقَّيْتَ الـثَّوْبَ الأَبْيَـضَ مِنَ الدَّنَـسِ ، وَأَبْـدِلْهُ دَارًا خَـيْرًا مِنْ دَارِهِ ، وَأَهْلًا خَـيْرًا مِنْ أَهْلِـهِ ، وَزَوْجًا خَـيْرًا مِنْ زَوْجِهِ ، وَأَدْخِـلْهُ الْجَـنَّةَ ، وَأَعِـذْهُ مِنْ عَذَابِ الْقَـبْرِ وَعَذَابِ النَّـارِ',
      translationlocale:
        'dhikr.supplicationfordeadduringjanazah1translation'
    },
    'dhikr.supplicationfordeadduringjanazah2': {
      arabic:
        'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا ، وَشَاهِدِنَا وَغَائِبِنَا ، وَصَغِيرِنَا وَكَبِيرِنَا ، وَذَكَرِنَا وَأُنْثَانَا ، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلَامِ ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ ، اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ ، وَلاَ تُضِلَّنَا بَعْدَهُ',
      translationlocale:
        'dhikr.supplicationfordeadduringjanazah2translation'
    },
    'dhikr.visitingagraveyard1': {
      arabic:
        'اَلسَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِيْنَ والْمُسْلِمِيْنَ ، وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لاَحِقُونَ ، نَسْأَلُ اللهَ لَنَا وَلَكُمُ الْعَافِيَةَ',
      translationlocale: 'dhikr.visitingagraveyard1translation'
    },
    'dhikr.visitingagraveyard2': {
      arabic:
        'السَّلَامُ عَلَيْكُمْ يَا أَهْلَ الْقُبُورِ، يَغْفِرُ اللَّهُ لَنَا وَلَكُمْ، أَنْتُمْ سَلَفُنَا وَنَحْنُ بِالْأَثَرِ',
      translationlocale: 'dhikr.visitingagraveyard2translation'
    },
    'dhikr.placingdeceasedinsideagrave': {
      arabic: 'بِسْمِ اللَّهِ وَعَلَى سُنَّةِ رَسُوْلِ اللهِ',
      translationlocale:
        'dhikr.placingdeceasedinsideagravetranslation'
    }
  }
};

export default Dhikr;
