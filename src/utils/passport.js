const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports.passportConfig = () => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            async (email, password, done) => {
                const user = await prisma.users.findUnique({
                    where: { 
                        email: email 
                    },
                    select: {
                        id: true,
                        uuid: true,
                        fullName: true,
                        role: {
                          select: {
                            id: true,
                            uuid: true,
                            roleName: true,
                          },
                        },
                        salt: true,
                        password: true,
                     }
                })

                if (!user) {
                    return done(null, false, { message: "Invalid credentials.\n" });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: "Invalid credentials.\n" });
                }
                return done(null, user);      
            }
        )
    );

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { id: user.id, uuid: user.uuid, fullName: user.fullName, roleId: user.roleId, roleUuid:user.role.uuid, roleName: user.role.roleName });
        });
    });
      
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
    });
};