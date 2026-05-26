const messageValidation = (payload) => {

    if (!payload.message) {
        return {
            isValid: false,
            error: 'Message không được rỗng'
        };
    }

    if (typeof payload.message !== 'string') {
        return {
            isValid: false,
            error: 'Message phải là string'
        };
    }

    if (payload.message.length > 500) {
        return {
            isValid: false,
            error: 'Message quá dài'
        };
    }
    return {
        isValid: true
    };
};

module.exports = messageValidation;