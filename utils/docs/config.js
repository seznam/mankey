const fs = require('fs');
const data = require('../../src/config/template.js');
const outputPath = './docs/Config.md';
const options = Object.keys(data).sort();

let results = '';

function line(str = '') {
	results += `${str}\n`;
}

line('<!-- This file is generated by utils/docs/config.js, do not edit this file directly.-->');
line('# Config');
line('QApe will look for a configuration file at current working directory called `qape.conf.js`.');
line();
line('## Table Of Content');

options.forEach(option => {
	line(`- [${option}](#${option})`);
});

line();
line('## Options');

options.forEach(option => {
	line(`### ${option}`);
	line(`\`<${data[option].type}>\``);
	line();
	line(data[option].description);
	line();
	line(`**Default:**`);
	line('```javascript');

	if (data[option].value && typeof data[option].value === 'Function') {
		line(data[option].value.toString());
	} else if (data[option].value && typeof data[option].value === 'object') {
		line(JSON.stringify(data[option].value, null, '\t'));
	} else {
		line(data[option].value);
	}

	line('```');
	line();
});

fs.writeFileSync(outputPath, results, 'utf-8');