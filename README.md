*Opicak is in alpha phase and still requires a lot of work. You can try it out, but expect breaking changes even between patch releases. Beta phase will be initialized via minor release and production phase will be initialized via major release.*

# Opicak
Opicak will try out your website and report any errors he finds. He will show you step by step scenario how to reproduce the error.

## Install
Simply install the latest version via npm install
```
npm install opicak
```

Than you can run opicak like this
```
node_modules/.bin/opicak -u https://www.example.com
```

If/When he finds an error, you can display reproducible errors like this
```
node_modules/.bin/opicak report/*minified.json -p -u https://www.example.com
```

Display available options like this
```
node_modules/.bin/opicak --help
```

### Configuration
Opicak will look for configuraition file in your current directory with name `opicak.conf.js`.

```javascript
module.exports = {
	// Number of parallel chrome instances initialized'
	parallelInstances: 1,
	// Time in ms, after which no more scenarios will be initialized
	stopNewScenariosAfterTime: 100000,
	// Maximal number of actions performed in a random scenario
	// (if error occures, the scenario is ended)
	actionsPerScenario: 100,
	// Number of execution errors of actions to abort the random scenario.
	// This prevents from infinity loops, when opicak is not able to perform
	// any action on the page and keeps retrying.
	numberOfActionFailuresToAbortRandomScenario: 20,
	// Starting url for all random scenarios
	url: 'http://localhost:4444',
	// After an error occured, opicak will try to reproduce the error again
	// and will retry up to this number of actions before giving up.
	numberOfAllowedActionsToReproduceErrorFromPreviousRun: 20,
	// Disables random scenarios,
	// only user defined scenarios will be executed
	randomScenariosDisabled: false,
	// When user defined scenario recieves an error,
	// it will no longer try to minify the steps to reproduce this error.
	minifyUserDefinedScenariosDisabled: false,
	// Disables chromium headless mode and will display browser GUI.
	headlessModeDisabled: false,
	// Preview mode will overwrite other config values
	// to display the scenario on the local computer
	// in non-headless mode. It will also run only
	// user defined scenarios and will not try to minify them.
	previewMode: false,
	// Wait time (in ms) between actions in preview mode.
	previewModePauseTime: 1500,
	// Default browser settings passed to puppeteer.launch()
	defaultBrowserSettings: {
		ignoreHTTPSErrors: true,
		defaultViewport: {
			width: 1280,
			height: 720
		},
		args: ['--start-maximized']
	},
	// Default navigation timeout set via page.setDefaultNavigationTimeout()
	defaultNavigationTimeout: 60000,
	// Page error handler, which should tell what is actually an error.
	// Function is evaluated in the browser context via
	// page.evaluateOnNewDocument() and has method
	// "opicakError(error)" available.
	pageErrorHandler: () => {
		window.addEventListener('error', (event) => {
			opicakError(event.error.toString());
		});
	},
	// A browser websocket endpoint to connect to (i.e. ws://5.5.5.5:3505)
	browserWebSocketEndpoint: null,
	// Relative path for the report output
	reportPath: './report',
}
```

## Development
Build from source
```
npm run build
```
Build from source with watch
```
npm run dev
```
Run unit tests
```
npm test
```
Run local testing website (from example)
```
node server.js
```
Start local version of opicak with source mapping
```
npm start -- [options]
```
