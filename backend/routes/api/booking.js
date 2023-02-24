const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage , Bookings} = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");





module.exports = router;
