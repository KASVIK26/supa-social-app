import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { fonts } from '@rneui/themed/dist/config'
import { hp } from '../app/helpers/common'
import Avatar from './Avatar'
import moment from 'moment'

const NotificationItem = ({
    item,
    router
}) => {
    const handleClick = () => {
        let {postId,commentId} = JSON.parse(item?.data);
        router.push({pathname: 'postDetails', params: {postId,commentId}})
        
    }
    const createdAt = moment(item?.created_at).format('MMM D');
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
       <Avatar
       uri={item?.user?.image}
       size={hp(5)}/>
       <View style={styles.nameTitle}>
        <Text style={styles.text}>
        {
        item?.sender?.name
        }
        </Text>
        <Text style={[styles.text, {color: theme.colors.textDark}]}>
        {
        item?.title
        }
        </Text>
        

       </View>
       <Text style={[styles.text, {color: theme.colors.textLight}]}>
        {
        createdAt
        }
        </Text>
    </TouchableOpacity>
  )
}

export default NotificationItem

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15,
        borderRadius: theme.radius.xxl,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        borderWidth: 0.5,
        borderColor: theme.colors.darkLight,
        borderCurve:'continuous',
    },
    nameTitle:{
        flex: 1,
        gap: 2,

    },
    text:{
        fontSize: hp(1.6),
        color: theme.colors.text,
        fontWeight: theme.fonts.medium
        
    }
})