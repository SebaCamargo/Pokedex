import styled from "styled-components";
import { typeColors } from "../components/typeBackground/typeBackground";

export const H1 = styled.h1`
  font-size: 60px;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 800;
`

export const ContainerBarrs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
margin: 0px 20px 30px 20px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

export const ContainerSearch = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;

  @media (max-width: 1024px) {
    width: 100%;
    gap: 10px;
  }
`

export const ContainerFilterSwitch = styled.div`
  display: flex;
  gap: 10px;
  width: 20%;
  justify-content: space-around;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: end;
  }
`

export const Input = styled.input`
  border-radius: 5px;
  width: 90%;
  padding: 10px;
  border: none;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(116, 116, 118, 0.8);
  outline: none;
`

export const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  align-self: start;
  font-size: 15px;
  font-weight: 600;
  color: rgb(116, 116, 118, 0.8);
  outline: none;
    
`

export const Option = styled.option`
  font-weight: 700;
`

export const Options = styled.option`   
  font-weight: 700;
`

export const SearchButton = styled.button`
  margin-bottom: 20px;
  padding: 11px;
  border-radius: 5px;
  border: none;
  align-self: start;
  font-size: 15px;
  font-weight: 600;
  color: black;  
`


// Switch Styles
export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.$isDarkMode ? '#252525' : '#a6a6a6')};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.$isDarkMode ? 'translateX(26px)' : 'translateX(0)')};
  }
`;

export const ContainerPokemon = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`

export const SecondaryMessages = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-top: 30px;
`

export const Pokemon = styled.div`
  margin: 10px;
  padding: 10px;
  width: 280px;
  background-color: ${(props) => typeColors[props.$pokemonType] || '#fff'};
  border-radius: 20px;
  text-align: center;
`
export const Img = styled.img`
  width: 100%;
`

export const ContainerInfoPokemon = styled.div`
  background-color:#f8eeed;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const H3 = styled.h3 `
  color: black;
  margin: 5px;
  font-size: 18px;
`

export const H4 = styled.h4 `
  color: black;
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 10px;
`

export const Type = styled.p`
  font-weight: 600;
  color: black;
  margin-bottom: 15px;
  
`
export const TypeCard = styled.span`
  background-color: ${(props) => typeColors[props.$pokemonType] || '#fff'};
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 3px;
`

export const ContainerButtonSearchMore = styled.div`
  display: flex;
  justify-content: center;
`

export const ButtonSearchMore = styled.button`
  padding: 11px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: black;
`



