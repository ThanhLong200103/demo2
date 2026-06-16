const corsReact = {
    origin:[ 'http://localhost:5173','http://localhost:5174','https://torano-weld.vercel.app','https://admin-torano.vercel.app'],      // domain frontend
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,                     // cho phép gửi cookie
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsReact;