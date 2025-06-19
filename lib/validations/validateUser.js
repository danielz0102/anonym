import { checkSchema } from 'express-validator'

const getGeneralTextValidation = (fieldName) => ({
  trim: true,
  notEmpty: true,
  isString: true,
  isLength: {
    options: { max: 50 },
    errorMessage: `${fieldName} must be at most 50 characters`,
  },
})

export const validateUser = () =>
  checkSchema(
    {
      firstName: getGeneralTextValidation('First name'),
      lastName: getGeneralTextValidation('Last name'),
      username: getGeneralTextValidation('Username'),
      password: {
        trim: true,
        notEmpty: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage:
            'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol',
        },
      },
      confirmPassword: {
        trim: true,
        notEmpty: true,
        isString: true,
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Passwords do not match')
            }
            return true
          },
        },
      },
    },
    ['body'],
  )
