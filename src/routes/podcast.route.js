const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcast.controller")

router.get("/all", podcastController.getAllPodcast);

router.post("/create", podcastController.addPodcast)

router.delete("/delete/:id", podcastController.deletePodcasts)

module.exports = router;