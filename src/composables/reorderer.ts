import { tog } from '../store';
import { activeLots, setLots, clearLots } from '../store/lots';
import { setQuadrant } from './quadrants';

export const useReorderer = (el?: HTMLElement): ((event?: MouseEvent) => void) => {
	function reorderTiles(event?: MouseEvent): void {
		event && console.log('event', event);
		const lots = activeLots.value;
		clearLots();
		// refreshBg++;
		tog('wenny');
		if (lots) {
			setTimeout(() => {
				setLots(lots);
			}, 1000);
		}
		el && setQuadrant(el);
	}
	return reorderTiles;
};
