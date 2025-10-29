import { sql, poolPromise } from "../db.js";

export const addEditContactUs = async (req, res) => {
    try {
        const { ID, Name, Phone, Email, Subject, Massage } = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }
        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("Name", sql.NVarChar(150), Name)
            .input("Phone", sql.NVarChar(150), Phone)
            .input("Email", sql.NVarChar(150), Email)
            .input("Subject", sql.NVarChar(250), Subject)
            .input("Massage", sql.NVarChar(250), Massage)
            .execute("Sp_tblContactUs_addEdit");

        const data = result.recordset?.[0];
        res.status(200).json({
            success: true,
            message: data?.Message || "Operation successful",
            data,
        });

    } catch (error) {
        console.error("❌ Error in addEditServices:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getAllContactUs = async (req, res) => {
    try {
        const { tType, UserID } = req.query;

        const pool = await poolPromise;
        if (!pool) throw new Error("Database connection is not established");

        const result = await pool.request()
            .input("tType", sql.Int, parseInt(tType))
            .input("UserID", sql.Int, parseInt(UserID))
            .execute("Sp_tbltblContactUs_List");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Error in getAll:", err);
        res.status(500).json({ message: err.message });
    }
};
