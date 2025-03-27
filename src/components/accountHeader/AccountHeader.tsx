import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import avatar from '../../assets/img/icons/avatar.svg'
import relog from '../../assets/img/icons/rename.svg'
import exit from '../../assets/img/icons/close cross.svg'
import { server } from '../../server/server'

import cl from './_accountHeader.module.scss'

async function getUserData() {
	const token = server.readCookie('token')
	if (!token) return
	const data = await Promise.all([
		server.getUserLogin(token),
		server.getUserEmail(token),
	])
	return data
}

export const AccountHeader = () => {
	const navigate = useNavigate()

	const { data, isLoading } = useQuery({
		queryKey: ['useData'],
		queryFn: getUserData,
	})

	function relogAccount(){
		server.deleteCookie('token')
		navigate('/auth')
	}

	return (
		<header className={`${cl.accountHeader} ${cl.wrapper}`}>
			<img src={avatar} alt='your_avatar' className={cl.avatar}/>
			<div className={cl.userData}>
				{isLoading ? 'Loading...' : data ? <p>{data[0].login}</p> : null}
				{isLoading ? 'Loading...' : data ? <p>{data[1].email}</p> : null}
				<img src={relog} alt='relogAccount' onClick = {relogAccount}/>
			</div>
			<Link to={'/'} className={cl.exit}>
				<img src={exit} alt='exitToMainPage' />
			</Link>
		</header>
	)
}
