export const areArraysEqual = <T>(arrA: T[], arrB: T[]) => {
	const isLengthEqual = arrA.length === arrB.length
	if (!isLengthEqual) return false

	for (let i = 0; i < arrA.length; i++) {
		if (arrA[i] !== arrB[i]) {
			return false;
		}
	}

	
	return true;
}