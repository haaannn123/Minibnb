const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { validateSpot, validateReview } = require("../../utils/validation");
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    
})