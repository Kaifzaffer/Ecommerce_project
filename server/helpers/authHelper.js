import bcrypt from 'bcrypt';

export  const HashPassword = async (password) => {
 try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
 }
 catch(error){
    console.log(error); 
 }
}

export const ComparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}