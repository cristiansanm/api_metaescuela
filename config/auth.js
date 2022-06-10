module.exports={
    secret: process.env.auth_secret || "autentificacion",
    expires: process.env.auth_expires || "24h",
    rounds: process.env.auth_rounds || 10
}