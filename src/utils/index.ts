// I'm thinking of a number between one and …
export function getRandTo(max: number): number {
	return Math.floor(Math.random() * max) + 1
}

export function isEmptyObject(obj: Record<string, unknown>): boolean {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

type Node = string | number | symbol | null | undefined

export function getRandNode(arr: Node[]): Node {
	return arr[getRandTo(arr.length)]
}
