const SUBSTITUTION = /{([^{]+)}/g;

const dictionary = {
    appTitle: 'Romania Loves Camping',
    landingPageSubtitle: 'Welcome to Romania Loves Camping'
};

function uncamelize(str, separator) {
    if (typeof (separator) == 'undefined') {
        separator = ' ';
    }
    const modifiedStr = str.replace(/[A-Z]/g, function (letter) {
        return separator + letter;
    });
    // Remove first separator
    return modifiedStr.replace('/^' + separator + '/', '');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const LABELS = new Proxy(dictionary, {
    get: function (target, property) {
        return property in target ? target[property] : capitalizeFirstLetter(uncamelize(property));
    },
});

function formatLabel(label, variables) {
    let template = LABELS[label];
    return template.replace(SUBSTITUTION, function (_unused, varName) {
        return variables[varName];
    });
}

export {LABELS, formatLabel};