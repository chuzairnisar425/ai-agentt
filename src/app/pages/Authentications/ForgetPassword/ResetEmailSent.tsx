import { useNavigate } from 'react-router-dom';

const ResetEmailSent = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <img src="/public/assets/images/email verify icon.png" alt="Email Sent" className="w-20 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-sm text-gray-600 mb-6">A password reset link has been sent to your email. Please check your inbox to continue.</p>
                <button className="bg-gray-900 text-white font-semibold w-full py-3 rounded-xl hover:bg-gray-800 transition-all" onClick={() => navigate('/auth/login')}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ResetEmailSent;
