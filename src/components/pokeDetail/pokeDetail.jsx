
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../theme-context/themeContext';
import { SwitchContainer, SwitchInput, Slider } from '../../pages/style'; // importando boton de thema
import { H1, SecondaryMessages, ContainerButtons, ButtonBackToHome, Img, ContainerInfo, Pokemon, ContainerSpecs, Type, BackgroundType, Move, Moves, H3, AbilitiesUl, AbilitiesLi, PowerUl, PowerLi, PowerNumbrer } from './style';

const PokeDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  // Obtén valores del tema desde el contexto
  const { currentTheme, toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = response.data;

      const abilitiesPromises = pokemonData.abilities.map(async (ability) => {
        const abilityData = await axios.get(ability.ability.url);
        return {
          name: ability.ability.name,
          description: abilityData.data.effect_entries.find(entry => entry.language.name === 'en').effect,
        };
      });

      const abilities = await Promise.all(abilitiesPromises);

      setPokemon({
        name: pokemonData.name,
        id: pokemonData.id,
        types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
        moves: pokemonData.moves.map((moveInfo) => moveInfo.move.name),
        abilities: abilities,
        image: pokemonData.sprites.front_default, // Cambia la fuente de la imagen aquí
        stats: pokemonData.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
      });
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) return <SecondaryMessages>Loading...</SecondaryMessages>;

  return (
    <div style={currentTheme}>

      {/* Botón de cambio de tema */}
      <ContainerButtons>
        <Link to="/">
          <ButtonBackToHome >Back to Home</ButtonBackToHome >
        </Link>

        <SwitchContainer>
          <SwitchInput type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
          <Slider $isDarkMode={isDarkMode}></Slider>
        </SwitchContainer>
      </ContainerButtons>

      <ContainerInfo>
        <H1>#{pokemon.id} {pokemon.name}</H1>
        <Pokemon key={pokemon.id} $pokemonType={pokemon.types[0]}>
          <Img src={pokemon.image} alt={pokemon.name} />
        </Pokemon>


        <ContainerSpecs >
          <Type><strong>Type:</strong>
            {pokemon.types.map((type, index) => (
              <BackgroundType key={index} $pokemonType={type}>
                {type}
              </BackgroundType>
            ))}
          </Type>
          <Move><strong>Moves:</strong>
            <Moves>
              {pokemon.moves.slice(0, 20).join(' , ')}
            </Moves>
          </Move>

          <H3>Abilities</H3>
          <AbilitiesUl>
            {pokemon.abilities.map((ability, index) => (
              <AbilitiesLi key={index}>
                <strong>{ability.name}:</strong> {ability.description}
              </AbilitiesLi>
            ))}

            <div>
              <H3>Statistics</H3>
              <PowerUl>
                {pokemon.stats.map((stat, index) => (
                  <PowerLi key={index}>
                    <strong>{stat.name}:</strong> <PowerNumbrer>{stat.value}</PowerNumbrer>
                  </PowerLi>
                ))}
              </PowerUl>
            </div>

          </AbilitiesUl>
        </ContainerSpecs>
      </ContainerInfo>

    </div>
  );
};

export default PokeDetail;
