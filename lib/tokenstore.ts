import EncryptedStorage from 'react-native-encrypted-storage';


export async function storeToken(key: string, value: string | number) {
  try {
    await EncryptedStorage.setItem(
      key, String(value)
    );
  } catch (error) {
    console.error('Failed to store the token', error);
  }
}

export async function getToken(key: string) {
  try {
    const token = await EncryptedStorage.getItem(key);
    return token;
  } catch (error) {
    console.error('Failed to retrieve the token', error);
    return null;
  }
}

export async function removeToken(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
    // Removesession
    // await fetch(`https://clerk.effling.com/v1/client/sessions/${sid}/remove`)
  } catch (error) {
    console.error('Failed to remove the token', error);
  }
}
