import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide,SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {
 
  const [popular, setPopular]=useState([]);

  useEffect(()=>{

    getPopular();
  },[]);
  const getPopular= async()=>{
      const check = localStorage.getItem("popular");
      if(check)
      {
         setPopular(JSON.parse(check));
      }
      else{
        //const api =await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const api =await fetch(`https://api.spoonacular.com/recipes/random?apiKey=1fcd5dd030c44e8ca35cdda2c9f7a49d&number=9`);
        //   const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
        const data=await api.json();
        localStorage.setItem("popular",JSON.stringify(data.recipes));
        setPopular(data.recipes);
        //console.log(data);
      }
  }  

  return (
    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
            <Splide options={{
                perPage:4,
                arrows: false,
                pagination: false,
                drag:"free",
                gap:"5rem",
            }}>
                {popular.map((recipes)=>{
                return(
                    <SplideSlide key={recipes.id}>
                        <Card>
                          <Link to={'/recipe/'+recipes.id}>
                        <p>{recipes.title}</p>
                        <img src={recipes.image} alt={recipes.title} width="300px"/>
                        <Gradient />
                        </Link>
                        </Card>
                    </SplideSlide>
                    
                );
                })}
            </Splide>
        </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
   margin: 4rem 0rem;

`;

const Card = styled.div` 
   min-height:15rem;
   min-width:14rem;
   border-radius:2rem;
   overflow:hidden;
   position:relative;

   img{
       border-radius:2rem;
       position:absolute;
       left:0;
       width:100%;
       height:100%;
       object-fiot:cover;
   }
   p{
        position:absolute;
        z-index:12;
        left:50%;
        bottom:-15%;
        transform: translate(-50%,0%);
        color: white;
        width: 100%;
        text-align:center;
        font-weight:500;
        font-size:0.9rem;
        height:40%;
        display:flex;
        justify-content:center;
        align-items;center;
   }

`;

const Gradient = styled.div`
             
     z-index:3;
     position:absolute;
     width:100%;
     height:100%;
     background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));

`;


export default Popular