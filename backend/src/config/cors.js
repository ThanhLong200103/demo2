const corsReact = {
    origin:[ 'http://localhost:5173 ' ,'http://localhost:5174'],      // domain frontend
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,                     // cho phép gửi cookie
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsReact;