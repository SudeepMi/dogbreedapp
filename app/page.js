"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [dogData, setDogData] = useState({});
  const APIURL = "https://dog.ceo/api/breeds/list/all";

  useEffect(()=>{
    axios.get(APIURL).then(response=>{
      const breeds = response.data.message;
      setDogData(breeds);
    })
  },[])



  return (
   <main>
    <h2>DOG BREEDS</h2>
    <div>
        {Object.keys(dogData).map((breed, index) => {
            return (
              <div key={index}>
                <DogImage breed={breed} />
                <h2 >{breed}</h2>
              </div>
                )
          
        })
      }
    </div>
   </main>
  );
}


const DogImage = ({breed})=>{

  const [pic, setPic] = useState("");
  function getDogImage(breedName,subBread=null){
     axios.get(`https://dog.ceo/api/breed/${breedName.toLowerCase()}/images/random`).then(response=>setPic(response.data.message));
   
  }

  useEffect(()=>{
    getDogImage(breed);
  },[breed]);


  return <img src={pic} />
}