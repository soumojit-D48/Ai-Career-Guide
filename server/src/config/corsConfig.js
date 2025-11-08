
// helper function for cors config
function cofigureCors() {
    return ({
        origin: (origin, callBack) => {
            const allowOrigins = [
                'http://localhost:5173', // dev
                // 'https://eco-quest-7p8q.onrender.com', // production domain
            ]

            if(!origin || allowOrigins.indexOf(origin) !== -1){
                callBack(null, true)
            } else {
                callBack(new Error('not allowed by cors'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders: ['X-Total-Count', 'Content-Range'],
        credentials: true,
        preflightContinue: false,
        maxAge: 600,
        optionsSuccessStatus: 204
    })
}

export default cofigureCors