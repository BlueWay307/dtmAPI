import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import locationRoutes from './route/location.route.js';
import serviceRoutes from './route/service.route.js';
import bookingRoutes from './route/booking.route.js';
import paymentRoutes from './route/payment.route.js';
import contactUs from './route/contactUs.route.js';
import timeSlots from './route/timeSlots.route.js';
import timeSlotsDetail from './route/timeSlotsDetail.route.js';
import ivDrips from './route/ivDrip.route.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/locations", locationRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contactus", contactUs);
app.use("/api/timeSlots", timeSlots);
app.use("/api/timeSlotsDetail", timeSlotsDetail);
app.use("/api/ivDrips", ivDrips);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
