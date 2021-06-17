async function test_items() {
    await commands.add_item([255, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 499, "type1", "w"]);
    await commands.add_item([256, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 499, "type1", "w"]);
    await commands.add_item([257, [10,11,12], 0.94, 0.92, 0.91, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 499, "type1", "w"]);
    await commands.add_item([258, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 4999, "type2", "w"]);
    await commands.add_item([259, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 4999, "type2", "w"]);
    await commands.add_item([260, [10,11,12], 1.1, 1.2, 1.4, 1.1, 1.2, 1.4, 1000, 990, "kekw", "kekw.com", 4999, "type2", "w"]);
    await commands.add_item([261, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "kekw", "kekw.com", 499, "type1", "w"]);
    await commands.add_item([262, [10,11,12], 0.94, 0.92, 0.91, 0.94, 0.92, 0.91, 1000, 990, "kekw", "kekw.com", 499, "type1", "w"]);

    const data = await commands.get_item_by_id(255);
    const types = await commands.get_item_by_types("type1", "w");
    const buylimits = await commands.get_item_by_buy_limit(0, 500);
    const rising = await commands.get_item_by_rising();
    const falling = await commands.get_item_by_falling();
    await commands.empty_items(testing.testModes[2]);
}