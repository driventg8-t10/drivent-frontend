import api from './api';

export async function getCertificate(token) {
  const config = {
    responseType: 'arraybuffer', // Indica que a resposta é um array de bytes
    headers: {
      Authorization: `Bearer ${token}`, // Passa o token no cabeçalho da requisição
    },
  };

  const response = await api.get('/certificate', config);

  const blob = new Blob([response.data], { type: 'application/pdf' });

  const blobURL = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobURL;
  link.setAttribute('download', 'certificado.pdf');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobURL);
}
