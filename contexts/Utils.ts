export const getFormData = (el: string) => {
    const form = document.querySelector(el) as HTMLFormElement;
    const data = new FormData(form);
    
    const obj: {[key: string]: FormDataEntryValue} = {};
    for (const i of data.entries()) {
        obj[i[0]] = i[1];
    }
    return obj;
};
