import { JwtPayload } from 'jwt-decode';

export interface ErrorProp {
	message?: string | null;
	status?: number | null;
}

export interface ToastProps {
	// error: ErrorProp | null;
	children: ReactNode;
}

export type DispatchType = (args: ErrorAction) => ErrorAction;

export interface IPayload extends JwtPayload {
	data: {
		username: string;
		_id: string;
	};
}


export type LoginProps = {
	handleDisplayLogin: Function;
};

export interface ILoginBody {
	username: string;
	password: string;
}

export interface IUserLogin {
	body?: ILoginBody;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;

}

export interface IDateEntry {
  propertyName: string;
  dateValue: string;
}