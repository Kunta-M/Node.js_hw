module.exports = {
    authorizationController: (req, res) => {
        try {
            res.json(req.data);
        } catch (e) {
            res.json(e.message);
        }
    }
};
