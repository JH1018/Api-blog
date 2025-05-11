'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { connectionDB } from "./mongo.js";
import authRoutes from "../src/Auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import publicationRoutes from "../src/publication/publication.routes.js";
import commentRoutes from  "../src/comment/comment.routes.js";
import categoryRoutes from "../src/category/category.routes.js";
import { userSeeder } from "../src/seeders/user.seeder.js";
import { categorySeeder } from "../src/seeders/category.seeder.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(helmet());
    app.use(cors('*'));
    app.use(morgan("dev"));

};

const routes = (app) =>{
    app.use("/commentManager/v1/auth", authRoutes);
    app.use("/commentManager/v1/user", userRoutes);
    app.use("/commentManager/v1/publication", publicationRoutes);
    app.use("/commentManager/v1/comment", commentRoutes);
    app.use("/commentManager/v1/category", categoryRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        middlewares(app);
        connectionMongo();
        routes(app);
        app.listen(process.env.PORT);
        userSeeder();
        categorySeeder();
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};