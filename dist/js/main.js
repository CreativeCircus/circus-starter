'use strict';

var regularFunctionGlobalScope = function regularFunctionGlobalScope() {
	// A regular function gets it's _this_ automatically from its caller,
	// in this case, the event listener. 
	// This is the default setup, and it's the simplest to understand.
	// In this example, _this_ is the HTML element that the event happened to (the image).
	console.log(this);
};

var arrowFunctionGlobalScope = function arrowFunctionGlobalScope() {
	// In an arrow function, _this_ comes from where the function is written.
	// In this example, _this_ is undefined because the function was defined in the global scope.
	// This is not very useful.
	console.log(undefined);
};

var ExampleModule = function ExampleModule() {
	var _this = this;

	var regularFunctionInsideModule = function regularFunctionInsideModule() {
		// This example works the same as the regular function in the global scope.
		// It's _this_ will come from whereever it's called, in this case
		// the event listener. 
		// Again, it will be the HTML image element that got the click event.
		console.log(this);
	};
	var arrowFunctionInsideModule = function arrowFunctionInsideModule() {
		// This is an arrow function inside a module, where they start getting useful.
		// Because it's an arrow function, its _this_ comes from its own surroundings,
		// so in this case, _this_ is the instance of the ExampleModule itself.
		console.log(_this);
	};
	return {
		regularFunctionInsideModule: regularFunctionInsideModule,
		arrowFunctionInsideModule: arrowFunctionInsideModule
	};
};
var instanceOfExampleModule = new ExampleModule();

// ================== TESTS =================
var $logo = document.querySelector('.logo');
// Uncomment these one at a time, and see how they differ

// by default, _this_ is not assigned, so it's undefined. 
// console.log(this)

// $logo.addEventListener('click', regularFunctionGlobalScope)
// $logo.addEventListener('click', arrowFunctionGlobalScope)
// $logo.addEventListener('click', instanceOfExampleModule.regularFunctionInsideModule)
$logo.addEventListener('click', instanceOfExampleModule.arrowFunctionInsideModule);

// Okay, here's where it gets really weird. Sometimes you don't want the _this_ to come from
// either the function's context OR the caller's context. Sometimes you just want to call
// a function and hand it a piece of data to use as _this_

// The _bind_ function returns a reference to a modified version of the function it's called on, 
// with the new _this_ context bound to it. 
// $logo.addEventListener('click', instanceOfExampleModule.regularFunctionInsideModule.bind({customThis: 42}))

// Alternatively, you can _call_ the function with the context applied to it.
// $logo.addEventListener('click', function() {
// 	instanceOfExampleModule.regularFunctionInsideModule.call({customThis: 42})
// })
//# sourceMappingURL=main.js.map
