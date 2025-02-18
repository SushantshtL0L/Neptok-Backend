const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Get all users with pagination
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Defaults to page 1 and 10 results per page
    const users = await User.findAll({
      attributes: ['id', 'name'],
      limit: limit,
      offset: (page - 1) * limit
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create a new user
  const addUser = async (req, res) => {
    try {
      const { name, password, confirmPassword } = req.body;
  
      // Validate input
      if (!name || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Name, password, and confirmPassword are required' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Check if the username already exists
      const existingUser = await User.findOne({ where: { name } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user in the database
      const newUser = await User.create({
        name,
        password: hashedPassword
      });
  
      // Respond with the created user details (excluding password)
      res.status(201).json({
        status: 'User created successfully',
        data: {
          id: newUser.id,
          name: newUser.name,
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  };
  

  const login = async(req, res) =>{
    const {name, password} = req.body;
     //validate username and password
    if(!name || !password){
        return res.status(400).json({
            error: "Please Insert username and password"
        })
    }
    try{
        const user = await User.findOne({where: {name}})
        if(!user){
            return res.status(400).json({
                error: "New user required"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                error: "Insert proper password!!!!"
            })
        }
        const token = jwt.sign(
            {id: user.username, username: user.name},
            process.env.JWT_SECRET || 'FVHJAFJHSFVBSFBSSFJSF',
            {expiresIn: '24h'}

        )
        res.status(200).json({message: "Successfully Logged in", token},
            

        )
    }
    catch(error){
        res.status(500).json({error: "Something went Wrong"});
        console.log(error)
    
    }

}
module.exports = { getAllUsers, addUser,login };
