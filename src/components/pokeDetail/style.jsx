import styled from "styled-components";
import { typeColors } from "../typeBackground/typeBackground";

export const H1 = styled.h1`
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 700;
  text-transform: capitalize;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`

export const SecondaryMessages = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-top: 30px;

`

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 40px 0px 40px;
`

export const ButtonBackToHome = styled.button`
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: black;
`

export const Img = styled.img`
    width: 80%;

    @media (max-width: 767px) {
    width: 100%;
  }
`

export const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Pokemon = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  background-color: ${(props) => typeColors[props.$pokemonType] || '#fff'};
  width: 30%;


  @media (max-width: 767px) {
    width: 80%;
  }
`

export const ContainerSpecs = styled.div`
  background-color: #f8eeed;
  border-radius: 20px;
  padding: 20px;
  max-width: 1000px;
  margin: 10px 60px 50px 60px;

  @media (max-width: 767px) {
    margin: 10px 30px 30px 30px;
  }
`
export const Type = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px; 
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
export const BackgroundType = styled.div`
  background-color: ${(props) => typeColors[props.$pokemonType] || '#fff'};
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 5px;
`

export const Move = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px; 
  display: flex;
  margin-bottom: 10px;
`

export const Moves = styled.div`
  margin-left: 10px;
`

export const H3 = styled.h3`
  margin: 15px;
  font-size: 20px;
`

export const AbilitiesUl = styled.ul`
  text-transform: capitalize;
  font-size: 16px; 
`
export const AbilitiesLi = styled.li`
  font-size: 16px;
  margin-bottom: 10px ;
  font-weight: 600;
`
export const PowerLi = styled.li`
  font-size: 16px;
  margin-bottom: 10px ;
  font-weight: 600;
  display: flex;
  align-items: center;
`

export const PowerUl = styled.ul`
  font-size: 16px;
  margin-bottom: 10px ;
  font-weight: 600;
`

export const PowerNumbrer = styled.div`
  background-color: #c91508;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 5px;
`