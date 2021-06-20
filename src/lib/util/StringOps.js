export const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

export const splitHyphen = string => string.split("-");

export const ucwords = string =>
    string instanceof Array ?
        string.map(s => ucfirst(s)).join(" ") :
        ucwords(string.split(" "))

export const ucHyphenatedWords = string => ucwords(splitHyphen(string));
