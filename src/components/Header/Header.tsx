import avatarIcon from '../../assets/img/icons/avatar.svg'
import documentIcon from '../../assets/img/icons/list.svg'
import iconBlindTyping from '../../assets/img/icons/logo.svg'
import cl from './Header.module.scss'

export const Header = () => {
	return (
		<header className={cl.Header}>
			<div className={cl.TitleBlock}>
				<img src={iconBlindTyping} alt="logo" width={18} height={18}/>
				<span className={cl.Span}>BlindTyping</span>
			</div>

			<div className={cl.AvatarBlock}>
				<img src={avatarIcon} alt="avatarIcon" width={22} height={22}/>
				<span className={cl.Span}></span>
				<img src={documentIcon} alt="documentIcon" width={18} height={18}/>
			</div>
		</header>
	)
}
