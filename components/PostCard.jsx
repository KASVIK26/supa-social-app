import { Alert, Share, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hp,stripHtmlTags,wp } from '../app/helpers/common'
import { theme } from '../constants/theme'
import Avatar from './Avatar'
import moment from 'moment/moment'
import { TouchableOpacity } from 'react-native'
import Icon from '../assets/icons'
import RenderHTML from 'react-native-render-html'
import { color } from '@rneui/themed/dist/config'
import { Image } from 'expo-image'
import { downloadFile, getSupabaseFileUrl } from '../services/imageService'
import { Video } from 'expo-av'
import { createPostLike, removePostLike } from '../services/postService'
import Loading from './Loading'


const textstyle ={
    color: theme.colors.dark,
    fontSize: hp(1.75),
}
const tagsStyles = {
    div: textstyle,
    p: textstyle,
    ol: textstyle,
    h1: {
        color: theme.colors.dark,
    },
    h4: {
        color: theme.colors.dark,
    }
}
const PostCard = ({
    item,
    currentUser,
    router,
    hasShadow = true,
    showMoreIcon = true,
    showDelete = false,
    onDelete = () => {},
    onEdit = () => {},
}) => {
    const shadowStyles ={
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
    }


    const[likes, setLikes] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        setLikes(item?.postLikes);

    },[])

    

    const openPostDetails = () => {
        // later
        if(!showMoreIcon) return null;
        router.push({pathname: '/postDetails',params: {postId: item?.id}});
    }

    const onLike = async() => {
        if(liked){
            // remove like
            let updatedLikes = likes.filter(like => like.userId != currentUser?.id);
            setLikes(updatedLikes);
            
            let res = await removePostLike(item?.id,currentUser?.id);
            console.log('removed like:',res);
            if(!res.success) {
                Alert.alert('Post','Something went wrong!');
            }
        }else{
            // add like
            let data = {
                userId: currentUser?.id,
                postId: item?.id
            }
            setLikes([...likes,data]);
            let res = await createPostLike(data);
            console.log('added like :',res);
            if(!res.success) {
                Alert.alert('Post','Something went wrong!');
            }
        }
        
        

    }
    
 
    const  onShare = async() => {
        let content = {message: stripHtmlTags(item?.body) };
        if(item?.file){
            // download file then share file
            setLoading(true);
            let url = await downloadFile(getSupabaseFileUrl(item?.file).uri);
            setLoading(false);
            content.url = url;
        }
        Share.share(content);
    }
const handlePostDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this post?', [
        {
            text: 'Cancel',
            onPress: () => console.log('modal cancelled'),
            style: 'cancel',
        },
        {
            text: 'Delete',
            onPress: ()=>onDelete(item), // No need to pass `null` here
            style: 'destructive',
        }
    ])
}


    const liked = likes.filter(like => like.userId == currentUser?.id)[0]? true: false;
    const createdAt = moment(item?.created_at).format('MMM D');


   
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>

     <View style={styles.header}>
        {/* User Info and Post Time */}
        <View style={styles.userInfo}>
            <Avatar
             size={hp(4.5)}
             uri={item?.user?.image}
             rounded={theme.radius.md}
            />
            <View style={{gap: 2}}>
                <Text style={styles.username}>{item?.user?.name}</Text>
                <Text style={styles.postTime}>{createdAt}</Text>

            </View>
        </View>
        {
             showMoreIcon && (
              <TouchableOpacity onPress={openPostDetails}>
                 <Icon name ="threeDotsHorizontal" size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
              </TouchableOpacity>
            )
        }
        {
            showDelete && currentUser?.id == item?.userId && (
                <View style={styles.actions}>
                    <TouchableOpacity onPress={()=>onEdit(item)}>
                 <Icon name ="edit" size={hp(2.5)}  color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePostDelete}>
                 <Icon name ="delete" size={hp(2.5)}  color={theme.colors.rose} />
              </TouchableOpacity>
                </View>
            )
            
        }

        
    </View>
    {/* Post body and media */}
    <View style={styles.content}>
        <View style={styles.postBody}>
        {
            item?.body && (
                <RenderHTML
                    contentWidth={wp(100)}
                    source={{html: item?.body}}
                    tagsStyles={tagsStyles}
                />
            )
        }

        </View>

    {/* Post image */}
    {
        item?.file &&  item?.file?.includes('postImages') &&(
            <Image
            source={getSupabaseFileUrl(item?.file)}
            transition={100}
            style={styles.postMedia}
            contentFit='cover'
            />
        )
    }   
    {/* Post Video */}
    {
        item?.file &&  item?.file?.includes('postVideos') &&(
            <Video
            style={[styles.postMedia,{height:hp(30)}]}
            source={getSupabaseFileUrl(item?.file)}
            useNativeControls
            resizeMode='cover'
            // shouldPlay
            isLooping
            />
        )

    }

    </View>
    {/* like , comment and share */}
    <View style={styles.footer}>
        <View style ={styles.footerButton}>
            <TouchableOpacity onPress={onLike}>
                <Icon name="heart" size={hp(3.5)} fill={liked? theme.colors.rose : 'transparent'} color={ liked? theme.colors.rose : theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.count}>
                {
                    likes?.length
                }
            </Text>
        </View>
        <View style ={styles.footerButton}>
            <TouchableOpacity onPress={openPostDetails}>
                <Icon name="comment" size={hp(3.5)} color={  theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.count}>
                {
                    item?.comments[0]?.count   
                }
            </Text>
        </View>
        <View style ={styles.footerButton}>
            {
                loading?(
                    <Loading  size = "small"/>
                ):(
                    <TouchableOpacity onPress={onShare}>
                        <Icon name="share" size={hp(3.5)} color={ theme.colors.textLight} />
                    </TouchableOpacity>

                )
            }
            
            
        </View>
        </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({



    container: {

        gap: 10,
        marginBottom: 15,
        borderRadius: theme.radius.xxl*1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    username: {
        fontSize: hp(1.7),
        fontWeight: theme.fonts.medium,
        color: theme.colors.textDark,
    },
    postTime:{
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium,
    },
    content : {
        gap : 10,
    },

    postMedia: {
        height: hp(40),
        width: '100%',
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
    },

    postBody: {
        marginLeft: 5,
    },
    
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:15,
    },

    footerButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    actions:{
        flexDirection:'row',
        alignItems:'center',
        gap: 18,
    },
    count: {
        color: theme.colors.text,
        fontSize: hp(1.8),
        
    }
})