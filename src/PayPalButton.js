if ("undefined" === typeof paypal || "undefined" === typeof paypal.button || "undefined" === typeof paypal.button.create) {
    var err = "`paypal` global object not found or incompatible. Make sure the https://www.paypalobjects.com/api/button.js is loaded.";
    if (console) {
        console.error(err);
    } else {
        throw new err;
    }
}

/**
 * Wrapper class that allows to create PayPal buttons dynamically using the JavaScriptButtons
 * 
 * @see https://github.com/paypal/JavaScriptButtons
 * 
 * @returns The button object
 */
function PayPalButton() {
    return this;
}

/**
 * Makes sure the value is within a specified range
 * 
 * @param val
 *            The value to sanitize
 * @param array
 *            The range to check against
 * @param default_val
 *            The default value in case val is not within array
 * @return Returns the sanitized value
 */
PayPalButton.prototype.sanitizeValue = function(val, array, default_val) {
    if (array.indexOf(val) > -1) {
        return val;
    }

    return default_val;
};

/**
 * Normalize the given input data by returning a self-contained object
 * 
 * @param label
 * @param show_icon
 * @para locale
 * @param disabled
 * 
 * @return Returns the normalized object
 */
PayPalButton.prototype.normalizeData = function(id, type, label, show_icon, locale, disabled) {
    // hack: \x7F introduces an invisible character that indent downwards the caption a little bit
    if (!(label.length && label.replace(PayPalButton.prototype.DEFAULT_LABEL, "").length)) {
        label = "\x7F" + label;
    }

    return {
        lc : locale,
        label : label + (show_icon ? PayPalButton.prototype.DEFAULT_LABEL : ""),
        disabled : disabled ? "true" : "false",
        button_type : type,
        id : id
    };
};

/**
 * Normalize the given input config by returning a self-contained object
 * 
 * @param size
 * @param shape
 * 
 * @return Returns the normalized object
 */
PayPalButton.prototype.normalizeConfig = function(size, shape) {
    return {
        type : "button",// fixed
        size : size,
        shape : shape
    };
};

/**
 * Generate a PayPal button for the given data and configuration
 * 
 * @param data
 *            The PayPal data
 * @param config
 *            The PayPal configuration
 * @param parent_selector
 *            A valid CSS selector. When specified append the resulted button to that parent element.
 * @return Returns the PayPal button object
 */
PayPalButton.prototype.factory = function(data, config, parent_selector) {

    // a POSIX valid locale tag (eg. sv_SE, en_US, de_DE, etc)
    data.lc = data.lc || PayPalButton.prototype.DEFAULT_LOCALE;

    // a string, eventually using the {wordmark} tag
    data.label = data.label || PayPalButton.prototype.DEFAULT_LABEL;

    if (data.color) {
        data.color = PayPalButton.prototype.sanitizeValue(data.color, PayPalButton.prototype.COLORS,
                PayPalButton.prototype.DEFAULT_COLOR);
    }

    if ("undefined" !== typeof data.disabled) {
        data.button_disabled = PayPalButton.prototype.sanitizeValue(data.disabled, PayPalButton.prototype.BOOL,
                PayPalButton.prototype.BOOL[0]);
    }

    // fixed value (however,if `checkout` is used then the button will be a submit form-like)
    config.type = PayPalButton.prototype.sanitizeValue(config.type, [ "button" ], "button");
    data.button_type = config.type;

    if (config.label) {
        config.label = PayPalButton.prototype.sanitizeValue(config.label, PayPalButton.prototype.TYPES,
                PayPalButton.prototype.TYPES[0]);
    }

    if (config.size) {
        config.size = PayPalButton.prototype.sanitizeValue(config.size, PayPalButton.prototype.SIZES,
                PayPalButton.prototype.DEFAULT_SIZE);
    }

    if (config.shape) {
        config.shape = PayPalButton.prototype.sanitizeValue(config.shape, PayPalButton.prototype.SHAPES,
                PayPalButton.prototype.DEFAULT_SHAPE);
    }

    if (config.style) {
        config.style = PayPalButton.prototype.sanitizeValue(config.style, PayPalButton.prototype.STYLES,
                PayPalButton.prototype.DEFAULT_STYLE);
    }

    // see function factory (https://www.paypalobjects.com/api/button.js)
    return paypal.button.create(true, data, config, document.querySelector(parent_selector));

};

/**
 * Genererates a PayPal Checkout button for the given parameters
 * 
 * @param parent_selector
 *            A valid CSS selector. When specified append the resulted button to that parent element.
 * @param id
 *            The button Id attribute
 * @param size
 *            The predefined size of the button ("tiny", "small", "medium", "large")
 * @param shape
 *            The predefined shape of the button ("pill", "rect")
 * @param color
 *            The predefined color of the button ("blue", "silver", "gold")
 * @param label
 *            Optionally a caption for the button.
 * @param show_icon
 *            When true display the PayPal logo on button
 * @param tagline
 *            When true show a PayPal tagline under the button
 * @param locale
 *            The POSIX locale for the automatic PayPal captions
 * @param disabled
 *            When true the button is generated with disabled style
 * @param type
 *            One of the predefined PayPal buttons type ("checkout", "credit"). Default "checkout".
 * @return Returns the generated PayPal button object
 */
