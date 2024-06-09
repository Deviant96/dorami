export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchFromApi = async <T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> => {
    try {
        const res = await fetch(`${apiUrl}${endpoint}`, options);

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
        }

        const data: T = await res.json();
        return { success: true, data };
    } catch (error: any) {
        console.error(`Error in ${endpoint}:`, error);
        return { success: false, message: 'An error occured', error: error.message };
    }
};
