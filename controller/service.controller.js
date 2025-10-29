import { sql, poolPromise } from "../db.js";

// Save or update Location
export const addEditServices = async (req, res) => {
    try {
        const { ID, ServiceName, Rates, Duration, InActive, HomeRates } = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }

        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("ServiceName", sql.NVarChar(150), ServiceName)
            .input("Rates", sql.Numeric(18, 0), Rates)
            .input("Duration", sql.Numeric(18, 0), Duration)
            .input("InActive", sql.Bit, InActive)
            .input("HomeRates", sql.Numeric(18, 0), HomeRates)
            .execute("Sp_tblServices_addEdit");

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

export const getAllServices = async (req, res) => {
    try {
        const { tType, UserID } = req.query;

        const pool = await poolPromise;
        if (!pool) throw new Error("Database connection is not established");

        const result = await pool.request()
            .input("tType", sql.Int, parseInt(tType))
            .input("UserID", sql.Int, parseInt(UserID))
            .execute("Sp_tbltblServices_List");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Error in getAll:", err);
        res.status(500).json({ message: err.message });
    }
};
