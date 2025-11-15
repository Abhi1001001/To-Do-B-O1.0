import express from "express";
import auth from "../middleware/auth";
import Todo from "../models/Todo";

const router = express.Router();

router.use(auth);

// create
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description, user: req.userId });
    res.json(todo);
  } catch (err) { next(err); }
});

// list
router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
});

// update
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = await Todo.findOneAndUpdate({ _id: id, user: req.userId }, { title, description, completed }, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) { next(err); }
});

// delete
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
});

// mark completed toggle
router.patch("/:id/toggle", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) { next(err); }
});

export default router;
