# paypal-button-wrapper
Wrapper class that provides an interface to the [JavaScriptButtons](https://github.com/paypal/JavaScriptButtons) for creating dynamically standalone PayPal buttons. These buttons do not uses the PayPal checkout/buy flow.

### Requirements
- [https://github.com/paypal/JavaScriptButtons](https://github.com/paypal/JavaScriptButtons)

### Types of buttons
* PayPal Checkout buttons
* PayPal Credit buttons
* generic PayPal buttons

## PayPal Checkout button
This is a generic gold|silver|blue button that may contain the PayPal logo, optionally a custom prefix|sufix and a tagline. 

See the `createCheckoutButton` function.


## PayPal Credit button
This is a blue PayPal CREDIT button that may contain the PayPal logo, optionally a custom prefix|sufix.

See the `createCreditButton` function.


## Generic PayPal button
This is an alternative to the PayPal Checkout|Credit button. It allows buttons creation by choosing a predefined PayPal style.

See the `createCheckoutButton` function.

### Note
The [JavaScriptButtons](https://github.com/paypal/JavaScriptButtons) library (and why not this wrapper) may be used even to generate generic buttons that has nothing to do with PayPal. Just use a custom caption, don't show any logo and that's it!

## Documentation
The JavaScript source files are annotated according to JSDoc specification and thus the source documentation can be produced on the fly by using the {@link http://usejsdoc.org/|JSDoc} tool.

In order to generate the JSDoc documentation you should follow the steps below. In case you want to use the JSDoc default template skip the step (1) below.
1. install your preferred JSDoc {@link http://bfy.tw/ABvL|template} (eg. `npm install {@link https://www.npmjs.com/package/interledger-jsdoc-template|minami}`)
  - make sure you update the `opts.template` property with the path to the installed JSDoc template in project's `conf.json` file
2. run the following command at the terminal: `jsdoc -c path-to-conf.json`  
  - this will create a `jsdoc` folder that will contain the auto-generated JSDoc documentation for the JavaScript source files
   