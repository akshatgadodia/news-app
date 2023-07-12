const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const saveImage = (req, res, next) => {
  // multer().single("image");
  // console.log(req.file)
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to upload image" });
      return;
    }
    try {
      if (!req.file || !req.file.originalname) {
        throw new Error("Invalid file data");
      }
      const data = {
        url: `http://localhost:5000/api/public/images/${req.file.originalname}`,
      };
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  });
};

module.exports = { saveImage };
