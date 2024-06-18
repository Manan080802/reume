import express from 'express';
var router = express.Router();
import { home, savedata, checkError, getStateName, getCityName } from "../controller/home.js"
import resumes from '../database/resume.js';
import filepath from "../config/filepath.js"

// This is home Page
router.get('/', home);

//This is Add data in database 
router.post('/add-emp', checkError,savedata)


// This is show uploaded Data
router.get("/showdata", async (req, res) => {
  const datas = await resumes.find()
  console.log(filepath)
  res.render('showdata',{datas,filepath})
  
})

// this is use for get state Name
router.post("/state-name", getStateName)

router.post("/city-name",getCityName)

export default router;
