import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            showNotification({ title: 'Error', message: 'Passwords do not match', color: 'red' });
            return;
        }

        // Simulate password reset
        showNotification({ title: 'Success', message: 'Password has been reset!', color: 'green' });
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-4">Reset Your Password</h2>
                <form className="space-y-4" onSubmit={handleReset}>
                    <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                    <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
