import 'dotenv/config';

export default () => {
    
    if (!process.env.JWT_PRIVATE_KEY) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }

    if (!process.env.DB_URL) {
        console.error('FATAL ERROR: DB_URL is not defined.');
        process.exit(1);
    }
};