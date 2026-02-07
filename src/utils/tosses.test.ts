import { describe, it, expect } from 'vitest';
import { parseTossToBinary, generateRandomToss } from './tosses';

describe('Tosses Utility', () => {
	describe('parseTossToBinary', () => {
		it('should convert a valid 6-digit toss to binary pair', () => {
			const toss = '678789';
			const result = parseTossToBinary(toss);

			expect(result).toHaveLength(2);
			expect(result[0]).toMatch(/^0b[01]{6}$/);
			expect(result[1]).toMatch(/^0b[01]{6}$/);
			expect(result[0]).not.toBe(result[1]);
		});

		it('should return different binaries when first and second halves differ', () => {
			const toss = '666666';
			const result = parseTossToBinary(toss);

			// 6 → first: 0, second: 1, so they differ and returns both
			expect(result).toHaveLength(2);
			expect(result[0]).toBe('0b000000');
			expect(result[1]).toBe('0b111111');
		});

		it('should return single binary when all chars produce same pair', () => {
			const toss = '777777';
			const result = parseTossToBinary(toss);

			// 7 → first: 1, second: 1, so both halves match and returns single value
			expect(result).toHaveLength(1);
			expect(result[0]).toBe('0b111111');
		});

		it('should return [""] for empty string', () => {
			const result = parseTossToBinary('');
			expect(result).toEqual(['']);
		});

		it('should return [""] for toss with less than 6 digits', () => {
			expect(parseTossToBinary('123')).toEqual(['']);
			expect(parseTossToBinary('12345')).toEqual(['']);
		});

		it('should process 6-character strings with non-valid chars', () => {
			// The function does NOT validate character validity, just length
			// It will map unknown chars to 'x'
			const result = parseTossToBinary('abcdef');
			expect(result).toEqual(['0bxxxxxx']);
		});

		it('should correctly map digit 7 to same first and second values', () => {
			const toss = '777777';
			const result = parseTossToBinary(toss);
			// 7 → first: 1, second: 1 → creates 111111
			expect(result[0]).toBe('0b111111');
		});

		it('should correctly map digit 8 to binary', () => {
			const toss = '888888';
			const result = parseTossToBinary(toss);
			// 8 → first: 0, second: 0 → creates 000000
			expect(result).toHaveLength(1);
			expect(result[0]).toBe('0b000000');
		});

		it('should correctly map digit 9 to binary', () => {
			const toss = '999999';
			const result = parseTossToBinary(toss);
			// 9 → first: 1, second: 0 → creates different pairs
			expect(result).toHaveLength(2);
			expect(result[0]).toBe('0b111111');
			expect(result[1]).toBe('0b000000');
		});

		it('should handle mixed valid digits correctly', () => {
			const toss = '789678';
			const result = parseTossToBinary(toss);

			expect(result).toHaveLength(2);
			// 7: 11, 8: 00, 9: 10, 6: 01, 7: 11, 8: 00
			// First: 101010 → 0b101010
			// Second: 100110 → 0b100110
			expect(result[0]).toBe('0b101010');
			expect(result[1]).toBe('0b100110');
		});
	});

	describe('generateRandomToss', () => {
		it('should generate a 6-digit number', () => {
			for (let i = 0; i < 10; i++) {
				const toss = generateRandomToss();
				const str = toss.toString();
				expect(str.length).toBe(6);
			}
		});

		it('should only generate digits 6, 7, 8, 9', () => {
			for (let i = 0; i < 20; i++) {
				const toss = generateRandomToss();
				const digits = toss.toString().split('');
				digits.forEach(d => {
					expect(['6', '7', '8', '9']).toContain(d);
				});
			}
		});

		it('should generate tosses in range [600000, 999999]', () => {
			for (let i = 0; i < 20; i++) {
				const toss = generateRandomToss();
				expect(toss).toBeGreaterThanOrEqual(600000);
				expect(toss).toBeLessThanOrEqual(999999);
			}
		});

		it('should return a number type', () => {
			const toss = generateRandomToss();
			expect(typeof toss).toBe('number');
			expect(Number.isInteger(toss)).toBe(true);
		});

		it('should generate different tosses on multiple calls', () => {
			const tosses = new Set();
			for (let i = 0; i < 10; i++) {
				tosses.add(generateRandomToss());
			}
			// With random generation, it's extremely unlikely to get the same value 10 times
			// We expect at least some variation
			expect(tosses.size).toBeGreaterThan(1);
		});
	});
});
