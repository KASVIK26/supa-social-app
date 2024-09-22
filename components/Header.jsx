import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import BackButton from './BackButton';
import { hp } from '../app/helpers/common';
import { theme } from '../constants/theme';

const Header = ({title,showBackButton = true, mb=10}) => {
    const router = useRouter();
  return (
    <View style ={[styles.container,{marginBottom:mb}]}>
     {
        showBackButton && (
            <View style = {styles.showBackButton}>
                <BackButton router={router}/>
            </View>
        )
     }
     <Text style = {styles.title}>{title ||""}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        gap:10,
    },
    title:{
        fontSize: hp(2.7),
        fontWeight:theme.fonts.semibold,
        color: theme.colors.textDark,
    },
    showBackButton:{
        position:'absolute',
        left:0,
    },

})