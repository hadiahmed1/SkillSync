export const handleAsync = (fn) => {
    return async (request, h) => {
        try {
            return await fn(request, h);
        } catch (err) {
            if (err.isBoom) throw err;
            return h.response({
                statusCode: err.statusCode || 400,
                error: 'Bad Request',
                message: err.message || 'Something went wrong',
            }).code(err.statusCode || 400);
        }
    };
};
