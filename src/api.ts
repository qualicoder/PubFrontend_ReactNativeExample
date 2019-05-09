import AsyncStorage from '@react-native-community/async-storage';

const API_BASE_URL = "http://192.168.1.208:8080";

const commonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const call = async (method: Method, url: string, body?: object) => {

    console.log(`call: ${method} ${url}`);
    if (body) {
        console.log(`body: ${JSON.stringify(body, null, 2)}`);
    }

    const userId = await AsyncStorage.getItem("userId");

    const headers =
        userId ? {...commonHeaders, "UserId": `${userId}`} : commonHeaders;

    const response = await fetch(`${API_BASE_URL}/${url}`,
        {
        method,
        body: body ? JSON.stringify(body) : "",
        headers: headers
        }
        );

    const text = await response.text();
    console.log(`response body: ${JSON.stringify(JSON.parse(text), null, 2)}`);

    if (response.ok) {
        return JSON.parse(text);
    }

    throw new Error(`The status is ${response.status}: ${response.statusText}`)
};

const login = (username: string) => call("POST", `login`, {username});
const fetchBeverages = () => call("GET", `beverages`);
const addBeverage = (beverageTypeId: number) => call("POST", `beverages`, {beverageTypeId});

export default {
    login,
    fetchBeverages,
    addBeverage
};
