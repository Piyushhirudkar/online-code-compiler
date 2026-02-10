import Submission from "../models/Submission.js";

export const submitCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const submission = new Submission({
      userId: req.user.id,
      language,
      code,
    });

    await submission.save(); // 🔥 REQUIRED

    res.json({ message: "Code submitted" });
  } catch (error) {
    console.log("Submit error:", error);
    res.status(500).json({ message: "Submit failed" });
  }
};

export const getSubmissions = async (req, res) => {
  const submissions = await Submission.find({ userId: req.user.id });
  res.json(submissions);
};
