const logoutController = {};

logoutController.logout = async (req, res) => {
    res.clearCookie("authToken")

    return res.json({message: "Se te cerro sesión rey"});
};

export default logoutController;