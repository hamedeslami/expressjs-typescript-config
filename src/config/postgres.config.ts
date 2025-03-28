import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true, // Force SSL connection
      rejectUnauthorized: false, // Set to true for stricter SSL validation
    },
    clientMinMessages: "notice",
  },
});


sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ alter: true });
    console.log("✅ Connect to PostgreSQL Successfully.");
  })
  .catch((error) => {
    console.log("❌ Field connect to PostgreSQL, error: ", error?.message);
  });
