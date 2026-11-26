// seedAdmin.js
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // or 'bcrypt' depending on what I use in my controllers
import connectDB from './config/db.js';
import User from './models/user-model.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPlainPassword = process.env.ADMIN_PASSWORD; // Use plain text now

    if (!adminEmail || !adminPlainPassword) {
      console.error("Admin credentials missing from .env (ADMIN_EMAIL or ADMIN_PASSWORD)");
      process.exit(1);
    }

    // 1. Hash the plain text password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPlainPassword, salt);

    // 2. Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // 3. OVERWRITE the broken password if the user exists
      existingAdmin.passwordHash = hashedPassword;
      await existingAdmin.save();
      console.log('Admin password updated successfully in the database!');
      process.exit(0);
    }

    // 4. Create the admin if they don't exist
    await User.create({
      name: 'Administrator',
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'admin'
    });

    console.log('Admin account seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();