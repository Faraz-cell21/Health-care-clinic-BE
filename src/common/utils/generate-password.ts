import crypto from 'crypto';

export const generatePassword = ():string => {
    return crypto.randomBytes(8).toString('hex');
};