const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const multer = require('multer');
const { connection } = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    db: connection,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg') {
          return {
            bucketName: 'jobsImages'
          };
        } else {
          return null;
        }
      }    
});

const upload = multer({storage});

router.post('/addJob', upload.single('cover'), jobsController.addJob);

module.exports = router;