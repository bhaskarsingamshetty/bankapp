const BASE_URL = 'http://localhost:8081/api';

const getHeaders = ({ includeAuth = true, contentType = 'application/json' } = {}) => {
    const headers = {
        'Content-Type': contentType,
    };
    if (includeAuth) {
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
};

const handleResponse = async (response) => {
    // if (response.status === 401 || response.status === 403) {
    //     localStorage.removeItem('authToken');
    //     localStorage.removeItem('userId');
    //     window.location.href = '/login';
    //     throw new Error('Session expired');
    // }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API Request failed');
    }

    // Some endpoints might return empty body on success
    const text = await response.text();
    return text ? JSON.parse(text) : {};
};

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: getHeaders({ includeAuth: false }),
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    signup: async (userData) => {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: getHeaders({ includeAuth: false }),
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    applyLoan: async (userId, loanData) => {
        const response = await fetch(`${BASE_URL}/loan/apply_loan/${userId}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(loanData),
        });
        return handleResponse(response);
    },

    getLoans: async (userId) => {
        const response = await fetch(`${BASE_URL}/loan/getloans/${userId}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    getCustomerName: async (userId) => {
        const response = await fetch(`${BASE_URL}/customername/${userId}`, {
            headers: getHeaders(),
        });
        const res = await fetch(`${BASE_URL}/customername/${userId}`, {
            headers: getHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch name');
        return res.text();
    },

    getAccounts: async (userId) => {
        const response = await fetch(`${BASE_URL}/account/info/${userId}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    createAccount: async (userId, accountData) => {
        const response = await fetch(`${BASE_URL}/account/info/${userId}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(accountData),
        });
        return handleResponse(response);
    },

    applyInsurance: async (userId, policyData) => {
        const response = await fetch(`${BASE_URL}/insurance/new_policy/${userId}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(policyData),
        });
        return handleResponse(response);
    },

    performTransaction: async ({ senderaccountnumber, receiveraccountnumber, amount }) => {
        const response = await fetch(`${BASE_URL}/transaction/do_transaction`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                senderaccountnumber,
                receiveraccountnumber,
                amount
            }),
        });
        return handleResponse(response);
    },

    getTransactions: async (userId) => {
        const response = await fetch(`${BASE_URL}/transaction/get_transaction/${userId}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    }
};
