export const getAnswer = async (question) => {
    try {
        const response = await fetch('/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error getting answer:', response.statusText);
        }
    } catch (error) {
        console.error('Error getting answer:', error);
    }
};

