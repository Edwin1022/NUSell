const express = require("express");
const router = express.Router();
const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "../nusell-b5742f0b2ca4.json",
});

// Endpoint to analyze image
router.post("/analyze", async (req, res) => {
  try {
    const { base64ImageData } = req.body;
    const request = {
      image: { content: base64ImageData },
      features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
    };
    const [result] = await client.labelDetection(request);
    const labels = result.labelAnnotations;
    res.json(labels);
  } catch (error) {
    console.log("Error analyzing image:", error);
    res.status(500).send("Error analyzing image");
  }
});

module.exports = router;
