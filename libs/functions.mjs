export function parse(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.log("Error parsing expected Json data: ", error);
        return;
    }
}
