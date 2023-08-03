
const API_URL = "http://localhost:3001";

export const putNewBoard = async (payload: { title: string; }) => {
    try {
        // Assuming you have a function to create a new task in your backend
        const response = await fetch(`${API_URL}/api/boards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: payload.title,
            }),
        });

        if (!response.ok) {
            throw new Error('Error creating a new board');
        }

        const { boards, newBoard } = await response.json();
        return { boards, newBoard };
    } catch (error) {
        console.error('Error creating a new task:', error);
        throw error;
    }
};

export const fetchIdentityCount = async (
    amount = 1
): Promise<{ data: number }> => {
    const response = await fetch('http://localhost:3000/api/identity-count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
    })
    const result = await response.json()

    return result
}
