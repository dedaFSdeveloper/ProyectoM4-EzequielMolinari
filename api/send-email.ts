import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { to, taskTitle } = req.body

  if (!to || !taskTitle) {
    return res.status(400).json({ error: 'Faltan datos' })
  }

  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: `Nueva tarea creada: ${taskTitle}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `Se creó una nueva tarea: "${taskTitle}"`,
          Charset: 'UTF-8',
        },
      },
    },
  })

  try {
    await ses.send(command)
    return res.status(200).json({ message: 'Email enviado' })
  } catch (error) {
    console.log('error al enviar email', error)
    return res.status(500).json({ error: 'No se pudo enviar el email' })
  }
}