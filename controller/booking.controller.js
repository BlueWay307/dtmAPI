import { sql, poolPromise } from "../db.js";

// Save or update Location
export const addEditBooking = async (req, res) => {
    try {
        const { ID, patienteName, phoneNo, email, address, remarks, Location, Service, Date, TimeSlap } = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }

        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("patienteName", sql.NVarChar(150), patienteName)
            .input("phoneNo", sql.NVarChar(150), phoneNo)
            .input("email", sql.NVarChar(150), email)
            .input("address", sql.NVarChar(250), address)
            .input("remarks", sql.NVarChar(150), remarks)
            .input("Location", sql.Int, Location)
            .input("Service", sql.Int, Service)
            .input("Date", sql.DateTime, Date)
            .input("TimeSlap", sql.NVarChar(250), TimeSlap)
            .execute("Sp_tblBooking_addEdit");

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

export const getAllBooking = async (req, res) => {
    try {
        const { tType, UserID } = req.query;

        const pool = await poolPromise;
        if (!pool) throw new Error("Database connection is not established");

        const result = await pool.request()
            .input("tType", sql.Int, parseInt(tType))
            .input("UserID", sql.Int, parseInt(UserID))
            .execute("Sp_tbltblBooking_List");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Error in getAll:", err);
        res.status(500).json({ message: err.message });
    }
};
