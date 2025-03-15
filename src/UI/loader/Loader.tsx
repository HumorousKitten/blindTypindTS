import React, { FC } from 'react'

import firstPos from '../../assets/img/images/runningCat/firtsPosCat.png'
import secondPos from '../../assets/img/images/runningCat/secondPosCat.png'
import thirdPos from '../../assets/img/images/runningCat/thirdPosCat.png'
import fourthPos from '../../assets/img/images/runningCat/fourthPosCat.png'
import fifthPos from '../../assets/img/images/runningCat/fifthPosCat.png'
import sixthPos from '../../assets/img/images/runningCat/sixthPosCat.png'
import seventhPos from '../../assets/img/images/runningCat/seventhPosCat.png'
import eighthPos from '../../assets/img/images/runningCat/eighthPosCat.png'

import { runningCat } from '../../utils/animation/runningCat'
import cl from './_loader.module.scss'

interface ILoader {
	isLoading: boolean
}

export const Loader: FC<ILoader> = ({isLoading}) => {
	const imgRef = React.useRef<HTMLImageElement | null>(null)
	const arrImages = [firstPos, secondPos, thirdPos, fourthPos, fifthPos, sixthPos, seventhPos, eighthPos]

	React.useEffect(() => {
		const cancelAnimation = runningCat(arrImages, imgRef);

		return () => {
      cancelAnimation();
    };
	}, [isLoading])


	return (
		<img src={firstPos} alt="runningCatLoader" ref = {imgRef} className={cl.loader}/>
	);
}
