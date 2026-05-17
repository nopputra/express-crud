const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
    try {
        const [list] = await db.query("SELECT * FROM category ORDER BY Id DESC");
        res.json({
            list: list,
        });
    } catch (error) {
        logError("category.getList", error, res);
    }
};

exports.create = async (req, res) => {
    try {
        const sql = "INSERT INTO category (Name, Country, Code) VALUES (:Name, :Country, :Code)";
        const [data] = await db.query(sql, {
            Name: req.body.Name,
            Country: req.body.Country,
            Code: req.body.Code,
        });
        res.json({
            data: data,
            message: "Category created successfully!",
        });
    } catch (error) {
        logError("category.create", error, res);
    }
};

exports.update = async (req, res) => {
    try {
        const sql = "UPDATE category SET Name=:Name, Country=:Country, Code=:Code WHERE Id=:Id";
        const [data] = await db.query(sql, {
            Id: req.body.Id,
            Name: req.body.Name,
            Country: req.body.Country,
            Code: req.body.Code,
        }); 
        res.json({
            data: data,
            message: "Category updated successfully!",
        });
    } catch (error) {
        logError("category.update", error, res);
    }
};

exports.remove = async (req, res) => {
    try {
        const sql = "DELETE FROM category WHERE Id=:Id";
        const [data] = await db.query(sql, {
            Id: req.body.Id, 
        });
        res.json({
            data: data,
            message: "Category deleted successfully!",
        })
    } catch (error) {
        logError("category.remove", error, res);
    }
};