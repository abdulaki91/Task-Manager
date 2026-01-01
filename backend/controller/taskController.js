import Task from "../model/taskModel.js";
export const createTask = async (req, resp) => {
  try {
    const { title, description, dueDate } = req.body;
    console.log(req.user);
    await Task.create({
      title,
      description,
      dueDate,
      createdBy: req.user_id,
    });
    resp.status(201).json({ status: "Success", message: "Task created" });
  } catch (error) {
    resp.status(500).json({
      status: "fail",
      message: "Internal Srver Error",
      error: error.message,
    });
  }
};
