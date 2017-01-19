# paypal-button-wrapper
Wrapper class that provides an interface to the [JavaScriptButtons](https://github.com/paypal/JavaScriptButtons) for creating dynamically standalone PayPal buttons. These buttons do not uses the PayPal checkout/buy flow.

#Requirements
https://github.com/paypal/JavaScriptButtons

#Types of buttons
* PayPal Checkout buttons
* PayPal Credit buttons
* generic PayPal buttons

##PayPal Checkout button
This is a generic gold|silver|blue button that may contain the PayPal logo, optionally a custom prefix|sufix and a tagline. 

See the `createCheckoutButton` function.


##PayPal Credit button
This is a blue PayPal CREDIT button that may contain the PayPal logo, optionally a custom prefix|sufix.

See the `createCreditButton` function.


##Generic PayPal button
This is an alternative to the PayPal Checkout|Credit button. It allows buttons creation by choosing a predefined PayPal style.

See the `createCheckoutButton` function.

##Note
The [JavaScriptButtons](https://github.com/paypal/JavaScriptButtons) library (and why not this wrapper) may be used even to generate generic buttons that has nothing to do with PayPal. Just use a custom caption, don't show any logo and that's it!