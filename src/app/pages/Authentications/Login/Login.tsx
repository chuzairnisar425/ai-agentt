import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../_theme/themeConfigSlice';

const Login: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        }),
        onSubmit: (values) => {
            console.log('Form Submitted:', values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
                {/* Left Section (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 bg-gray-200 flex-col items-center justify-center p-10">
                    <div className="text-5xl mb-4">🎧</div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to AI Reception</h2>
                    <p className="text-gray-600 mt-2 text-center text-sm max-w-xs">Your smart virtual receptionist solution.</p>
                </div>

                {/* Right Section (Form) */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex justify-center items-center">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex  justify-center mb-5">
                                <img src="/public/assets/images/logo.svg" alt="" />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-700">AI Reception</h2>
                            <p className="text-sm text-gray-500 mt-1">Please sign in to continue</p>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
                            </div>

                            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-200">
                                Sign In
                            </button>

                            <div className="flex justify-center">
                                <Link to="/auth/forgot-password" className="text-sm text-gray-600 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="text-center text-sm text-gray-500 mt-4">------- Don’t have an account? -------</div>
                            <Link
                                to="/auth/register"
                                className="w-full text-black shadow border-gray-800 py-4 rounded-xl text-center hover:text-white hover:bg-gray-900 transition-all duration-200 block"
                            >
                                Create Account
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
