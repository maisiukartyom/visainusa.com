const JobPosition = require('../model/JobPosition');
const mongoose = require('mongoose')


const addJob = async (req, res) => {
    try {
        const { position, location, state, wage, description, coverImage, images } = req.body;

        const newJobPosition = new JobPosition({position, location, wage, state, description, coverImage, images});
    
        await newJobPosition.save();
    
        res.sendStatus(201);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getJobs = async (req, res) => {
  try{
    const {states} = req.body

    // Use the find method to retrieve job positions for the specified states
    const result = await JobPosition.find({ state: { $in: states } });

    // Format the result as [{ state: [jobposition] }]
    const formattedResult = states.map(state => ({
      state,
      jobPositions: result.filter(jobPosition => jobPosition.state === state),
    }));

    res.json(formattedResult)
  }
  catch(err){
    console.log(err)
    res.sendStatus(403);
  }
}

const getJob = async (req, res) => {
  try{
    const {id} = req.query;
    const job = await JobPosition.findById(mongoose.Types.ObjectId(id));
    res.json(job);
  }
  catch(err){
    res.sendStatus(403);
  }
}


module.exports = {addJob, getJobs, getJob}