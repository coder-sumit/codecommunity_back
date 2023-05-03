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
}

module.exports = CustomErrorHandler;