import React, { useState } from 'react'
import { useRef } from 'react'
import styles from "../styles/signupStyles.module.css"
function ProfileSignUp() {
    const [imageUrl,setImageUrl] = useState(null)
    const ref = useRef()
    
    const selectImage = ()=>{
        ref.current.click()

    }

    const handleImageChange=(e)=>{
        const files = e.target.files
        const selectedImage = files[0]
        const url = URL.createObjectURL(selectedImage)
        setImageUrl(url)
        
    }
  return (
    <>
      <input type="file" onChange={handleImageChange} ref = {ref} name="profileImageUpload" id={styles.profileImageUpload} accept='image/*'/>
      <div id={styles.imageUploaderBox} onClick={selectImage}>
      <div id={styles.userImg} style={imageUrl?{backgroundImage:`url(${imageUrl})`}:{}}></div>
      <span>Click/Drag to Upload Profile Pic</span>
      </div>
      <textarea name="bio" id={styles.bioText} placeholder='Enter your bio here' required ></textarea>
    </>
  )
}

export default ProfileSignUp
