import React from 'react'
import About from '../Components/About'
import ImageSlider from '../Components/ImageSlider'
import PhotoGallery from '../Components/PhotoGallery'
import WelcomeBox from '../Components/WelcomeBox'

function Home() {
    return (
        <div id='home'>
            <ImageSlider/>
            <WelcomeBox/>
            <About/>
            <PhotoGallery/>
        </div>
    )
}

export default Home


