const express = require('express');
const { resolve } = require('path');
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());



let db;

(async () => {
  db = await open({

    // console.log(_dirname);
    filename: resolve(__dirname, "./database.sqlite"),
    driver: sqlite3.Database,
  });
})();

// --------------



async function getAllRestaurants(){
  let query = "SELECT * FROM restaurants";
  let res = await db.all(query,[]);
  return res;
}

app.get("/restaurants",async(req,res)=>{
  let result = await getAllRestaurants();
  return res.status(200).json({resturants:result});
})


async function getAllRestaurantsId(id){
  let query = "SELECT * FROM restaurants WHERE id=?";
  let res = await db.all(query,[id]);
  return res;
}

app.get("/restaurants/details/:id",async(req,res)=>{
  let id = parseInt(req.params.id);
  let result = await getAllRestaurantsId(id);
  return res.status(200).json({resturants:result});
})


async function getAllRestaurantscuisine(cuisine){
  let query = "SELECT * FROM restaurants WHERE cuisine=?";
  let res = await db.all(query,[cuisine]);
  return res;
}

app.get("/restaurants/cuisine/:cuisine",async(req,res)=>{
  let cuisine = req.params.cuisine;
  let result = await getAllRestaurantscuisine(cuisine);
  return res.status(200).json({resturants:result});
})

async function getByFilter(isVeg,hos,il){
  let query = "SELECT * FROM restaurants WHERE isVeg=? AND hasOutDoorSeating=? AND isLuxury=?";
  let res = await db.all(query,[isVeg,hos,il]);
  return res;
}

app.get("/restaurants/filter",async(req,res)=>{
  let isVeg = req.query.isVeg;
  let hos = req.query.hasOutdoorSeating;
  let il = req.query.isLuxury;
  let result = await getByFilter(isVeg,hos,il);
  return res.status(200).json({resturants:result});
})


async function getAllRestaurantsByRating(){
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let res = await db.all(query,[]);
  return res;
}

app.get("/restaurants/sort-by-rating",async(req,res)=>{
  let result = await getAllRestaurantsByRating();
  return res.status(200).json({resturants:result});
})


async function getAllDishes(){
  let query = "SELECT * FROM dishes";
  let res = await db.all(query,[]);
  return res;
}

app.get("/dishes",async(req,res)=>{
  let result = await getAllDishes();
  return res.status(200).json({dishes:result});
})



async function getAllDishesId(id){
  let query = "SELECT * FROM dishes WHERE id=?";
  let res = await db.all(query,[id]);
  return res;
}

app.get("/dishes/details/:id",async(req,res)=>{
  let id = parseInt(req.params.id);
  let result = await getAllDishesId(id);
  return res.status(200).json({dishes:result});
})



async function getAllDishesFilter(isveg){
  let query = "SELECT * FROM dishes WHERE isVeg=?";
  let res = await db.all(query,[isveg]);
  return res;
}

app.get("/dishes/filter",async(req,res)=>{
  let isveg = req.query.isVeg;
  let result = await getAllDishesFilter(isveg);
  return res.status(200).json({dishes:result});
})



async function getAllDishesByPrice(){
  let query = "SELECT * FROM dishes ORDER BY price";
  let res = await db.all(query,[]);
  return res;
}

app.get("/dishes/sort-by-price",async(req,res)=>{
  let result = await getAllDishesByPrice();
  return res.status(200).json({dishes:result});
})


app.get("/",(req,res)=>{
  return res.json({welcome:"Hi. Welcome"});
})



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
