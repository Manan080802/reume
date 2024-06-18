// const appRoot = require("app-root-path");
// const winston = require("winston");
import appRoot from'app-root-path'
import winston from "winston"
let mydate = new Date();

const loggerData = (fileName,output) => {

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: `${appRoot}/logs/${fileName}/${mydate.getDate()}-${mydate.getMonth()}-${mydate.getFullYear()}.log`, level: 'info' }),
   
    ],
  });


  logger.info(

    output
  )

  return logger
}

const loggerData1 = (fileName,error) => {

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: `${appRoot}/logs/${fileName}/${mydate.getDate()}-${mydate.getMonth()}-${mydate.getFullYear()}.log`, level: 'info' }),
    
      ],
    });
  
  
    logger.error(
      error
    )

    return logger
  }



export  {
    loggerData1,
    loggerData

}