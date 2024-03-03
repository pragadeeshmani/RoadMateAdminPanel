const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

async function getstafflist(req, res) {

    const user = await sequelize.query('SELECT * FROM StaffInfoDetails', {
        type: Sequelize.QueryTypes.SELECT,
    });
    if (user.length !== 0) {
        res.status(200).json({ success: true, user: user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
}

async function getSaleBillList(req, res) {

    const user = await sequelize.query('SELECT * FROM SaleBillDetails', {
        type: Sequelize.QueryTypes.SELECT,
    });
    if (user.length !== 0) {
        res.status(200).json({ success: true, user: user });
    } else {
        res.status(200).json({ success: false, message: 'No Bill' });
    }
}

async function GetStoreBillInfo(req, res) {
    const { BillDate, EWayBillNumber, DeliveryDate, CustomerName, CustomerPhoneNumber, Address, DeliveryAddress, TransactionMode, IsGST, Note, VehicalNumber, DeliveryCharges, TotalTaxableAmount, OutStanding, PaymentMode, Amount, RoundOff, GrandTotal, ProductItemsJson } = req.body;

    const ProductItemsJsonDecode = JSON.parse(ProductItemsJson);
    console.log(ProductItemsJsonDecode);

    const MainItems = await sequelize.query('INSERT INTO SaleBillDetails (BillDate, EWayBillNumber, DeliveryDate, CustomerName, CustomerPhoneNumber, Address, DeliveryAddress, TransactionMode, IsGST, Note, VehicalNumber, DeliveryCharges, TotalTaxableAmount, OutStanding, PaymentMode, Amount, RoundOff, GrandTotal, createdAt, updatedAt) VALUES (:BillDate, :EWayBillNumber, :DeliveryDate, :CustomerName, :CustomerPhoneNumber, :Address, :DeliveryAddress, :TransactionMode, :IsGST, :Note, :VehicalNumber, :DeliveryCharges, :TotalTaxableAmount, :OutStanding, :PaymentMode, :Amount, :RoundOff, :GrandTotal, :createdAt,:updatedAt)', {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
            BillDate: BillDate,
            EWayBillNumber: EWayBillNumber,
            DeliveryDate: DeliveryDate,
            CustomerName: CustomerName,
            CustomerPhoneNumber: CustomerPhoneNumber,
            Address: Address,
            DeliveryAddress: DeliveryAddress,
            TransactionMode: TransactionMode,
            IsGST: IsGST,
            Note: Note,
            VehicalNumber: VehicalNumber,
            DeliveryCharges: DeliveryCharges,
            TotalTaxableAmount: TotalTaxableAmount,
            OutStanding: OutStanding,
            PaymentMode: PaymentMode,
            Amount: Amount,
            RoundOff: RoundOff,
            GrandTotal: GrandTotal,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    });

    const LastId = MainItems[0];
    ProductItemsJsonDecode.forEach( async PIJDItems => {
        const ItemsCode = PIJDItems.ItemsCode;
        const ItemsName = PIJDItems.ItemsName;
        const BatchCode = PIJDItems.BatchCode;
        const Quantity = PIJDItems.Quantity;
        const UnitPrice = PIJDItems.UnitPrice;
        const MRP = PIJDItems.MRP;
        const TaxValue = PIJDItems.TaxValue;
        const GST = PIJDItems.GST;
        const GSTAmount = PIJDItems.GSTAmount;
        const Total = PIJDItems.Total;
        const StaffId = PIJDItems.StaffId;
    
        const InnerItems = await sequelize.query('INSERT INTO ItemsSaleDetails (ItemsCode, ItemsName, BatchCode, Quantity, UnitPrice, MRP, TaxValue, GST, GSTAmount, Total, StaffId, MasterId, createdAt, updatedAt) VALUES (:ItemsCode, :ItemsName, :BatchCode, :Quantity, :UnitPrice, :MRP, :TaxValue, :GST, :GSTAmount, :Total, :StaffId, :MasterId, :createdAt,:updatedAt)', {
            type: Sequelize.QueryTypes.INSERT,
            replacements: {
                ItemsCode: ItemsCode,
                ItemsName: ItemsName,
                BatchCode: BatchCode,
                Quantity: Quantity,
                UnitPrice: UnitPrice,
                MRP: MRP,
                TaxValue: TaxValue,
                GST: GST,
                GSTAmount: GSTAmount,
                Total: Total,
                StaffId: StaffId,
                MasterId: LastId,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });
    });

    res.status(200).json({ success: true, message: 'Profile Created successful' });
}

async function updateStoreBillInfo(req, res) {
    try {
        const { id } = req.params;
        const {
            BillDate,
            EWayBillNumber,
            DeliveryDate,
            CustomerName,
            CustomerPhoneNumber,
            Address,
            DeliveryAddress,
            TransactionMode,
            IsGST,
            Note,
            VehicalNumber,
            DeliveryCharges,
            TotalTaxableAmount,
            OutStanding,
            PaymentMode,
            Amount,
            RoundOff,
            GrandTotal,
            ProductItemsJson
        } = req.body;

        await sequelize.query(`
            UPDATE SaleBillDetails 
            SET BillDate = :BillDate,
                EWayBillNumber = :EWayBillNumber,
                DeliveryDate = :DeliveryDate,
                CustomerName = :CustomerName,
                CustomerPhoneNumber = :CustomerPhoneNumber,
                Address = :Address,
                DeliveryAddress = :DeliveryAddress,
                TransactionMode = :TransactionMode,
                IsGST = :IsGST,
                Note = :Note,
                VehicalNumber = :VehicalNumber,
                DeliveryCharges = :DeliveryCharges,
                TotalTaxableAmount = :TotalTaxableAmount,
                OutStanding = :OutStanding,
                PaymentMode = :PaymentMode,
                Amount = :Amount,
                RoundOff = :RoundOff,
                GrandTotal = :GrandTotal,
                updatedAt = :updatedAt
            WHERE Id = :id
        `, {
            replacements: {
                id: id,
                BillDate: BillDate,
                EWayBillNumber: EWayBillNumber,
                DeliveryDate: DeliveryDate,
                CustomerName: CustomerName,
                CustomerPhoneNumber: CustomerPhoneNumber,
                Address: Address,
                DeliveryAddress: DeliveryAddress,
                TransactionMode: TransactionMode,
                IsGST: IsGST,
                Note: Note,
                VehicalNumber: VehicalNumber,
                DeliveryCharges: DeliveryCharges,
                TotalTaxableAmount: TotalTaxableAmount,
                OutStanding: OutStanding,
                PaymentMode: PaymentMode,
                Amount: Amount,
                RoundOff: RoundOff,
                GrandTotal: GrandTotal,
                updatedAt: new Date()
            }
        });

        const productItems = JSON.parse(ProductItemsJson);
        await Promise.all(productItems.map(async (item) => {
            await sequelize.query(`
                UPDATE ItemsSaleDetails 
                SET ItemsCode = :ItemsCode,
                    ItemsName = :ItemsName,
                    BatchCode = :BatchCode,
                    Quantity = :Quantity,
                    UnitPrice = :UnitPrice,
                    MRP = :MRP,
                    TaxValue = :TaxValue,
                    GST = :GST,
                    GSTAmount = :GSTAmount,
                    Total = :Total,
                    StaffId = :StaffId,
                    updatedAt = :updatedAt
                WHERE MasterId = :id
            `, {
                replacements: {
                    id: id,
                    ...item,
                    updatedAt: new Date()
                }
            });
        }));

        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function getBillInfoDetails(req, res) {
    try {
        const { id } = req.params;

        const saleBillDetails = await sequelize.query(`
            SELECT * FROM SaleBillDetails WHERE id = :id
        `, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { id }
        });

        if (!saleBillDetails.length) {
            return res.status(404).json({ success: false, message: 'Sale bill not found' });
        }

        const itemsSaleDetails = await sequelize.query(`
            SELECT * FROM ItemsSaleDetails WHERE MasterId = :id
        `, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { id }
        });

        res.status(200).json({ success: true, saleBillDetails: saleBillDetails[0], itemsSaleDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function deleteStoreBillInfo(req, res) {
    try {
        const { id } = req.params; 

        await sequelize.query(`
            DELETE FROM SaleBillDetails WHERE id = :id
        `, {
            replacements: { id }
        });

        await sequelize.query(`
            DELETE FROM ItemsSaleDetails WHERE MasterId = :id
        `, {
            replacements: { id }
        });

        res.status(200).json({ success: true, message: 'Sale bill and associated items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports = { getstafflist, getSaleBillList, GetStoreBillInfo, updateStoreBillInfo, getBillInfoDetails, deleteStoreBillInfo };