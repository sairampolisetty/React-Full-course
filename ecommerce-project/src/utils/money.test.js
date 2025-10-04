import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
    it('formats money correctly', () => {
        expect(formatMoney(1999)).toBe(`$19.99`);
    })

    it('displays 2 decimal places', () => {
        expect(formatMoney(1090)).toBe(`$10.90`);
        expect(formatMoney(100)).toBe(`$1.00`);
        expect(formatMoney(0)).toBe(`$0.00`);
        expect(formatMoney(-100)).toBe(`$-1.00`)
    })
})
