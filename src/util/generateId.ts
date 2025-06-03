import uuid from 'react-native-uuid';

export default function generateId() {
  return uuid.v4();
}
