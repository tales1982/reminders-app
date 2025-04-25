// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "reminders-backend",
        script: "dist/index.js",
        env: {
          NODE_ENV: "production",
          PORT: 4000,
          FRONTEND_URL: "https://reminders-app-sage.vercel.app/", // ou seu domínio real
          JWT_SECRET: "95b5688c7cc9dce7c52407e4f7957046ac2fc5a5d047e19db5381ff9ab095e31352d3761879c6fcd0046f6f9fbae10f39f0d7ac872fd6e6b826c85ff433d6608",
          DATABASE_URL: "postgresql://tales:Theo22Thomas22@94.130.57.47:5432/remindersDB?sslmode=disable",
          EMAIL_USER: "tales.lima.1982@gmail.com",
          EMAIL_PASS: "vrxl syao obju pzyc",
          WHATSAPP_API_KEY: "9375180",
        },
      },
    ],
  };
  