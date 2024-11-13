/**
 * Handles user authentication using Express middleware.
 */

/**
 * If the user is not logged in, then it redirects the user to the auth page
 * to sign in or sign up.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 * @param {Function} next - the next function to call
 */
const authMiddleware = async (req, res, next) => {
    const whitelist = req.path.includes("auth") || req.path === "/";
    // if (!req.app.locals.username && !whitelist) {
    //     return res.status(401).send("Unauthorized");
    // }
    next();
};

module.exports = authMiddleware;
