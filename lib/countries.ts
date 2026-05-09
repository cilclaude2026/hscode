export type CountryInfo = {
  code: string;
  name: string;
  nameKo: string;
  digits: number;
  schedule: string;
  authority: string;
  flag: string;
};

// Major trading economies and the digit length of their national HS schedule.
// HS 6-digit is the WCO international root; each country extends it.
export const COUNTRIES: CountryInfo[] = [
  { code: "KR", name: "South Korea",   nameKo: "대한민국",   digits: 10, schedule: "HSK",        authority: "Korea Customs Service",            flag: "🇰🇷" },
  { code: "US", name: "United States",  nameKo: "미국",       digits: 10, schedule: "HTSUS",      authority: "U.S. International Trade Commission", flag: "🇺🇸" },
  { code: "CN", name: "China",          nameKo: "중국",       digits: 13, schedule: "CN HS",      authority: "General Administration of Customs", flag: "🇨🇳" },
  { code: "JP", name: "Japan",          nameKo: "일본",       digits: 9,  schedule: "Japan HS",   authority: "Japan Customs",                    flag: "🇯🇵" },
  { code: "EU", name: "European Union", nameKo: "유럽연합",   digits: 8,  schedule: "CN Code",    authority: "European Commission TARIC",        flag: "🇪🇺" },
  { code: "DE", name: "Germany",        nameKo: "독일",       digits: 11, schedule: "TARIC",      authority: "German Customs (Zoll)",            flag: "🇩🇪" },
  { code: "GB", name: "United Kingdom", nameKo: "영국",       digits: 10, schedule: "UK Tariff",  authority: "HM Revenue & Customs",             flag: "🇬🇧" },
  { code: "VN", name: "Vietnam",        nameKo: "베트남",     digits: 8,  schedule: "Vietnam HS", authority: "Vietnam Customs",                  flag: "🇻🇳" },
  { code: "IN", name: "India",          nameKo: "인도",       digits: 8,  schedule: "ITC-HS",     authority: "DGFT / Indian Customs",            flag: "🇮🇳" },
  { code: "AU", name: "Australia",      nameKo: "호주",       digits: 8,  schedule: "AHECC",      authority: "Australian Border Force",          flag: "🇦🇺" },
  { code: "CA", name: "Canada",         nameKo: "캐나다",     digits: 10, schedule: "CCT",        authority: "Canada Border Services Agency",    flag: "🇨🇦" },
  { code: "MX", name: "Mexico",         nameKo: "멕시코",     digits: 8,  schedule: "TIGIE",      authority: "Mexican Customs (SAT)",            flag: "🇲🇽" },
  { code: "BR", name: "Brazil",         nameKo: "브라질",     digits: 8,  schedule: "NCM",        authority: "Receita Federal",                  flag: "🇧🇷" },
  { code: "TH", name: "Thailand",       nameKo: "태국",       digits: 11, schedule: "AHTN",       authority: "Thai Customs",                     flag: "🇹🇭" },
  { code: "SG", name: "Singapore",      nameKo: "싱가포르",   digits: 8,  schedule: "AHTN",       authority: "Singapore Customs",                flag: "🇸🇬" },
];

export function getCountry(code: string): CountryInfo | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase());
}
