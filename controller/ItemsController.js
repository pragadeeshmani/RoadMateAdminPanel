const sequelize = require('../config/db');

// Create an item
async function storeItems(req, res) {
    try {
        const { ItemsCode, ItemsName, BatchCode, UnitPrice, MRP, GST, GSTAmount } = req.body;

        const newItem = await sequelize.query(`
            INSERT INTO items (ItemsCode, ItemsName, BatchCode, UnitPrice, MRP, GST, GSTAmount, createdAt, updatedAt)
            VALUES (:ItemsCode, :ItemsName, :BatchCode, :UnitPrice, :MRP, :GST, :GSTAmount, NOW(), NOW())
        `, {
            replacements: {
                ItemsCode, ItemsName, BatchCode, UnitPrice, MRP, GST, GSTAmount
            }
        });

        res.status(201).json({ success: true, message: 'Item created successfully', newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// Read all items
async function getAllItems(req, res) {
    try {
        const items = await sequelize.query('SELECT * FROM items', { type: sequelize.QueryTypes.SELECT });
        res.status(200).json({ success: true, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// Read a single item by ID
async function updateItems(req, res) {
    try {
        const { id } = req.params;

        const item = await sequelize.query('SELECT * FROM items WHERE Id = :id', {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id }
        });

        if (!item.length) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, item: item[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// Delete an item
async function deleteItems(req, res) {
    try {
        const { id } = req.params;

        const deletedItem = await sequelize.query('DELETE FROM items WHERE Id = :id', {
            replacements: { id }
        });

        if (deletedItem[1] === 0) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}



module.exports = { storeItems, getAllItems, updateItems, deleteItems };