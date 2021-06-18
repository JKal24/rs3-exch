const commands = require('../database/commands');
const pool = require('../database/index');
const query = require('../database/query');

test("Expects to receive a certain amount of items for each query based on types, buylimits, rising, falling and search", () => {
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "ohabcoh", "random.com", 499, "type1", "w"]);
    await commands.add_item([256, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "hoabcho", "random.com", 499, "type1", "w"]);
    await commands.add_item([257, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 499, "type1", "w"]);
    await commands.add_item([258, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, "type2", "w"]);
    await commands.add_item([259, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, "type2", "w"]);
    await commands.add_item([260, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, "type2", "w"]);
    await commands.add_item([261, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "random", "random.com", 499, "type1", "w"]);
    await commands.add_item([262, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "random", "random.com", 499, "type1", "w"]);

    const data = await pool.query(commands.get_item_by_id(255));
    const types = await pool.query(query.get_item_by_types);
    const buylimits = await commands.get_item_by_buy_limit(0, 500);
    const rising = await commands.get_item_by_rising();
    const falling = await commands.get_item_by_falling();

    expect(data[0].item_id).toBe(255);
    expect(types.length).toBe(5);
    expect(buylimits.length).toBe(5);
    expect(rising.length).toBe(3);
    expect(falling.length).toBe(5);
})