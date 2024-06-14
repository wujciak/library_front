import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import { BookDTO, CreateBookDTO } from "./dto/book.dto";
import {CreateLoanDTO, LoanDTO} from "./dto/loan.dto";
import {CreateUserDTO, UserDTO} from "./dto/user.dto";

export type ClientResponse<T> = {
    success: boolean;
    data: T;
    statusCode: number;
};

export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8080',
        });

        const token = localStorage.getItem('token');
        if (token) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    public async login(data: LoginDTO): Promise<ClientResponse<LoginResponseDTO | null>> {
        try {
            const response: AxiosResponse<LoginResponseDTO> = await this.client.post(
                '/api/auth/login',
                data,
            );

            this.client.defaults.headers.common['Authorization'] =
                `Bearer ${response.data.token}`;

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getAllBooks(): Promise<ClientResponse<BookDTO[] | null>> {
        try {
            const response: AxiosResponse<BookDTO[]> = await this.client.get('/api/book/getAll');

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            console.error('Error fetching books:', axiosError);

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async createBook(data: CreateBookDTO): Promise<ClientResponse<BookDTO | null>> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return {
                    success: false,
                    data: null,
                    statusCode: 0,
                };
            }

            const response: AxiosResponse<BookDTO> = await this.client.post('/api/book/create', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getAllLoans(): Promise<ClientResponse<LoanDTO[] | null>> {
        try {
            const response: AxiosResponse<LoanDTO[]> = await this.client.get('/api/loan/getAll');

            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;

            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async createLoan(data: CreateLoanDTO): Promise<ClientResponse<LoanDTO | null>> {
        try {
            const response: AxiosResponse<LoanDTO> = await this.client.post('/api/loan/create', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getAllUsers(): Promise<ClientResponse<UserDTO[] | null>> {
        try {
            const response: AxiosResponse<UserDTO[]> = await this.client.get('/api/user/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async createUser(data: CreateUserDTO): Promise<ClientResponse<UserDTO | null>> {
        try {
            const response: AxiosResponse<UserDTO> = await this.client.post('/api/user/create', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

}
