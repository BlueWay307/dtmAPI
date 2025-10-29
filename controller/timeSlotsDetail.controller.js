import { sql, poolPromise } from "../db.js";

export const addEditTimeSlotsDetail = async (req, res) => {
    try {
        const { ID, FkTime, Days, Times } = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }
        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("FkTime", sql.Numeric(18, 0), FkTime)
            .input("Days", sql.NVarChar(150), Days)
            .input("Times", sql.NVarChar(150), Times)
            .execute("Sp_tblTimeSlotsDetail_addEdit");

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

export const getAllTimeSlotsDetail = async (req, res) => {
    try {
        const { tType, UserID } = req.query;

        const pool = await poolPromise;
        if (!pool) throw new Error("Database connection is not established");

        const result = await pool.request()
            .input("tType", sql.Int, parseInt(tType))
            .input("UserID", sql.Int, parseInt(UserID))
            .execute("Sp_tblTimeSlotsDetail_List");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Error in getAll:", err);
        res.status(500).json({ message: err.message });
    }
};
