import { React, useState } from 'react'
import { dummyUsers } from '../../dummy/users'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'

export default function OutfitMedia(props) {
    const [users, setUsers] = useState(dummyUsers);
    const images = users.map((user) => (
        <SwiperSlide>
            <img className='object-cover aspect-square' src={props.media} alt="img"/>
        </SwiperSlide> // show the first photo as preview
      ));
    return (
        <div className='my-2'>
            <Swiper
                modules={Navigation}
                navigation
                speed={800}
                slidesPerView={1}
                loop
                className="swiper w-screen"
            > 
              {images}
            </Swiper>
        </div>
    )
}
