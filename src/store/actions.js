import axios from "axios";

export default {
    async profile({
        commit
    }) {
        const profile = await axios.get("/api/profile");
        commit("profile", profile.data.user);
    }
}