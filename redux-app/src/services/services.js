const _apiBase = 'http://localhost:3000';

export const getResource = async (url) => {
    const res = await fetch(`${_apiBase}${url}`);

    if (!res.ok) {
        throw new Error(res.status)
    }
    return await res.json();
}

export const postResource = async (url, data) => {
    await fetch(`${_apiBase}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const transform = (arr) => {
    let newArr = [];
    arr.map((item, index) => {
        return newArr[index] = {const: item.const, id: item.id}
    });
    return newArr;
}