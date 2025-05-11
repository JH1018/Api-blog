import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Gestión de Comentarios",
            version: "1.5.0",
            description: "API para gestionar publicaciones y comentarios",
            contact: {
                name: "Javier Herrera",
                email: "jherrera-2020459@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3005/commentManager/v1"
            }
        ]
    },
    apis: [
        "./src/user/user.routes.js",
        "./src/publication/publication.routes.js",
        "./src/comment/comment.routes.js",
        "./src/auth/auth.routes.js",
        "./src/category/category.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
