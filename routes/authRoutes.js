import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

const router = express.Router();

// Register employee
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const newEmp = await Employee.create({ name, email, password: hashed });
    res.json({ message: "Employee registered successfully", newEmp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login employee
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employee.findOne({ email });
    if (!emp)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: emp._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", (req, res) => {
  res.send("Auth route working");
});

export default router;
