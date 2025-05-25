import React, { FC } from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '../../state/store'
import { unwantedKeys} from './unwantedKeys'
import cl from './_SimulatorStr.module.scss'
import { useLocation } from 'react-router-dom'
import { server } from '../../server/server'
import { useQuery } from '@tanstack/react-query'




interface ISpanArr {
	letter: string
	isWrong: boolean
	isRight: boolean
}

interface ISimulatorStrProps {
	setIsEnd: (value: boolean) => void
	setMistakes: (mistakes: string[]) => void
}

async function getContent(id: number) {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'
	if (!token) return

	return await server.getSubLevel(id, token)
}

export const SimulatorStr: FC<ISimulatorStrProps> = ({setIsEnd, setMistakes}) => {
	const location = useLocation()
	const subLevelId: number = location.state?.subLevelId
	
	const {data, isLoading, error, isSuccess, isError} = useQuery({
		queryKey: ['course-content', subLevelId],
		queryFn: () => getContent(subLevelId)
	})

	const updateRequiredLetter = useStore(state => state.updateRequiredLetter)
	const updateRightLetter = useStore(state => state.updateRightLetter)
	const updateWrongLetter = useStore(state => state.updateWrongLetter)
	const clearLetter = useStore(state => state.clearLetter)
	const increaseProgressBar = useStore(state => state.increaseProgressBar)
	const decreaseProgressBar = useStore(state => state.decreaseProgressBar)
	const updateTimer = useStore(state => state.updateTimer)
	const getInitialLevel = useStore(state => state.getInitialLevel)
	const {simulatorStr} = useStore(state => state.simulatorLevel)

	const [dividedSpanStr, updateDividedSpanStr] = useImmer<ISpanArr[]>([]) 

	const simulatorText = React.useRef<HTMLParagraphElement>(null)
	const index = React.useRef<number>(0)
	const mistakes: string[] = []

	// if(isSuccess) {
	// 	if(index.current) index.current = 0
	// 	updateRequiredLetter(simulatorStr.charAt(0))
	// 	updateDividedSpanStr(addSpan())
	// 	window.addEventListener('keydown', keyPressing)

	// 	return () => {
	// 		window.removeEventListener('keydown', keyPressing)
	// 	}
	// }

	
	
	React.useEffect(() => {
		if(!isSuccess || !data?.content) return
		
		index.current = 0
		
		updateRequiredLetter(data.content.charAt(0))
		updateDividedSpanStr(addSpan(data.content))
		window.addEventListener('keydown', keyPressing)
		
		return () => {
			window.removeEventListener('keydown', keyPressing)
		}
	}, [isSuccess, data?.content])
	
	if (isError) return <p>Произошла ошибка при загрузке данных!</p>

	if (isSuccess && !data?.content) return <p>Контента нет!</p>

	function addSpan(str: string): ISpanArr[] {
		return [...str].map((letter) => (
			{
				letter,
				isWrong: false,
				isRight: false,
			}
		))
	}

	function keyPressing(e: KeyboardEvent) {
		if(!data?.content) return
		if(index.current === data?.content.length) return

		if(e.key in unwantedKeys) return

		updateTimer(true)
	
		let letterPos = index.current
		
		if(e.key === 'Backspace'){
			backSpace()
			return
		}

		if(e.key === data.content.charAt(index.current)){
			updateRightLetter(data.content.charAt(++letterPos), e.key)
			increaseProgressBar(data.content.length)
			rightLetter(index.current)
		}
		else{
			mistakes.push(Number(e.key) ? e.key : e.key.toUpperCase())
			updateWrongLetter(data.content.charAt(++letterPos), e.key) 
			wrongLetter(index.current)
		}

		if(index.current + 1 === data.content.length) {
			updateTimer(false)
			setMistakes(mistakes)
			setIsEnd(true)
		}

		index.current++
	}

	function rightLetter(index: number) {
		updateDividedSpanStr(draft => {
			draft[index].isRight = true 
		})
	}

	function wrongLetter(index: number) {
		updateDividedSpanStr(draft => {
			draft[index].isWrong = true
		})
	}

	function backSpace(){
		if(!data?.content) return
		if(!index.current) return
		clearLetter(data.content.charAt(index.current))
		decreaseProgressBar(data.content.length)

		updateDividedSpanStr(draft => {
			draft[index.current].isWrong = false
			draft[index.current].isRight = false 
		})
		index.current--;
	}

	return (
		<div className={cl.SimulatorStrBlock}>
			<p className={cl.placeholder} ref={simulatorText}>
				{dividedSpanStr.map((item, index) => (
					<span key={index}
						className={item.isRight ? cl.rightLetter : item.isWrong ? cl.wrongLetter : cl.defaultColor}
					>
						{item.letter}
					</span>
				))}
			</p>
		</div>
	)
}
