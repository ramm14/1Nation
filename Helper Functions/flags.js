// Builds real, correctly-proportioned flag image URLs from a nation's ISO 3166-1 alpha-3 code.
// Flags are served by flagcdn.com (free, allows hotlinking, keeps each flag's true aspect ratio).

// ISO 3166-1 alpha-3 -> alpha-2 (flagcdn is keyed by alpha-2)
const ISO3_TO_ISO2 = {
    ABW: 'aw', AFG: 'af', AGO: 'ao', AIA: 'ai', ALA: 'ax', ALB: 'al', AND: 'ad', ARE: 'ae',
    ARG: 'ar', ARM: 'am', ASM: 'as', ATA: 'aq', ATF: 'tf', ATG: 'ag', AUS: 'au', AUT: 'at',
    AZE: 'az', BDI: 'bi', BEL: 'be', BEN: 'bj', BES: 'bq', BFA: 'bf', BGD: 'bd', BGR: 'bg',
    BHR: 'bh', BHS: 'bs', BIH: 'ba', BLM: 'bl', BLR: 'by', BLZ: 'bz', BMU: 'bm', BOL: 'bo',
    BRA: 'br', BRB: 'bb', BRN: 'bn', BTN: 'bt', BVT: 'bv', BWA: 'bw', CAF: 'cf', CAN: 'ca',
    CCK: 'cc', CHE: 'ch', CHL: 'cl', CHN: 'cn', CIV: 'ci', CMR: 'cm', COD: 'cd', COG: 'cg',
    COK: 'ck', COL: 'co', COM: 'km', CPV: 'cv', CRI: 'cr', CUB: 'cu', CUW: 'cw', CXR: 'cx',
    CYM: 'ky', CYP: 'cy', CZE: 'cz', DEU: 'de', DJI: 'dj', DMA: 'dm', DNK: 'dk', DOM: 'do',
    DZA: 'dz', ECU: 'ec', EGY: 'eg', ERI: 'er', ESH: 'eh', ESP: 'es', EST: 'ee', ETH: 'et',
    FIN: 'fi', FJI: 'fj', FLK: 'fk', FRA: 'fr', FRO: 'fo', FSM: 'fm', GAB: 'ga', GBR: 'gb',
    GEO: 'ge', GGY: 'gg', GHA: 'gh', GIB: 'gi', GIN: 'gn', GLP: 'gp', GMB: 'gm', GNB: 'gw',
    GNQ: 'gq', GRC: 'gr', GRD: 'gd', GRL: 'gl', GTM: 'gt', GUF: 'gf', GUM: 'gu', GUY: 'gy',
    HKG: 'hk', HMD: 'hm', HND: 'hn', HRV: 'hr', HTI: 'ht', HUN: 'hu', IDN: 'id', IMN: 'im',
    IND: 'in', IOT: 'io', IRL: 'ie', IRN: 'ir', IRQ: 'iq', ISL: 'is', ISR: 'il', ITA: 'it',
    JAM: 'jm', JEY: 'je', JOR: 'jo', JPN: 'jp', KAZ: 'kz', KEN: 'ke', KGZ: 'kg', KHM: 'kh',
    KIR: 'ki', KNA: 'kn', KOR: 'kr', KWT: 'kw', LAO: 'la', LBN: 'lb', LBR: 'lr', LBY: 'ly',
    LCA: 'lc', LIE: 'li', LKA: 'lk', LSO: 'ls', LTU: 'lt', LUX: 'lu', LVA: 'lv', MAC: 'mo',
    MAF: 'mf', MAR: 'ma', MCO: 'mc', MDA: 'md', MDG: 'mg', MDV: 'mv', MEX: 'mx', MHL: 'mh',
    MKD: 'mk', MLI: 'ml', MLT: 'mt', MMR: 'mm', MNE: 'me', MNG: 'mn', MNP: 'mp', MOZ: 'mz',
    MRT: 'mr', MSR: 'ms', MTQ: 'mq', MUS: 'mu', MWI: 'mw', MYS: 'my', MYT: 'yt', NAM: 'na',
    NCL: 'nc', NER: 'ne', NFK: 'nf', NGA: 'ng', NIC: 'ni', NIU: 'nu', NLD: 'nl', NOR: 'no',
    NPL: 'np', NRU: 'nr', NZL: 'nz', OMN: 'om', PAK: 'pk', PAN: 'pa', PCN: 'pn', PER: 'pe',
    PHL: 'ph', PLW: 'pw', PNG: 'pg', POL: 'pl', PRI: 'pr', PRK: 'kp', PRT: 'pt', PRY: 'py',
    PSE: 'ps', PYF: 'pf', QAT: 'qa', REU: 're', ROU: 'ro', RUS: 'ru', RWA: 'rw', SAU: 'sa',
    SDN: 'sd', SEN: 'sn', SGP: 'sg', SGS: 'gs', SHN: 'sh', SJM: 'sj', SLB: 'sb', SLE: 'sl',
    SLV: 'sv', SMR: 'sm', SOM: 'so', SPM: 'pm', SRB: 'rs', SSD: 'ss', STP: 'st', SUR: 'sr',
    SVK: 'sk', SVN: 'si', SWE: 'se', SWZ: 'sz', SXM: 'sx', SYC: 'sc', SYR: 'sy', TCA: 'tc',
    TCD: 'td', TGO: 'tg', THA: 'th', TJK: 'tj', TKL: 'tk', TKM: 'tm', TLS: 'tl', TON: 'to',
    TTO: 'tt', TUN: 'tn', TUR: 'tr', TUV: 'tv', TWN: 'tw', TZA: 'tz', UGA: 'ug', UKR: 'ua',
    UMI: 'um', URY: 'uy', USA: 'us', UZB: 'uz', VAT: 'va', VCT: 'vc', VEN: 've', VGB: 'vg',
    VIR: 'vi', VNM: 'vn', VUT: 'vu', WLF: 'wf', WSM: 'ws', YEM: 'ye', ZAF: 'za', ZMB: 'zm',
    ZWE: 'zw',
    XKX: 'xk', // Kosovo (World Bank code, not in ISO 3166-1)
};

const PLACEHOLDER = '/imgs/flag-placeholder.svg';

// Returns { src, srcset, fallback } for a nation.
// Load order in the browser: flagcdn -> the nation's stored flagURL -> local placeholder
// (the last two steps are handled by the onerror attribute in views/partials/flag.ejs).
function flagFor(nation) {
    const iso2 = ISO3_TO_ISO2[String(nation?.isocode3 || '').trim().toUpperCase()];
    const storedURL = String(nation?.flagURL || '').trim();
    if (!iso2) {
        return { src: storedURL || PLACEHOLDER, srcset: '', fallback: '' };
    }
    return {
        src: `https://flagcdn.com/w320/${iso2}.png`,
        srcset: `https://flagcdn.com/w320/${iso2}.png 1x, https://flagcdn.com/w640/${iso2}.png 2x`,
        fallback: storedURL,
    };
}

module.exports = { flagFor, ISO3_TO_ISO2, PLACEHOLDER };
