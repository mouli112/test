const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser, 
    getallUser, 
    getUser, 
    deleteUser, 
    updateUser, 
    handleRefreshToken, 
    logout

} = require('../controller/userCtrl');
const {authMiddleware} = require('../middlewares/authMiddleware');

router.post("/register", createUser);

router.post("/login", loginUser);
router.get("/all-users",getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout",logout);

router.put("/edit-user", authMiddleware, updateUser);
router.get("/:id",authMiddleware,getUser);
router.delete("/:id",deleteUser);

module.exports = router;