import { sql, poolPromise } from "../db.js";

export const addEditIVDrips = async (req, res) => {
    try {
        const { ID, ServiceID, DripName, Rates, Duration,  InActive} = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }

        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("ServiceID", sql.Numeric(18, 0), ServiceID)
            .input("DripName", sql.NVarChar(150), DripName)
            .input("Rates", sql.Numeric(18, 0), Rates)
            .input("Duration", sql.Numeric(18, 0), Duration)
            .input("InActive", sql.Bit, InActive)
            .execute("Sp_tblDripServices_addEdit");

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

export const getAllIVDrips = async (req, res) => {
    try {
        const { tType, UserID } = req.query;

        const pool = await poolPromise;
        if (!pool) throw new Error("Database connection is not established");

        const result = await pool.request()
            .input("tType", sql.Int, parseInt(tType))
            .input("UserID", sql.Int, parseInt(UserID))
            .execute("Sp_tbltblDripServices_List");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Error in getAll:", err);
        res.status(500).json({ message: err.message });
    }
};
