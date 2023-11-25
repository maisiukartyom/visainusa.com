const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.post('/addJob', jobsController.addJob);
router.post('/getJobs', jobsController.getJobs);
router.get('/getJob', jobsController.getJob);
router.post('/deleteJob', jobsController.deleteJob);
router.post('/updateJob', jobsController.updateJob);

module.exports = router;