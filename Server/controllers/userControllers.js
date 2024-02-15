import uploadOnCloudinary from '../Utils/fileUpload.js';
import User from '../models/userModel.js';


const signUp = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        
        if(!req.file) throw new Error('Please upload an image');
        console.log(req.file);
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

        console.log(`File path: ${req.file.path}`);

        const uploadedImage = await uploadOnCloudinary(req.file.path);

        if(!uploadedImage) throw new Error("Error uploading image")

        console.log(uploadedImage);

        const newUser = new User({ // Create a new user instance
            username,
            email,
            password,
            avatar: {
                public_id: uploadedImage.public_id,
                secure_url: uploadedImage.secure_url
            }
        });

        await newUser.save();  // Save user to database

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

const deleteUser = async (req, res) => {
    try{
        let userId = req.user.id;
        let deletedUser = await User.findByIdAndDelete({_id:userId})
        res.status(200).json({
            deletedUser,
            message: "User deleted successfully",
        })
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const updateUser = (req, res) => {
    try{
        let {email, username, name} = req.body
        let userId = req.user.id;
        User.findByIdAndUpdate(userId, {email, username, name},{runValidators: true, new: true})

        res.status(200).json({
            message: "User updated successfully",
            status: true
        })
    }catch(err){
        res.status(400).json({
            message: err.message,
            status: flase
        })
    }
}

const userDetails = async (req, res) => {
    const userId = req.user.id
    try{
        const userDetails = await User.findById({_id: userId});
        res.status(200).json({
            message: "User Details Fetched Successfully",
            success:true,
            userDetails
        })
    }catch(err){
        res.status(400).json({
            message: err.message,
            success: false
        })
    }
}


export { signUp, signIn, signOut, deleteUser, updateUser, userDetails }