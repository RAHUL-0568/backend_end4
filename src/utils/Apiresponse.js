class ApiResponse {
    constructor(statuscode,data,message="succes"){
        rhis.statuscode=statuscode
        this.data=data
        this.message=message
        this.succces=statuscode < 400
    }
}