export function updateExpoPushToken(expoPushToken: any) {
  return {
    type: 'EXPO_PUSH',
    data: expoPushToken,
  };
}
