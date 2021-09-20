export function parse(data) {
    try {
        JSON.parse(data);
    } catch (error) {
        console.log("Error parsing expected Json data: ", error);
        return;
    }
}
