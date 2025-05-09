import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconArrowBackward from '../../../../_theme/components/Icon/IconArrowBackward';
import * as Yup from 'yup';
import { setPageTitle } from '../../../../_theme/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import IconCheck from '../../../../_theme/components/Icon/IconCheck';

const ForgetForm: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Forgot password'));
    }, [dispatch]);

    const validation = useFormik({
        validateOnBlur: false,
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            try {
                // Simulate API call
                console.log('Sending reset email:', values.email);
                showNotification({
                    title: 'Success',
                    message: 'Reset instructions sent to your email',
                    color: 'green',
                    icon: <IconCheck />,
                });
                navigate('/auth/reset-email-sent');
            } catch (error) {
                showNotification({
                    title: 'Error',
                    message: 'Failed to send reset email',
                    color: 'red',
                });
            } finally {
                validation.setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
                <div className="hidden md:flex w-1/2 bg-gray-200 flex-col items-center justify-center p-10">
                    <div className="text-center">
                        <img src="/public/assets/images/auth/forgotpassword.png" width={200} alt="" />
                        <h1 className="text-2xl font-semibold">Password Recovery</h1>
                        <p className="text-gray-600 mt-2">We'll help you reset your password</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-md ">
                        <div className="flex justify-center mb-5">
                            <img src="/public/assets/images/logo.svg" alt="" />
                        </div>
                        <h1 className="text-center text-2xl font-normal mb-4">AI Agent</h1>
                        <h2 className="text-center text-lg font-normal mb-6">Forgot Your Password?</h2>

                        <form onSubmit={validation.handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="LoginEmail" className="block mb-1 font-medium">
                                    Email Address
                                </label>
                                <input
                                    id="LoginEmail"
                                    type="email"
                                    name="email"
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    value={validation.values.email}
                                    placeholder="Enter Email"
                                    className="form-input w-full border rounded-md px-4 py-2"
                                />
                                {validation.errors.email && <div className="text-red-600 text-sm mt-1">{validation.errors.email}</div>}
                            </div>

                            <button disabled={validation.isSubmitting} type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition">
                                {validation.isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-ping w-3 h-3 inline-block bg-white rounded-full"></span>
                                        <span>Please Wait</span>
                                    </span>
                                ) : (
                                    'Send Reset Instructions'
                                )}
                            </button>

                            <div className="space-y-5 mt-6">
                                <div className="text-center text-sm text-gray-500">------- Don’t have an account? -------</div>
                                <Link
                                    to="/auth/login"
                                    className="w-full flex justify-center items-center text-black shadow border-gray-800 py-4 rounded-xl text-center hover:text-white hover:bg-gray-900 transition-all duration-200 gap-1"
                                >
                                    <IconArrowBackward /> Back to login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetForm;
