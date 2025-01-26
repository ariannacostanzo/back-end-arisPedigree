const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("./password");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

//fai prima coutnries e breeeds
const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kosovo", code: "XK" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "South Sudan", code: "SS" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const breeds = [
  { name: "Affenpinscher" },
  { name: "Afghan Hound" },
  { name: "Aïdi (Chien de Montagne de l'Atlas)" },
  { name: "Airedale Terrier" },
  { name: "Akbash" },
  { name: "Akita" },
  { name: "Alano Español" },
  { name: "Alapaha Blue Blood Bulldog" },
  { name: "Alaskan Klee Kai" },
  { name: "Alaskan Malamute" },
  { name: "Alpenländische Dachsbracke" },
  { name: "American Akita" },
  { name: "American Bulldog" },
  { name: "American Bully" },
  { name: "American Cocker Spaniel" },
  { name: "American Foxhound" },
  { name: "American Pit Bull Terrier Sporting Type" },
  { name: "American Pit Bull Terrier Traditional" },
  { name: "American Staffordshire Terrier" },
  { name: "American Water Spaniel" },
  { name: "Anadolu Çoban Köpeği" },
  { name: "Anglo-Français de Petite Venerie" },
  { name: "Anjing Kintamani-Bali" },
  { name: "Appenzeller Sennenhund" },
  { name: "Ariegeois" },
  { name: "Armenian Gampr Գամփռ Gamp’ṙ" },
  { name: "Australian Cattle Dog" },
  { name: "Australian Kelpie" },
  { name: "Australian Shepherd" },
  { name: "Australian Silky Terrier" },
  { name: "Australian Stumpy Tail Cattle Dog" },
  { name: "Australian Terrier" },
  { name: "Azawakh" },
  { name: "Azerbaijani Wolfohoud Qurdbasar" },
  { name: "Bandog" },
  { name: "Barbet" },
  { name: "Basenji" },
  { name: "Basset Artesien Normand" },
  { name: "Basset Bleu de Gascogne" },
  { name: "Basset Fauve de Bretagne" },
  { name: "Basset Hound" },
  { name: "Bayerischer Gebirgsschweisshund" },
  { name: "Beagle" },
  { name: "Beagle Harrier" },
  { name: "Bedlington Terrier" },
  { name: "Belgian Laekenois" },
  { name: "Belgian Malinois" },
  { name: "Belgian Tervuren" },
  { name: "Berger Blanc Suisse" },
  { name: "Berger de Beauce" },
  { name: "Berger de Brie" },
  { name: "Berger Picard" },
  { name: "Berner Sennenhund" },
  { name: "Bichon a Poil Frise" },
  { name: "Bichon Havanais" },
  { name: "Billy" },
  { name: "Black and Tan Coonhound" },
  { name: "Boerboel" },
  { name: "Boerwindhond" },
  { name: "Bolognese" },
  { name: "Border Collie" },
  { name: "Border Terrier" },
  { name: "Bosanski Ostrodlaki Gonic-Barak" },
  { name: "Boston Terrier" },
  { name: "Bouledogue Français" },
  { name: "Bouvier Des Ardennes" },
  { name: "Bouvier Des Flandres/Vlaamse Koehond" },
  { name: "Boykin Spaniel" },
  { name: "Bracco Italiano" },
  { name: "Brandlbracke - (Vieräugl)" },
  { name: "Braque D'auvergne" },
  { name: "Braque De L'ariege" },
  { name: "Braque Du Bourbonnais" },
  { name: "Braque Français - Type Gascogne" },
  { name: "Braque Français - Type Pyrenees" },
  { name: "Braque Saint-Germain" },
  { name: "Briquet Griffon Vendeen" },
  { name: "Broholmer" },
  { name: "Bull Terrier" },
  { name: "Bulldog" },
  { name: "Bullmastiff" },
  { name: "Bully Kutta" },
  { name: "Ca De Bestiar" },
  { name: "Cairn Terrier" },
  { name: "Calupoh Mexican Wolfdog" },
  { name: "Canaan Dog" },
  { name: "Canadian Eskimo Dog" },
  { name: "Cane Corso Italiano" },
  { name: "Cane Da Pastore Bergamasco" },
  { name: "Cane da Pastore della Lessinia e del Lagorai" },
  { name: "Cane Da Pastore Maremmano-Abruzzese" },
  { name: "Cane Da Pastore Silano" },
  { name: "Cane Di Mannara" },
  { name: "Caniche" },
  { name: "Cão Da Serra Da Estrela" },
  { name: "Cão Da Serra De Aires" },
  { name: "Cão De Agua Português" },
  { name: "Cão De Castro Laboreiro" },
  { name: "Cão De Gado Transmontano" },
  { name: "Cão Fila De São Miguel" },
  { name: "Catahoula Leopard Dog" },
  { name: "Cavalier King Charles Spaniel" },
  { name: "Ceskoslovenský Vlciak" },
  { name: "Ceský Fousek" },
  { name: "Ceský Terier" },
  { name: "Chart Polski" },
  { name: "Chesapeake Bay Retriever" },
  { name: "Chien D'artois" },
  { name: "Chien De Berger Des Pyrenees A Face Rase" },
  { name: "Chien De Berger Des Pyrenees A Poil Long" },
  { name: "Chien De Montagne Des Pyrenees" },
  { name: "Chien De Saint Hubert" },
  { name: "Chihuahueño" },
  { name: "Chin" },
  { name: "Chinese Chongqing Dog 重庆犬" },
  { name: "Chinese Crested Dog" },
  { name: "Chinese Red Dog-Laizhou Hong" },
  { name: "Chippiparai" },
  { name: "Chodsky Pes" },
  { name: "Chow Chow" },
  { name: "Cimarrón Uruguayo" },
  { name: "Ciobanesc Românesc Carpatin" },
  { name: "Ciobănesc Românesc Corb" },
  { name: "Ciobanesc Românesc De Bucovina" },
  { name: "Ciobanesc Românesc Mioritic" },
  { name: "Cirneco Dell'etna" },
  { name: "Clumber Spaniel" },
  { name: "Collie Rough" },
  { name: "Collie Smooth" },
  { name: "Coton De Tulear" },
  { name: "Crnogorski Planinski Gonic" },
  { name: "Curly Coated Retriever" },
  { name: "Dachshund" },
  { name: "Dalmata" },
  { name: "Dandie Dinmont Terrier" },
  { name: "Dansk-Svensk Gårdshund" },
  { name: "Deerhound" },
  { name: "Deutsch Drahthaar" },
  { name: "Deutsch Kurzhaar" },
  { name: "Deutsch Langhaar" },
  { name: "Deutsch Stichelhaar" },
  { name: "Deutsche Bracke" },
  { name: "Deutsche Dogge" },
  { name: "Deutscher Boxer" },
  { name: "Deutscher Jagdterrier" },
  { name: "Deutscher Pinscher" },
  { name: "Deutscher Schäferhund" },
  { name: "Deutscher Spitz" },
  { name: "Deutscher Wachtelhund" },
  { name: "Do-Khyi" },
  { name: "Dobermann" },
  { name: "Dogo Argentino" },
  { name: "Dogo Guatemalteco" },
  { name: "Dogo Sardo" },
  { name: "Dogue De Bordeaux" },
  { name: "Donovan Pinscher" },
  { name: "Drentsche Patrijshond" },
  { name: "Drever" },
  { name: "Drötzörü Magyar Vizsla" },
  { name: "Dunker" },
  { name: "Eesti Hagijas" },
  { name: "Elo Dog" },
  { name: "English Cocker Spaniel" },
  { name: "English Foxhound" },
  { name: "English Pointer" },
  { name: "English Setter" },
  { name: "English Springer Spaniel" },
  { name: "English Toy Terrier" },
  { name: "Entlebucher Sennenhund" },
  { name: "Epagneul Bleu De Picardie" },
  { name: "Epagneul Breton" },
  { name: "Epagneul De Pont-Audemer" },
  { name: "Epagneul Français" },
  { name: "Epagneul Nain Continental" },
  { name: "Epagneul Picard" },
  { name: "Erdélyi Kopó" },
  { name: "Eurasier" },
  { name: "Field Spaniel" },
  { name: "Fila Brasileiro" },
  { name: "Flat Coated Retriever" },
  { name: "Fox Terrier (Smooth)" },
  { name: "Fox Terrier (Wire)" },
  { name: "Français Blanc Et Noir" },
  { name: "Français Blanc Et Orange" },
  { name: "Français Tricolore" },
  { name: "Galgo Español" },
  { name: "Gammel Dansk Hønsehund" },
  { name: "Gascon Saintongeois" },
  { name: "Germanischer Bärenhund" },
  { name: "Golden Retriever" },
  { name: "Gonczy Polski" },
  { name: "Gordon Setter" },
  { name: "Gos D'atura Català" },
  { name: "Grand Anglo-Français Blanc Et Noir" },
  { name: "Grand Anglo-Français Blanc Et Orange" },
  { name: "Grand Anglo-Français Tricolore" },
  { name: "Grand Basset Griffon Vendeen" },
  { name: "Grand Bleu De Gascogne" },
  { name: "Grand Griffon Vendeen" },
  { name: "Greek Shepherd Ελληνικός Ποιμενικός" },
  { name: "Greyhound" },
  { name: "Griffon A Poil Dur Korthals" },
  { name: "Griffon Belge" },
  { name: "Griffon Bleu De Gascogne" },
  { name: "Griffon Bruxellois" },
  { name: "Griffon Fauve De Bretagne" },
  { name: "Griffon Nivernais" },
  { name: "Groenendael" },
  { name: "Grønlandshund" },
  { name: "Grosser Münsterländer Vorstehhund" },
  { name: "Grosser Schweizer Sennenhund" },
  { name: "Gull Terr" },
  { name: "Haldenstøver" },
  { name: "Hamiltonstövare" },
  { name: "Hannoverscher Schweisshund" },
  { name: "Harrier" },
  { name: "Hellinikos Ichnilatis" },
  { name: "Hmong Docked Tail Dog" },
  { name: "Hokkaido" },
  { name: "Hollandse Herdershond" },
  { name: "Hollandse Smoushond" },
  { name: "Hovawart" },
  { name: "Hrvatski Ovcar" },
  { name: "Hygenhund" },
  { name: "Irish Glen Of Imaal Terrier" },
  { name: "Irish Red And White Setter" },
  { name: "Irish Red Setter" },
  { name: "Irish Soft Coated Wheaten Terrier" },
  { name: "Irish Terrier" },
  { name: "Irish Water Spaniel" },
  { name: "Irish Wolfhound" },
  { name: "Íslenskur Fjárhundur" },
  { name: "Istarski Kratkodlaki Gonic" },
  { name: "Istarski Ostrodlaki Gonic" },
  { name: "Jack Russell Terrier" },
  { name: "Jämthund" },
  { name: "Jugoslovenski Ovcarski Pas-Sarplaninac" },
  { name: "Kai" },
  { name: "Kangal Çoban Köpegi" },
  { name: "Karakachan Dog Каракачанско Куче" },
  { name: "Karjalankarhukoira" },
  { name: "Kavkazskaïa Ovtcharka" },
  { name: "Kerry Blue Terrier" },
  { name: "King Charles Spaniel" },
  { name: "Kintamani-Bali Dog" },
  { name: "Kishu" },
  { name: "Kleiner Münsterländer" },
  { name: "Komondor" },
  { name: "Korea Jindo Dog" },
  { name: "Korean Dosa Mastiff" },
  { name: "Kraski Ovcar" },
  { name: "Kritikos Lagonikos" },
  { name: "Kromfohrländer" },
  { name: "Kuvasz" },
  { name: "Labrador Retriever" },
  { name: "Lagotto Romagnolo" },
  { name: "Lakeland Terrier" },
  { name: "Lancashire Heeler" },
  { name: "Landseer (Europäisch-Kontinentaler Typ)" },
  { name: "Lapinporokoira" },
  { name: "Leavitt Bulldog" },
  { name: "Leonberger" },
  { name: "Lhasa Apso" },
  { name: "Magyar Agar" },
  { name: "Maltese" },
  { name: "Manchester Terrier" },
  { name: "Mastiff" },
  { name: "Mastín Del Pirineo" },
  { name: "Mastín Español" },
  { name: "Mastino Napoletano" },
  { name: "Miniature American Shepherd" },
  { name: "Miniature Bull Terrier" },
  { name: "Mongolian Bankhar Dog" },
  { name: "Moscow Watchdog Московская Сторожевая" },
  { name: "Mucuchi Venezuelan Sheepdog" },
  { name: "Mudhol Hound" },
  { name: "Mudi" },
  { name: "Nederlandse Kooikerhondje" },
  { name: "Nederlandse Schapendoes" },
  { name: "Newfoundland" },
  { name: "Nihon Supittsu" },
  { name: "Nihon Teria" },
  { name: "Norfolk Terrier" },
  { name: "Norrbottenspets" },
  { name: "Norsk Buhund" },
  { name: "Norsk Elghund Grå" },
  { name: "Norsk Elghund Sort" },
  { name: "Norsk Lundehund" },
  { name: "North American Mastiff" },
  { name: "Norwich Terrier" },
  { name: "Nova Scotia Duck Tolling Retriever" },
  { name: "Ogar Polski" },
  { name: "Old English Sheepdog" },
  { name: "Olde English Bulldogge" },
  { name: "Österreichischer Pinscher" },
  { name: "Otterhound" },
  { name: "Ovelheiro-Gaúcho" },
  { name: "Parson Russell Terrier" },
  { name: "Pastore Abruzzese" },
  { name: "Pastore Bergamasco" },
  { name: "Patterdale Terrier" },
  { name: "Pekingese" },
  { name: "Perdigueiro Português" },
  { name: "Perdiguero De Burgos" },
  { name: "Perro De Agua Español" },
  { name: "Perro Dogo Mallorquín" },
  { name: "Perro Sin Pelo Del Perú" },
  { name: "Petit Basset Griffon Vendeen" },
  { name: "Petit Bleu De Gascogne" },
  { name: "Petit Brabançon" },
  { name: "Petit Chien Lion" },
  { name: "Pharaoh Hound" },
  { name: "Phu Quoc Ridgeback" },
  { name: "Piccolo Levriero Italiano" },
  { name: "Podenco Canario" },
  { name: "Podenco Ibicenco" },
  { name: "Podengo Português" },
  { name: "Poitevin" },
  { name: "Polski Owczarek Nizinny" },
  { name: "Polski Owczarek Podhalanski" },
  { name: "Porcelaine" },
  { name: "Posavski Gonic" },
  { name: "Prazsky Krysarik" },
  { name: "Presa Canario" },
  { name: "Pudelpointer" },
  { name: "Pug" },
  { name: "Puli" },
  { name: "Pumi" },
  { name: "Rafeiro Do Alentejo" },
  { name: "Rajapalayam" },
  { name: "Rampur Hound" },
  { name: "Rastreador Brasileiro" },
  { name: "Rat Terrier" },
  { name: "Rater Valenciá" },
  { name: "Ratonero Bodeguero Andaluz" },
  { name: "Redbone Coonhound" },
  { name: "Rhodesian Ridgeback" },
  { name: "Riesenschnauzer" },
  { name: "Rottweiler" },
  { name: "Rövidszörü Magyar Vizsla" },
  { name: "Russkaya Psovaya Borzaya" },
  { name: "Russkiy Tchiorny Terrier" },
  { name: "Russkiy Toy" },
  { name: "Russko-Evropeïskaïa Laïka" },
  { name: "Saarlooswolfhond" },
  { name: "Sabueso Español" },
  { name: "Sabueso Fino Colombiano" },
  { name: "Saluki" },
  { name: "Samoiedskaïa Sabaka" },
  { name: "Schillerstövare" },
  { name: "Schipperke" },
  { name: "Schnauzer" },
  { name: "Schweizer Laufhund - Chien Courant Suisse" },
  { name: "Schweizer Niederlaufhund" },
  { name: "Scottish Terrier" },
  { name: "Sealyham Terrier" },
  { name: "Segugio Italiano A Pelo Forte" },
  { name: "Segugio Italiano A Pelo Raso" },
  { name: "Segugio Maremmano" },
  { name: "Shar Pei" },
  { name: "Shetland Sheepdog" },
  { name: "Shiba" },
  { name: "Shih Tzu" },
  { name: "Shikoku" },
  { name: "Shiloh Shepherd Dog" },
  { name: "Siberian Husky" },
  { name: "Skye Terrier" },
  { name: "Sloughi" },
  { name: "Slovenský Cuvac" },
  { name: "Slovenský Hrubosrstý Stavac (Ohar)" },
  { name: "Slovenský Kopov" },
  { name: "Smålandsstövare" },
  { name: "Spinone Italiano" },
  { name: "Sredneasiatskaya Ovtcharka" },
  { name: "Srpski Gonic" },
  { name: "Srpski Trobojni Gonic" },
  { name: "St.Bernhardshund - Bernhardiner" },
  { name: "Stabijhoun" },
  { name: "Staffordshire Bull Terrier" },
  { name: "Steirische Rauhhaarbracke" },
  { name: "Suomenajokoira" },
  { name: "Suomenlapinkoira" },
  { name: "Suomenpystykorva" },
  { name: "Sussex Spaniel" },
  { name: "Svensk Lapphund" },
  { name: "Taigan (Тайган)" },
  { name: "Taigan Kyrgyzdyn Taighany" },
  { name: "Taiwan Dog 台灣犬" },
  { name: "Tamaskan" },
  { name: "Tangkhul Hui" },
  { name: "Terrier Brasileiro" },
  { name: "Thai Bangkaew Dog" },
  { name: "Thai Ridgeback Dog" },
  { name: "Tibetan Mastiff" },
  { name: "Tibetan Spaniel" },
  { name: "Tibetan Terrier" },
  { name: "Tiroler Bracke" },
  { name: "Tornjak" },
  { name: "Tosa Inu" },
  { name: "Turkish Boz Shepherd Dog" },
  { name: "Västgötaspets" },
  { name: "Volpino Italiano" },
  { name: "Vostotchno-Sibirskaïa Laïka" },
  { name: "Weimaraner" },
  { name: "Welsh Corgi (Cardigan)" },
  { name: "Welsh Corgi (Pembroke)" },
  { name: "Welsh Springer Spaniel" },
  { name: "Welsh Terrier" },
  { name: "West Highland White Terrier" },
  { name: "Westfälische Dachsbracke" },
  { name: "Wetterhoun" },
  { name: "Whippet" },
  { name: "Xoloitzcuintle" },
  { name: "Yakutskaya Laika Якутская Лайка" },
  { name: "Yorkshire Terrier" },
  { name: "Yuzhnorusskaya Ovcharka" },
  { name: "Zapadno-Sibirskaïa Laïka" },
  { name: "Zwergpinscher" },
  { name: "Zwergschnauzer" },
  { name: "سگ سرابی Persian Mastiff" },
  { name: "سەگی پشدەری Pejdar Dog" },
];

