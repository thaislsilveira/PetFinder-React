export default class UnsupportedFileTypeError extends Error {
  constructor() {
    super(
      'Tipo de arquivo não suportado. Envie apenas imagens JPEG, PNG, GIF ou WEBP.',
    );
    this.name = 'UnsupportedFileTypeError';
  }
}
