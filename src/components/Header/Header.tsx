import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { server } from '../../server/server';
import avatarIcon from '../../assets/img/icons/avatar.svg'
import documentIcon from '../../assets/img/icons/list.svg'
import iconBlindTyping from '../../assets/img/icons/logo.svg'
import cl from './Header.module.scss'
import React from 'react'


export const Header = () => {
	const navigate = useNavigate()
	const {data, isLoading} = useQuery({
		queryKey: ['userLogin'],
		queryFn: getLogin
	})

	async function getLogin() {
		const token = server.readCookie('token')
		if(!token) return
		const data = await server.getUserLogin(token)
		return data 
	}

	function toMainPage(): void{
		navigate("/")
	}
	
	function toAccountPage(): void {
		navigate('/account')
	}

	return (
		<header className={cl.Header}>
			<div className={cl.TitleBlock} onClick={toMainPage}>
				<img src={iconBlindTyping} alt="logo" width={18} height={18}/>
				<span className={cl.Span}>BlindTyping</span>
			</div>

			<div className={cl.AvatarBlock}>
				<img src={avatarIcon} alt="avatarIcon" width={22} height={22} onClick={toAccountPage}/>
				<span className={cl.Span} onClick={toAccountPage}>{isLoading ? 'Loading...' : data?.login}</span>
				<img src={documentIcon} alt="documentIcon" width={18} height={18}/>
			</div>
		</header>
	)
}
