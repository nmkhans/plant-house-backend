const handleUpload = async (req, res) => {
    
    res.status(201).json({
        success: true,
        message: "Image uploaded",
        url: req.imageUrl
    })
}

module.exports = handleUpload;