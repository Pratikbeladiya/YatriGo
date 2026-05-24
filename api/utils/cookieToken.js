const cookieToken = (user, res) => {
    const token = user.getJwtToken();

    const cookieTime = parseInt(process.env.COOKIE_TIME, 10) || 7;

    const options = {
        expires: new Date(
            Date.now() + cookieTime * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // makes the token available only to backend
        secure: true,   // Only send over HTTPS
        sameSite: 'none' // Allow cross-origin requests
    };


    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = cookieToken;