import { Knex } from 'knex';

/**
 * Executes the seed function.
 * @description This will delete all existing entries in the table_name table and insert the seed entries.
 *
 * @param {Knex} knex - Knex instance.
 * @returns {Promise<void>} - Resolves if the seed was successful.
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('countries').del();

    // Inserts seed entries
    await knex('countries').insert([
        {
            id: 1,
            name: 'Afghanistan',
            emoji: '🇦🇫',
            country_code: 'AFG'
        },
        {
            id: 2,
            name: 'Aland Islands',
            emoji: '🇦🇽',
            country_code: 'ALA'
        },
        {
            id: 3,
            name: 'Albania',
            emoji: '🇦🇱',
            country_code: 'ALB'
        },
        {
            id: 4,
            name: 'Algeria',
            emoji: '🇩🇿',
            country_code: 'DZA'
        },
        {
            id: 5,
            name: 'American Samoa',
            emoji: '🇦🇸',
            country_code: 'ASM'
        },
        {
            id: 6,
            name: 'Andorra',
            emoji: '🇦🇩',
            country_code: 'AND'
        },
        {
            id: 7,
            name: 'Angola',
            emoji: '🇦🇴',
            country_code: 'AGO'
        },
        {
            id: 8,
            name: 'Anguilla',
            emoji: '🇦🇮',
            country_code: 'AIA'
        },
        {
            id: 9,
            name: 'Antarctica',
            emoji: '🇦🇶',
            country_code: 'ATA'
        },
        {
            id: 10,
            name: 'Antigua And Barbuda',
            emoji: '🇦🇬',
            country_code: 'ATG'
        },
        {
            id: 11,
            name: 'Argentina',
            emoji: '🇦🇷',
            country_code: 'ARG'
        },
        {
            id: 12,
            name: 'Armenia',
            emoji: '🇦🇲',
            country_code: 'ARM'
        },
        {
            id: 13,
            name: 'Aruba',
            emoji: '🇦🇼',
            country_code: 'ABW'
        },
        {
            id: 14,
            name: 'Australia',
            emoji: '🇦🇺',
            country_code: 'AUS'
        },
        {
            id: 15,
            name: 'Austria',
            emoji: '🇦🇹',
            country_code: 'AUT'
        },
        {
            id: 16,
            name: 'Azerbaijan',
            emoji: '🇦🇿',
            country_code: 'AZE'
        },
        {
            id: 17,
            name: 'Bahamas The',
            emoji: '🇧🇸',
            country_code: 'BHS'
        },
        {
            id: 18,
            name: 'Bahrain',
            emoji: '🇧🇭',
            country_code: 'BHR'
        },
        {
            id: 19,
            name: 'Bangladesh',
            emoji: '🇧🇩',
            country_code: 'BGD'
        },
        {
            id: 20,
            name: 'Barbados',
            emoji: '🇧🇧',
            country_code: 'BRB'
        },
        {
            id: 21,
            name: 'Belarus',
            emoji: '🇧🇾',
            country_code: 'BLR'
        },
        {
            id: 22,
            name: 'Belgium',
            emoji: '🇧🇪',
            country_code: 'BEL'
        },
        {
            id: 23,
            name: 'Belize',
            emoji: '🇧🇿',
            country_code: 'BLZ'
        },
        {
            id: 24,
            name: 'Benin',
            emoji: '🇧🇯',
            country_code: 'BEN'
        },
        {
            id: 25,
            name: 'Bermuda',
            emoji: '🇧🇲',
            country_code: 'BMU'
        },
        {
            id: 26,
            name: 'Bhutan',
            emoji: '🇧🇹',
            country_code: 'BTN'
        },
        {
            id: 27,
            name: 'Bolivia',
            emoji: '🇧🇴',
            country_code: 'BOL'
        },
        {
            id: 28,
            name: 'Bosnia and Herzegovina',
            emoji: '🇧🇦',
            country_code: 'BIH'
        },
        {
            id: 29,
            name: 'Botswana',
            emoji: '🇧🇼',
            country_code: 'BWA'
        },
        {
            id: 30,
            name: 'Bouvet Island',
            emoji: '🇧🇻',
            country_code: 'BVT'
        },
        {
            id: 31,
            name: 'Brazil',
            emoji: '🇧🇷',
            country_code: 'BRA'
        },
        {
            id: 32,
            name: 'British Indian Ocean Territory',
            emoji: '🇮🇴',
            country_code: 'IOT'
        },
        {
            id: 33,
            name: 'Brunei',
            emoji: '🇧🇳',
            country_code: 'BRN'
        },
        {
            id: 34,
            name: 'Bulgaria',
            emoji: '🇧🇬',
            country_code: 'BGR'
        },
        {
            id: 35,
            name: 'Burkina Faso',
            emoji: '🇧🇫',
            country_code: 'BFA'
        },
        {
            id: 36,
            name: 'Burundi',
            emoji: '🇧🇮',
            country_code: 'BDI'
        },
        {
            id: 37,
            name: 'Cambodia',
            emoji: '🇰🇭',
            country_code: 'KHM'
        },
        {
            id: 38,
            name: 'Cameroon',
            emoji: '🇨🇲',
            country_code: 'CMR'
        },
        {
            id: 39,
            name: 'Canada',
            emoji: '🇨🇦',
            country_code: 'CAN'
        },
        {
            id: 40,
            name: 'Cape Verde',
            emoji: '🇨🇻',
            country_code: 'CPV'
        },
        {
            id: 41,
            name: 'Cayman Islands',
            emoji: '🇰🇾',
            country_code: 'CYM'
        },
        {
            id: 42,
            name: 'Central African Republic',
            emoji: '🇨🇫',
            country_code: 'CAF'
        },
        {
            id: 43,
            name: 'Chad',
            emoji: '🇹🇩',
            country_code: 'TCD'
        },
        {
            id: 44,
            name: 'Chile',
            emoji: '🇨🇱',
            country_code: 'CHL'
        },
        {
            id: 45,
            name: 'China',
            emoji: '🇨🇳',
            country_code: 'CHN'
        },
        {
            id: 46,
            name: 'Christmas Island',
            emoji: '🇨🇽',
            country_code: 'CXR'
        },
        {
            id: 47,
            name: 'Cocos (Keeling) Islands',
            emoji: '🇨🇨',
            country_code: 'CCK'
        },
        {
            id: 48,
            name: 'Colombia',
            emoji: '🇨🇴',
            country_code: 'COL'
        },
        {
            id: 49,
            name: 'Comoros',
            emoji: '🇰🇲',
            country_code: 'COM'
        },
        {
            id: 50,
            name: 'Congo',
            emoji: '🇨🇬',
            country_code: 'COD'
        },
        {
            id: 51,
            name: 'Congo The Democratic Republic Of The',
            emoji: '🇨🇩',
            country_code: 'COD'
        },
        {
            id: 52,
            name: 'Cook Islands',
            emoji: '🇨🇰',
            country_code: 'COK'
        },
        {
            id: 53,
            name: 'Costa Rica',
            emoji: '🇨🇷',
            country_code: 'CRI'
        },
        {
            id: 54,
            name: "Cote D'Ivoire (Ivory Coast)",
            emoji: '🇨🇮',
            country_code: 'CIV'
        },
        {
            id: 55,
            name: 'Croatia (Hrvatska)',
            emoji: '🇭🇷',
            country_code: 'HRV'
        },
        {
            id: 56,
            name: 'Cuba',
            emoji: '🇨🇺',
            country_code: 'CUB'
        },
        {
            id: 57,
            name: 'Cyprus',
            emoji: '🇨🇾',
            country_code: 'CYP'
        },
        {
            id: 58,
            name: 'Czech Republic',
            emoji: '🇨🇿',
            country_code: 'CZE'
        },
        {
            id: 59,
            name: 'Denmark',
            emoji: '🇩🇰',
            country_code: 'DNK'
        },
        {
            id: 60,
            name: 'Djibouti',
            emoji: '🇩🇯',
            country_code: 'DJI'
        },
        {
            id: 61,
            name: 'Dominica',
            emoji: '🇩🇲',
            country_code: 'DMA'
        },
        {
            id: 62,
            name: 'Dominican Republic',
            emoji: '🇩🇴',
            country_code: 'DOM'
        },
        {
            id: 63,
            name: 'East Timor',
            emoji: '🇹🇱',
            country_code: 'TLS'
        },
        {
            id: 64,
            name: 'Ecuador',
            emoji: '🇪🇨',
            country_code: 'ECU'
        },
        {
            id: 65,
            name: 'Egypt',
            emoji: '🇪🇬',
            country_code: 'EGY'
        },
        {
            id: 66,
            name: 'El Salvador',
            emoji: '🇸🇻',
            country_code: 'SLV'
        },
        {
            id: 67,
            name: 'Equatorial Guinea',
            emoji: '🇬🇶',
            country_code: 'GNQ'
        },
        {
            id: 68,
            name: 'Eritrea',
            emoji: '🇪🇷',
            country_code: 'ERI'
        },
        {
            id: 69,
            name: 'Estonia',
            emoji: '🇪🇪',
            country_code: 'EST'
        },
        {
            id: 70,
            name: 'Ethiopia',
            emoji: '🇪🇹',
            country_code: 'ETH'
        },
        {
            id: 71,
            name: 'Falkland Islands',
            emoji: '🇫🇰',
            country_code: 'FLK'
        },
        {
            id: 72,
            name: 'Faroe Islands',
            emoji: '🇫🇴',
            country_code: 'FRO'
        },
        {
            id: 73,
            name: 'Fiji Islands',
            emoji: '🇫🇯',
            country_code: 'FJI'
        },
        {
            id: 74,
            name: 'Finland',
            emoji: '🇫🇮',
            country_code: 'FIN'
        },
        {
            id: 75,
            name: 'France',
            emoji: '🇫🇷',
            country_code: 'FRA'
        },
        {
            id: 76,
            name: 'French Guiana',
            emoji: '🇬🇫',
            country_code: 'GUF'
        },
        {
            id: 77,
            name: 'French Polynesia',
            emoji: '🇵🇫',
            country_code: 'PYF'
        },
        {
            id: 78,
            name: 'French Southern Territories',
            emoji: '🇹🇫',
            country_code: 'ATF'
        },
        {
            id: 79,
            name: 'Gabon',
            emoji: '🇬🇦',
            country_code: 'GAB'
        },
        {
            id: 80,
            name: 'Gambia The',
            emoji: '🇬🇲',
            country_code: 'GMB'
        },
        {
            id: 81,
            name: 'Georgia',
            emoji: '🇬🇪',
            country_code: 'GEO'
        },
        {
            id: 82,
            name: 'Germany',
            emoji: '🇩🇪',
            country_code: 'DEU'
        },
        {
            id: 83,
            name: 'Ghana',
            emoji: '🇬🇭',
            country_code: 'GHA'
        },
        {
            id: 84,
            name: 'Gibraltar',
            emoji: '🇬🇮',
            country_code: 'GIB'
        },
        {
            id: 85,
            name: 'Greece',
            emoji: '🇬🇷',
            country_code: 'GRC'
        },
        {
            id: 86,
            name: 'Greenland',
            emoji: '🇬🇱',
            country_code: 'GRL'
        },
        {
            id: 87,
            name: 'Grenada',
            emoji: '🇬🇩',
            country_code: 'GRL'
        },
        {
            id: 88,
            name: 'Guadeloupe',
            emoji: '🇬🇵',
            country_code: 'GLP'
        },
        {
            id: 89,
            name: 'Guam',
            emoji: '🇬🇺',
            country_code: 'GUM'
        },
        {
            id: 90,
            name: 'Guatemala',
            emoji: '🇬🇹',
            country_code: 'GTM'
        },
        {
            id: 91,
            name: 'Guernsey and Alderney',
            emoji: '🇬🇬',
            country_code: 'GGY'
        },
        {
            id: 92,
            name: 'Guinea',
            emoji: '🇬🇳',
            country_code: 'GIN'
        },
        {
            id: 93,
            name: 'Guinea-Bissau',
            emoji: '🇬🇼',
            country_code: 'GNB'
        },
        {
            id: 94,
            name: 'Guyana',
            emoji: '🇬🇾',
            country_code: 'GUY'
        },
        {
            id: 95,
            name: 'Haiti',
            emoji: '🇭🇹',
            country_code: 'HTI'
        },
        {
            id: 97,
            name: 'Honduras',
            emoji: '🇭🇳',
            country_code: 'HND'
        },
        {
            id: 99,
            name: 'Hungary',
            emoji: '🇭🇺',
            country_code: 'HUN'
        },
        {
            id: 100,
            name: 'Iceland',
            emoji: '🇮🇸',
            country_code: 'ISL'
        },
        {
            id: 101,
            name: 'India',
            emoji: '🇮🇳',
            country_code: 'IND'
        },
        {
            id: 102,
            name: 'Indonesia',
            emoji: '🇮🇩',
            country_code: 'IDN'
        },
        {
            id: 103,
            name: 'Iran',
            emoji: '🇮🇷',
            country_code: 'IRN'
        },
        {
            id: 104,
            name: 'Iraq',
            emoji: '🇮🇶',
            country_code: 'IRQ'
        },
        {
            id: 105,
            name: 'Ireland',
            emoji: '🇮🇪',
            country_code: 'IRL'
        },
        {
            id: 106,
            name: 'Israel',
            emoji: '🇮🇱',
            country_code: 'ISR'
        },
        {
            id: 107,
            name: 'Italy',
            emoji: '🇮🇹',
            country_code: 'ITA'
        },
        {
            id: 108,
            name: 'Jamaica',
            emoji: '🇯🇲',
            country_code: 'JAM'
        },
        {
            id: 109,
            name: 'Japan',
            emoji: '🇯🇵',
            country_code: 'JPN'
        },
        {
            id: 110,
            name: 'Jersey',
            emoji: '🇯🇪',
            country_code: 'JEY'
        },
        {
            id: 111,
            name: 'Jordan',
            emoji: '🇯🇴',
            country_code: 'JOR'
        },
        {
            id: 112,
            name: 'Kazakhstan',
            emoji: '🇰🇿',
            country_code: 'KAZ'
        },
        {
            id: 113,
            name: 'Kenya',
            emoji: '🇰🇪',
            country_code: 'KEN'
        },
        {
            id: 114,
            name: 'Kiribati',
            emoji: '🇰🇮',
            country_code: 'KIR'
        },
        {
            id: 115,
            name: 'Korea North',
            emoji: '🇰🇵',
            country_code: 'PRK'
        },
        {
            id: 116,
            name: 'Korea South',
            emoji: '🇰🇷',
            country_code: 'KOR'
        },
        {
            id: 117,
            name: 'Kuwait',
            emoji: '🇰🇼',
            country_code: 'KWT'
        },
        {
            id: 118,
            name: 'Kyrgyzstan',
            emoji: '🇰🇬',
            country_code: 'KGZ'
        },
        {
            id: 119,
            name: 'Laos',
            emoji: '🇱🇦',
            country_code: 'LAO'
        },
        {
            id: 120,
            name: 'Latvia',
            emoji: '🇱🇻',
            country_code: 'LVA'
        },
        {
            id: 121,
            name: 'Lebanon',
            emoji: '🇱🇧',
            country_code: 'LBN'
        },
        {
            id: 122,
            name: 'Lesotho',
            emoji: '🇱🇸',
            country_code: 'LSO'
        },
        {
            id: 123,
            name: 'Liberia',
            emoji: '🇱🇷',
            country_code: 'LBR'
        },
        {
            id: 124,
            name: 'Libya',
            emoji: '🇱🇾',
            country_code: 'LBY'
        },
        {
            id: 125,
            name: 'Liechtenstein',
            emoji: '🇱🇮',
            country_code: 'LIE'
        },
        {
            id: 126,
            name: 'Lithuania',
            emoji: '🇱🇹',
            country_code: 'LTU'
        },
        {
            id: 127,
            name: 'Luxembourg',
            emoji: '🇱🇺',
            country_code: 'LUX'
        },
        {
            id: 128,
            name: 'Macau S.A.R.',
            emoji: '🇲🇴',
            country_code: 'MAC'
        },
        {
            id: 129,
            name: 'Macedonia',
            emoji: '🇲🇰',
            country_code: 'MKD'
        },
        {
            id: 130,
            name: 'Madagascar',
            emoji: '🇲🇬',
            country_code: 'MDG'
        },
        {
            id: 131,
            name: 'Malawi',
            emoji: '🇲🇼',
            country_code: 'MWI'
        },
        {
            id: 132,
            name: 'Malaysia',
            emoji: '🇲🇾',
            country_code: 'MYS'
        },
        {
            id: 133,
            name: 'Maldives',
            emoji: '🇲🇻',
            country_code: 'MDV'
        },
        {
            id: 134,
            name: 'Mali',
            emoji: '🇲🇱',
            country_code: 'MLI'
        },
        {
            id: 135,
            name: 'Malta',
            emoji: '🇲🇹',
            country_code: 'MLT'
        },
        {
            id: 136,
            name: 'Man (Isle of)',
            emoji: '🇮🇲',
            country_code: 'IMN'
        },
        {
            id: 137,
            name: 'Marshall Islands',
            emoji: '🇲🇭',
            country_code: 'MHL'
        },
        {
            id: 138,
            name: 'Martinique',
            emoji: '🇲🇶',
            country_code: 'MTQ'
        },
        {
            id: 139,
            name: 'Mauritania',
            emoji: '🇲🇷',
            country_code: 'MRT'
        },
        {
            id: 140,
            name: 'Mauritius',
            emoji: '🇲🇺',
            country_code: 'MUS'
        },
        {
            id: 141,
            name: 'Mayotte',
            emoji: '🇾🇹',
            country_code: 'MYT'
        },
        {
            id: 142,
            name: 'Mexico',
            emoji: '🇲🇽',
            country_code: 'MEX'
        },
        {
            id: 143,
            name: 'Micronesia',
            emoji: '🇫🇲',
            country_code: 'FSM'
        },
        {
            id: 144,
            name: 'Moldova',
            emoji: '🇲🇩',
            country_code: 'MDA'
        },
        {
            id: 145,
            name: 'Monaco',
            emoji: '🇲🇨',
            country_code: 'MCO'
        },
        {
            id: 146,
            name: 'Mongolia',
            emoji: '🇲🇳',
            country_code: 'MNG'
        },
        {
            id: 147,
            name: 'Montenegro',
            emoji: '🇲🇪',
            country_code: 'MNE'
        },
        {
            id: 148,
            name: 'Montserrat',
            emoji: '🇲🇸',
            country_code: 'MSR'
        },
        {
            id: 149,
            name: 'Morocco',
            emoji: '🇲🇦',
            country_code: 'MAR'
        },
        {
            id: 150,
            name: 'Mozambique',
            emoji: '🇲🇿',
            country_code: 'MOZ'
        },
        {
            id: 151,
            name: 'Myanmar',
            emoji: '🇲🇲',
            country_code: 'MMR'
        },
        {
            id: 152,
            name: 'Namibia',
            emoji: '🇳🇦',
            country_code: 'NAM'
        },
        {
            id: 153,
            name: 'Nauru',
            emoji: '🇳🇷',
            country_code: 'NRU'
        },
        {
            id: 154,
            name: 'Nepal',
            emoji: '🇳🇵',
            country_code: 'NPL'
        },
        {
            id: 155,
            name: 'Netherlands Antilles',
            emoji: '🇧🇶',
            country_code: 'ANT'
        },
        {
            id: 156,
            name: 'Netherlands The',
            emoji: '🇳🇱',
            country_code: 'NLD'
        },
        {
            id: 157,
            name: 'New Caledonia',
            emoji: '🇳🇨',
            country_code: 'NCL'
        },
        {
            id: 158,
            name: 'New Zealand',
            emoji: '🇳🇿',
            country_code: 'NZL'
        },
        {
            id: 159,
            name: 'Nicaragua',
            emoji: '🇳🇮',
            country_code: 'NIC'
        },
        {
            id: 160,
            name: 'Niger',
            emoji: '🇳🇪',
            country_code: 'NER'
        },
        {
            id: 161,
            name: 'Nigeria',
            emoji: '🇳🇬',
            country_code: 'NGA'
        },
        {
            id: 162,
            name: 'Niue',
            emoji: '🇳🇺',
            country_code: 'NIU'
        },
        {
            id: 163,
            name: 'Norfolk Island',
            emoji: '🇳🇫',
            country_code: 'NFK'
        },
        {
            id: 164,
            name: 'Northern Mariana Islands',
            emoji: '🇲🇵',
            country_code: 'MNP'
        },
        {
            id: 165,
            name: 'Norway',
            emoji: '🇳🇴',
            country_code: 'NOR'
        },
        {
            id: 166,
            name: 'Oman',
            emoji: '🇴🇲',
            country_code: 'OMN'
        },
        {
            id: 167,
            name: 'Pakistan',
            emoji: '🇵🇰',
            country_code: 'PAK'
        },
        {
            id: 168,
            name: 'Palau',
            emoji: '🇵🇼',
            country_code: 'PLW'
        },
        {
            id: 169,
            name: 'Palestinian Territory Occupied',
            emoji: '🇵🇸',
            country_code: 'PSE'
        },
        {
            id: 170,
            name: 'Panama',
            emoji: '🇵🇦',
            country_code: 'PAN'
        },
        {
            id: 171,
            name: 'Papua new Guinea',
            emoji: '🇵🇬',
            country_code: 'PNG'
        },
        {
            id: 172,
            name: 'Paraguay',
            emoji: '🇵🇾',
            country_code: 'PRY'
        },
        {
            id: 173,
            name: 'Peru',
            emoji: '🇵🇪',
            country_code: 'PER'
        },
        {
            id: 174,
            name: 'Philippines',
            emoji: '🇵🇭',
            country_code: 'PHL'
        },
        {
            id: 175,
            name: 'Pitcairn Island',
            emoji: '🇵🇳',
            country_code: 'PCN'
        },
        {
            id: 176,
            name: 'Poland',
            emoji: '🇵🇱',
            country_code: 'POL'
        },
        {
            id: 177,
            name: 'Portugal',
            emoji: '🇵🇹',
            country_code: 'PRT'
        },
        {
            id: 178,
            name: 'Puerto Rico',
            emoji: '🇵🇷',
            country_code: 'PRI'
        },
        {
            id: 179,
            name: 'Qatar',
            emoji: '🇶🇦',
            country_code: 'QAT'
        },
        {
            id: 180,
            name: 'Reunion',
            emoji: '🇷🇪',
            country_code: 'REU'
        },
        {
            id: 181,
            name: 'Romania',
            emoji: '🇷🇴',
            country_code: 'ROU'
        },
        {
            id: 182,
            name: 'Russia',
            emoji: '🇷🇺',
            country_code: 'RUS'
        },
        {
            id: 183,
            name: 'Rwanda',
            emoji: '🇷🇼',
            country_code: 'RWA'
        },
        {
            id: 184,
            name: 'Saint Helena',
            emoji: '🇸🇭',
            country_code: 'SHN'
        },
        {
            id: 185,
            name: 'Saint Kitts And Nevis',
            emoji: '🇰🇳',
            country_code: 'KNA'
        },
        {
            id: 186,
            name: 'Saint Lucia',
            emoji: '🇱🇨',
            country_code: 'LCA'
        },
        {
            id: 187,
            name: 'Saint Pierre and Miquelon',
            emoji: '🇵🇲',
            country_code: 'SPM'
        },
        {
            id: 188,
            name: 'Saint Vincent And The Grenadines',
            emoji: '🇻🇨',
            country_code: 'VCT'
        },
        {
            id: 189,
            name: 'Saint-Barthelemy',
            emoji: '🇧🇱',
            country_code: 'BLM'
        },
        {
            id: 190,
            name: 'Saint-Martin (French part)',
            emoji: '🇲🇫',
            country_code: 'MAF'
        },
        {
            id: 191,
            name: 'Samoa',
            emoji: '🇼🇸',
            country_code: 'WSM'
        },
        {
            id: 192,
            name: 'San Marino',
            emoji: '🇸🇲',
            country_code: 'SMR'
        },
        {
            id: 193,
            name: 'Sao Tome and Principe',
            emoji: '🇸🇹',
            country_code: 'STP'
        },
        {
            id: 194,
            name: 'Saudi Arabia',
            emoji: '🇸🇦',
            country_code: 'SAU'
        },
        {
            id: 195,
            name: 'Senegal',
            emoji: '🇸🇳',
            country_code: 'SEN'
        },
        {
            id: 196,
            name: 'Serbia',
            emoji: '🇷🇸',
            country_code: 'SRB'
        },
        {
            id: 197,
            name: 'Seychelles',
            emoji: '🇸🇨',
            country_code: 'SYC'
        },
        {
            id: 198,
            name: 'Sierra Leone',
            emoji: '🇸🇱',
            country_code: 'SLE'
        },
        {
            id: 199,
            name: 'Singapore',
            emoji: '🇸🇬',
            country_code: 'SGP'
        },
        {
            id: 200,
            name: 'Slovakia',
            emoji: '🇸🇰',
            country_code: 'SVK'
        },
        {
            id: 201,
            name: 'Slovenia',
            emoji: '🇸🇮',
            country_code: 'SVN'
        },
        {
            id: 202,
            name: 'Solomon Islands',
            emoji: '🇸🇧',
            country_code: 'SLB'
        },
        {
            id: 203,
            name: 'Somalia',
            emoji: '🇸🇴',
            country_code: 'SOM'
        },
        {
            id: 204,
            name: 'South Africa',
            emoji: '🇿🇦',
            country_code: 'ZAF'
        },
        {
            id: 205,
            name: 'South Georgia',
            emoji: '🇬🇸',
            country_code: 'SGS'
        },
        {
            id: 206,
            name: 'South Sudan',
            emoji: '🇸🇸',
            country_code: 'SSD'
        },
        {
            id: 207,
            name: 'Spain',
            emoji: '🇪🇸',
            country_code: 'ESP'
        },
        {
            id: 208,
            name: 'Sri Lanka',
            emoji: '🇱🇰',
            country_code: 'LKA'
        },
        {
            id: 209,
            name: 'Sudan',
            emoji: '🇸🇩',
            country_code: 'SDN'
        },
        {
            id: 210,
            name: 'Suriname',
            emoji: '🇸🇷',
            country_code: 'SUR'
        },
        {
            id: 211,
            name: 'Svalbard And Jan Mayen Islands',
            emoji: '🇸🇯',
            country_code: 'SJM'
        },
        {
            id: 212,
            name: 'Swaziland',
            emoji: '🇸🇿',
            country_code: 'SWZ'
        },
        {
            id: 213,
            name: 'Sweden',
            emoji: '🇸🇪',
            country_code: 'SWE'
        },
        {
            id: 214,
            name: 'Switzerland',
            emoji: '🇨🇭',
            country_code: 'CHE'
        },
        {
            id: 215,
            name: 'Syria',
            emoji: '🇸🇾',
            country_code: 'SYR'
        },
        {
            id: 216,
            name: 'Taiwan',
            emoji: '🇹🇼',
            country_code: 'TWN'
        },
        {
            id: 217,
            name: 'Tajikistan',
            emoji: '🇹🇯',
            country_code: 'TJK'
        },
        {
            id: 218,
            name: 'Tanzania',
            emoji: '🇹🇿',
            country_code: 'TZA'
        },
        {
            id: 219,
            name: 'Thailand',
            emoji: '🇹🇭',
            country_code: 'THA'
        },
        {
            id: 220,
            name: 'Togo',
            emoji: '🇹🇬',
            country_code: 'TGO'
        },
        {
            id: 221,
            name: 'Tokelau',
            emoji: '🇹🇰',
            country_code: 'TKL'
        },
        {
            id: 222,
            name: 'Tonga',
            emoji: '🇹🇴',
            country_code: 'TON'
        },
        {
            id: 223,
            name: 'Trinidad And Tobago',
            emoji: '🇹🇹',
            country_code: 'TTO'
        },
        {
            id: 224,
            name: 'Tunisia',
            emoji: '🇹🇳',
            country_code: 'TUN'
        },
        {
            id: 225,
            name: 'Turkey',
            emoji: '🇹🇷',
            country_code: 'TUR'
        },
        {
            id: 226,
            name: 'Turkmenistan',
            emoji: '🇹🇲',
            country_code: 'TKM'
        },
        {
            id: 227,
            name: 'Turks And Caicos Islands',
            emoji: '🇹🇨',
            country_code: 'TCA'
        },
        {
            id: 228,
            name: 'Tuvalu',
            emoji: '🇹🇻',
            country_code: 'TUV'
        },
        {
            id: 229,
            name: 'Uganda',
            emoji: '🇺🇬',
            country_code: 'UGA'
        },
        {
            id: 230,
            name: 'Ukraine',
            emoji: '🇺🇦',
            country_code: 'UKR'
        },
        {
            id: 231,
            name: 'United Arab Emirates',
            emoji: '🇦🇪',
            country_code: 'ARE'
        },
        {
            id: 232,
            name: 'United Kingdom',
            emoji: '🇬🇧',
            country_code: 'GBR'
        },
        {
            id: 233,
            name: 'United States',
            emoji: '🇺🇸',
            country_code: 'USA'
        },
        {
            id: 234,
            name: 'United States Minor Outlying Islands',
            emoji: '🇺🇲',
            country_code: 'UMI'
        },
        {
            id: 235,
            name: 'Uruguay',
            emoji: '🇺🇾',
            country_code: 'URY'
        },
        {
            id: 236,
            name: 'Uzbekistan',
            emoji: '🇺🇿',
            country_code: 'UZB'
        },
        {
            id: 237,
            name: 'Vanuatu',
            emoji: '🇻🇺',
            country_code: 'VUT'
        },
        {
            id: 238,
            name: 'Vatican City State (Holy See)',
            emoji: '🇻🇦',
            country_code: 'VAT'
        },
        {
            id: 239,
            name: 'Venezuela',
            emoji: '🇻🇪',
            country_code: 'VEN'
        },
        {
            id: 240,
            name: 'Vietnam',
            emoji: '🇻🇳',
            country_code: 'VNM'
        },
        {
            id: 241,
            name: 'Virgin Islands (British)',
            emoji: '🇻🇬',
            country_code: 'VGB'
        },
        {
            id: 242,
            name: 'Virgin Islands (US)',
            emoji: '🇻🇮',
            country_code: 'VIR'
        },
        {
            id: 243,
            name: 'Wallis And Futuna Islands',
            emoji: '🇼🇫',
            country_code: 'WLF'
        },
        {
            id: 244,
            name: 'Western Sahara',
            emoji: '🇪🇭',
            country_code: 'ESH'
        },
        {
            id: 245,
            name: 'Yemen',
            emoji: '🇾🇪',
            country_code: 'YEM'
        },
        {
            id: 246,
            name: 'Zambia',
            emoji: '🇿🇲',
            country_code: 'ZMB'
        },
        {
            id: 247,
            name: 'Zimbabwe',
            emoji: '🇿🇼',
            country_code: 'ZWE'
        },
        {
            id: 248,
            name: 'Kosovo',
            emoji: '🇽🇰',
            country_code: 'KOS'
        }
    ]);
}