PayPalButton.prototype.createCheckoutButton = function(parent_selector, id, size, shape, color, label, show_icon, tagline,
        locale, disabled, type) {
    var data = PayPalButton.prototype.normalizeData(id, PayPalButton.prototype.DEFAULT_BUTTON_TYPE, label, show_icon, locale,
            disabled);
    data.color = color;
    data.tagline = tagline ? "true" : "false";

    var config = PayPalButton.prototype.normalizeConfig(size, shape);
    config.label = PayPalButton.prototype.sanitizeValue(type, PayPalButton.prototype.TYPES,
            PayPalButton.prototype.DEFAULT_TYPE);

    return PayPalButton.prototype.factory(data, config, parent_selector);
};

/**
 * Genererates a PayPal Credit button for the given parameters
 * 
 * @param parent_selector
 *            A valid CSS selector. When specified append the resulted button to that parent element.
 * @param id
 *            The button Id attribute
 * @param size
 *            The predefined size of the button ("tiny", "small", "medium", "large")
 * @param shape
 *            The predefined shape of the button ("pill", "rect")
 * @param label
 *            Optionally a caption for the button.
 * @param show_icon
 *            When true display the PayPal logo on button
 * @param tagline
 *            When true show a PayPal tagline under the button
 * @param locale
 *            The POSIX locale for the automatic PayPal captions
 * @param disabled
 *            When true the button is generated with disabled style
 * @return Returns the generated PayPal button object
 */
PayPalButton.prototype.createCreditButton = function(parent_selector, id, size, shape, label, show_icon, tagline, locale,
        disabled) {
    return PayPalButton.prototype.createCheckoutButton(parent_selector, id, size, shape, "", label, show_icon, tagline,
            locale, disabled, PayPalButton.prototype.TYPES[1]);
};

/**
 * Genererates a PayPal predefined Checkout|Credit button by specifying the PayPal style
 * 
 * @param parent_selector
 *            A valid CSS selector. When specified append the resulted button to that parent element.
 * @param id
 *            The button Id attribute
 * @param size
 *            The predefined size of the button ("tiny", "small", "medium", "large")
 * @param shape
 *            The predefined shape of the button ("pill", "rect")
 * @param style
 *            The predefined style of the buttons ("primary", "secondary", "tertiary", "quaternary", "checkout", "credit")
 * @param label
 *            Optionally a caption for the button.
 * @param show_icon
 *            When true display the PayPal logo on button
 * @param locale
 *            The POSIX locale for the automatic PayPal captions
 * @param disabled
 *            When true the button is generated with disabled style
 * @return Returns the generated PayPal button object
 */
PayPalButton.prototype.createStyleButton = function(parent_selector, id, size, shape, style, label, show_icon, locale,
        disabled) {
    var data = PayPalButton.prototype.normalizeData(id, PayPalButton.prototype.DEFAULT_BUTTON_TYPE, label, show_icon, locale,
            disabled);

    var config = PayPalButton.prototype.normalizeConfig(size, shape);
    config.style = style;

    return PayPalButton.prototype.factory(data, config, parent_selector);
};

PayPalButton.prototype.COLORS = [ "blue", "silver", "gold" ];
PayPalButton.prototype.BOOL = [ "false", "true" ];
PayPalButton.prototype.TYPES = [ "checkout", "credit" ];
PayPalButton.prototype.SIZES = [ "tiny", "small", "medium", "large" ];
PayPalButton.prototype.SHAPES = [ "pill", "rect" ];
PayPalButton.prototype.STYLES = [ "primary", "secondary", "tertiary", "quaternary", "checkout", "credit" ];
PayPalButton.prototype.BUTTON_TYPES = [ "button", "submit" ];

PayPalButton.prototype.DEFAULT_LOCALE = "en_US";
PayPalButton.prototype.DEFAULT_COLOR = PayPalButton.prototype.COLORS[0];
PayPalButton.prototype.DEFAULT_LABEL = "{wordmark}";
PayPalButton.prototype.DEFAULT_SIZE = PayPalButton.prototype.SIZES[2];
PayPalButton.prototype.DEFAULT_STYLE = "primary";
PayPalButton.prototype.DEFAULT_SHAPE = PayPalButton.prototype.SHAPES[1];
PayPalButton.prototype.DEFAULT_TYPE = PayPalButton.prototype.TYPES[0];
PayPalButton.prototype.DEFAULT_BUTTON_TYPE = PayPalButton.prototype.BUTTON_TYPES[0];