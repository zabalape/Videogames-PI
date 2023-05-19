const {User} = require('../../db');
 

const getAllUsers = async () =>{
        return await User.findAll();
    }


const setUsName = async (name, newName) =>{
    const user = await getUsByName(name);
    user.name = newName;
    await user.save();
}

const setPassName = async (name, newPass) =>{
    const user = await getUsByName(name);
    user.password = newPass;
    await user.save();
}

const deleteUser = async (userId) => {
  const user = await User.findByPk(userId); 
  if (!user) {
    throw new Error(`El usuario con ID ${userId} no existe.`);
  }
  return user.destroy(); 
};


const createUser = async (name, pass) => {
  const user = await User.create({
    name,
    password: pass
  });
  return user;
};

module.exports = {
    getAllUsers,
    setUsName,
    setPassName,
    deleteUser,
    createUser
}
