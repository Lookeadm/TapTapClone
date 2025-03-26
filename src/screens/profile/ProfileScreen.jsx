import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RowComponent, SectionComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <SectionComponent>
                <RowComponent>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>N</Text>
                    </View>
                    <View>
                        <TextComponent text={"Nguyen Nhat Nam"} fontWeight={'bold'} color={appColors.white}/>
                        <TextComponent text={"ID: 356279125"} color={appColors.gray} size={12}/>
                    </View>
                </RowComponent>
                </SectionComponent>
            {/* Stats Section */}
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Likes</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* My Games Section */}
            <View style={styles.gamesSection}>
                <Text style={styles.sectionTitle}>My games</Text>
                <Text style={styles.sectionSubtitle}>Your collection is empty.</Text>
                <View style={styles.gamesStats}>
                    <View style={styles.gameStatItem}>
                        <Text style={styles.gameStatNumber}>0</Text>
                        <Text style={styles.gameStatLabel}>Want</Text>
                    </View>
                    <View style={styles.gameStatItem}>
                        <Text style={styles.gameStatNumber}>0</Text>
                        <Text style={styles.gameStatLabel}>Played</Text>
                    </View>
                    <View style={styles.gameStatItem}>
                        <Text style={styles.gameStatNumber}>0</Text>
                        <Text style={styles.gameStatLabel}>Playing</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        marginTop: 24
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatarText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    idContainer: {
        marginTop: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    gamesSection: {
        backgroundColor: '#2a2a2a',
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    gamesStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    gameStatItem: {
        alignItems: 'center',
    },
    gameStatNumber: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    gameStatLabel: {
        fontSize: 12,
        color: '#888',
    },
    tabBar: {
        backgroundColor: '#2a2a2a',
        borderTopWidth: 0,
    },
    tabLabel: {
        fontSize: 14,
    },
});

export default ProfileScreen;