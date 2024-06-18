import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import helpers from 'handlebars-helpers';

// Initialize Handlebars helpers
const helperData = helpers({ handlebars: Handlebars });

const themeHelpers = {
    debug: function (value) {
        console.log(value);
    },
    section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
};

export default  {
    defaultLayout: 'default',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        ...helperData,
        ...themeHelpers

    }
}
