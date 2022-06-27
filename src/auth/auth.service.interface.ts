export interface AuthServiceInterface {
	login: (email: string, password: string) => Promise<string | null>;
}
