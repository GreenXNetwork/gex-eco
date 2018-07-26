import Axios from "axios";

const UserService = {
    getAllUsers: function () {
        return Axios.get("https://jsonplaceholder.typicode.com/users");
    },
    getUser: function (id) {
        return Axios.get("https://jsonplaceholder.typicode.com/users/" + id);
    }
};

export default UserService;