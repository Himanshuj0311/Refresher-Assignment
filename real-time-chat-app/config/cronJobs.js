const cron = require('node-cron');
const sendEmail = require('./emailService');

// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily task');
  sendEmail('user@example.com', 'Daily Reminder', 'This is your daily reminder.');
});
