export interface User
{
    id: string;
    name: string;
    icNum: string;
    email: string;
    password: string;
    roleId: string;
    status: string;
    
    role: string; //refer to table role
    statusName: string; //refer to table status
}