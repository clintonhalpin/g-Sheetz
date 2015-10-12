var development = {
    username: '',
    password: '',
    lrport: 9022,
    port: 3001,
    sheet: '',
    private_key_id: "",
    private_key: "",
    client_email: "",
    client_id: "",
}

var production = {
    username: '',
    password: '',
    lrport: 9022,
    port: 3001,
    sheet: '',
    private_key_id: "",
    private_key: "",
    client_email: "",
    client_id: "",
}

module.exports = process.env.NODE_ENV === 'development' ? development : production
