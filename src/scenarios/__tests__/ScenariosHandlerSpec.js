jest.mock('../DefinedScenarios');
jest.mock('../RandomScenarios');
jest.mock('../FailingScenarios');
jest.mock('../ScenariosHelper');

import ScenariosHandler from '../ScenariosHandler';
import DefinedScenarios from '../DefinedScenarios';
import RandomScenarios from '../RandomScenarios';
import FailingScenarios from '../FailingScenarios';
import ScenariosHelper from '../ScenariosHelper';

describe('ScenariosHandler', () => {
	let scenariosHandler = null;

	beforeEach(() => {
		scenariosHandler = new ScenariosHandler({}, {}, {});
	});

	it('can be initialized', () => {
		expect(scenariosHandler._config).toEqual({});
		expect(scenariosHandler._actionsHandler).toEqual({});
		expect(scenariosHandler._reporter).toEqual({});
		expect(scenariosHandler._scenariosHelper).toEqual(null);
		expect(scenariosHandler._definedScenarios).toEqual(null);
		expect(scenariosHandler._failingScenarios).toEqual(null);
		expect(scenariosHandler._randomScenarios).toEqual(null);
	});

	it('can initialize its dependencies', () => {
		scenariosHandler.init();

		expect(
			scenariosHandler._scenariosHelper instanceof ScenariosHelper
		).toBeTruthy();
		expect(
			scenariosHandler._definedScenarios instanceof DefinedScenarios
		).toBeTruthy();
		expect(
			scenariosHandler._failingScenarios instanceof FailingScenarios
		).toBeTruthy();
		expect(
			scenariosHandler._randomScenarios instanceof RandomScenarios
		).toBeTruthy();
	});

	it('can add user defined scenario', () => {
		let log = {};
		let userDefinedScenariosHandler = { addScenario: jest.fn() };
		scenariosHandler._definedScenarios = userDefinedScenariosHandler;

		scenariosHandler.addDefinedScenario(log);

		expect(userDefinedScenariosHandler.addScenario)
			.toHaveBeenCalledWith(log);
	});

	it('can add user defined scenario', () => {
		let log = {};
		let userDefinedScenariosHandler = { addScenario: jest.fn() };
		scenariosHandler._definedScenarios = userDefinedScenariosHandler;

		scenariosHandler.addDefinedScenario(log);

		expect(userDefinedScenariosHandler.addScenario)
			.toHaveBeenCalledWith(log);
	});

	it('can add failing scenario', () => {
		let log = {};
		let failingScenariosHandler = { addScenario: jest.fn() };
		scenariosHandler._failingScenarios = failingScenariosHandler;

		scenariosHandler.addFailingScenario(log);

		expect(failingScenariosHandler.addScenario)
			.toHaveBeenCalledWith(log);
	});

	it('can get failing scenario', () => {
		let scenario = 'failingScenario';
		let failingScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(true),
			getScenario: jest.fn().mockReturnValue(scenario)
		};
		scenariosHandler._failingScenarios = failingScenariosHandler;

		let recievedScenario = scenariosHandler.getScenario();

		expect(recievedScenario).toEqual(scenario);
		expect(failingScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(failingScenariosHandler.getScenario).toHaveBeenCalledTimes(1);
	});

	it('can get user defined scenario', () => {
		let scenario = 'userDefinedScenario';
		let failingScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(false)
		};
		scenariosHandler._failingScenarios = failingScenariosHandler;
		let userDefinedScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(true),
			getScenario: jest.fn().mockReturnValue(scenario)
		};
		scenariosHandler._definedScenarios = userDefinedScenariosHandler;

		let recievedScenario = scenariosHandler.getScenario();

		expect(recievedScenario).toEqual(scenario);
		expect(failingScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(userDefinedScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(userDefinedScenariosHandler.getScenario).toHaveBeenCalledTimes(1);
	});

	it('can get random scenario if enabled', () => {
		let scenario = 'randomScenario';
		let failingScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(false)
		};
		scenariosHandler._failingScenarios = failingScenariosHandler;
		let userDefinedScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(false)
		};
		scenariosHandler._definedScenarios = userDefinedScenariosHandler;
		let randomScenariosHandler = {
			getScenario: jest.fn().mockReturnValue(scenario)
		}
		scenariosHandler._randomScenarios = randomScenariosHandler;

		let recievedScenario = scenariosHandler.getScenario();

		expect(recievedScenario).toEqual(scenario);
		expect(failingScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(userDefinedScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(randomScenariosHandler.getScenario).toHaveBeenCalledTimes(1);
	});

	it('can get no scenario if random scenariosHandler disabled', () => {
		let failingScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(false)
		};
		scenariosHandler._failingScenarios = failingScenariosHandler;
		let userDefinedScenariosHandler = {
			hasScenario: jest.fn().mockReturnValue(false)
		};
		scenariosHandler._definedScenarios = userDefinedScenariosHandler;
		scenariosHandler._config.randomScenariosDisabled = true;

		let recievedScenario = scenariosHandler.getScenario();

		expect(recievedScenario).not.toBeDefined();
		expect(failingScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
		expect(userDefinedScenariosHandler.hasScenario).toHaveBeenCalledTimes(1);
	});

	it('has scenario when user defined scenario is available', () => {
		let userDefinedScenario = {
			hasScenario: jest.fn().mockReturnValue(true)
		}
		scenariosHandler._definedScenarios = userDefinedScenario;

		expect(scenariosHandler.hasScenario()).toEqual(true);
	});

	it('has scenario when failing scenario is available', () => {
		let failingScenario = {
			hasScenario: jest.fn().mockReturnValue(true)
		}
		scenariosHandler._failingScenarios = failingScenario;
		let userDefinedScenario = {
			hasScenario: jest.fn().mockReturnValue(false)
		}
		scenariosHandler._definedScenarios = userDefinedScenario;

		expect(scenariosHandler.hasScenario()).toEqual(true);
	});

	it('has no scenario when there is no failing and user defined scenario', () => {
		let failingScenario = {
			hasScenario: jest.fn().mockReturnValue(false)
		}
		scenariosHandler._failingScenarios = failingScenario;
		let userDefinedScenario = {
			hasScenario: jest.fn().mockReturnValue(false)
		}
		scenariosHandler._definedScenarios = userDefinedScenario;

		expect(scenariosHandler.hasScenario()).toEqual(false);
	});
});