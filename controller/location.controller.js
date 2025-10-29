import { sql, poolPromise } from "../db.js";

// Save or update Location
export const addEditLocation = async (req, res) => {
    try {
        const { ID, Name, Code, Latitude, Longitude, IsActive } = req.body;
        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ message: "Database connection is not established." });
        }

        const result = await pool.request()
            .input("ID", sql.Numeric(18, 0), ID || 0)
            .input("Name", sql.NVarChar(150), Name)
            .input("Code", sql.NVarChar(150), Code)
            .input("Latitude", sql.Decimal(18, 7), Latitude)
            .input("Longitude", sql.Decimal(18, 7), Longitude)
            .input("IsActive", sql.Bit, IsActive)
            .execute("Sp_tblLocations_addEdit");

        const data = result.recordset?.[0];
        res.status(200).json({
            success: true,
            message: data?.Message || "Operation successful",
            data,
        });

    } catch (error) {
        console.error("❌ Error in addEditLocation:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getAllLocation = async (req, res) => {
  try {
    const { tType, UserID } = req.query;

    const pool = await poolPromise;
    if (!pool) throw new Error("Database connection is not established");

    const result = await pool.request()
      .input("tType", sql.Int, parseInt(tType))
      .input("UserID", sql.Int, parseInt(UserID))
      .execute("Sp_tbltblLocations_List");

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error in getAll:", err);
    res.status(500).json({ message: err.message });
  }
};
