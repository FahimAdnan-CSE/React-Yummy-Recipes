import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";


function Recipe() {

    let parms = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const check = localStorage.getItem(parms.name);
        if (check) {
            setDetails(JSON.parse(check));
        }
        else {
            let data = await fetch("https://api.spoonacular.com/recipes/" + parms.name + "/information?apiKey=1fcd5dd030c44e8ca35cdda2c9f7a49d&number=9");
            data = await data.json();
            localStorage.setItem(parms.name, JSON.stringify(data))
            setDetails(data);
        }
    }
    useEffect(() => {
        fetchDetails();
    }, [parms.name])

    return (
        <div>
            <DetailWrapper>
                <div>
                    <h2>{details.title}</h2>
                    <img src={details.image} alt="" />
                </div>
                <Info>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instruction</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => { setActiveTab("ingredients") }}>Ingredients</Button>
                </Info>
                {activeTab === 'instructions' && (
                    <div>
                        <h2 dangerouslySetInnerHTML={{ __html: details.summary }}></h2>
                        <h2 dangerouslySetInnerHTML={{ __html: details.instructions }}></h2>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <div className="ul_class">
                        <ul>
                            <li>
                                {details.diets[1]}
                            </li>
                            <li>
                                {details.diets[2]}
                            </li>
                            <li>
                                {details.diets[3]}
                            </li>

                        </ul>
                    </div>
                )}
            </DetailWrapper>
        </div>
    )

}

const DetailWrapper = styled.div`
   margin-top: 10rem;
   margin-bottom:5rem;
   display: inline-block;
   .active{
       background : linear-gradient(35deg, #494949, #313131);
       color: white;
   }
   h2{
       margin-bottom:2rem;
       margin-left:2rem;
   }
   
   li{
       font-size:1.2rem;
       line-height:2.5rem;
   }

   ul{
       margin-top: 2rem;
   }

   .ul_class{
    margin-left:4rem;
   }
`

const Button = styled.button`
 padding: 1rem 2rem;
 color: #313131;
 background : white;
 border : 2px solid black ;
 margin-right : 2rem;
 font-weight: 600;
`
const Info = styled.div`
 margin-left: 2rem;
 margin-top: 2rem;
 margin-bottom: 2rem;
`

export default Recipe;