const express = require('express');
const Order = require('../models/Order');
const redisClient = require('../config/redis');
const logger = require('../config/winston');
const router = express.Router();

// Utility function to get stats
const getStats = async (symbol, dateStart, dateEnd) => {
  return Order.aggregate([
    { $match: { company_symbol: symbol, time: { $gte: dateStart, $lt: dateEnd } } },
    { $group: {
      _id: null,
      maxPrice: { $max: '$price' },
      minPrice: { $min: '$price' },
      count: { $sum: 1 }
    }}
  ]);
};

// Day stats
router.get('/company/:symbol/day-stats', async (req, res) => {
  const { symbol } = req.params;
  const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const todayEnd = new Date(todayStart).setDate(todayStart.getDate() + 1);

  const cacheKey = `day-stats:${symbol}`;
  redisClient.get(cacheKey, async (err, cachedStats) => {
    if (err) {
      logger.error('Redis error:', err);
      return res.status(500).json({ message: 'Error retrieving stats' });
    }

    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    try {
      const stats = await getStats(symbol, todayStart, todayEnd);
      if (stats.length === 0) return res.status(404).json({ message: 'No data found' });

      redisClient.setex(cacheKey, 86400, JSON.stringify(stats[0]));
      res.json(stats[0]);
    } catch (error) {
      logger.error('MongoDB error:', error);
      res.status(500).json({ message: 'Error retrieving stats' });
    }
  });
});

// Month stats
router.get('/company/:symbol/month-stats', async (req, res) => {
  const { symbol } = req.params;
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endOfMonth = new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1);

  const cacheKey = `month-stats:${symbol}`;
  redisClient.get(cacheKey, async (err, cachedStats) => {
    if (err) {
      logger.error('Redis error:', err);
      return res.status(500).json({ message: 'Error retrieving stats' });
    }

    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    try {
      const stats = await getStats(symbol, startOfMonth, endOfMonth);
      if (stats.length === 0) return res.status(404).json({ message: 'No data found' });

      redisClient.setex(cacheKey, 86400, JSON.stringify(stats[0]));
      res.json(stats[0]);
    } catch (error) {
      logger.error('MongoDB error:', error);
      res.status(500).json({ message: 'Error retrieving stats' });
    }
  });
});

module.exports = router;
