require('dotenv').config();
const commands = require('../database/commands');
const pool = require('../database/index');
const query = require('../database/query');

test("Expects to receive a certain amount of items for each query based on types, buylimits, rising, falling and search", async () => {
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "ohabcoh", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([256, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "hoabcho", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([257, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([258, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, ["type2"], ["w"]]);
    await commands.add_item([259, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, ["type2"], ["w"]]);
    await commands.add_item([260, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "random", "random.com", 4999, ["type2"], ["w"]]);
    await commands.add_item([261, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "random", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([262, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "random", "random.com", 499, ["type1"], ["w"]]);

    const buylimits = pool.query(query.get_item_by_buy_limit(0, 500));
    const rising = pool.query(query.get_item_by_rising(1, 1));
    const falling = pool.query(query.get_item_by_falling(1, 1));

    expect(buylimits.length).toBe(5);
    expect(rising.length).toBe(3);
    expect(falling.length).toBe(5);

    await commands.delete_item(255);
    await commands.delete_item(256);
    await commands.delete_item(257);
    await commands.delete_item(258);
    await commands.delete_item(259);
    await commands.delete_item(260);
    await commands.delete_item(261);
    await commands.delete_item(262);
})

test("checks to see if the entry is updated such that the type and sub types arrays do not contain duplicate but rather distinct entries", async () => {
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "ohabcoh", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "ohabcoh", "random.com", 499, ["type1"], ["w"]]);
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "ohabcoh", "random.com", 499, ["type1"], ["w"]]);

    const data = await commands.get_item_by_id(255);
    await commands.delete_item(255);

    console.log(data);

    expect(data[0].item_type.length).toBe(1);
    expect(data[0].item_sub_type.length).toBe(1);
})