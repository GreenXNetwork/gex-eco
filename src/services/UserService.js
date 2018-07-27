import Axios from "axios";

const UserService = {
    getAllUsers: function () {
        return Axios.get("/api/soldTokens");
    },
    getUser: function (id) {
        return Axios.get("/users/" + id);
    }
};

export default UserService;