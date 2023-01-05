const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { listRolesPermission } = require('../helper/roles-permission');

exports.Signup = async (req, res) => {
    try {
        const { email, password, full_name } = req.body;
        const roleId = 1;
        const createdBy = 'system';
        const updatedBy = 'system';
    
        //generate hash salt for password
        const salt = await bcrypt.genSalt(12);

        //generate the hashed version of users password
        const hashed_password = await bcrypt.hash(password, salt);

        const user = await prisma.users.create({
            data: {
                roleId,
                email,
                fullName: full_name,
                salt,
                password: hashed_password,
                createdBy,
                updatedBy,
            }
        });
        if (user) {
            res.status(201).json({ message: "new user created!" });
        }
    } catch (e) {
        console.log(e);
    }
};

exports.HomePage = async (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }

    const userInfo = req.user;
    let getRoles = {
        'status': false, 
        'statusCode': 404,
        'message': 'Get data unsecesfully',
        'data': []
    };
    getRoles = await listRolesPermission(userInfo.roleUuid);

    let str = req.user.fullName;
    let matches = str.match(/\b(\w)/g);
    let acronymFullName = matches.join('');
    
    res.render("index", {
        sessionID: req.sessionID,
        sessionExpireTime: new Date(req.session.cookie.expires) - new Date(),
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        pageTitle: 'Home',
        acronymFullName,
        userInfo,
        getRoles,
    });
};

exports.LoginPage = async (req, res) => {
    res.render("auth/signin");
};

exports.registerPage = async (req, res) => {
    res.render("auth/register");
};

exports.Logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
};