import { useNavigate } from "react-router-dom";
import avatarIcon from '../../assets/img/icons/avatar.svg'
import documentIcon from '../../assets/img/icons/list.svg'
import iconBlindTyping from '../../assets/img/icons/logo.svg'
import cl from './Header.module.scss'

interface IProps {

}

export const Header: React.FC<IProps> = () => {
	const navigate = useNavigate()
	function toMainPage(): void{
		navigate("/")
	}
	return (
		<header className={cl.Header}>
			<div className={cl.TitleBlock} onClick={toMainPage}>
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
