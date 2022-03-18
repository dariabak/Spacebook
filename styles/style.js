import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 5
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        padding: 5
      },
      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
      },
      buttonContainer: {
        color: '#B22222',
        padding: 10
      },
      postField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 150,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1, 
        backgroundColor: '#ffffff'
        
      },
      newPostText: {
        textAlign: 'center',
        fontSize: 22,
        padding: 7,
        marginTop: 5,
        marginBottom: 5,
        width:'100%',
        borderRadius: 8,
        color: '#ffffff',
        backgroundColor: '#B22222'
      },
      postContainer: {
        borderRadius: 8,
        borderWidth: 1,
        margin: 5,
        padding: 10,
        width: '90%',
        flex: 1,
        backgroundColor: '#ffffff'
      },
      editButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        backgroundColor: '#B22222',
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
        paddingTop: 3,
      },
      postData: {
        fontSize: 14,
        height: '100%',
        width: '100%'
    
      },
      userNameText: {
        position: 'absolute',
        top: 3,
        left: 60,
        right: 50
      },
    likeButton: {
        width: '15%',
        alignItems: "center",
        marginRight: 8,
        marginTop: 5,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: '#B22222',
        borderRadius: 5,
    
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        color: '#051d5f',
        padding: 5
    }
});