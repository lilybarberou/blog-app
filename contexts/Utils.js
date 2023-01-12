export const getFormData = (el) => {
    const form = document.querySelector(el);
    const data = new FormData(form);

    const obj = {};
    for (const i of data.entries()) {
        obj[i[0]] = i[1];
    }
    return obj;
};
