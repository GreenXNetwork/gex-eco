import { LOCALE_SET } from "./../actions/types";

export const setLocale = (lang) => ({
    type: LOCALE_SET,
    lang
})