require('dotenv').config()

const uuid = require('uuid');

// API connect ////////////////////////////////////////////
const axios = require('axios');
const key = process.env.API_KEY;
const getGames = async () => {
    let currentPage = await axios.get(`https://api.rawg.io/api/games?key=${key}`)

    let results = [...currentPage.data.results];
    
    let count = 0;
    while (count <= 5 && currentPage.data.next) {
      currentPage = await axios.get(`${currentPage.data.next}`);
      results = [...results, ...currentPage.data.results];
      count++;
    }

    const games = results.map(game => ({
        id: uuid.v4(),
        name: game.name,
        description: game.tags,
        relased: game.relased,
        rating: game.rating,
        genre: game.genres,
        image: game.background_image
      }));
      
    return games;
};


const getGameByName = async (name) =>{
  const courrentPage = await axios.get(`https://api.rawg.io/api/games?key=18d8865617a340ddb2e36a93d956fe50&search=${name}`)

  let results = courrentPage.data.results;

  const games = results.map(game => ({
    id: uuid.v4(),
    name: game.name,
    description: game.tags,
    relased: game.relased,
    rating: game.rating,
    genre: game.genre,
    image: game.background_image
  }));

  return games;

}

//getGameById
const getGameById = async (id) =>{
  const courrentPage = await axios.get(`https://api.rawg.io/api/games?key=18d8865617a340ddb2e36a93d956fe50&id=${id}`)

  let results = courrentPage.data.results;

  const games = results.map(game => ({
    id: uuid.v4(),
    name: game.name,
    description: game.tags,
    relased: game.relased,
    rating: game.rating,
    genre: game.genre,
    image: game.background_image
  }));

  return games;

}



const getGenre = async () => {
  let currentPage = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)

  let results = [...currentPage.data.results];
  
  let count = 0;
  while (count <= 5 && currentPage.data.next) {
    currentPage = await axios.get(`${currentPage.data.next}`);
    results = [...results, ...currentPage.data.results];
    count++;
  }

  const games = results.map(game => ({
      name: game.name,
      games: game.games,      
      image: game.image_background
    }));
    
  return games;
};



// DB DATA /////////////////////////////////

const {Videogame, Genre, User} = require('../../db');



const createGendersInDb = async () => {
  const newGenres = await getGenre()
  newGenres.map(async (genre) => {
    const existingGenre = await Genre.findOne({ name: genre.name })
    if (!existingGenre) {
      await Genre.create({
        name: genre.name,
        games: genre.games,
        image: genre.image
      })
    }
  })
}
createGendersInDb();
const getGenres = async () => {
    return await Genre.findAll();
};


const mergeApiDbGames = async () => {
  
    const games = await getGames();          
  const dbGames = await Videogame.findAll();  

  const combinedGames = [...games, ...dbGames];    
  return combinedGames; 
  
  
}


const mergeByNameAPIDB = async (name) => {

  const games = await getGameByName(name);          
  const dbGames = await Videogame.findAll({
    where: {
      name: name
    }
  });
  const combined = [...games, ...dbGames];
  return combined; 
  
}

//mergeById
const mergeGameById = async (id) => {
  const games = await getGameById(id);         
  const dbGames = await Videogame.findAll({
    where: {
      id: id
    }
  });
  const combined = [...games,...dbGames];
  return combined; 
}
 




module.exports = {getGenres, mergeApiDbGames, mergeByNameAPIDB, getGames, mergeGameById}