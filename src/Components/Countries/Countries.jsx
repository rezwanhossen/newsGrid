let twoLetterISO = [
    "af", "al", "dz", "as", "ad", "ao", "ai", "aq", "ag", "ar", "am", "aw", "au", "at", "az",
    "bs", "bh", "bd", "bb", "by", "be", "bz", "bj", "bm", "bt", "bo", "ba", "bw", "br", "bn",
    "bg", "bf", "bi", "kh", "cm", "ca", "cv", "ky", "cf", "td", "cl", "cn", "co", "km", "cg",
    "cd", "cr", "ci", "hr", "cu", "cy", "cz", "dk", "dj", "dm", "do", "ec", "eg", "sv", "gq",
    "er", "ee", "et", "fj", "fi", "fr", "ga", "gm", "ge", "de", "gh", "gr", "gd", "gt", "gn",
    "gw", "gy", "ht", "hn", "hu", "is", "in", "id", "ir", "iq", "ie", "il", "it", "jm", "jp",
    "jo", "kz", "ke", "ki", "kp", "kr", "kw", "kg", "la", "lv", "lb", "ls", "lr", "ly", "li",
    "lt", "lu", "mg", "mw", "my", "mv", "ml", "mt", "mh", "mr", "mu", "mx", "fm", "md", "mc",
    "mn", "me", "ma", "mz", "mm", "na", "nr", "np", "nl", "nz", "ni", "ne", "ng", "no", "om",
    "pk", "pw", "ps", "pa", "pg", "py", "pe", "ph", "pl", "pt", "qa", "ro", "ru", "rw", "kn",
    "lc", "vc", "ws", "sm", "st", "sa", "sn", "rs", "sc", "sl", "sg", "sk", "si", "sb", "so",
    "za", "es", "lk", "sd", "sr", "sz", "se", "ch", "sy", "tw", "tj", "tz", "th", "tl", "tg",
    "to", "tt", "tn", "tr", "tm", "tv", "ug", "ua", "ae", "gb", "us", "uy", "uz", "vu", "ve",
    "vn", "ye", "zm", "zw"
  ];
  
  let isoCountries = {
    "af": "Afghanistan", "al": "Albania", "dz": "Algeria", "as": "American Samoa", "ad": "Andorra", "ao": "Angola", "ai": "Anguilla", "aq": "Antarctica",
    "ag": "Antigua and Barbuda", "ar": "Argentina", "am": "Armenia", "aw": "Aruba", "au": "Australia", "at": "Austria", "az": "Azerbaijan", "bs": "Bahamas",
    "bh": "Bahrain", "bd": "Bangladesh", "bb": "Barbados", "by": "Belarus", "be": "Belgium", "bz": "Belize", "bj": "Benin", "bm": "Bermuda", "bt": "Bhutan",
    "bo": "Bolivia", "ba": "Bosnia and Herzegovina", "bw": "Botswana", "br": "Brazil", "bn": "Brunei", "bg": "Bulgaria", "bf": "Burkina Faso", "bi": "Burundi",
    "kh": "Cambodia", "cm": "Cameroon", "ca": "Canada", "cv": "Cape Verde", "ky": "Cayman Islands", "cf": "Central African Republic", "td": "Chad", "cl": "Chile",
    "cn": "China", "co": "Colombia", "km": "Comoros", "cg": "Congo", "cd": "Congo (Democratic Republic)", "cr": "Costa Rica", "ci": "Ivory Coast", "hr": "Croatia",
    "cu": "Cuba", "cy": "Cyprus", "cz": "Czech Republic", "dk": "Denmark", "dj": "Djibouti", "dm": "Dominica", "do": "Dominican Republic", "ec": "Ecuador",
    "eg": "Egypt", "sv": "El Salvador", "gq": "Equatorial Guinea", "er": "Eritrea", "ee": "Estonia", "et": "Ethiopia", "fj": "Fiji", "fi": "Finland", "fr": "France",
    "ga": "Gabon", "gm": "Gambia", "ge": "Georgia", "de": "Germany", "gh": "Ghana", "gr": "Greece", "gd": "Grenada", "gt": "Guatemala", "gn": "Guinea",
    "gw": "Guinea-Bissau", "gy": "Guyana", "ht": "Haiti", "hn": "Honduras", "hu": "Hungary", "is": "Iceland", "in": "India", "id": "Indonesia", "ir": "Iran", 
    "iq": "Iraq", "ie": "Ireland", "il": "Israel", "it": "Italy", "jm": "Jamaica", "jp": "Japan", "jo": "Jordan", "kz": "Kazakhstan", "ke": "Kenya", "ki": "Kiribati",
    "kp": "North Korea", "kr": "South Korea", "kw": "Kuwait", "kg": "Kyrgyzstan", "la": "Laos", "lv": "Latvia", "lb": "Lebanon", "ls": "Lesotho", "lr": "Liberia",
    "ly": "Libya", "li": "Liechtenstein", "lt": "Lithuania", "lu": "Luxembourg", "mg": "Madagascar", "mw": "Malawi", "my": "Malaysia", "mv": "Maldives", "ml": "Mali",
    "mt": "Malta", "mh": "Marshall Islands", "mr": "Mauritania", "mu": "Mauritius", "mx": "Mexico", "fm": "Micronesia", "md": "Moldova", "mc": "Monaco", "mn": "Mongolia",
    "me": "Montenegro", "ma": "Morocco", "mz": "Mozambique", "mm": "Myanmar", "na": "Namibia", "nr": "Nauru", "np": "Nepal", "nl": "Netherlands", "nz": "New Zealand",
    "ni": "Nicaragua", "ne": "Niger", "ng": "Nigeria", "no": "Norway", "om": "Oman", "pk": "Pakistan", "pw": "Palau", "ps": "Palestine", "pa": "Panama", "pg": "Papua New Guinea",
    "py": "Paraguay", "pe": "Peru", "ph": "Philippines", "pl": "Poland", "pt": "Portugal", "qa": "Qatar", "ro": "Romania", "ru": "Russia", "rw": "Rwanda", "kn": "Saint Kitts and Nevis",
    "lc": "Saint Lucia", "vc": "Saint Vincent and the Grenadines", "ws": "Samoa", "sm": "San Marino", "st": "Sao Tome and Principe", "sa": "Saudi Arabia", "sn": "Senegal",
    "rs": "Serbia", "sc": "Seychelles", "sl": "Sierra Leone", "sg": "Singapore", "sk": "Slovakia", "si": "Slovenia", "sb": "Solomon Islands", "so": "Somalia", "za": "South Africa",
    "es": "Spain", "lk": "Sri Lanka", "sd": "Sudan", "sr": "Suriname", "sz": "Eswatini", "se": "Sweden", "ch": "Switzerland", "sy": "Syria", "tw": "Taiwan", "tj": "Tajikistan", 
    "tz": "Tanzania", "th": "Thailand", "tl": "Timor-Leste", "tg": "Togo", "to": "Tonga", "tt": "Trinidad and Tobago", "tn": "Tunisia", "tr": "Turkey", "tm": "Turkmenistan", 
    "tv": "Tuvalu", "ug": "Ug"
  }
  
  let Countries = [];
  twoLetterISO.forEach(element => {
    let obj = {
        iso_2_alpha  : element,
        png : `https://flagcdn.com/32x24/${element}.png`,
        countryName : getCountryName(element.toUpperCase()),

    }
    Countries.push(obj);
  })
  function getCountryName (countryCode) {
        if(isoCountries.hasOwnProperty(countryCode)){
            return isoCountries[contryCode];

        }
        else{
            return countryCode;
        }
  }
  console.log(countries)
  export default countries;
  
  
  