import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingPage() {
  return (
    <View style={styles.fallback}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 128,
  },
});
