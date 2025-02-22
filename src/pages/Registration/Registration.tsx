import { Datablock } from '../../components/DataBlock/DataBlock'
import { IUIInfo } from '../../types/types'

export const Registration = () => {
	// const [userData, setUserData] = React.useState({
	//   login: '',
	//   password: '',
	//   email: '',
	// });
	// const navigate = useNavigate()
	// const catAnimation = React.useRef(null);
	// const [isSuccessData, setSuccessData] = React.useState({
	//   isSuccess: null,
	//   text: "",
	//   color: "",
	// })

	// async function sendToServer(login, password, email) {
	//   if(await server.registration(login, password, email)){
	//     setSuccessData({isSuccess: true, text: "Успешно"})
	//     setTransferData((prev) => {
	//       return { ...prev, timerIsActive: (prev.timerIsActive = false) };
	//     });
	//     catAnimation.current = false
	//     setTimeout(()=>{
	//       navigate("/autorization")
	//     }, 1000)
	//     return
	//   }
	//   setSuccessData({isSuccess: false, text: "Ваш аккаунт существует", color: "#FF0C46"})
	// }


	const UIInfo: IUIInfo = {
		title: 'Регистрация',
		textfield: 'Создать аккаунт',
		isAccount: 'Уже есть аккаунт?',
		logInHere: 'Войдите здесь',
	}

	return (
		<>
			<Datablock UIInfo={UIInfo} />
		</>
	)
}
