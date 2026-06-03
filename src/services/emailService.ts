export const sendTaskEmail = async (to: string, taskTitle: string) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, taskTitle }),
    })

    if (!response.ok) {
      console.log('error al enviar email')
    }
  } catch {
    console.log('no se pudo conectar con la api de emails')
  }
}