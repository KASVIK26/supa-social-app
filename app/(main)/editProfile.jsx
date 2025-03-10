import { Pressable, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';  // Removed Button from react-native-web
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../helpers/common';
import { theme } from '../../constants/theme';
import Header from '../../components/Header';
import { Image } from 'expo-image';
import { useAuth } from '../../contexts/AuthContext';
import { getUserImageSrc, uploadFile } from '../../services/imageService';
import Icon from '../../assets/icons';
import Input from '../../components/Input';
import Button from '../../components/Button';  // Importing the custom Button component
import { updateUser } from '../../services/userService';  
import { router, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';


const EditProfile = () => {
    const { user: currentUser ,setUserData} = useAuth();
    const [loading, setLoading] = useState(false);  // Corrected the loading state
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        phoneNumber: '',
        image: null,
        address: '',
        bio: ''
    });

    useEffect(() => {
        if (currentUser) {
            setUser({
                name: currentUser.name || '',
                phoneNumber: currentUser.phoneNumber || '',
                image: currentUser.image || null,
                address: currentUser.address || '',
                bio: currentUser.bio || '',
            });
        }
    }, [currentUser]);

    const onPickImage = async () => {
        // Implement image picker logic here
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setUser({ ...user, image: result.assets[0] });

        }
    }
       
    const onSubmit = async () => {
        let userData = { ...user };
        let { name, phoneNumber, image, address, bio } = userData;
        if (!name || !phoneNumber || !address || !bio || !image) {
            Alert.alert('Edit Profile', 'Please fill all the fields!');
            return;
        }
        // Check if currentUser and userId exist
    const userId = currentUser?.id;
    if (!userId) {
        Alert.alert('Edit Profile', 'User not found.');
        return;
    }
        setLoading(true);

        if(typeof image == 'object'){
            //upload image
            let imageRes = await uploadFile('profiles', image?.uri,true);
            if(imageRes.success) userData.image = imageRes.data;
            else userData.image = null;
            
        }
        // update user
        const res = await updateUser(userId, userData);
        setLoading(false);
        if(res.success){
            setUserData({...currentUser,...userData});
            router.back();
        }
    };

    let imageSource = user.image && typeof user.image == 'object' ? user.image.uri: getUserImageSrc(user.image);

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Header title="Edit Profile" />
                    {/* form */}
                    <View style={styles.form}>
                        <View style={styles.avatarContainer}>
                            <Image source={imageSource} style={styles.avatar} />
                            <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                                <Icon name="camera" size={20} strokeWidth={2.5} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                            Please fill your profile details
                        </Text>
                        <Input
                            icon={<Icon name="user" />}
                            placeholder="Enter your Name"
                            value={user.name}
                            onChangeText={(value) => setUser({ ...user, name: value })}
                        />
                        <Input
                            icon={<Icon name="call" />}
                            placeholder="Enter your phone number"
                            value={user.phoneNumber}
                            onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
                        />
                        <Input
                            icon={<Icon name="location" />}
                            placeholder="Enter your address"
                            value={user.address}
                            onChangeText={(value) => setUser({ ...user, address: value })}
                        />
                        <Input
                            placeholder="Enter your bio"
                            value={user.bio}
                            multiline={true}
                            containerStyle={styles.bio}
                            onChangeText={(value) => setUser({ ...user, bio: value })}
                        />
                        
                        {/* Custom button with loading state */}
                        <Button
                            title="Update"
                            loading={loading}
                            onPress={onSubmit}
                            buttonStyle={styles.updateButton}  // Optional custom button style
                        />
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    avatarContainer: {
        alignItems: 'center',
        height: hp(14),
        width: hp(14),
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.xxl * 1.8,
        borderCurve: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    form: {
        gap: 18,
        marginTop: 20,
        alignItems: 'center',
    },
    bio: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 15,
        height: hp(15),
    },
    updateButton: {
        width: '100%',
        marginTop: 20,
        backgroundColor: theme.colors.primary,  // Optional: additional button styling
    },
});
