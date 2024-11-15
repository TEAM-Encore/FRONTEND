import {launchImageLibrary} from 'react-native-image-picker';
import {PostPresignedUrl} from '../../api/image.api';

export const SelectImage = async (
  setPhotoCount: React.Dispatch<React.SetStateAction<number>>,
): Promise<string | null> => {
  return new Promise(resolve => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async res => {
        console.log('사진 결과 데이터: ', res);

        if (res.assets && res.assets.length > 0) {
          const imageFileName = res.assets[0].fileName || 'default_image.jpg';
          const fileUri = res.assets[0].uri || '';
          const fileType = res.assets[0].type || 'image/jpeg';

          try {
            // Presigned URL 받아오기
            const response = await PostPresignedUrl(imageFileName);
            const presignedUrl = response.data;
            const urlWithoutQuery = presignedUrl.split('?')[0];

            // PUT 요청으로 이미지 업로드
            const file = {
              uri: fileUri,
              name: imageFileName,
              type: fileType,
            };

            const putResponse = await fetch(presignedUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': file.type,
              },
              body: await fetch(file.uri).then(res => res.blob()),
            });

            if (putResponse.ok) {
              console.log('이미지 업로드 성공:', urlWithoutQuery);
              resolve(urlWithoutQuery); // URL 반환
            } else {
              console.error(
                '이미지 업로드 실패: ',
                putResponse.status,
                await putResponse.text(),
              );
              resolve(null);
            }
          } catch (error) {
            console.error(
              'Presigned URL API 호출 오류 또는 PUT 요청 오류: ',
              error,
            );
            resolve(null);
          }
          setPhotoCount(prev => prev + 1);
        } else {
          resolve(null);
        }
      },
    );
  });
};
