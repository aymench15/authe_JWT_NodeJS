const {Router} = require('express');
const main_pages_controller = require('../controllers/main_pages_controller');

const mainroutes = Router();

mainroutes.get('/',main_pages_controller.getHomePage);
mainroutes.get('/graphs',main_pages_controller.getSmoothiesPage);
mainroutes.get('/enter',main_pages_controller.getEnterPage);
module.exports = mainroutes;


