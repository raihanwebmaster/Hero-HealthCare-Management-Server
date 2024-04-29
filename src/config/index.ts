import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.join(process.cwd(), ".evn")})

export default {
    env: process.env.NODE_ENV,
    port : process.env.PORT,
    reset_pass_link: process.env.RESET_PASS_LINK,
    jwt : {
        jwt_secret: process.env.JWT_SECRET,
        expire_in: process.env.EXPIRE_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expire_in: process.env.REFRSH_TOKEN_EXPIRE_IN,
        reset_pass_secret: process.env.RESET_PASS_SECERT_TOKEN,
        reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRE_IN,
    },
    emailSender: {
        email: process.env.EMAIL,
        app_pass: process.env.APP_PASS
    },
    ssl: {
        storeId: process.env.STORE_ID,
        storePass: process.env.STORE_PASS,
        successUrl: process.env.SUCCESS_URL,
        cancelUrl: process.env.CANCEL_URL,
        failUrl: process.env.FAIL_URL,
        sslPaymentApi: process.env.SSL_PAYMENT_API,
        sslValidationApi: process.env.SSL_VALIDATIOIN_API
    }
}