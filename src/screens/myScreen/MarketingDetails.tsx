import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";

const MarketingDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 안내 문구 */}
        <Text style={styles.infoText}>
          앙코르는 개인정보 보호법 제22조 제4항과 제39조의 3에 따라 {"\n"} 
          사용자의 광고성 정보 수신과 이에 따른 개인정보 처리에 대한 {"\n"} 
          동의를 받고 있습니다. 약관에 동의하지 않아도 앙코르의 {"\n"}
          서비스를 이용하실 수 있으나, 이벤트 혜택 등의 제한이 있을 수 {"\n"}있습니다.
        </Text>

        {/* 개인정보 수집 항목 */}
        <Text style={styles.sectionTitle}>개인정보 수집 항목</Text>
        <Text style={styles.listItem}>•  이름</Text>
        <Text style={styles.listItem}>•  휴대폰 번호</Text>
        <Text style={styles.listItem}>•  성별</Text>
        <Text style={styles.listItem}>•  생년월일</Text>

        {/* 개인정보 수집 이용 목적 */}
        <Text style={styles.sectionTitle}>개인정보 수집 이용 목적</Text>
        <Text style={styles.listItem}>•  이벤트 운영 및 광고성 정보 전송</Text>
        <Text style={styles.listItem}>•  서비스 관련 정보 전송</Text>

        {/* 보유 기간 */}
        <Text style={styles.sectionTitle}>보유 기간</Text>
        <Text style={styles.listItem}>•  동의 철회 혹은 회원 탈퇴 시까지</Text>

        {/* 동의 철회 방식 */}
        <Text style={styles.sectionTitle}>동의 철회 방식</Text>
        <Text style={styles.listItem}>•  알림/수신 설정 페이지에서 변경</Text>

        {/* 전송 방식 */}
        <Text style={styles.sectionTitle}>전송 방식</Text>
        <Text style={styles.listItem}>•  전화번호 문자메시지 등</Text>

        {/* 전송 내용 */}
        <Text style={styles.sectionTitle}>전송 내용</Text>
        <Text style={styles.listItem}>•  혜택 및 이벤트 정보, 신규 서비스 안내 등의 광고성 정보</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 30, // 스크롤 마지막 항목 여백 추가
  },
  infoText: {
    fontSize: 14,       // 글자 크기
    lineHeight: 24,     // 줄 간격
    letterSpacing: -0.3,// 글자 간격
    color: "#000000",
    marginTop: 28,  
    marginLeft: 21, 
    marginRight: 19, 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 24, 
    marginLeft: 21, 
    marginRight: 19, 
  },
  listItem: {
    fontSize: 14,
    color: "#000000",
    marginTop: 11, 
    marginLeft: 21, 
    marginRight: 19, 
  },
});

export default MarketingDetails;
