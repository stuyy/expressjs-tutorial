const mongoose = require('mongoose');

const DiscordUserSchema = new mongoose.Schema({
  discordId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model('discord_users', DiscordUserSchema);