//questi non li puoi creare dfino a quanod non hai creato l'user con id 1
const dogs = [
  {
    name: "Jackstaff fasination",
    slug: "jackstaff-fasination",
    titles: "GB Ch.",
    image:
      "https://allbigdogbreeds.com/wp-content/gallery/afghan-hound/Afghan_Hound-4.jpg",
    sireId: null,
    damId: null,
    views: 0,
    sex: true,
    size: "60 cm",
    weight: "30 kg",
    dateOfBirth: "1196-01-16T00:00:00.000Z",
    dateOfDeath: null,
    color: "brown",
    breeder: "Breeder A",
    kennel: "Central kennel",
    owner: "July",
    notes: "A very affectionate dog",
    breedId: 2,
    countryId: 492,
    userId: 1,
  },
  {
    name: "Esquel del Chubut",
    slug: "esquel-del-chubut",
    image:
      "https://www.adiestradorescaninos.es/wp-content/uploads/2023/01/alaskan-malamute.jpg",
    titles: null,
    sireId: null,
    damId: null,
    views: 0,
    sex: true,
    size: "30 cm",
    weight: "15 kg",
    dateOfBirth: "2015-05-12T00:00:00.000Z",
    dateOfDeath: null,
    color: "white",
    breeder: null,
    kennel: null,
    owner: null,
    notes: null,
    breedId: 10,
    countryId: 493,
    userId: 1,
  },
  {
    name: "雅拉（Yala）",
    slug: "雅-yala",
    titles: "Snow Tibetan Mastiff",
    image: "https://www.hundund.de/hunderassen/tibetdogge/fotos/100_0205.jpg",
    sireId: null,
    damId: null,
    views: 0,
    sex: false,
    size: "50 cm",
    weight: "48 kg",
    dateOfBirth: "2019-01-26T00:00:00.000Z",
    dateOfDeath: null,
    color: "white",
    breeder: "Breeder B",
    kennel: "Canile del Nord",
    owner: "Marco",
    notes: "Molto energetica e intelligente",
    breedId: 149,
    countryId: 494,
    userId: 1,
  },
];

