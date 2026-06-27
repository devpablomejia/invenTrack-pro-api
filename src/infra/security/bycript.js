import bcrypt from 'bcryptjs'; 

export const encodePassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const isMatch = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};
