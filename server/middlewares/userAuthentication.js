const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userAuthentication = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Token not found' })
        }

        // Verify JWT token
        const decodedData = jwt.verify(token, `3frbhfu848989333$$4$%^&&%$@#%&*((*&T^$$))`)
        const _id = decodedData._id

        // Fetch user from DB using the decoded _id
        const userDetails = await User.findById(_id)

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // Attach user details to the request object
        req.user = userDetails

        return next()

    } catch (error) {
        console.error('Error in userAuthentication middleware: ', error)

        if (error instanceof jwt.JsonWebTokenError) {
            // JWT-related errors (e.g., invalid token or expired)
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' })
        }

        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ success: false, message: 'Internal server error: Connection reset' })
        }

        // General error handling
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    userAuthentication
};
