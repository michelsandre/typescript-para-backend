import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import EnderecoEntity from '../../entities/EnderecoEntity';
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, 'id'>> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await esquemaBodyEndereco.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {};
    yupErrors.inner.forEach((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(400).send({ error: validationErrors });
  }
};

export { middlewareValidadorBodyEndereco };
