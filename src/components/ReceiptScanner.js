import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { processOCR } from '../services/OCRService';

export default ReceiptScanner = ({ onScanComplete }) => {
  const [receiptImage, setReceiptImage] = useState(null);

  const captureReceipt = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status === 'granted') return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processReceipt(result.uri);
    }
  };

  const processReceipt = async (uri) => {
    try {
      const ocrData = await processOCR(uri);
      onScanComplete({
        amount: ocrData.total,
        date: ocrData.date,
        image: uri
      });
      setReceiptImage(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to process receipt');
    }
  };

  return (
    <View>
      <CustomButton
        title="Scan Receipt"
        onPress={captureReceipt}
        accessibilityLabel="Open camera to scan receipt"
        tooltip="Take a photo of your receipt to automatically fill expense details"
      />
      {receiptImage && <Image source={{ uri: receiptImage }} style={styles.receiptImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  receiptImage: { width: 200, height: 200, marginTop: 10, borderRadius: 8 },
});
