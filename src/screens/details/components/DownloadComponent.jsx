import { 
    StyleSheet, Text, View, PermissionsAndroid, Platform, 
    Button, ActivityIndicator, Alert, Linking, TouchableOpacity, 
    Pressable
} from 'react-native';
import React, { useState } from 'react';
import RNBlobUtil from 'react-native-blob-util';
import * as Progress from 'react-native-progress';
import { ButtonComponent } from '../../../components';
import { appColors } from '../../../constants/appColors';

const DownloadComponent = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [task, setTask] = useState(null);
    const [paused, setPaused] = useState(false);
    const [downloadedFilePath, setDownloadedFilePath] = useState(null);

    const url = 'https://static-sg.winudf.com/xy/aprojectadmin/apkpure_3204127_1109.apk?utm_content=1109';
    const path = `${RNBlobUtil.fs.dirs.DownloadDir}/app.apk`;

    
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

    const requestStoragePermission = async () =>{
        if(Platform.OS === 'android'){
            if(Platform.Version>=33){
                // Android 13+ cần quyền READ_MEDIA_FILES nếu lưu vào thư mục công khai
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            else if(Platform.Version >= 29){
                return true
            }else{
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        }
        return true;
    };

    const downloadFile = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Lỗi', 'Bạn cần cấp quyền lưu trữ để tải xuống.');
            return;
        }
        setIsDownloading(true);
        setDownloadProgress(0);
        setPaused(false);

        try {
            const fetchTask = RNBlobUtil.config({
                fileCache: true,
                path,
                notification: true,
                appendExt: 'apk',
            }).fetch('GET', url);

            setTask(fetchTask);

            fetchTask.progress((received, total) => {
                setDownloadProgress(received / total);
            });

            const res = await fetchTask;
            setTask(null);
            setDownloadedFilePath(res.path());
            return res.path();
        } catch (e) {
            console.log('Download thất bại: ' + e);
        } finally {
            setIsDownloading(false);
        }
    };

    // Kiểm tra và yêu cầu quyền cài đặt APK trên Android 13+
    const requestInstallPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 26) {
            try {
                const granted = await PermissionsAndroid.check("android.permission.REQUEST_INSTALL_PACKAGES");

                if (!granted) {
                    const requestResult = await PermissionsAndroid.request("android.permission.REQUEST_INSTALL_PACKAGES");

                    return requestResult === PermissionsAndroid.RESULTS.GRANTED;
                }
                return true;
            } catch (error) {
                console.log("Lỗi cấp quyền cài đặt:", error);
                return false;
            }
        }
        return true;
    };

    const pauseDownload = () => {
        if (task) {
            task.cancel();
            setTask(null);
            setPaused(true);
        }
    };

    const resumeDownload = async () => {
        setPaused(false);
        await downloadFile();
    };

    // Cài đặt APK trên Android 13+
    const installAPK = async (filePath) => {
        if (Platform.OS === 'android') {
            try {
                const canInstall = await requestInstallPermission();
                if(!canInstall){
                    Alert.alert('Quyền bị từ chối', 'Không thể cài đặt ứng dụng.');
                    return;
                }

                const intent = {
                    action: 'android.intent.action.VIEW',
                    data: `file://${filePath}`,
                    type: 'application/vnd.android.package-archive',
                    flags: [
                        'FLAG_ACTIVITY_NEW_TASK',
                        'FLAG_GRANT_READ_URI_PERMISSION'
                    ]
                };
                RNFetchBlob.android.actionViewIntent(filePath, 'application/vnd.android.package-archive');
            } catch (error) {
                console.error('Lỗi cài đặt APK:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            {isDownloading ? (
                <Pressable onPress={paused ? resumeDownload : pauseDownload}>
                    <Progress.Bar 
                        progress={downloadProgress} 
                        color={appColors.green} 
                        height={36}
                        width={360}
                        borderRadius={10}
                        unfilledColor={appColors.gray}    // Màu nền xám nhạt
                        borderWidth={0}         // Ẩn viền
                        borderColor="transparent"
                        />
                    <Text style={styles.text}>{Math.round(downloadProgress * 100)}%</Text>
                </Pressable>
            ) : (
                <ButtonComponent
                    text= {downloadedFilePath ? "Install" : "Download"}
                    textColor={appColors.black}
                    textWeigth='bold'
                    borderColor={appColors.green}
                    color={appColors.green}
                    border
                    textFont={'bold'}
                    styles={{
                        width: '100%',
                        borderRadius: 10
                    }}
                    onPress={downloadedFilePath ? installAPK : downloadFile}
                />
            )}
            <ButtonComponent
                    text="Also available"
                    textColor={appColors.white}
                    textWeigth='bold'
                    borderColor={appColors.gray}
                    color={appColors.gray7}
                    border
                    textFont={'bold'}
                    styles={{
                        width: '100%',
                        borderRadius: 10,
                        marginTop: 10
                    }}
                />
        </View>
    );
};

export default DownloadComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    progressContainer: {
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        height: 56,
        flexDirection: 'row'
    },
    text: {
        position: 'absolute',
        top: '10',
        right: '160',
        fontWeight: 'bold'
    }
});
