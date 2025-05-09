import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EmailVerification = () => {
    const navigate = useNavigate();
    const [isSent, setIsSent] = useState(false);

    const handleResendClick = () => {
        // Simulate sending
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            alert('Verification link sent to your email!');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
                <img src="/assets/images/email verify icon.png" alt="Email Sent" className="w-20 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Your Email</h2>
                <p className="text-sm text-gray-600 mb-6">We've sent a verification link to your email. Please check your inbox and click the link to activate your account.</p>

                <button
                    onClick={handleResendClick}
                    disabled={isSent}
                    className={`${isSent ? 'bg-gray-900 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'} text-white font-semibold w-full py-3 rounded-xl transition-all duration-300`}
                >
                    {isSent ? 'Sending...' : 'Resend Verification Link'}
                </button>

                <button onClick={() => navigate('/auth/login')} className="mt-4 text-sm text-blue-600 underline">
                    Back to Login
                </button>

                {isSent && <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm transition-all duration-300">Verification email sent successfully!</div>}
            </div>
        </div>
    );
};

export default EmailVerification;
