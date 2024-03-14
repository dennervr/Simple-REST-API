// Middleware para capturar erros do Zod
export const errorHandler = (err, req, res, next) => {
  if (err instanceof Error && err.issues) {
    console.error("Erro de validação:", err.issues);
    const formattedErrors = err.issues.map(issue => ({
      validation: issue.validation,
      message: issue.message,
      path: issue.path.join('.')
    }));
    return res.status(400).json({ message: "Erro de validação", errors: formattedErrors });
  }
  next(err);
};