//creali dopo i countries, breed, user e i cani d'esempio
const exampleDogs = [
  { name: "dog 1", slug: "dog-1", breedId: 1, countryId: 1, userId: 1 },
  { name: "dog 2", slug: "dog-2", breedId: 2, countryId: 2, userId: 1 },
  { name: "dog 3", slug: "dog-3", breedId: 3, countryId: 3, userId: 1 },
  { name: "dog 4", slug: "dog-4", breedId: 4, countryId: 4, userId: 1 },
  { name: "dog 5", slug: "dog-5", breedId: 5, countryId: 5, userId: 1 },
  { name: "dog 6", slug: "dog-6", breedId: 6, countryId: 6, userId: 1 },
  { name: "dog 7", slug: "dog-7", breedId: 7, countryId: 7, userId: 1 },
  { name: "dog 8", slug: "dog-8", breedId: 8, countryId: 8, userId: 1 },
  { name: "dog 9", slug: "dog-9", breedId: 9, countryId: 9, userId: 1 },
  { name: "dog 10", slug: "dog-10", breedId: 10, countryId: 10, userId: 1 },
  { name: "dog 11", slug: "dog-11", breedId: 11, countryId: 11, userId: 1 },
  { name: "dog 12", slug: "dog-12", breedId: 12, countryId: 12, userId: 1 },
  { name: "dog 13", slug: "dog-13", breedId: 13, countryId: 13, userId: 1 },
  { name: "dog 14", slug: "dog-14", breedId: 14, countryId: 14, userId: 1 },
  { name: "dog 15", slug: "dog-15", breedId: 15, countryId: 15, userId: 1 },
  { name: "dog 16", slug: "dog-16", breedId: 16, countryId: 16, userId: 1 },
  { name: "dog 17", slug: "dog-17", breedId: 17, countryId: 17, userId: 1 },
  { name: "dog 18", slug: "dog-18", breedId: 18, countryId: 18, userId: 1 },
  { name: "dog 19", slug: "dog-19", breedId: 19, countryId: 19, userId: 1 },
  { name: "dog 20", slug: "dog-20", breedId: 20, countryId: 20, userId: 1 },
  { name: "dog 21", slug: "dog-21", breedId: 21, countryId: 21, userId: 1 },
  { name: "dog 22", slug: "dog-22", breedId: 22, countryId: 22, userId: 1 },
  { name: "dog 23", slug: "dog-23", breedId: 23, countryId: 23, userId: 1 },
  { name: "dog 24", slug: "dog-24", breedId: 24, countryId: 24, userId: 1 },
  { name: "dog 25", slug: "dog-25", breedId: 25, countryId: 25, userId: 1 },
  { name: "dog 26", slug: "dog-26", breedId: 26, countryId: 26, userId: 1 },
  { name: "dog 27", slug: "dog-27", breedId: 27, countryId: 27, userId: 1 },
  { name: "dog 28", slug: "dog-28", breedId: 28, countryId: 28, userId: 1 },
  { name: "dog 29", slug: "dog-29", breedId: 29, countryId: 29, userId: 1 },
  { name: "dog 30", slug: "dog-30", breedId: 30, countryId: 30, userId: 1 },
  { name: "dog 31", slug: "dog-31", breedId: 31, countryId: 31, userId: 1 },
  { name: "dog 32", slug: "dog-32", breedId: 32, countryId: 32, userId: 1 },
  { name: "dog 33", slug: "dog-33", breedId: 33, countryId: 33, userId: 1 },
  { name: "dog 34", slug: "dog-34", breedId: 34, countryId: 34, userId: 1 },
  { name: "dog 35", slug: "dog-35", breedId: 35, countryId: 35, userId: 1 },
  { name: "dog 36", slug: "dog-36", breedId: 36, countryId: 36, userId: 1 },
  { name: "dog 37", slug: "dog-37", breedId: 37, countryId: 37, userId: 1 },
  { name: "dog 38", slug: "dog-38", breedId: 38, countryId: 38, userId: 1 },
  { name: "dog 39", slug: "dog-39", breedId: 39, countryId: 39, userId: 1 },
  { name: "dog 40", slug: "dog-40", breedId: 40, countryId: 40, userId: 1 },
  {
    name: "dog 41",
    slug: "dog-41",
    breedId: 41,
    countryId: 41,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 42",
    slug: "dog-42",
    breedId: 41,
    countryId: 41,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 43",
    slug: "dog-43",
    breedId: 41,
    countryId: 41,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 44",
    slug: "dog-44",
    breedId: 41,
    countryId: 41,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 45",
    slug: "dog-45",
    breedId: 41,
    countryId: 41,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 46",
    slug: "dog-46",
    breedId: 42,
    countryId: 42,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 47",
    slug: "dog-47",
    breedId: 42,
    countryId: 42,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 48",
    slug: "dog-48",
    breedId: 42,
    countryId: 42,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 49",
    slug: "dog-49",
    breedId: 49,
    countryId: 49,
    userId: 1,
    sex: false,
  },
  {
    name: "dog 50",
    slug: "dog-50",
    breedId: 50,
    countryId: 50,
    userId: 1,
    sex: false,
  },
];

