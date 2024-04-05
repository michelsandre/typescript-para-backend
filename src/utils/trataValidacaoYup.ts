import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const tratarErroValidacaoYup = (
  esquema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    esquema.validateSync(req.body, { abortEarly: false });
    return next();
  } catch (erros) {
    const errosYup = erros as yup.ValidationError;
    const errosDeValidacao: Record<string, string> = {};
    errosYup.inner.forEach((erro) => {
      if (erro.path) {
        errosDeValidacao[erro.path] = erro.message;
      }
    });
    res.status(400).send({ erros: errosDeValidacao });
  }
};

export default tratarErroValidacaoYup;
