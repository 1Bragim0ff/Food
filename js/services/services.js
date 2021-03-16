export function addZeroToNumber(number) {
    if(number <= 9) {
        return `0${number}`;
    }
    return number;
}

export async function getJSON(url) {
    const response = await fetch(url);
    return response.json();
}

export async function postJSON(url, body) {
    const response = await fetch(url, {
        method: "POST",
        body: body,
    });
    console.log(await response.text());
}