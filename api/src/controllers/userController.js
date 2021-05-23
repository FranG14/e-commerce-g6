const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const secret = 'test';

//==========================================================================//
const login = async(req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    try {
        const oldUser = await User.findOne({email});
        if(!oldUser) return res.status(404).json({message : {message:"User doesn`t exist",style:"red"}});
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: {message:'Invalid Password', style:"red"}});
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '1hr'});
        res.status(201).json({result: oldUser,token, message:{message:"Log in Successful", style:"green"}});
    } catch(error){
        res.status(500).json({message:{message:'Something went wrong', style:"red"}});
        console.log(error);
    }
}
//==========================================================================//
const register = async(req,res) => {
    const {
        username,
        password,
        confirmPassword,
        email,
        firstname,
        lastname,
        phone,
        streetNumber,
        street,
        state,
        country,
        zipcode
    } = req.body;
    
    if(!req.body) res.status(403).end()

    if(password !== confirmPassword) return res.status(400).json({message: {message:'Passwords don`t match', style:"red"}})
    try{
        const oldUser = await User.findOne({email});
        if(oldUser) return res.status(400).json({ message:{message:'User already exists', style:"red"}});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            username,
            password: hashedPassword, 
            email,
            firstname,
            lastname,
            phone,
            streetNumber,
            street,
            state,
            country,
            zipcode,
            isAdmin:false
            }
        )
        const token = jwt.sign({email:result.email, id: result._id}, secret, {expiresIn: '1hr'} );
        res.status(201).json({ result, token, message:{message:"Registered Successfully", style:"green"}})
    } catch (error) {
        
        res.status(500).json({message:{message:"Something went wrong", style:"red"}}); 
    }
}
//==========================================================================//
const googleLogin = async(req, res) => {
    const {
        username,
        email,
        firstname,
        lastname
    } = req.body;

   
    if(!req.body){
        res.status(403).end();
    }
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '1hr'})
            return res.status(201).json({result: oldUser,token, message:{message:"Log in Successful", style:"green"}})
        } else {


            //return res.status(400).json({message:'In order to login with Google, you should register first'})
        
            //===============REGISTRO POR GOOGLE================//

            const result = await User.create({
                username,
                email,
                firstname,
                lastname,
                isFromGoogle: true
            })
            const token = jwt.sign({email:result.email, id: result._id}, secret, {expiresIn: '1hr'} );
            return res.status(201).json({ result, token, message:{message:"Registered with Google Successfully", style:"green"} })
        }
    } catch(error) {
        console.log("ERROR", error)
        return res.status(500).json({message:{message:"Something went wrong", style:'red'}});
    }
}
//==========================================================================//
const getUsers = async(req, res, next) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const keyword = req.query.keyword
    ?{
        email:{
            $regex: req.query.keyword,
            $options: "i"
        },
    }
    : {};

    const count = await User.countDocuments({ ...keyword});
    const users = await User.find({ ...keyword})
    //.populate("categories") => Revisar esto
    .limit(pageSize)
    .skip(pageSize * (page -1));

    res.json({ users, current: page, pages: Math.ceil(count / pageSize )});
};
//==========================================================================//
const updateUser = async(req,res) => {
    const {_id} = req.params;
    const {
    username,
    email,
    firstname,
    lastname,
    phone,
    streetNumber,
    street,
    state,
    country,
    zipcode
    } = req.body;

    //Chequear que el username y/o email nuevos no estén ya registrados
    const oldEmail = await User.findOne({$and:[{email: req.body.email}, {_id:{$ne:req.params._id}}]});
    if(oldEmail) return res.status(400).json({ message: {message:'E-mail already taken', style:"red"}});

    const oldUser = await User.findOne({$and:[{username: req.body.username}, {_id:{$ne:req.params._id}}]});
    if(oldUser) return res.status(400).json({ message: {message:'Username already taken', style:"red"}});

    const foundUser = User.findOne({_id}, function(error, userUpdated){
        if(error){
            return res.status(400).json({message:{message:"There was an Error", style:"red"}})
        }
        if(!userUpdated) return res.status(404).json({message:{message:"User Not Found", style:"red"}});

        else {
            userUpdated.username = username ? username : userUpdated.username;
            userUpdated.email = email ? email : userUpdated.email;
            userUpdated.firstname = firstname ? firstname : userUpdated.firstname;
            userUpdated.lastname = lastname ? lastname : userUpdated.lastname;
            userUpdated.phone = phone ? phone : userUpdated.phone;
            userUpdated.streetNumber = streetNumber ? streetNumber: userUpdated.streetNumber;
            userUpdated.street = street ? street : userUpdated.street;
            userUpdated.state = state ? state : userUpdated.state
            userUpdated.country = country ? country : userUpdated.country;
            userUpdated.zipcode = zipcode ? zipcode : userUpdated.zipcode;
            userUpdated.save(function(error){
                if(error){
                    return res.status(400).json({message:{message:"There was an Error in saving the change", style:"red"}})
                }
                res.status(200).json({userUpdated})
            })
        }
    });
}
//==========================================================================//
const deleteUser = async(req,res) => {
    const {_id} = req.params;

    const result = await User.remove({_id});
    const number = result.deletedCount;
    return res.status(200).json({message:{message:`${number} User Removed`, style:"green"}});
}
//==========================================================================//
const toggleAdmin = async(req, res) => {
    
    const {_id} = req.params;

    const userFound = await User.findOne({_id}, function(error, userToggled){
        if(error){
            return res.status(400).json({message:"There was an Error"})
        }
        if(!userToggled) return res.status(404).json({message:"User Not Found"})
        else {
            userToggled.isAdmin = !userToggled.isAdmin;
            userToggled.save(function(error) {
                if(error){
                    return res.status(400).json({message:"There was an Error in saving the change"})
                }
                res.status(200).json({userToggled})
            })
        }
    });
}
//==========================================================================//
const getUserById = async(req, res) => {
    const {_id} = req.params;
    const userFound = await User.findOne({_id});
    if(!userFound) return res.status(404).json({});
    return res.status(200).json({userFound});
}
//==========================================================================//
const changePassword = async(req,res) => {
    const {_id} = req.params;
    const { oldPassword, newPassword } = req.body;

    if(!oldPassword || !newPassword) return res.status(400).json({message:'Data Required Missing'})

    const userFound = await User.findOne({_id},
        async (error, userUpdated) =>{
            if(error){
                return res.status(400).json({message:"There was an Error"})
            }
            if(!userUpdated) return res.status(404).json({message:"User Not Found"})
            const isPasswordCorrect = await bcrypt.compare(oldPassword, userUpdated.password);
            if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid Password'});
            userUpdated.password = newPassword;
            userUpdated.password = await bcrypt.hash(userUpdated.password, 12);
            userUpdated.save(function(error){
                if(error){
                    return res.status(400).json(
                        {message:"There was an Error while saving the changes"}
                    )
                }
                //console.log(userUpdated)
                res.status(200).json(userUpdated)
            })
        }           
    )
}
//==========================================================================//
module.exports = { 
    login, 
    register, 
    googleLogin, 
    getUsers, 
    updateUser, 
    deleteUser, 
    toggleAdmin, 
    getUserById,
    changePassword 
    }
//==========================================================================//
