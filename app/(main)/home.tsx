import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Icon from '@/assets/icons'
import { useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'
import { fetchPosts } from '@/services/postService'
import PostCard from '@/components/PostCard'
import Loading from '@/components/Loading'
import { getUserData } from '@/services/userService'

var limit = 0;
const Home = () => {
  const router = useRouter();
  const {user, setAuth} = useAuth();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handlePostEvent = async (payload)=> {
    // console.log('Post event:', payload.eventType);
    if(payload.eventType == 'INSERT' && payload?.new?.id){
      let newPost = {...payload.new};
      let res = await getUserData(newPost.userId);
      newPost.user = res.success ? res.data : {};
      newPost.comments = [{count: 0}]; // Initialize comment count
      newPost.postLikes = []; // Initialize likes
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
    
    if(payload.eventType == 'DELETE' && payload?.old?.id){
      setPosts(prevPosts => prevPosts.filter(post => post.id !== payload.old.id));
    }

    if(payload.eventType == 'UPDATE' && payload?.new?.id){
      setPosts(prevPosts=>{
        let updatedPosts = prevPosts.map(post=> {
          if (post.id==payload.new.id) {
            post.body = payload.new.body;
            post.file = payload.new.file;
          }
          return post;
        });
        return updatedPosts;
      })
    }
  }

  const handleCommentInsert = (payload) => {
    console.log('New comment added:', payload.new);
    
    if (payload.new) {
      const { postId } = payload.new;
      
      // Update the comment count for the specific post
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [{
                count: (post.comments?.[0]?.count || 0) + 1
              }]
            };
          }
          return post;
        });
      });
    }
  }

  const handleCommentDelete = (payload) => {
    console.log('Comment deleted:', payload.old);
    
    if (payload.old) {
      const { postId } = payload.old;
      
      // Decrease the comment count for the specific post
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            const currentCount = post.comments?.[0]?.count || 0;
            return {
              ...post,
              comments: [{
                count: Math.max(0, currentCount - 1) // Prevent negative count
              }]
            };
          }
          return post;
        });
      });
    }
  }

  useEffect(() => {
    // Listen for post changes
    let postChannel = supabase
      .channel('posts')
      .on('postgres_changes', {
        event: '*', 
        schema: 'public', 
        table: 'posts'
      }, handlePostEvent)
      .subscribe();
    
    // Listen for comment changes
    let commentChannel = supabase
      .channel('comments')
      .on('postgres_changes', {
        event: 'INSERT', 
        schema: 'public', 
        table: 'comments'
      }, handleCommentInsert)
      .on('postgres_changes', {
        event: 'DELETE', 
        schema: 'public', 
        table: 'comments'
      }, handleCommentDelete)
      .subscribe();
    
    return () => {
      supabase.removeChannel(postChannel);
      supabase.removeChannel(commentChannel);
    }
  }, [])

  const getPosts = async ()=> {
    if(!hasMore) return null;
    limit = limit + 4;
    console.log('fetching Post: ', limit);
    let res=await fetchPosts(limit);
    if(res.success){
      if(posts.length==res.data?.length) setHasMore(false)
      setPosts(res.data);
    }
  }

  // const onLogout = async () => {
  //   // setAuth(null);
  //   const {error} = await supabase.auth.signOut();
  //   if(error){
  //     Alert.alert('Sign out', "Error signing out")
  //   }
  // }

  return (
    <ScreenWrapper bg='white'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Framez</Text>
          <View style={styles.icons}>
            {/* <Pressable onPress={() => router.push('/notifications')}>
              <Icon name='heart' size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable> */}
            <Pressable onPress={() => router.push('/newPost')}>
              <Icon name='plus' size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={() => router.push('/profile')}>
              {/* <Icon name='user' size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/> */}
              <Avatar 
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.md}
                style={{borderWidth: 2}}
              />
            </Pressable>
          </View>
        </View>

        {/* posts */}
        <FlatList 
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyles}
          keyExtractor={item=> item.id.toString()}
          renderItem={({item}) => <PostCard
              item={item}
              currentUser={user}
              router={router}
          />
        }
        onEndReached={() => {
          console.log('got to the end');
          getPosts();
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={hasMore? (
          <View style={{marginVertical: posts.length==0? 200:30}}>
            <Loading />
          </View>
        ): (
          <View style={{marginVertical: 30}}>
            <Text style={styles.noPosts}>No more posts</Text>
          </View>
        )}
        />

      </View>
      {/* <Button title='logout' onPress={onLogout}/> */}
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginBottom: 10,
  },
  title:{
    fontSize: hp(3.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  listStyles:{
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts:{
    fontSize: hp(2),
    color: theme.colors.text,
    textAlign: 'center',
  },
  pill:{
    position: 'absolute',
    top: -4,
    right: -10,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText:{
    color: 'white',
    fontSize: hp(1.4),
    fontWeight: theme.fonts.bold,
  }
})