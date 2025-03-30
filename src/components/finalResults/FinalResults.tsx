import { useMutation } from '@tanstack/react-query'
import React, { FC } from 'react'
import { server } from '../../server/server'
import { useStore } from '../../state/store'
import cl from './_finalResults.module.scss'

interface IFinalResults {
	wpm: number
	cpm: number
	accuracy: number
}

// создам функции подсчета wpm, cpm, accuracy в родительском компоненте
// потом при первом рендеринге компонента они передадутся в нужные дочерние компоненты. Там они отрисуются в useEffect
//в компонент с accuracy передам отдельно функцию анимации, там сделаем так, что в состояние не сразу запишется результат, а сама анимация будет его записывать

interface IFinalResultsProps {
	countOfMistakes: number
}

interface IMutationFn {
	level: number
	subLevel: number
	charPerMin: number
	wordPerMin: number
	accuracyLevel: number
}

async function updateFinalResults(
	level: number,
	sublevel: number,
	cpm: number,
	wpm: number,
	accuracy: number
) {
	const token = server.readCookie('token')
	if (!token) return
	const data = await server.updateResultLevel(
		level,
		sublevel,
		token,
		cpm,
		wpm,
		accuracy
	)
	return data
}

export const FinalResults: FC<IFinalResultsProps> = ({ countOfMistakes }) => {
	const endTime = useStore(state => state.endTime)
	const { simulatorStr, level, subLevel } = useStore(state => state.simulatorLevel)

	const mutation = useMutation({
		mutationFn: async ({
			level,
			subLevel,
			charPerMin,
			wordPerMin,
			accuracyLevel,
		}: IMutationFn) =>
			updateFinalResults(level, subLevel, charPerMin, wordPerMin, accuracyLevel),

		onSuccess: data => {
			console.log(data)
		},
	})

	React.useEffect(() => {
		const charPerMin = cpm()
		const wordPerMin = wpm()
		const accuracyLevel = accuracy()
		if (endTime && countOfMistakes <= 3) {
			mutation.mutate({level, subLevel, charPerMin, wordPerMin, accuracyLevel})
		}
	}, [endTime])

	function convertTimeInMinutes(time: string) {
		if (!time) return 0
		const [minutes, seconds] = time.split(':')
		const newSeconds: number = +minutes * 60 + +seconds
		const newMinutes: number = newSeconds / 60
		return newMinutes
	}

	function cpm(): number {
		const minutes = convertTimeInMinutes(endTime)
		if (!minutes) return 0
		return Math.round(simulatorStr.length / minutes)
	}

	function wpm(): number {
		const minutes = convertTimeInMinutes(endTime)
		if (!minutes) return 0
		return Math.round(simulatorStr.length / 5 / minutes)
	}

	function accuracy(): number {
		return ((simulatorStr.length - countOfMistakes) / simulatorStr.length) * 100
	}

	function animateFinalNumberResult(
		endValue: number,
		callback: (value: number) => void
	) {
		let deleteAnimate: boolean = false
		let startValue: number = 0
		console.log(endValue)

		const animateFunc = setInterval(() => {
			if (startValue === endValue) {
				deleteAnimate = true
				return
			}
			startValue++
			callback(startValue)
			console.log(startValue)
		}, 50)

		if (deleteAnimate) clearInterval(animateFunc)

		return () => clearInterval(animateFunc)
	}

	return (
		<div className={cl.finalResults}>
			<FinalResult name={'cpm'} endTime={endTime} cpm={cpm} />
			<FinalResult
				name={'accuracy'}
				endTime={endTime}
				accuracy={accuracy}
				animateFunc={animateFinalNumberResult}
			/>
			<FinalResult name={'wpm'} endTime={endTime} wpm={wpm} />
		</div>
	)
}

interface IFinalResultProps {
	name: 'cpm' | 'wpm' | 'accuracy'
	animateFunc?: (
		endValue: number,
		callback: (value: number) => void
	) => () => void
	cpm?: () => number
	wpm?: () => number
	accuracy?: () => number
	endTime: string
}

const FinalResult: FC<IFinalResultProps> = ({
	name,
	animateFunc,
	cpm,
	wpm,
	accuracy,
	endTime,
}) => {
	const [result, setResult] = React.useState<number>(0)

	const styles =
		name === 'accuracy'
			? cl.accuracy
			: name === 'cpm'
			? cl.charPerMinutes
			: cl.wordPerMinutes

	React.useEffect(() => {
		if (cpm && endTime) {
			const cpmRes = cpm()
			setResult(cpmRes)
		}

		if (wpm && endTime) {
			const wpmRes = wpm()
			setResult(wpmRes)
		}

		if (accuracy && endTime && animateFunc) {
			const accuracyRes = accuracy()
			console.log(accuracyRes)
			animateFunc(Math.round(accuracyRes), setResult)
		}
	}, [endTime])

	return (
		<div className={styles}>
			<span>
				{result}
				{name === 'accuracy' ? <span>%</span> : null}
			</span>
			<span>{name}</span>
		</div>
	)
}
