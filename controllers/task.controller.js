const taskModel = require("../models/task.schema");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).json({
            title: "success",
            msg: "Tasks obtained successfully",
            code: 200,
            result: tasks,
        });
    } catch (error) {
        res.status(400).json({
            title: "Error",
            msg: "Error occurred during search",
            code: 400,
        });
    }
};

const createTask = async (req, res) => {
    try {
        let newTask = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        };

        const task = new taskModel(newTask);  // Crea una nueva instancia de la tarea
        let createdTask = await task.save();  // Guarda la nueva tarea en la base de datos

        res.status(200).json({
            title: "success",
            msg: "Task created successfully",
            code: 200,
            result: createdTask,
        });
    } catch (error) {
        console.error(error);  // Loguea el error para depuración
        res.status(400).json({
            title: "Error",
            msg: "Error occurred during task creation",
            code: 400,
            error: error.message,  // Agrega el mensaje de error para obtener más detalles
        });
    }
};


const updateTask = async (req, res)=>{
    try {
let toUpdatedTask = {
    _id: req.body._id,
    name:req.body.name,
   email : req.body.email,
   phone: req.body.phone,
    favorite: req.body.favorite,
};

   let updatedTask = await taskModel.findByIdAndUpdate(req.params.id, toUpdatedTask,{
            new: true
        });
        if(!updatedTask){
            res.status(400).json({
                title: "Error",
                msg: "Error occurred during update",
                code: 400,
            });
            return;
        }
        res.status(200).json({
            title: "success",
            msg: "Tasks updated successfully",
            code: 200,
            result: updatedTask,
        });

    } catch (error) {
        res.status(400).json({
            title: "Error",
            msg: "Error occurred during update",
            code: 400,
        });
    }
 };

const deleteTask =  async (req, res)=>{
    try {
       let deletedTask = await taskModel.findOneAndDelete({_id: req.params.id});
       res.status(200).json({
        title: "success",
        msg: "Tasks deleted successfully",
        code: 200,
        result: deletedTask,
    });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            title: "Error",
            msg: "Error ocurred during delete",
            code: 400,
        });
    }
};



const deleteAll = async (req, res)=>{
    try {
        let deletedTasks = await taskModel.deleteMany({}); 
        res.status(200).json({
            title: "success",
            msg: "Tasks deleted successfully",
            code: 200,
            result: deletedTasks,
    });} catch (error) {
        console.log(error);
        res.status(400).json({
            title: "Error",
            msg: "Error ocurred during delete",
            code: 400,
        });
    }
};


const updateState = async (req, res)=>{
    try {
        let toUpdateState = {
           favorite: req.body.favorite,
        };
        let updatedState = await taskModel.findByIdAndUpdate(req.params.id, toUpdateState,{
            new: true
        });

        console.log("Updated State:", updatedState);
        if(!updatedState){
            res.status(400).json({
                title: "Error",
                msg: "missing field favorite",
                code: 400,
            });
            return;
        }
        res.status(200).json({
            title: "success",
            msg: "state updated successfully",
            code: 200,
            result: updatedState,
        });

    } catch (error) {
        res.status(400).json({
            title: "Error",
            msg: "Error occurred during update",
            code: 400,
        });
    }
 };

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteAll,
    updateState,
};