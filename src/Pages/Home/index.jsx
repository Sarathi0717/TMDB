import React from 'react'
import {Card,CardTitle,CardImage,CardDescription} from '../../Components/Cards'
import './index.scss'

import { useNavigate } from 'react-router-dom';
const Home =({data}) =>{
    const navigate = useNavigate();
    return(
        <div className='Home'>
            <div className='Card-mainContainer'>
                {
                    data.map((item,index)=>{
                        return(
                            <Card key={item.id}onClick={()=>navigate(`/movie/${item.id}`)}>
                                <CardImage src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                                <CardTitle title={item.original_title}></CardTitle>
                                <CardDescription description={item.overview.slice(0,100)}></CardDescription>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;