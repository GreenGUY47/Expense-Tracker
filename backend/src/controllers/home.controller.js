import Home from "../models/tracker_home.model.js";

const createTracker = async (req, res) => {
  const { title, description, createdAt } = req.body;

  try {
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tracker title is required.",
      });
    }

    const tracker = await Home.create({
      user: req.user.id,
      title,
      description,
      createdAt,
    });

    return res.status(201).json({
      success: true,
      message: "Tracker created successfully.",
      tracker,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to create tracker.",
    });
  }
};

const getTrackers = async (req, res) => {
  try {
    const trackers = await Home.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      trackers,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch trackers.",
    });
  }
};

const getTracker = async (req, res) => {
  try {
    const tracker = await Home.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found.",
      });
    }

    return res.status(200).json({
      success: true,
      tracker,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch tracker.",
    });
  }
};

const updateTracker = async (req, res) => {
  const { title, description } = req.body;

  try {
    const tracker = await Home.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tracker updated successfully.",
      tracker,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to update tracker.",
    });
  }
};

const deleteTracker = async (req, res) => {
  try {
    const tracker = await Home.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tracker deleted successfully.",
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to delete tracker.",
    });
  }
};

export { createTracker, getTrackers, getTracker, updateTracker, deleteTracker };
