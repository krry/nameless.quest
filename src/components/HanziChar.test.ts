import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import HanziChar from './HanziChar.vue';

// Mock the store
vi.mock('../store', () => ({
	cfg: {
		pinny: false,
	},
}));

describe('HanziChar Component', () => {
	it('should render the character correctly', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '坤',
				pinyin: 'kūn',
				translation: 'Earth',
			},
		});

		expect(wrapper.find('.hanzi').text()).toBe('坤');
	});

	it('should render with default character if not provided', () => {
		const wrapper = mount(HanziChar);
		expect(wrapper.find('.hanzi').text()).toBe('坤');
	});

	it('should display pinyin', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '乾',
				pinyin: 'qián',
				translation: 'Heaven',
			},
		});

		expect(wrapper.find('.pinyin').text()).toBe('qián');
	});

	it('should display translation when provided', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '乾',
				pinyin: 'qián',
				translation: 'Heaven',
			},
		});

		expect(wrapper.find('.translation').text()).toBe('Heaven');
	});

	it('should not render translation when not provided', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '乾',
				pinyin: 'qián',
			},
		});

		expect(wrapper.find('.translation').exists()).toBe(false);
	});

	it('should set title attribute to pinyin', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '乾',
				pinyin: 'qián',
			},
		});

		expect(wrapper.find('.char').attributes('title')).toBe('qián');
	});

	it('should apply size class correctly', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '坤',
				pinyin: 'kūn',
				size: 'lg',
			},
		});

		expect(wrapper.find('.char').classes()).toContain('lg');
	});

	it('should apply placement class correctly', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '坤',
				pinyin: 'kūn',
				place: 'over',
			},
		});

		expect(wrapper.find('.char').classes()).toContain('over');
	});

	it('should apply inline class when inline prop is true', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '坤',
				pinyin: 'kūn',
				inline: true,
			},
		});

		expect(wrapper.find('.char').classes()).toContain('ib');
	});

	it('should apply reveal class when reveal prop is true', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '坤',
				pinyin: 'kūn',
				reveal: true,
			},
		});

		expect(wrapper.find('.char').classes()).toContain('reveal');
	});

	it('should handle different prop combinations', () => {
		const wrapper = mount(HanziChar, {
			props: {
				char: '離',
				pinyin: 'lí',
				translation: 'Fire',
				size: 'md',
				place: 'side',
				inline: true,
				reveal: true,
			},
		});

		const charDiv = wrapper.find('.char');
		expect(charDiv.classes()).toContain('md');
		expect(charDiv.classes()).toContain('side');
		expect(charDiv.classes()).toContain('ib');
		expect(charDiv.classes()).toContain('reveal');
		expect(charDiv.find('.hanzi').text()).toBe('離');
	});

	it('should have default prop values', () => {
		const wrapper = mount(HanziChar);

		expect(wrapper.props('char')).toBe('坤');
		expect(wrapper.props('pinyin')).toBe('kūn');
		expect(wrapper.props('translation')).toBe('');
		expect(wrapper.props('reveal')).toBe(false);
		expect(wrapper.props('size')).toBe('md');
		expect(wrapper.props('place')).toBe('');
		expect(wrapper.props('inline')).toBe(false);
	});
});
