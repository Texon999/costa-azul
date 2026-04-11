export const validate = (schema, data) => {
  
  const result = schema.safeParse(data)

  if (!result.success) {
 
    let message = 'Datos inválidos'
    try {
      const errors = JSON.parse(result.error.message)
      message = errors[0]?.message ?? message
    } catch {
      message = result.error.message
    }
    throw { status: 400, message }
  }

  return result.data
}