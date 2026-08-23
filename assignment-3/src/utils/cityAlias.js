// OpenWeatherMap이 한글 지명을 잘 인식하지 못해서, weather.js의 cities 배열(12개 도시)을
// 조회할 때 한글 표기 -> 영문 검색어로 치환하는 용도로 쓴다. (화면 표시는 원래 한글명 그대로)
export const KOREAN_CITY_ALIASES = {
  서울: 'Seoul',
  수원: 'Suwon',
  부산: 'Busan',
  인천: 'Incheon',
  대전: 'Daejeon',
  대구: 'Daegu',
  광주: 'Gwangju',
  울산: 'Ulsan',
  제주: 'Jeju',
  강릉: 'Gangneung',
  세종: 'Sejong',
  청주: 'Cheongju',
}
