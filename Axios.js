const express = require('express');
const axios = require('axios');  // เชื่อมข้อมูลฟ้อนกับแบ้ก
const path = require("path"); //จัดการเส้นทางของไฟล์ต่างๆ
const app = express();
var bodyParser = require('body-parser'); //ช่วงอ่านข้อมูลแปลงไฟล์ต่างๆมาเป็น

const base_url = "http://localhost:3000"; 

app.set("views",path.join(__dirname,"/public/views"));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/thaimusics');
        const response1 = await axios.get(base_url + '/koreamusics');
        const response2 = await axios.get(base_url + '/englishmusics');
        res.render("main", { thaimusics: response.data, koreamusics: response1.data, englishmusics: response2.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/showthaimusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/thaimusics/'+ req.params.id);
        res.render("showthaimusics", { thaimusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/showthaimusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/thaimusics/'+ req.params.id);
        res.render("editthaimusics", { thaimusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/showkoreamusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/koreamusics/'+ req.params.id);
        res.render("showkoreamusics", { koreamusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/showenglishmusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/englishmusics/'+ req.params.id);
        res.render("showenglishmusics", { englishmusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/editthaimusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/thaimusics/'+ req.params.id);
        res.render("editthaimusics", { thaimusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/editthaimusics/:id", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.put(base_url + '/thaimusics/'+ req.params.id,data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/editkoreamusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/koreamusics/'+ req.params.id);
        res.render("editkoreamusics", { koreamusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/editkoreamusics/:id", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.put(base_url + '/koreamusics/'+ req.params.id,data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/editenglishmusics/:id",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/englishmusics/'+ req.params.id);
        res.render("editenglishmusics", { englishmusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/editenglishmusics/:id", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.put(base_url + '/englishmusics/'+ req.params.id,data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/createthai",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/thaimusics');
        res.render("createthai", { thaimusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/createthai", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.post(base_url + '/thaimusics',data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/createkorea",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/koreamusics');
        res.render("createkorea", { koreamusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/createkorea", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.post(base_url + '/koreamusics',data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/createenglish",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/englishmusics');
        res.render("createenglish", { englishmusics: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/createenglish", async (req, res) => {
    try{
        const data = {song: req.body.song, artist: req.body.artist };
        await axios.post(base_url + '/englishmusics',data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/deletethaimusics/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/thaimusics/'+ req.params.id);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/deletekoreamusics/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/koreamusics/'+ req.params.id);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/deleteenglishmusics/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/englishmusics/'+ req.params.id);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Sever started on post 5500');
});