import cl from './_finalResults.module.scss'

export const FinalResults = () => {
	return (
		<div className={cl.finalResults}>
			<div className={cl.charPerMinutes}>
				<span>22</span>
				<span>cpm</span>
			</div>
			<div className={cl.accuracy}>
				<span>97 
					<span>%</span>
				</span>
				<span>accuracy</span>
			</div>
			<div className={cl.wordPerMinutes}>
				<span>9</span>
				<span>wpm</span>
			</div>
		</div>
	);
}
