class CustomErrorHandler{
    constructor(status_code, msg){
        this.status_code = status_code,
        this.message = msg
    }

    static alreadyExists(message){
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message= "Username or Password is Wrong"){
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message = "unAuthorized"){
        return new CustomErrorHandler(401, message);
    }

    static invalidInput(message = "invalid input"){
        return new CustomErrorHandler(403, message);
    }
}

module.exports = CustomErrorHandler;