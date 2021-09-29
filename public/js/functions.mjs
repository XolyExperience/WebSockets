// Parse data
export function parse(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.log("Error parsing expected Json data: ", error);
        return;
    }
}

// Function to add new messages
export function addMessage(user, message, date) {
    // Validate

    // Template message
    let tpl = document.querySelector("#message").cloneNode(true);
    tpl = tpl.content;
    tpl.querySelector("span").textContent = user;
    tpl.querySelector("p").textContent = message;
    tpl.querySelector("time").textContent = formatDate(date);
    tpl.querySelector("time").setAttribute("datetime", date.toISOString());
    // console.log("tpl", tpl);

    // Return
    return document.body.querySelector("#conversation").append(tpl);
}

// Function to return date in HH:MM:SS
export function formatDate(date) {
    // Validate
    if (date instanceof Date !== true) {
        return "";
    }
    // Formate date
    // Hours
    let hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    // Minutes
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // Seconds
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // Return
    return `${hours}:${minutes}:${seconds}`;
}
