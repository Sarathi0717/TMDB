import {Swiper ,SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination}from 'swiper/modules';

import './index.scss'

const HeroCarousel =({movie})=>{
    return(
        <Swiper  modules={[Autoplay,Pagination]}
            Autoplay = {{delay : 3000}}
            Pagination={{clickable : true}}
            loop ={true}>

            {movie.Slice(0,5).map((movie)=>(
                <SwiperSlide key={movie.id}>
                    <div className='banner' style={{backgroundImage:`url(htttp://image.tmdb.org/t/p/original$ {movie.backdrop_path})`,}}>
                    <div className='overlay'>
                        <h1> {movie.title} </h1>
                        <p> {movie.overview} </p>
                    </div>

                    </div>
                </SwiperSlide>
            )) 
            } 

        </Swiper>
    );
};
export default HeroCarousel;