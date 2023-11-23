const JobPosition = require('../model/JobPosition');


const addJob = async (req, res) => {
    try {
        console.log(req.body)
        const { position, location, wage } = req.body;

        const newJobPosition = new JobPosition({position, location, wage});
    
        await newJobPosition.save();
    
        res.status(201).json({ message: 'Job saved successfully' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports = {addJob}