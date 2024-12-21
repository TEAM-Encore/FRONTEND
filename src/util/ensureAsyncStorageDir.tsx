import RNFS from 'react-native-fs';

export const ensureAsyncStorageDir = async () => {
  const asyncStorageDir = `${RNFS.LibraryDirectoryPath}/Application Support/org.reactjs.native.example.ITDA-Project/RCTAsyncLocalStorage_V1/`;
  const manifestFile = `${asyncStorageDir}manifest.json`;

  try {
    // 디렉토리가 없으면 생성
    const dirExists = await RNFS.exists(asyncStorageDir);
    if (!dirExists) {
      console.log('[DEBUG] Creating AsyncStorage directory...');
      await RNFS.mkdir(asyncStorageDir);
    }

    // manifest.json 파일이 없으면 생성
    const manifestExists = await RNFS.exists(manifestFile);
    if (!manifestExists) {
      console.log('[DEBUG] Creating manifest.json file...');
      await RNFS.writeFile(manifestFile, '{}', 'utf8');
    }

    console.log('[DEBUG] AsyncStorage directory and manifest.json are ready.');
  } catch (error) {
    console.error('[ERROR] Failed to ensure AsyncStorage directory:', error);
  }
};
