import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.log("errorHandler");
  if (err instanceof ZodError && err.issues) {
    console.error("Erro de validação:", err.issues);
    const formattedErrors = err.issues.map(issue => ({
      validation: issue.validation,
      message: issue.message,
      path: issue.path.join('.')
    }));
    return res.status(400).json({ message: "Erro de validação", errors: formattedErrors });
  } else if (err instanceof PrismaClientKnownRequestError) {
    return handleKnownPrismaError(err, res);
  } else if (err instanceof PrismaClientUnknownRequestError) {
    console.error("PrismaError:", err);
    return res.status(500).json({ message: "Ocorreu um erro no servidor." });
  }
  next(err);
};

function handleKnownPrismaError(err, res) {
  switch (err.code) {
    case 'P2002':
      return sendPrismaError(res, "Já existe um registro com o mesmo valor único.", err.message);
    case 'P2003':
      return sendPrismaError(res, "Chave de estrangeira não encontrada.", err.message);
    case 'P2016':
      return sendPrismaError(res, "Chave de referência violada.", err.message);
    case 'P2025':
      return sendPrismaError(res, "A operação falhou pois precisa de uma chave que não foi encontrada", err.message);
    default:
      console.error(err);
      return sendPrismaError(res, "Ocorreu um erro não identificado do Prisma.");
  }
}

function sendPrismaError(res, message, originalMessage = "") {
  return res.status(400).json({
    message,
    originalMessage
  });
}
