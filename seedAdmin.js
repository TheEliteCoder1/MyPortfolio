// seedAdmin.js
import dotenv from 'dotenv';
import connectDB from './config/db.js';   // Make sure this path is correct
import User from './models/user-model.js'; // Your exact model path

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      console.error("Admin credentials missing from .env");
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin account already exists in the database.');
      process.exit(0);
    }

    // Create the admin
    await User.create({
      name: 'Administrator',
      email: adminEmail,
      passwordHash: adminPasswordHash, // <-- Using your schema's exact field name
      role: 'admin'                    // <-- Setting the role we just added
    });

    console.log('Admin account seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();