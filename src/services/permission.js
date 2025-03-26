import { Alert, PermissionsAndroid, Linking, Platform } from 'react-native';

const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const storageGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Cấp quyền lưu trữ",
                    message: "Ứng dụng cần quyền lưu trữ để tải file.",
                    buttonNeutral: "Hỏi lại sau",
                    buttonNegative: "Từ chối",
                    buttonPositive: "Đồng ý"
                }
            );

            const installGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
                {
                    title: "Cấp quyền cài đặt",
                    message: "Ứng dụng cần quyền cài đặt file APK.",
                    buttonNeutral: "Hỏi lại sau",
                    buttonNegative: "Từ chối",
                    buttonPositive: "Đồng ý"
                }
            );

            if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
                showPermissionAlert("Cấp quyền lưu trữ bị từ chối");
            }

            if (installGranted !== PermissionsAndroid.RESULTS.GRANTED) {
                showPermissionAlert("Cấp quyền cài đặt bị từ chối");
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

const showPermissionAlert = (message) => {
    Alert.alert(
        "Yêu cầu quyền",
        message + " Bạn có thể cấp quyền trong Cài đặt.",
        [
            { text: "Hủy", style: "cancel" },
            { text: "Mở Cài đặt", onPress: () => Linking.openSettings() }
        ]
    );
};

// Gọi hàm khi ứng dụng chạy
requestPermissions();
