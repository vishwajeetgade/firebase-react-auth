import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore, storage } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [userImage, setUserImage] = useState();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    async function signUp(email, password, profileImage, displayName) {
        await auth.createUserWithEmailAndPassword(email, password)
        await auth.currentUser.updateProfile({displayName})
        const img = await storage.ref(`users/${auth.currentUser.uid}/profile.jpg`).put(profileImage)
        getProfileImg(auth.currentUser);
        // console.log(`image user ${userImage}`);
        return img;
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        setUserData();
        setUserImage();
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    async function updateUserData(user, additionalData, profileImage) {
        if (!user) return;
        const { address, phone_no } = additionalData;
        try {
            const userRef = firestore.doc(`user/${currentUser.uid}`);
            await userRef.update({
                address,
                phone_no
            })
            if(profileImage){
                await storage.ref(`users/${auth.currentUser.uid}/profile.jpg`).put(profileImage)
                getUserData()
                getProfileImg(auth.currentUser);
            }else{
                getUserData()
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async function createUserData(user, additionalData) {
        if (!user) return;
        const { email } = user;
        const { username, address, phone_no } = additionalData;
        try {
            const userRef = firestore.doc(`user/${currentUser.uid}`);
            await userRef.set({
                username,
                address,
                phone_no,
                email,
                createdAt: new Date()
            })
            getUserData();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getUserData(){
        if (currentUser) {
            const userRef = firestore.doc(`user/${currentUser.uid}`);
            const snapshot = await userRef.get();
            if (snapshot.exists) {
                setUserData(snapshot.data());
            }
        }
    }

    async function getProfileImg(user) {
        const imgUrl =  await storage.ref(`users/${user.uid}/profile.jpg`).getDownloadURL()
        // console.log(`user profile imge ${imgUrl}`);
        setUserImage(imgUrl);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                getProfileImg(user)
            }
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
        getUserData();
    },[currentUser])

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        createUserData,
        userData,
        userImage,
        updateUserData
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
