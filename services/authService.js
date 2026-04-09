const authModel=require('../models/authModel')
const bcrypt=require('bcrypt')

async function signUpUser(username,password){
const existingUser = await authModel.findUserByUsername(username);
if (existingUser) throw new Error("User already exists");

const hashedPassword = await bcrypt.hash(password, 10);
  return await authModel.createUser(username, hashedPassword);
}
module.exports = { signUpUser };