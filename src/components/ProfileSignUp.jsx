import React, { useState } from 'react'
import { useRef } from 'react'
import styles from "../styles/signupStyles.module.css"
function ProfileSignUp({credentials,onChangeHandler,imageUrl,setImageUrl}) {
    
    const ref = useRef()
    
    const selectImage = ()=>{
        ref.current.click()

    }

    const handleImageChange=(e)=>{
        const files = e.target.files
        const selectedImage = files[0]
        const url = URL.createObjectURL(selectedImage)
        setImageUrl(url)
        onChangeHandler(e)
    }
  return (
    <>
      <input type="file" onChange={handleImageChange} ref = {ref} name="profileImage" id={styles.profileImageUpload} accept='image/*'/>
      <div id={styles.imageUploaderBox} onClick={selectImage}>
      <div id={styles.userImg} style={imageUrl?{backgroundImage:`url(${imageUrl})`}:{}}></div>
      <span>Click to Upload Profile Pic</span>
      </div>
      <textarea name="bio" id={styles.bioText} placeholder='Enter your bio here' required onChange={onChangeHandler} value={credentials.bio}/>
    </>
  )
}

export default ProfileSignUp
