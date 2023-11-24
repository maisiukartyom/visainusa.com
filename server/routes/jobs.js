const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.post('/addJob', jobsController.addJob);
router.post('/getJobs', jobsController.getJobs);
router.get('/getJob', jobsController.getJob);

module.exports = router;