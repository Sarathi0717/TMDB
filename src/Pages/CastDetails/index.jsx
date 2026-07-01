import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import {fetchPersonDetails } from "../../Services/Index";
import "./index.scss"
const CastDetails = ()=>{
    const {id} =useParams();
    const [person,setPerson] = useState(null);

    useEffect(()=>{
        fetchPersonDetails(id)
        .then((res)=>{
            console.log(res);
            setPerson(res);
            document.title = `${res.name}|TMDB`;
        })
        .catch ((err)=>console.log(err));

    },[id]);
    if (!person){
        return(
            <div className="loading">

                 Loading....
            </div>
        );

    }
    return(
        <div className="cast-details">
            <div className="cast-image">
<img
  src={
    person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : "https://via.placeholder.com/500x750?text=No+Image"
  }
  alt={person.name}
/>
             </div>
                    <div className="cast-info">

                <h1>{person.name}</h1>
                <div className="info-row">
                    <strong>Known For</strong>
                    <span>{person.known_for_department}</span>
                </div>
                <div className="info-row">
                    <strong>Birthday</strong>
                    <span>{person.birthday || "Not Available"}</span>
                </div>
               <div className="info-row">
                <strong>Place of Birth</strong>
                <span>{person.place_of_birth || "Not Available"}</span>
               </div>

               <div className="info-row">
                    <strong>Gender</strong>
                    <span>{person.gender === 1? "Female"
                    : person.gender === 2 ? "Male"
                :"Not Available"}</span>
               </div>

                <div className="info-row">
                <strong>Popularity</strong>
                <span>{person.popularity?.toFixed(2) || "N/A"}</span>               </div>

               <div className="info-row">
                <strong>Known Credits</strong>
                <span>{person.also_known_as?.length || 0}</span>
               </div>
               <h2>Biography</h2>
               <p className="bio">
                {person.biography ? person.biography : "Biography not available"}

               </p>

            </div>

      </div>
    )
}
export default CastDetails;