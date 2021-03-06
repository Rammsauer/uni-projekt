import { Config } from '../src/types';

export const config: Config = {
    host: '0.0.0.0',
    port: 0,
    ssl: {
        enabled: false,
        cert: null,
        key: null
    },
    database: {
        host: 'mariadb',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ak18b',
        prefix: 'ak18b_'
    },
    mailer: {
        service: 'gmail',
        secure: false,
        port: 25,
        user: 'betterNotYourPrivateGmailAccount@gmail.com',
        pass: 'passForThisAccount',
        tlsRejectUnauthorized: false
    }
};
