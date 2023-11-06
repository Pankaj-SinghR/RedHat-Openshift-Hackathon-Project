import axios from "axios"

export const getData = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// export const url = "http://localhost:8081"
export const url = window.location.origin
