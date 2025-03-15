export function runningCat(
	arrImages: Array<string>,
	imgRef: React.MutableRefObject<HTMLImageElement | null>
) {
	let index = 0
	let lastTime = 0
	const frameDuration = 100
	let requestId: number;

	function animate(time: number) {
		if (time - lastTime >= frameDuration) {
			index = (index + 1) % arrImages.length
			if (imgRef.current) {
				imgRef.current.src = arrImages[index]
			}
			lastTime = time
		}
		requestId = requestAnimationFrame(animate);
	}

	requestId = requestAnimationFrame(animate);

	return () => {
    cancelAnimationFrame(requestId);
  };
}
