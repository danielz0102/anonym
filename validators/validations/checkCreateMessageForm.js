import { checkSchema } from 'express-validator'

export const checkCreateMessageForm = () =>
  checkSchema(
    {
      title: {
        trim: true,
        notEmpty: true,
        isString: true,
        isLength: {
          options: { max: 20 },
          errorMessage: 'Title must be at most 20 characters',
        },
      },
      content: {
        trim: true,
        notEmpty: true,
        isString: true,
      },
    },
    ['body'],
  )
