import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../components/theme-context/themeContext'; // Importa el hook del tema
import { H1, ContainerSearch, Input, Select, Option, Options, SearchButton, ContainerBarrs, SwitchContainer, ContainerFilterSwitch, SwitchInput, Slider, ContainerPokemon, SecondaryMessages, Pokemon, ContainerInfoPokemon, Img, H3, H4, Type, TypeCard, ContainerButtonSearchMore, ButtonSearchMore } from './style';

const Home = () => {
  const { isDarkMode, toggleTheme, currentTheme } = useTheme(); // Usar el hook para acceder al tema
  const [allPokemonList, setAllPokemonList] = useState([]);// Lista completa de Pokémon para búsqueda
  const [displayedPokemonList, setDisplayedPokemonList] = useState([]);// Pokémon visibles en pantalla
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);// Pokémon filtrados por búsqueda
  const [offset, setOffset] = useState(0);// Controlar el desplazamiento para cargar más Pokémon
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');// Búsqueda por nombre
  const [selectedType, setSelectedType] = useState('');// Filtro por tipo
  const [types, setTypes] = useState([]);// Tipos de Pokémon
  const [hasSearched, setHasSearched] = useState(false);// Estado para controlar si se ha realizado una búsqueda

  // Obtener todos los Pokémon (solo nombres y URLs) para la búsqueda
  const fetchAllPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      setAllPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching all Pokémon list:', error);
    }
  };


  // Obtener los primeros 10 Pokémon para mostrarlos en pantalla
  const fetchDisplayedPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const promises = response.data.results.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        return {
          name: pokemonData.data.name,
          id: pokemonData.data.id,
          types: pokemonData.data.types.map((typeInfo) => typeInfo.type.name),
          image: pokemonData.data.sprites.front_default || 'default_image_url', // Manejo de imagenes faltantes
        };
      });

      const newPokemons = await Promise.all(promises);
      setDisplayedPokemonList((prevList) => [...prevList, ...newPokemons]);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los tipos de Pokémon para el filtro
  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const filteredTypes = response.data.results
        .map((type) => type.name)
        .filter((type) => type !== 'unknown' && type !== 'stellar'); // Filtra los tipos no deseados
      setTypes(filteredTypes);
    } catch (error) {
      console.error('Error fetching Pokémon types:', error);
    }
  };

  // Filtrar la lista de Pokémon por nombre y tipo en toda la lista completa
  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    let filteredList = allPokemonList;

    // Filtrar por nombre si se ingresó algún término de búsqueda
    if (searchTerm) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Si hay un tipo seleccionado, hacer más llamadas a la API para obtener tipos
    if (selectedType) {
      const promises = filteredList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const types = response.data.types.map((typeInfo) => typeInfo.type.name);
        if (types.includes(selectedType)) {
          return {
            name: response.data.name,
            id: response.data.id,
            types,
            image: response.data.sprites.front_default || 'default_image_url',
          };
        }
      });

      // Obtener los detalles completos de los Pokémon filtrados por nombre
      const filteredByType = await Promise.all(promises);
      filteredList = filteredByType.filter((pokemon) => pokemon !== undefined);
    } else {
      const promises = filteredList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          name: response.data.name,
          id: response.data.id,
          types: response.data.types.map((typeInfo) => typeInfo.type.name),
          image: response.data.sprites.front_default || 'default_image_url',
        };
      });

      filteredList = await Promise.all(promises);
    }

    setFilteredPokemonList(filteredList);
    setLoading(false);
  };

  //primera letra mayuscula yooo
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  // Manejar el evento de presionar tecla en el input de búsqueda
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchDisplayedPokemon();
    fetchAllPokemonList();
    fetchPokemonTypes();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  // Mostrar la lista filtrada si hay una búsqueda activa, o la lista visible de Pokémon por defecto
  const pokemonToDisplay = searchTerm || selectedType ? filteredPokemonList : displayedPokemonList;

  return (
    <div style={currentTheme}> {/* Aplicar el tema actual */}
      <H1>Pokédex </H1>

      <ContainerBarrs>
        {/* Campo de búsqueda por nombre */}
        <ContainerSearch>
          <Input
            type="text"
            placeholder="Search by Pokemon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleKeyPress}
          />

          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </ContainerSearch>

        {/* Select para filtrar por tipo */}
        <ContainerFilterSwitch>
          <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <Options value="">Filter by Type</Options>
            {types.map((type) => (
              <Option key={type} value={type}>
                {capitalizeFirstLetter(type)} {/* Capitaliza la primera letra */}
              </Option>
            ))}
          </Select>

          {/* Switch para cambiar de tema */}
          <SwitchContainer>
            <SwitchInput type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
            <Slider $isDarkMode={isDarkMode}></Slider>
          </SwitchContainer>
        </ContainerFilterSwitch>
      </ContainerBarrs>


      <ContainerPokemon>
        {loading && <SecondaryMessages>Loading...</SecondaryMessages>}

        {hasSearched && !loading && pokemonToDisplay.length === 0 && (
          <SecondaryMessages>Pokémon not found</SecondaryMessages>
        )}

        {!loading &&
          pokemonToDisplay.map((pokemon) =>
            pokemon && pokemon.name && pokemon.types ? (
              <Pokemon key={pokemon.id} $pokemonType={pokemon.types[0]}>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <Img src={pokemon.image} alt={pokemon.name} />
                  <ContainerInfoPokemon>
                    <H3>#{pokemon.id} </H3>
                    <H4>{pokemon.name}</H4>
                    <Type>
                      Type:{' '}
                      {pokemon.types.map((type) => (
                        <TypeCard key={type} $pokemonType={type}>
                          {capitalizeFirstLetter(type)}
                        </TypeCard>
                      ))}
                    </Type>
                  </ContainerInfoPokemon>
                </Link>
              </Pokemon>
            ) : null
          )}
      </ContainerPokemon>

      {/* Botón para cargar más solo si no hay búsqueda */}

      <ContainerButtonSearchMore>
        {!searchTerm && !selectedType && (
          <ButtonSearchMore onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </ButtonSearchMore>
        )}
      </ContainerButtonSearchMore>
    </div>
  );
};

export default Home;


