import mongoose from 'mongoose';

export const getDatabaseHealth = () => {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    return {
        status: states[mongoose.connection.readyState as keyof typeof states] ?? 'unknown',
    };
};