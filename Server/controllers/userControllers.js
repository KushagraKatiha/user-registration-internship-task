import User from '../models/userModel.js';

const signUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) { // Check if password and confirm password match
            throw new Error('Password and Confirm Password do not match');
        }

        if(!username || !email || !password || !confirmPassword){  // Check if all fields are filled
            throw new Error('All the fields are required');
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {   // If user exists, throw an error
            throw new Error('User already exists');
        }

        User.save({ username, email, password });  // Save user to database

        res.status(201).json({ message: 'User created successfully' });  // Send success message

    } catch (error) {
        res.status(400).json({ message: error.message });  // Send error message
    }
}

const signIn = async (req, res) => {
      try{
        const {email, password} = req.body;

        if(!email || !password){ // Check if all fields are filled
            throw new Error('All fields are required');
        }

        const user = await User.findOne({ email }).select('+password');  // Find user by email

        if(!user){  // If user does not exist, throw an error
            throw new Error('Invalid email or password');
        }else{  // If user exists, check if password is correct

            const isMatch = await user.matchPassword(password);  // Check if password is correct

            if(!isMatch){  // If password is incorrect, throw an error
                throw new Error('Invalid email or password');
            }else{  // If password is correct, send token
                const token = user.getSignedToken();
                // Set token into cookies

                const cookieOptions = {
                    expires: 24*60*60*1000,
                    httpOnly: true
                }

                res.cookie('token', token, cookieOptions);
            }
        }

        res.status(200).json({
            message: 'User signed in successfully',
            token
        })
      }catch(error){
          res.status(400).json({ message: error.message });
      }
}

const signOut = async (req, res) => {
    try{
        if(!res.cookie.token){
            throw new Error('No Cookies Found')
        }
        res.cookie('token', null, {
            expires: new Date(),
            httpOnly: true
        })

    }catch(err){
        res.status(400).json({
            message: err.message
        })}
    }

const deleteUser = (req, res) => {

}

const updateUser = (req, res) => {

}

export { signUp, signIn, signOut, deleteUser, updateUser }