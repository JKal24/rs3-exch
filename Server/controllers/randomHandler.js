const commands = require('../database/commands');

module.exports = {
    async createPage(req, res) {
        return res.json(await commands.get_random_items());
    }
}