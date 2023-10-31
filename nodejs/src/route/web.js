import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    // route table user

    router.post('/api/login', userController.handleLoging);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    // get check email from form signup
    router.get("/api/get-email", userController.getEmail);
    // route table allcode
    router.get("/api/allcode", userController.getAllCode);
    // route get doctor home page
    router.get("/api/get-top-doctor-home", doctorController.getTopDoctorHome);

    return app.use("/", router);
}

module.exports = initWebRoutes;