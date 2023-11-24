const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const multer = require('multer');
const { connection } = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');

const storageCovers = new GridFsStorage({
    db: connection,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          const {position, location} = req.query;
          return {
            metadata: {
              jobPosition: position,
              jobLocation: location
            },
            bucketName: 'jobsCovers'
          };
        } else {
          return null;
        }
      }    
});

const storageImages = new GridFsStorage({
  db: connection,
  file: (req, file) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const {position, location} = req.query;
        return {
          metadata: {
            jobPosition: position,
            jobLocation: location
          },
          bucketName: 'jobsImages'
        };
      } else {
        return null;
      }
    }    
});


const uploadSingle = multer({storage: storageCovers});
const uploadArray = multer({storage: storageImages});

router.post('/addJob', uploadSingle.single('cover'), uploadArray.array('images'), jobsController.addJob);

module.exports = router;