/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios'
import './index.css';


function PokeSearch() {


  const [pokemon, setPokemon] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [pokemonInput, setPokemonInput] = useState(null)
  const [listBytype, setListBytype] = useState(null)
  const [pics, setPics] = useState([])
  const [type, setType] = useState(null)
  const [text, setText] = useState(null)
  const [index, setIndex] = useState(0)
  const [poColor, setPoColor] = useState('black')
  
  
 

  
  const searchPokemon = (name) =>{
    setText(null)
    axios.get('https://pokeapi.co/api/v2/pokemon/'+name)
    .then(function (response) {
       
      setPokemon(response.data);
      setImgSrc(response.data.sprites.front_default)
      flavorText(response.data.id)
    })
    .catch(function (error) {
       
      console.log(error);
    })
  }

  let nameList = []

  const getByType = (type) =>{
    setText(null)
    setType(type)
      
      axios.get('https://pokeapi.co/api/v2/type/'+type)
    .then(function (response) {
       
      setListBytype(response.data.pokemon)
      response.data.pokemon.map(p=>{
        nameList.push(p.pokemon.name)
      })
      getPics()
    })
    .catch(function (error) {
       
      console.log(error);
    })
  }

  
  let getByName = (name) =>{
    
    searchPokemon(name)
    setListBytype(null)




  }
  let picList = []

  let getPics = () =>{
      picList = []
      nameList.forEach(name=>{
        axios.get('https://pokeapi.co/api/v2/pokemon/'+name)
      .then(function (response) {
        setPics(response.data.sprites.front_default)
        picList.push(response.data.sprites.front_default)
        

        
      })
      .catch(function (error) {
         
        console.log(error);
      }
      )
      
      })
      
    
   
  }

  
   
  let textList = []
  let flavorText = (id) =>{
    textList= []
    axios.get('https://pokeapi.co/api/v2/pokemon-species/'+id)
    .then(function (response) {

      setPoColor(response.data.color.name)

      

       let english = response.data.flavor_text_entries.map(item => {
         return(item.language.name = "en" ? item.flavor_text : null) 
       })
       
       
         setText(english)
       
   
    })
    .catch(function (error) {
       
      console.log(error);
    })
    
  }

  let nameStyle = {
    boxShadow:`0px 0px 60px  ${poColor}`,
   
  }



  let textIn = 0;
  let btnClick = () =>{
    textIn = textIn +1
    setIndex(Math.floor(Math.random()* 30))
  }
  
  return (
    <>
    <div id="search">
        <img id="logo" src="https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo-500x313.png"/><br></br>
        <input placeholder='Pokemon Name' onBlur={e=> setPokemonInput(e.target.value)}
        onclick={e=> setPokemonInput(e.target.value)}
        onClickCapture={e=> setPokemonInput(e.target.value)}></input>
        <button id="btn" onClick={()=>searchPokemon(pokemonInput)}>search!</button>
        </div>
        
      {pokemon && 
      <div style={nameStyle} id='profile'>
      <h2 id="pName">{pokemon.name} #{pokemon.id}</h2>
      <img id="pokeImg"
      onMouseOver={()=>setImgSrc(pokemon.sprites.back_default)} 
      onMouseLeave={()=>setImgSrc(pokemon.sprites.front_default)}
      src={imgSrc} />
      <p>height: {pokemon.height}<br></br>weight: {pokemon.weight}</p>
      <p>type:{
        pokemon.types.map((type,i)=>{
        return(
        <p id="type" onClick={()=>getByType(type.type.name)}>{type.type.name} </p>
        )
        })
      }</p>
      
      </div>
      
      }
      
      {text && 
      <div style={nameStyle} id="textDiv">
          {/* <h4>random fact about {pokemon.name} :</h4> */}
          <p>{text[index]}</p>
      <button id="btn" key="btn" onClick={(btnClick)}>Random fun fact about {pokemon.name}</button>
          

        </div>}
       
       
      {listBytype && 
      <div style={nameStyle} id="namelist">
        {type && <h3 id="pName">more {type} pokemons</h3>} 
      {listBytype.map((pokemon, i) => {
        return(
        <p id="pokename" onClick={()=>{getByName(pokemon.pokemon.name)}}>{pokemon.pokemon.name}</p>
        );
      })}
      </div>
      }
      
      
       
   
    </>
  );
}

export default PokeSearch;
