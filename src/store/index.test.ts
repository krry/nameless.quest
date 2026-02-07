import { describe, it, expect, beforeEach, vi } from 'vitest';
import { set, tog, cfg } from './index';

describe('Store Config', () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
		// Reset cfg values
		Object.keys(cfg).forEach(key => {
			cfg[key] = false;
		});
	});

	describe('set', () => {
		it('should set a config value to true', () => {
			set('wenny', true);
			expect(cfg.wenny).toBe(true);
			expect(localStorage.getItem('wenny')).toBe('true');
		});

		it('should set a config value to false', () => {
			set('texty', false);
			expect(cfg.texty).toBe(false);
			expect(localStorage.getItem('texty')).toBe('false');
		});

		it('should persist value to localStorage', () => {
			set('pinny', true);
			const stored = localStorage.getItem('pinny');
			expect(stored).toBe('true');
		});

		it('should update cfg reactively', () => {
			expect(cfg.liney).toBe(false);
			set('liney', true);
			expect(cfg.liney).toBe(true);
		});

		it('should overwrite previous value', () => {
			set('gendy', true);
			expect(cfg.gendy).toBe(true);
			set('gendy', false);
			expect(cfg.gendy).toBe(false);
			expect(localStorage.getItem('gendy')).toBe('false');
		});

		it('should handle multiple config flags independently', () => {
			set('turny', true);
			set('navvy', false);
			set('beeny', true);

			expect(cfg.turny).toBe(true);
			expect(cfg.navvy).toBe(false);
			expect(cfg.beeny).toBe(true);

			expect(localStorage.getItem('turny')).toBe('true');
			expect(localStorage.getItem('navvy')).toBe('false');
			expect(localStorage.getItem('beeny')).toBe('true');
		});
	});

	describe('tog', () => {
		it('should toggle a true value to false', () => {
			cfg.baguy = true;
			tog('baguy');
			expect(cfg.baguy).toBe(false);
		});

		it('should toggle a false value to true', () => {
			cfg.drawer = false;
			tog('drawer');
			expect(cfg.drawer).toBe(true);
		});

		it('should persist toggled value to localStorage', () => {
			cfg.threedy = false;
			tog('threedy');
			expect(cfg.threedy).toBe(true);
			expect(localStorage.getItem('threedy')).toBe('true');
		});

		it('should toggle multiple times correctly', () => {
			cfg.loading = false;

			tog('loading');
			expect(cfg.loading).toBe(true);

			tog('loading');
			expect(cfg.loading).toBe(false);

			tog('loading');
			expect(cfg.loading).toBe(true);
		});

		it('should correctly reflect toggled state in localStorage', () => {
			cfg.perused = false;
			tog('perused');
			expect(JSON.parse(localStorage.getItem('perused') || 'false')).toBe(true);

			tog('perused');
			expect(JSON.parse(localStorage.getItem('perused') || 'false')).toBe(false);
		});

		it('should toggle independent flags', () => {
			cfg.metafied = false;
			cfg.journaled = false;

			tog('metafied');
			tog('journaled');

			expect(cfg.metafied).toBe(true);
			expect(cfg.journaled).toBe(true);

			tog('metafied');

			expect(cfg.metafied).toBe(false);
			expect(cfg.journaled).toBe(true);
		});
	});

	describe('cfg object', () => {
		it('should have all expected properties', () => {
			const expectedProps = [
				'wenny',
				'texty',
				'pinny',
				'liney',
				'gendy',
				'turny',
				'navvy',
				'beeny',
				'baguy',
				'drawer',
				'threedy',
				'loading',
				'perused',
				'metafied',
				'journaled',
				'consulted',
				'configured',
				'thanked',
				'fedback',
				'emailVerified',
			];

			expectedProps.forEach(prop => {
				expect(cfg).toHaveProperty(prop);
			});
		});

		it('should initialize all values as falsy (false or 0)', () => {
			Object.keys(cfg).forEach(key => {
				expect(cfg[key]).toBeFalsy();
			});
		});

		it('should be reactive to set operations', () => {
			const initialValue = cfg.consulted;
			set('consulted', true);
			expect(cfg.consulted).toBe(true);
			expect(cfg.consulted).not.toBe(initialValue);
		});
	});
});
