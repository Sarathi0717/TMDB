import React from 'react'
import {Card,CardTitle,CardImage,CardDescription} from '../../Components/Cards'
import './index.scss'
import { useNavigate } from 'react-router-dom';

const Home =({data}) =>{
    const navigate = useNavigate();
    return(
        <div className='Home'>
            <div className='Card-mainContainer'>
                {data && data.length > 0 ? (
                    data.map((item)=>(
                       
                            <Card key={item.id}onClick={()=>navigate(`/movie/${item.id}`)}>
                                <CardImage src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                                <CardTitle title={item.original_title || item.title}></CardTitle>
                                <CardDescription description={item.overview ? item.overview.slice(0,100)+"... ": " No description available"}
                                />
                            </Card>
                    ))
                ):(
                    <h2 className='no-movies'>No Movies Found</h2>
                        )}
                  
            </div>
        </div>
    );
};

export default Home;