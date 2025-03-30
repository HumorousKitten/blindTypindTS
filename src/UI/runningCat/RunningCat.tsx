import React, { FC } from 'react'

import eighthPos from '../../assets/img/images/runningCat/eighthPosCat.png'
import fifthPos from '../../assets/img/images/runningCat/fifthPosCat.png'
import firstPos from '../../assets/img/images/runningCat/firtsPosCat.png'
import fourthPos from '../../assets/img/images/runningCat/fourthPosCat.png'
import secondPos from '../../assets/img/images/runningCat/secondPosCat.png'
import seventhPos from '../../assets/img/images/runningCat/seventhPosCat.png'
import sixthPos from '../../assets/img/images/runningCat/sixthPosCat.png'
import thirdPos from '../../assets/img/images/runningCat/thirdPosCat.png'

import { runningCat } from '../../utils/animation/runningCat'

import cl from './_runningCat.module.scss'

//записать в TODO, что этот компонент будет потом использоваться в других местах, например на таймере. Поэтому надо добавить в функцию смены картинок возможность остановки и начала

type TPositionClass = 'absolute' | 'static' | 'sticky' | 'relative' | 'fixed'
type TPositions = 'top' | 'bottom' | 'right' | 'left'
type TCoord = Partial<Record<TPositions, number>>

interface IClassName {
	position: TPositionClass
}

interface IRunningCatProps {
	classNames?: IClassName
	coordPosition?: TCoord
	widthPx?: number
	widthPerc?: number
	widthRem?: number
	heightPx?: number
	heightPerc?: number
	heightRem?: number

	isRunning: boolean | null
}

function formatWidth(width: number, unit: string = 'px') {
	return width + unit
}

function formatHeight(height: number, unit: string = 'px') {
	return height + unit
}

export const RunningCat: FC<IRunningCatProps> = ({
	classNames,
	coordPosition,
	...props
}) => {
	const imgRef = React.useRef<HTMLImageElement | null>(null)
	const arrImages = [
		firstPos,
		secondPos,
		thirdPos,
		fourthPos,
		fifthPos,
		sixthPos,
		seventhPos,
		eighthPos,
	]

	const { widthPerc, widthPx, widthRem, heightPx, heightPerc, heightRem } =
		props

	const positionClassName = classNames?.position
		? 'position' +
		  classNames.position.charAt(0).toUpperCase() +
		  classNames.position.slice(1)
		: ''

	const styleCoordPos = {
		top: coordPosition?.top ? coordPosition.top + 'px' : 'none',
		bottom: coordPosition?.bottom ? coordPosition.bottom + 'px' : 'none',
		left: coordPosition?.left ? coordPosition.left + 'px' : 'none',
		right: coordPosition?.right ? coordPosition.right + 'px' : 'none',
	}

	const width = widthPerc
		? formatWidth(widthPerc, '%')
		: widthPx
		? formatWidth(widthPx)
		: widthRem
		? formatWidth(widthRem, 'rem')
		: 'auto'

	const height = heightPerc
		? formatHeight(heightPerc, '%')
		: heightPx
		? formatHeight(heightPx)
		: heightRem
		? formatHeight(heightRem, 'rem')
		: 'auto'

	React.useEffect(() => {
		if (props.isRunning) {
			const cancelAnimation = runningCat(arrImages, imgRef)

			return () => {
				cancelAnimation()
			}
		}
	}, [props.isRunning])

	return (
		<div
			className={`${positionClassName ? cl[positionClassName] : ''} ${
				cl.runningCat
			}`}
			style={{
				...(coordPosition && styleCoordPos),
				width: width,
				height: height,
			}}
		>
			<img src={firstPos} alt='runningCat' ref={imgRef} />
		</div>
	)
}
