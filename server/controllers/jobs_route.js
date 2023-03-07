import  express  from "express";
import mongoose from "mongoose";
import jobDescription from "../models/jobinfo.js";

const router=express.Router();

export const getJobs= async(req,res)=>{
    try {
        const JobDescription = await jobDescription.find();
                
        res.status(200).json(JobDescription);
       // console.log("works");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createJobs=async(req,res)=>{
    const { title, message, selectedFile, creator, tags } = req.body;

    const newjob = new jobDescription({ title, message, selectedFile, creator, tags })

    try {
        await newjob.save();

         res.status(201).json(newjob );
    } catch (error) {
         res.status(404).json({ message: error.message });
    }
};

export const updateJobs = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedJob = { creator, title, message, tags, selectedFile, _id: id };

    await jobDescription.findByIdAndUpdate(id, updatedJob, { new: true });

    res.json(updatedJob);
}

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }