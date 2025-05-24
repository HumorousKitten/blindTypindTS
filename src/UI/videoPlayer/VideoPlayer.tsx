import Plyr from 'plyr'
import React, { useEffect, useRef } from 'react'
import 'plyr/dist/plyr.css'


interface VideoPlayerProps {
	src: string
	type?: 'hls' | 'video'
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	type = 'video',
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		// Инициализация Plyr
		const player = new Plyr(video, {
			controls: [
				'play',
				'progress',
				'current-time',
				'mute',
				'volume',
				'fullscreen',
			],
		})

		video.src = src

		return () => {
			player.destroy()
		}
	}, [src, type])

	return (
		<video
			ref={videoRef}
			className='plyr-react plyr'
			controls
			controlsList='nodownload'
			playsInline
		/>
	)
}
