const { logError, db } = require("../util/helper");
const bcrypt = require('bcrypt');   // npm i bcrypt

exports.register = async (req, res) => {
    // res.json({
    //     body: req.body,
    // });
    // return;
    try {
        let password = req.body.password;
        password = bcrypt.hashSync(password, 10);   // Hash the password securely   // 123456, "t6264t26t4gyfyegygyg7y75374"
        let sql = "INSERT INTO user (role_id, name, username, password, is_active, create_by) " +
            "VALUES (:role_id, :name, :username, :password, :is_active, :create_by)";
        let data = await db.query(sql, {
            role_id: req.body.role_id,
            name: req.body.name,
            username: req.body.username,
            password: password,
            is_active: req.body.is_active,
            create_by: req.body.create_by,
        });
        res.json({
            data: data,
            message: "Register account created successfully!",
        });
    } catch (error) {
        logError("auth.register", error, res);
    }
};

exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;
        let sql = "SELECT * FROM user WHERE username=:username";
        let [data] = await db.query(sql, {
            username: username,
        });
        if (data.length == 0) {
            res.json({
                error: {
                    username: "Username doesn't exist!",
                }
            });
        } else {
            let dbPass = data[0].password;  // dbPass is the hashed password stored in the database
            let isCorrectPassword = bcrypt.compareSync(password, dbPass);   // password matches the hashed one (true | false)
            if (!isCorrectPassword) {
                res.json({
                    error: { password: 'Password incorrect!' }});
            } else {
                res.json({
                    message: "Login successfully!",
                    profile: data[0],  // user: data[0]
                })
            }
        }
    } catch (error) {
        logError("auth.login", error, res);
    }
};

exports.profile = async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM user WHERE id=:id", {
            id: req.body.id,
        });
        res.json({
            profile: data.length > 0 ? data[0] : null,
        });
    } catch (error) {
        logError("auth.profile", error, res);
    }
};