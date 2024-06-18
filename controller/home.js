import resumes from '../database/resume.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from "path"
import axios from "axios";
import {loggerData1,loggerData} from "../config/winston.js"

// base url
axios.defaults.baseURL = 'https://testapi.demoserver.biz/api/settings';
// interceptors using response
axios.interceptors.response.use(
    (response) => {
      
        
        loggerData("allLog",response.data)
      
      return response.data;
    },
    (error) => {
        
        loggerData1("allLog",error)
      return Promise.reject(error);
    }
)

// interceptors using request
axios.interceptors.request.use(function (config) {
    loggerData("allLog",config.data)
  
    
    return config;
}, function (error) {
    loggerData1("allLog",error)
    
    return Promise.reject(error);
  });
  


// This is call the first page of website
async function home(req, res, next) {
    try {

        const countries = await axios.post("/country")
      
        const countryOfList = countries
        const countryList = countryOfList.data.countries
       
        res.render('index', { countryList });
    }
    catch (error) {
        next(error)
    }
}

// This is store Data in in uploads folder 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        
        cb(null, uuidv4() + '-' + file.originalname)


    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 200000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('resume');

//This function is  check file is jpeg,jpg,png,pdf
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);


    if (mimetype && extname) {
        cb(null, true);
    } else {

        cb('Images Pdf only! (jpeg, jpg, png, pdf)');
    }
}
// This function is check if any error occur in upload File
const checkError = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
           
            return res.status(200).send({
                "success": false,
                "message": err.message || err
            });
        }
        else {
            next()

        }


    });
}
// This function is save data of user
const savedata = async (req, res) => {
    
    if (req.body.city == "Select City" || req.body.state == "Select State" || req.body.country == "Select Country") {
        return res.status(200).send(
            {
                "success": false,
                "message": "please select the city, state, country"
            }
        )


    }
    else {
        const resumeData = {
            name: req.body.name,
            file: req.file.filename,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        }
        const data = await resumes.create(resumeData)
        if (data) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "Data is added..."
                }
            )

        }
        else {
            return res.status(200).send(
                {
                    "success": false,
                    "message": "Some error in database.."
                }
            )

        }
    }
}

// get the State Name
const getStateName = async (req, res, next) => {
    try
    {

        const states = await axios({
            method: 'post',
            url: '/state',
            data: {
                country: req.body.country,
            }
        });
        const statesOfName = states
        const statesName = statesOfName.data.states
        return res.status(200).send({
            "success": true,
            message: statesName
        })
    }
    catch (error)
    {
        return res.status(200).send({
            "success": false,
            message:error.message
        })
    }
}

// get the City Name
const getCityName = async (req, res, next) => {
    try
    {

        const cities = await axios({
            method: 'post',
            url: '/city',
            data: {
                country: req.body.country,
                state: req.body.state
            }
        })
        const citesOfName = cities
        const citiesName = citesOfName.data.cities
       
        return res.status(200).send({
            "success": true,
            message: citiesName
        })
    }
    catch (error)
    {
        return res.status(200).send({
            "success": false,
            message:error.message
        })
    }
}

export {
    home, checkError, savedata, getStateName, getCityName
}