const users = [
  {
    email: "user@admin.it",
    name: "admin",
    password: "password",
  },
];

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const createUser = async () => {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );

    // Creazione utenti con password hashata
    const result = await prisma.user.createMany({
      data: hashedUsers,
    });

    console.log(result.count);
  } catch (error) {
    console.error("Errore nella creazione utenti:", error);
  }
};

const createAllCountries = () => {
  const countriesWithSlugs = countries.map((country) => ({
    ...country,
    slug: generateSlug(country.name),
  }));

  prisma.country
    .createMany({
      data: countriesWithSlugs,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
};

const createAllBreeds = () => {
  const breedsWithSlugs = breeds.map((breed) => ({
    ...breed,
    slug: generateSlug(breed.name),
  }));

  prisma.breed
    .createMany({
      data: breedsWithSlugs,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
};

async function deleteAll(entity) {
  try {
    const result = await prisma[entity].deleteMany({});
    console.log(`${result.count} ${entity} deleted`);
  } catch (error) {
    console.error(`Error deleting ${entity}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

const createAllDogs = () => {
  prisma.dog
    .createMany({
      data: dogs,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
};
const createExampleDogs = () => {
  prisma.dog
    .createMany({
      data: exampleDogs,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
};

// createAllCountries();
// createAllBreeds();
// createUser();
// createAllDogs();
// createExampleDogs();
deleteAll("country");

// node .\utils\seeder.js
