
export default {
    
    isProduction: () => {
        return process.env.NODE_ENV.trim() === "production" ? true : false;
    },
    apiPort: () => {
        return parseInt(process.env["API_PORT"]);
    },
    mysqlHost: () => {
        return process.env.DB_HOST;
    },
    mysqlPort: () => {
        return process.env.DB_PORT;
    },
    mysqlDBName: () => {
        return process.env.DB_NAME;
    },
    mysqlUsername:()=>{
        return process.env.DB_USERNAME;
    },
    mysqlPassword: ()=>{
        return process.env.DB_PASSWORD;
    },
    firebaseDbRef:()=>{
        return process.env.FIREBASE_DB_REF;
    },
    jwtSecret:()=>{
        return process.env.JWT_SECRET;
    },
    webtokenSecretRefresh:()=>{
        return process.env.WEBTOKEN_SECRETKEY_REFRESHKEY;
    },
    webtokenSecretAccess:()=>{
        return process.env.WEBTOKEN_SECRETKEY_ACCESSKEY;
    },
    accessTokenExpire:()=>{
        return process.env.ACCESS_TOKEN_EXPIRE;
    }


}