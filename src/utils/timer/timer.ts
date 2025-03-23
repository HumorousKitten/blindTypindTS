
interface ITimer {
	clearTimer: () => void
}

type TCallbackFunc = (time: string) => void


export function timer(callback: TCallbackFunc): ITimer {
	let seconds: number = 0
	let minutes: number = 0

	function increaseTime() {
		seconds++;

		if (seconds === 60) {
				seconds = 0;
				minutes++;
		}

		const formattedMinutes = minutes >= 10 ? `${minutes}` : `0${minutes}`;
		const formattedSeconds = seconds >= 10 ? `${seconds}` : `0${seconds}`;

		const resultTime = `${formattedMinutes}:${formattedSeconds}`;

		callback(resultTime);
	}

	const time = setInterval(increaseTime, 1000)
	
	return {
		clearTimer: () => {
			clearInterval(time)
		}
	}
}
