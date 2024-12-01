export const deleteTimeAgo = (dateString: string | undefined) => {
  // 날짜가 유효하지 않을 경우 기본 반환값
  if (!dateString) {
    return {message: '', remainingSeconds: -1};
  }

  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const twoWeeksInSeconds = 14 * 24 * 60 * 60;
  const remainingSeconds = twoWeeksInSeconds - diffInSeconds;

  // 만료된 경우
  if (remainingSeconds <= 0) {
    return {message: '자동 삭제되었습니다.', remainingSeconds: 0};
  }

  // 남은 시간 계산 및 메시지 생성
  let message = '';
  if (remainingSeconds < 3600) {
    const minutes = Math.floor(remainingSeconds / 60);
    message = `${minutes}분 뒤 자동 삭제`;
  } else if (remainingSeconds < 86400) {
    const hours = Math.floor(remainingSeconds / 3600);
    message = `${hours}시간 뒤 자동 삭제`;
  } else {
    const days = Math.floor(remainingSeconds / 86400);
    message = `${days}일 뒤 자동 삭제`;
  }

  return {message, remainingSeconds};
};
