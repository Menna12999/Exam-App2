import { z } from "zod";



/***********************************************login schema****************************************************** */

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email is required" })
    .email({ message: "Not a valid email" }),
  password: z
    .string()
    .nonempty({ message: "pasword is required" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export type LoginFormPayload = z.infer<typeof loginFormSchema>;

/***********************************************forget password schema****************************************************** */

export const forgetPasswordFormSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email is required" })
    .email({ message: "Not a valid email" }),
 
});

export type forgetPasswordFormPayload = z.infer<typeof forgetPasswordFormSchema>;

/***********************************************Register schema****************************************************** */


export const RegisterFormSchema = z.object({
    username: z.string().nonempty('User Name is Required').min(3,'User Name must be at least 3 characters long').max(10,'max 10'),
    firstName:z.string().nonempty('First Name is Required').min(3,'First Name must be at least 3 characters long').max(10,'max 10'),
    lastName:z.string().nonempty('Last Name is Required').min(3,'Last Name must be at least 3 characters long').max(10,'max 10'),
    email:z.email('email invalid'),
    password:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    rePassword:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    phone:z.string().nonempty('phone is required').regex(/01[0125][0-9]{8}$/,'invalid egypt number')

}).refine(data => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterFormType  = z.infer<typeof RegisterFormSchema>


/**********************************************************otp schema******************************************************** */
export const otpFormSchema = z.object({
  resetCode:z.string().nonempty('code is required').min(6,'code must be at least 6 characters long')
})
export type VerifyOtpType = z.infer<typeof otpFormSchema>


/***********************************************************reset password**************************************************** */


export const ResetPasswordFormSchema = z.object({
    newPassword:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    confirmPassword:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),

}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type ResetPasswordFormType  = z.infer<typeof ResetPasswordFormSchema>


/***********************************************************profile**************************************************** */


export const ProfileFormSchema = z.object({
    username: z.string().nonempty('User Name is Required').min(3,'User Name must be at least 3 characters long').max(10,'max 10'),
    firstName:z.string().nonempty('First Name is Required').min(3,'First Name must be at least 3 characters long').max(10,'max 10'),
    lastName:z.string().nonempty('Last Name is Required').min(3,'Last Name must be at least 3 characters long').max(10,'max 10'),
    email:z.email('email invalid'),
    phone:z.string().nonempty('phone is required').regex(/01[0125][0-9]{8}$/,'invalid egypt number')

})

export type ProfileFormType  = z.infer<typeof ProfileFormSchema>

/***********************************************************change password**************************************************** */
export const ChangePasswordFormSchema = z.object({
    oldPassword:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    password:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    rePassword:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),

}).refine(data => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
  export type ChangePasswordFormType  = z.infer<typeof ChangePasswordFormSchema>
