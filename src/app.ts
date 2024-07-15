import express, { Express } from 'express';
import { config } from '@chat/config';
import { databaseConnection } from '@chat/database';
import { start } from '@chat/server';


const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();
