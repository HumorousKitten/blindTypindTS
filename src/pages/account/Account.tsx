import { AccountHeader } from '../../components/accountHeader/AccountHeader';
import { BestResults } from '../../components/accountBestResults/BestResults';
import cl from './_accountPage.module.scss'

export const Account = () => {
	return (
		<main className={`${cl.account}  ${cl.mc}`} >
			<AccountHeader />
			<BestResults />
		</main>
	);
}
 
