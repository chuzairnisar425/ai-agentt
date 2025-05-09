import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormGroup from '../../../shared/components/forms/FormGroup';
import FormInput from '../../../shared/components/forms/FormInput';
import FormLabel from '../../../shared/components/forms/FormLabel';
import registerImage from '/public/assets/images/auth/register.svg';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '../../../../_theme/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Account'));
    });
    const navigate = useNavigate();
    const validation = useFormik({
        validateOnBlur: false,
        initialValues: {
            businessName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            terms: false,
        },
        validationSchema: Yup.object({
            businessName: Yup.string().required('Business name is required'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string().nullable(),
            password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm your password'),
            terms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
        }),
        onSubmit: async (values) => {
            console.log('Form Submitted:', values);
            navigate('/email-verify');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-10">
            <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
                {/* Left Section - Hidden on small screens */}
                <div className="hidden md:flex w-1/2 bg-gray-200 flex-col items-center justify-center p-10">
                    <img src={registerImage} alt="Register" width={200} />
                    <h1 className="text-2xl font-semibold mt-4">Join AI Reception</h1>
                    <p className="text-gray-600 mt-2 text-center">Create your account to get started</p>
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md">
                        <div className="flex  justify-center mb-5">
                            <img src="/public/assets/images/logo.svg" alt="" />
                        </div>
                        <h2 className="text-center text-2xl font-semibold mb-6">Create Account</h2>

                        <form onSubmit={validation.handleSubmit} className="space-y-3">
                            <FormGroup>
                                <FormLabel htmlFor="businessName" required error={validation.errors.businessName} className="font-normal">
                                    Business Name
                                </FormLabel>
                                <FormInput
                                    id="businessName"
                                    name="businessName"
                                    value={validation.values.businessName}
                                    onChange={validation.handleChange}
                                    invalid={Boolean(validation.errors.businessName)}
                                    placeholder="Enter business name"
                                />
                            </FormGroup>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormGroup>
                                    <FormLabel htmlFor="firstName" required error={validation.errors.firstName} className="font-normal">
                                        First Name
                                    </FormLabel>
                                    <FormInput
                                        id="firstName"
                                        name="firstName"
                                        value={validation.values.firstName}
                                        onChange={validation.handleChange}
                                        invalid={Boolean(validation.errors.firstName)}
                                        placeholder="First name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel htmlFor="lastName" required error={validation.errors.lastName} className="font-normal">
                                        Last Name
                                    </FormLabel>
                                    <FormInput
                                        id="lastName"
                                        name="lastName"
                                        value={validation.values.lastName}
                                        onChange={validation.handleChange}
                                        invalid={Boolean(validation.errors.lastName)}
                                        placeholder="Last name"
                                    />
                                </FormGroup>
                            </div>

                            <FormGroup>
                                <FormLabel htmlFor="email" required error={validation.errors.email} className="font-normal">
                                    Email Address
                                </FormLabel>
                                <FormInput
                                    id="email"
                                    name="email"
                                    value={validation.values.email}
                                    onChange={validation.handleChange}
                                    invalid={Boolean(validation.errors.email)}
                                    placeholder="Enter email"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="phone" className="font-normal">
                                    Phone Number (Optional)
                                </FormLabel>
                                <FormInput id="phone" name="phone" value={validation.values.phone} onChange={validation.handleChange} placeholder="Enter phone number" />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="password" required error={validation.errors.password} className="font-normal">
                                    Password
                                </FormLabel>
                                <FormInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={validation.values.password}
                                    onChange={validation.handleChange}
                                    invalid={Boolean(validation.errors.password)}
                                    placeholder="Create password"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="password_confirmation" required error={validation.errors.password_confirmation} className="font-normal">
                                    Confirm Password
                                </FormLabel>
                                <FormInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={validation.values.password_confirmation}
                                    onChange={validation.handleChange}
                                    invalid={Boolean(validation.errors.password_confirmation)}
                                    placeholder="Confirm password"
                                />
                            </FormGroup>

                            <FormGroup>
                                <label className="flex items-center">
                                    <input type="checkbox" name="terms" checked={validation.values.terms} onChange={validation.handleChange} className="mr-2" />
                                    <span className="font-normal">
                                        I agree to the{' '}
                                        <a href="#" className="text-gray-900 font-semibold">
                                            Terms and Conditions
                                        </a>
                                    </span>
                                </label>
                                {validation.errors.terms && <p className="text-red-600 text-sm mt-1">{validation.errors.terms}</p>}
                            </FormGroup>

                            <button type="submit" disabled={validation.isSubmitting} className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800">
                                {validation.isSubmitting ? 'Please Wait...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="text-gray-600 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
