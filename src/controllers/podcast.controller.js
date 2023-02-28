const Podcast = require("../models/podcast.model")

module.exports.getAllPodcast = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find();

    res.status(200).json({
      success: true,
      message: "All Podcast",
      data: podcasts
    })
  } catch (error) {
    next(error)
  }
}

module.exports.addPodcast = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await Podcast.create(data);

    res.status(201).json({
      success: true,
      message: "Podcast created.",
      data: result
    })

  } catch (error) {
    next(error)
  }
}